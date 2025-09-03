// src/lib/services/user.service.js
// ------------------------------------------------------------
// UI-facing façade (slug everywhere, no filename).
// Thin wrappers over the new core services.
// ------------------------------------------------------------

import {
  getAllTcodes,
} from './syllabusService.js';

import {
  listQuestions,
} from './contentServices/questionServices.js';

// Fallback image for subjects that don't specify one
const FALLBACK_IMAGE = '/media/images/taleem.webp';

/**
 * listTcodesForIndex()
 * - Minimal subject grid for the index route
 * - Slug is the UI identity
 */
export async function listTcodesForIndex() {
  const rows = await getAllTcodes(); // [{ slug, name, description, image, ... }]
  return rows.map(r => ({
    slug: r.slug,
    name: r.name ?? '',
    description: r.description ?? null,
    image: r.image ?? FALLBACK_IMAGE
  }));
}

/**
 * listRecentForIndex({ tcode?, limit=10 })
 * - Recent questions feed for the index route
 * - Metadata only (no payload)
 * - Ordered by editedAt desc
 */
export async function listRecentForIndex({ tcode, limit = 10 } = {}) {
  const orderBy = [{ editedAt: 'desc' }];
  const rows = await listQuestions({
    tcode,
    includePayload: false,
    orderBy,
    limit
  });

  return rows.map(q => ({
    slug: q.slug,
    tcode: q.tcode,
    // Keep chapter/exercise as-is from DB, but expose as slugs in UI.
    // If your DB currently stores numbers, they'll stringify cleanly.
    chapter: typeof q.chapter === 'string' ? q.chapter : String(q.chapter ?? ''),
    exercise: typeof q.exercise === 'string' ? q.exercise : String(q.exercise ?? ''),
    title: q.name ?? '',
    type: q.type,                // 'deck' | 'note'
    status: q.status,            // 'draft' | 'ready' | 'published' | 'archived'
    editedAt: (q.editedAt instanceof Date) ? q.editedAt.toISOString() : (q.editedAt ?? null)
  }));
}
