// Admin: Question Index (DB-backed)
// Lists both decks and notes with filters/search.

import prisma from '$lib/server/prisma.js';

export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const q        = (url.searchParams.get('q') || '').trim();
  const type     = url.searchParams.get('type');          // 'deck' | 'note' | null
  const tcode    = url.searchParams.get('tcode') || null; // string | null
  const chapterS = url.searchParams.get('chapter');       // number (string) | null
  const exercise = url.searchParams.get('exercise');      // slug | null
  const limit    = Math.min(parseInt(url.searchParams.get('limit') || '200', 10), 500);
  const offset   = Math.max(parseInt(url.searchParams.get('offset') || '0', 10), 0);
  const sort     = url.searchParams.get('sort') || 'edited_desc'; // 'edited_desc' | 'created_desc' | 'name_asc'

  /** @type {import('@prisma/client').Prisma.QuestionWhereInput} */
  const where = {};

  if (type === 'deck' || type === 'note') where.type = type;
  if (tcode) where.tcode = tcode;

  // chapter is stored as a number; only filter if it's a valid number
  if (chapterS && /^\d+$/.test(chapterS)) where.chapter = Number(chapterS);

  // exercise stored as string/slug; exact match
  if (exercise) where.exercise = exercise;

  if (q) {
    where.OR = [
      { filename:    { contains: q, mode: 'insensitive' } },
      { name:        { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { exercise:    { contains: q, mode: 'insensitive' } }
    ];
  }

  let orderBy;
  if (sort === 'created_desc') orderBy = [{ createdAt: 'desc' }];
  else if (sort === 'name_asc') orderBy = [{ name: 'asc' }, { filename: 'asc' }];
  else orderBy = [{ editedAt: 'desc' }];

  const items = await prisma.question.findMany({
    where,
    orderBy,
    skip: offset,
    take: limit,
    select: {
      filename: true,
      type: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      timed: true,
      tcode: true,
      chapter: true,
      exercise: true,
      editedAt: true,
      createdAt: true
    }
  });

  // Global totals (for pills)
  const [totalAll, totalDecks, totalNotes] = await Promise.all([
    prisma.question.count(),
    prisma.question.count({ where: { type: 'deck' } }),
    prisma.question.count({ where: { type: 'note' } })
  ]);

  // Optional: tcode stats (kept as in your previous version)
  let tcodeStats = {};
  try {
    const rows = await prisma.question.groupBy({
      by: ['tcode', 'type'],
      _count: { _all: true }
    });
    for (const r of rows) {
      if (!r.tcode) continue;
      tcodeStats[r.tcode] ??= { total: 0, deck: 0, note: 0 };
      tcodeStats[r.tcode].total += r._count._all;
      if (r.type === 'deck') tcodeStats[r.tcode].deck += r._count._all;
      if (r.type === 'note') tcodeStats[r.tcode].note += r._count._all;
    }
  } catch { /* soft fail if groupBy unsupported */ }

  // console.log('[admin] items.length →', items.length);
  return {
    items,
    filters: {
      q,
      type: (type === 'deck' || type === 'note') ? type : null,
      tcode,
      chapter: chapterS && /^\d+$/.test(chapterS) ? Number(chapterS) : null,
      exercise: exercise || null,
      limit,
      offset,
      sort
    },
    totals: { all: totalAll, decks: totalDecks, notes: totalNotes },
    tcodeStats
  };
}
