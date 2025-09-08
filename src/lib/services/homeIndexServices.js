// src/lib/services/homeIndexServices.js
// ------------------------------------------------------------
// Service layer for managing HomeIndexEntry (home page curation)
// v2: url -> slug (legacy accepted), explicit href persisted,
//     consistent selects, safe trimming, auto sortOrder append.
// ------------------------------------------------------------

import prisma from '$lib/server/prisma.js';
import { computeHref } from '$lib/constants/homeIndex.js';

/* -------------------- helpers -------------------- */
const S     = (v) => (typeof v === 'string' ? v.trim() : '');
const TRIM  = (v) => (typeof v === 'string' ? v.trim() : v);
const BOOL  = (v) => !!v;
const INT   = (v) => (v == null || v === '' ? null : Number(v));

const baseSelect = {
  id: true,
  category: true,
  type: true,
  title: true,
  slug: true,
  href: true,
  description: true,
  thumbnail: true,
  pinned: true,
  sortOrder: true,
  status: true,
  createdAt: true,
  updatedAt: true
};

/* -------------------- CREATE -------------------- */
/**
 * Create a new HomeIndexEntry.
 * Required: category, type, title, slug (or legacy url), href (if omitted we compute from type+slug)
 * Optional: description, thumbnail, pinned, sortOrder, status
 * If sortOrder missing, auto-append to end within category.
 */
export async function createEntry({
  category,
  type,
  title,
  slug,          // canonical
  url,           // legacy input; used only if slug missing
  href,          // explicit link; if blank, computed from type+slug
  description = null,
  thumbnail = null,
  pinned = false,
  sortOrder = null,
  status = 'active'
} = {}) {
  category    = S(category);
  type        = S(type);
  title       = S(title);
  slug        = S(slug) || S(url); // legacy mapping
  description = TRIM(description) || null;
  thumbnail   = S(thumbnail) || null;
  pinned      = BOOL(pinned);
  status      = S(status) || 'active';

  if (!category) throw new Error('category is required');
  if (!type)     throw new Error('type is required');
  if (!title)    throw new Error('title is required');
  if (!slug)     throw new Error('slug is required');

  // Compute href if not provided
  const finalHref = S(href) || computeHref(type, slug);

  // Auto-append sort order within the category if missing
  let finalSort = INT(sortOrder);
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
        href: finalHref,           // <-- REQUIRED by schema
        description,
        thumbnail,
        pinned,
        sortOrder: finalSort,
        status
      },
      select: baseSelect
    });
  } catch (err) {
    // P2002: unique constraint (category, slug)
    if (err?.code === 'P2002') {
      throw new Error(`This slug already exists in category "${category}".`);
    }
    throw err;
  }
}

/* -------------------- READ -------------------- */
export async function getEntryById(id) {
  if (!id) throw new Error('id is required');
  return prisma.homeIndexEntry.findUnique({
    where: { id: Number(id) },
    select: baseSelect
  });
}

/* -------------------- LIST -------------------- */
/**
 * List entries with optional filtering.
 * Default order for admin: pinned DESC, sortOrder ASC, createdAt DESC
 */
export async function listEntries({
  category = null,
  status = null,
  limit = 200,
  offset = 0
} = {}) {
  const where = {};
  if (category) where.category = category;
  if (status)   where.status = status;

  return prisma.homeIndexEntry.findMany({
    where,
    orderBy: [
      { pinned: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
    take: Number(limit),
    skip: Number(offset),
    select: baseSelect
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

/* -------------------- UPDATE (optional) -------------------- */
/**
 * Update an entry.
 * If type or slug change and href is not provided, we recompute href for consistency.
 */
export async function updateEntry(id, updates = {}) {
  if (!id) throw new Error('id is required');

  const data = { ...updates };

  if (data.category != null)    data.category = S(data.category);
  if (data.type != null)        data.type = S(data.type);
  if (data.title != null)       data.title = S(data.title);
  if (data.slug != null)        data.slug = S(data.slug);
  if (data.href != null)        data.href = S(data.href);
  if (data.description != null) data.description = TRIM(data.description) || null;
  if (data.thumbnail != null)   data.thumbnail = S(data.thumbnail) || null;
  if (data.pinned != null)      data.pinned = BOOL(data.pinned);
  if (data.sortOrder != null)   data.sortOrder = Number(data.sortOrder);
  if (data.status != null)      data.status = S(data.status);

  // Recompute href only if caller didn't send one and we have type/slug context
  if (!data.href && (data.type || data.slug)) {
    const current = await prisma.homeIndexEntry.findUnique({
      where: { id: Number(id) },
      select: { type: true, slug: true }
    });
    const nextType = data.type ?? current?.type;
    const nextSlug = data.slug ?? current?.slug;
    if (nextType && nextSlug) {
      data.href = computeHref(nextType, nextSlug);
    }
  }

  try {
    return await prisma.homeIndexEntry.update({
      where: { id: Number(id) },
      data,
      select: baseSelect
    });
  } catch (err) {
    if (err?.code === 'P2002') {
      // (category, slug) unique
      throw new Error('Another entry with this category + slug already exists.');
    }
    throw err;
  }
}

/* -------------------- DELETE -------------------- */
export async function deleteEntry(id) {
  if (!id) throw new Error('id is required');
  return prisma.homeIndexEntry.delete({
    where: { id: Number(id) },
    select: baseSelect
  });
}

/* -------------------- ORDERING / FLAGS -------------------- */
/**
 * Reorder entries within a category (top → bottom).
 * Accepts array of { id } in the new order.
 */
export async function reorderCategory(category, orderedItems = []) {
  if (!category) throw new Error('category is required');
  if (!Array.isArray(orderedItems)) throw new Error('orderedItems must be an array');

  return prisma.$transaction(
    orderedItems.map((it, idx) =>
      prisma.homeIndexEntry.update({
        where: { id: Number(it.id) },
        data: { sortOrder: idx },
        select: { id: true, sortOrder: true }
      })
    )
  );
}

export async function setPinned(id, pinned) {
  if (!id) throw new Error('id is required');
  if (typeof pinned !== 'boolean') throw new Error('pinned must be boolean');

  return prisma.homeIndexEntry.update({
    where: { id: Number(id) },
    data: { pinned },
    select: baseSelect
  });
}

export async function setStatus(id, status) {
  if (!id) throw new Error('id is required');
  status = S(status);
  if (!status) throw new Error('status is required');

  return prisma.homeIndexEntry.update({
    where: { id: Number(id) },
    data: { status },
    select: baseSelect
  });
}

/* -------------------- export aggregate -------------------- */
export const homeIndexService = {
  // CRUD
  createEntry,
  getEntryById,
  updateEntry,
  deleteEntry,

  // Listing
  listEntries,
  listCategories,

  // Ordering & flags
  reorderCategory,
  setPinned,
  setStatus
};
