// src/lib/services/homeIndexServices.js
// ------------------------------------------------------------
// Service layer for managing HomeIndexEntry (home page curation)
// v1: add + list + delete + reorder + pin + status.
// Switched field: url -> slug (with backward-compat on create).
// ------------------------------------------------------------
import prisma from '$lib/server/prisma.js';

const TRIM = (v) => (typeof v === 'string' ? v.trim() : v);
const S = (v) => (typeof v === 'string' ? v.trim() : '');
const N = (v) => (v == null || v === '' ? null : Number(v));

/* -------------------- CREATE -------------------- */
/**
 * Create a new HomeIndexEntry.
 * Required: category, title, slug
 * Optional: type, description, thumbnail, pinned, sortOrder, status
 * If sortOrder is missing, auto-append to the end within the category.
 *
 * Backward-compat: if caller passes { url: '...' } and no slug,
 * we treat that url as the slug to avoid breaking older forms.
 */
export async function createEntry({
  category,
  title,
  slug,           // NEW canonical field
  url,            // legacy input support (mapped to slug if slug missing)
  type = 'link',
  description = null,
  thumbnail = null,
  pinned = false,
  sortOrder = null,
  status = 'active'
} = {}) {
  category = S(category);
  title = S(title);
  slug = S(slug) || S(url); // legacy mapping
  type = S(type);
  description = TRIM(description) || null;
  thumbnail = S(thumbnail) || null;
  pinned = Boolean(pinned);
  status = S(status) || 'active';

  if (!category) throw new Error('category is required');
  if (!title) throw new Error('title is required');
  if (!slug) throw new Error('slug is required');

  // auto-append if sortOrder not provided
  let finalSort = N(sortOrder);
  if (finalSort == null || Number.isNaN(finalSort)) {
    const maxRow = await prisma.homeIndexEntry.findFirst({
      where: { category },
      orderBy: { sortOrder: 'desc' },
      select: { sortOrder: true }
    });
    finalSort = (maxRow?.sortOrder ?? -1) + 1;
  }

  try {
    return await prisma.homeIndexEntry.create({
      data: {
        category,
        type,
        title,
        slug,
        description,
        thumbnail,
        pinned,
        sortOrder: finalSort,
        status
      }
    });
  } catch (err) {
    // Handle unique(category, slug)
    if (err?.code === 'P2002') {
      throw new Error(`This slug already exists in category "${category}".`);
    }
    throw err;
  }
}

/* -------------------- READ/LIST -------------------- */
/**
 * Get one entry by id
 */
export async function getEntryById(id) {
  if (!id) throw new Error('id is required');
  return prisma.homeIndexEntry.findUnique({
    where: { id: Number(id) }
  });
}

/**
 * List entries (optionally filter by category and/or status)
 * Default order for admin list: pinned DESC, sortOrder ASC, createdAt DESC
 */
export async function listEntries({
  category = null,
  status = null,
  limit = 200,
  offset = 0
} = {}) {
  const where = {};
  if (category) where.category = category;
  if (status) where.status = status;

  return prisma.homeIndexEntry.findMany({
    where,
    orderBy: [
      { pinned: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
    take: Number(limit),
    skip: Number(offset)
  });
}

/**
 * Distinct categories with counts (optionally by status)
 */
export async function listCategories({ status = null } = {}) {
  const rows = await prisma.homeIndexEntry.groupBy({
    by: ['category'],
    where: status ? { status } : undefined,
    _count: { _all: true }
  });
  return rows
    .map(r => ({ category: r.category, count: r._count._all }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/* -------------------- DELETE -------------------- */
export async function deleteEntry(id) {
  if (!id) throw new Error('id is required');
  return prisma.homeIndexEntry.delete({
    where: { id: Number(id) }
  });
}

/* -------------------- REORDER / PIN / STATUS -------------------- */
/**
 * Reorder entries within a category.
 * Accepts an array of { id } in the new order (top to bottom).
 */
export async function reorderCategory(category, orderedItems = []) {
  if (!category) throw new Error('category is required');
  if (!Array.isArray(orderedItems)) throw new Error('orderedItems must be an array');

  // Only update the provided ids; assumes all belong to the category.
  return prisma.$transaction(
    orderedItems.map((it, idx) =>
      prisma.homeIndexEntry.update({
        where: { id: Number(it.id) },
        data: { sortOrder: idx }
      })
    )
  );
}

/**
 * Toggle pinned flag
 */
export async function setPinned(id, pinned) {
  if (!id) throw new Error('id is required');
  if (typeof pinned !== 'boolean') throw new Error('pinned must be boolean');
  return prisma.homeIndexEntry.update({
    where: { id: Number(id) },
    data: { pinned }
  });
}

/**
 * Set status (e.g., 'active' | 'hidden')
 */
export async function setStatus(id, status) {
  if (!id) throw new Error('id is required');
  status = S(status);
  if (!status) throw new Error('status is required');
  return prisma.homeIndexEntry.update({
    where: { id: Number(id) },
    data: { status }
  });
}

/* -------------------- Export aggregate -------------------- */
export const homeIndexService = {
  // CRUD (no generic update for v1, per your "delete & re-add" rule)
  createEntry,
  getEntryById,
  deleteEntry,

  // Listing
  listEntries,
  listCategories,

  // Ordering & flags
  reorderCategory,
  setPinned,
  setStatus
};
