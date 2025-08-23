// src/lib/services/synopsisServices.server.js
// -------------------------------------------
// Server-only helpers that require Prisma DB access.
// Use only in +page.server.js, +server.js, or other server modules.


// import { prisma } from '$lib/server/prisma.js';
import prisma from '../server/prisma.js';
import { chapterNo, getExercises } from './synopsisServices.js';

/**
 * Count items for each exercise in a chapter.
 * Returns: { [exerciseSlug]: { total, deck, note, latestEditedAt } }
 */
export async function getExerciseCounts(tcode, chapterSlug) {
  const chNumber = chapterNo(tcode, chapterSlug);
  const exercises = getExercises(tcode, chapterSlug);
  const exerciseSlugs = exercises.map(e => e.filename);
  if (exerciseSlugs.length === 0) return {};

  const rows = await prisma.question.findMany({
    where: { tcode, chapter: chNumber, exercise: { in: exerciseSlugs } },
    select: { exercise: true, type: true, editedAt: true }
  });

  const acc = {};
  for (const slug of exerciseSlugs) {
    acc[slug] = { total: 0, deck: 0, note: 0, latestEditedAt: null };
  }
  for (const r of rows) {
    const b = acc[r.exercise];
    if (!b) continue;
    b.total++;
    if (r.type === 'deck') b.deck++;
    if (r.type === 'note') b.note++;
    if (!b.latestEditedAt || new Date(r.editedAt) > new Date(b.latestEditedAt)) {
      b.latestEditedAt = r.editedAt;
    }
  }
  return acc;
}

/**
 * List items in an exercise (for drill-in pages).
 * Options: { typeFilter?, statusFilter?, limit?, offset? }
 */
export async function getExerciseContent(tcode, chapterSlug, exerciseSlug, opts = {}) {
  const chNumber = chapterNo(tcode, chapterSlug);

  const where = { tcode, chapter: chNumber, exercise: exerciseSlug };
  if (opts.typeFilter) where.type = opts.typeFilter;
  if (opts.statusFilter) where.status = opts.statusFilter;

  return prisma.question.findMany({
    where,
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    skip: opts.offset ?? 0,
    take: opts.limit ?? 200,
    select: {
      filename: true, thumbnail: true, type: true, name: true, description: true, status: true, tags: true,
      sortOrder: true, timed: true, createdAt: true, editedAt: true
    }
  });
}
