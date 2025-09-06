// src/lib/services/homeIndexServices.js
// ------------------------------------------------------------
// Service layer for managing IndexItems (home page curation)
// One source of truth for the Index page tabs (YouTube-style).
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';

const FALLBACK_IMAGE = '/media/images/taleem.webp';

// Reuse a consistent Question projection (no payloads)
const QUESTION_SELECT = {
  slug: true,
  tcode: true,
  chapter: true,
  exercise: true,
  type: true,
  name: true,
  description: true,
  tags: true,
  status: true,
  thumbnail: true,
  sortOrder: true,
  timed: true,
  createdAt: true,
  editedAt: true
};

/* -------------------- CRUD: IndexItem -------------------- */

/**
 * Create a new IndexItem (curation row)
 */
export async function createIndexItem({
  category,
  questionSlug,
  pinned = false,
  sortOrder = 0,
  status = 'active'
}) {
  if (!category || !questionSlug) {
    throw new Error('category and questionSlug are required');
  }
  // ensure question exists
  const q = await prisma.question.findUnique({ where: { slug: questionSlug }, select: { slug: true } });
  if (!q) throw new Error(`Question with slug "${questionSlug}" not found`);

  return await prisma.indexItem.create({
    data: { category, questionSlug, pinned, sortOrder, status }
  });
}

/**
 * Get a single IndexItem by id
 */
export async function getIndexItemById(id, { includeQuestion = false } = {}) {
  if (!id) throw new Error('id is required');

  return await prisma.indexItem.findUnique({
    where: { id: Number(id) },
    include: includeQuestion ? { question: { select: QUESTION_SELECT } } : undefined
  });
}

/**
 * Update an IndexItem
 */
export async function updateIndexItem(id, updates = {}) {
  if (!id) throw new Error('id is required');
  if (updates.questionSlug) {
    // sanity: referenced question must exist
    const q = await prisma.question.findUnique({ where: { slug: updates.questionSlug }, select: { slug: true } });
    if (!q) throw new Error(`Question with slug "${updates.questionSlug}" not found`);
  }
  return await prisma.indexItem.update({
    where: { id: Number(id) },
    data: updates
  });
}

/**
 * Delete an IndexItem by id
 */
export async function deleteIndexItem(id) {
  if (!id) throw new Error('id is required');
  return await prisma.indexItem.delete({ where: { id: Number(id) } });
}

/* -------------------- Listing / Tabs -------------------- */

/**
 * List raw IndexItems, optionally filtered, with consistent ordering:
 * pinned DESC, sortOrder ASC, question.editedAt DESC
 */
export async function listIndexItems({
  category,
  status = 'active',
  includeQuestion = true,
  limit = 100,
  offset = 0
} = {}) {
  const where = {};
  if (category) where.category = category;
  if (status) where.status = status;

  return await prisma.indexItem.findMany({
    where,
    include: includeQuestion ? { question: { select: QUESTION_SELECT } } : undefined,
    orderBy: [
      { pinned: 'desc' },
      { sortOrder: 'asc' },
      // tie-breaker by latest activity on the question
      { question: { editedAt: 'desc' } }
    ],
    take: limit,
    skip: offset
  });
}

/**
 * Distinct categories with counts (active only by default)
 */
export async function listCategories({ status = 'active' } = {}) {
  const rows = await prisma.indexItem.groupBy({
    by: ['category'],
    where: status ? { status } : undefined,
    _count: { _all: true }
  });
  return rows
    .map(r => ({ category: r.category, count: r._count._all }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/**
 * Shape IndexItems → Question-card DTOs for the current UI
 * (keeps your QuestionCards component happy without code changes)
 */
export async function listCardsByCategory(category, { limit = 24, status = 'active' } = {}) {
  const items = await listIndexItems({ category, status, includeQuestion: true, limit });

  return items
    .filter(it => !!it.question) // guard in case of dangling refs
    .map(it => {
      const q = it.question;
      return {
        // question identity
        slug: q.slug,
        tcode: q.tcode,
        chapter: q.chapter,
        exercise: q.exercise,
        type: q.type,
        // card display
        title: q.name ?? '',
        description: q.description ?? null,
        status: q.status ?? null,
        thumbnail: q.thumbnail ?? FALLBACK_IMAGE,
        editedAt: q.editedAt instanceof Date ? q.editedAt.toISOString() : q.editedAt,
        // index metadata (useful for badges/sorting in UI if needed)
        pinned: it.pinned,
        category: it.category
      };
    });
}

/* -------------------- Bulk / Utilities -------------------- */

/**
 * Batch add slugs to a category (skips existing in that category)
 * Returns { created: number, skipped: number }
 */
export async function addSlugsToCategory(category, slugs = [], { status = 'active' } = {}) {
  if (!category) throw new Error('category is required');
  if (!Array.isArray(slugs) || slugs.length === 0) return { created: 0, skipped: 0 };

  const existing = await prisma.indexItem.findMany({
    where: { category, questionSlug: { in: slugs } },
    select: { questionSlug: true }
  });
  const existingSet = new Set(existing.map(r => r.questionSlug));
  const toCreate = slugs.filter(s => !existingSet.has(s));

  if (toCreate.length === 0) return { created: 0, skipped: slugs.length };

  // Basic existence check for all slugs (fail fast on missing)
  const qs = await prisma.question.findMany({
    where: { slug: { in: toCreate } },
    select: { slug: true }
  });
  const foundSet = new Set(qs.map(q => q.slug));
  const missing = toCreate.filter(s => !foundSet.has(s));
  if (missing.length) {
    throw new Error(`Questions not found for slugs: ${missing.join(', ')}`);
  }

  await prisma.indexItem.createMany({
    data: toCreate.map((questionSlug, i) => ({
      category,
      questionSlug,
      status,
      sortOrder: i // caller can reorder later
    }))
  });
  return { created: toCreate.length, skipped: slugs.length - toCreate.length };
}

/**
 * Remove a single slug from a category
 */
export async function removeSlugFromCategory(category, questionSlug) {
  if (!category || !questionSlug) throw new Error('category and questionSlug are required');
  return await prisma.indexItem.deleteMany({
    where: { category, questionSlug }
  });
}

/**
 * Reorder items within a category.
 * Accepts an array of { id } in the desired order.
 */
export async function reorderCategory(category, orderedItems = []) {
  if (!category) throw new Error('category is required');
  if (!Array.isArray(orderedItems)) throw new Error('orderedItems must be an array');

  return await prisma.$transaction(
    orderedItems.map((it, idx) =>
      prisma.indexItem.update({
        where: { id: Number(it.id) },
        data: { sortOrder: idx }
      })
    )
  );
}

/**
 * Quick toggle pin
 */
export async function setPinned(id, pinned) {
  if (typeof pinned !== 'boolean') throw new Error('pinned must be boolean');
  return await prisma.indexItem.update({
    where: { id: Number(id) },
    data: { pinned }
  });
}

/**
 * Publish / hide
 */
export async function setStatus(id, status) {
  if (!status) throw new Error('status is required');
  return await prisma.indexItem.update({
    where: { id: Number(id) },
    data: { status }
  });
}

/* -------------------- Export aggregate -------------------- */
export const homeIndexService = {
  // CRUD
  createIndexItem,
  getIndexItemById,
  updateIndexItem,
  deleteIndexItem,

  // Listing
  listIndexItems,
  listCategories,
  listCardsByCategory,

  // Bulk / utils
  addSlugsToCategory,
  removeSlugFromCategory,
  reorderCategory,
  setPinned,
  setStatus
};
