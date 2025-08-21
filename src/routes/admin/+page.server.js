// Admin: Question Index (DB-backed)
// Lists both decks and notes with filters/search. No schema changes needed.

import prisma from '$lib/server/prisma.js';

export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  const q       = (url.searchParams.get('q') || '').trim();
  const type    = url.searchParams.get('type'); // 'deck' | 'note' | null
  const tcode   = url.searchParams.get('tcode') || null;
  const limit   = Math.min(parseInt(url.searchParams.get('limit') || '200', 10), 500);
  const offset  = Math.max(parseInt(url.searchParams.get('offset') || '0', 10), 0);
  const sort    = url.searchParams.get('sort') || 'edited_desc'; // 'edited_desc' | 'created_desc' | 'name_asc'

  // Where clause
  /** @type {import('@prisma/client').Prisma.QuestionWhereInput} */
  const where = {};
  if (type === 'deck' || type === 'note') where.type = type;
  if (tcode) where.tcode = tcode;
  if (q) {
    where.OR = [
      { filename:    { contains: q, mode: 'insensitive' } },
      { name:        { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
      { exercise:    { contains: q, mode: 'insensitive' } }
    ];
  }

  // Order
  let orderBy;
  if (sort === 'created_desc') orderBy = [{ createdAt: 'desc' }];
  else if (sort === 'name_asc') orderBy = [{ name: 'asc' }, { filename: 'asc' }];
  else orderBy = [{ editedAt: 'desc' }];

  // Fetch items
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

  // Totals (global, not just filtered)
  const [totalAll, totalDecks, totalNotes] = await Promise.all([
    prisma.question.count(),
    prisma.question.count({ where: { type: 'deck' } }),
    prisma.question.count({ where: { type: 'note' } })
  ]);

  // Tcode stats (global) – compact structure for filter dropdown
  const tcodeRows = await prisma.question.groupBy({
    by: ['tcode', 'type'],
    _count: { _all: true }
  }).catch(() => []); // older Prisma versions: groupBy may need preview; fail soft

  /** @type {Record<string, {total:number, deck:number, note:number}>} */
  const tcodeStats = {};
  for (const r of tcodeRows) {
    if (!r.tcode) continue;
    tcodeStats[r.tcode] ??= { total: 0, deck: 0, note: 0 };
    tcodeStats[r.tcode].total += r._count._all;
    if (r.type === 'deck') tcodeStats[r.tcode].deck += r._count._all;
    if (r.type === 'note') tcodeStats[r.tcode].note += r._count._all;
  }
  
  
  return {
    items,
    filters: { q, type: (type === 'deck' || type === 'note') ? type : null, tcode, limit, offset, sort },
    totals: { all: totalAll, decks: totalDecks, notes: totalNotes },
    tcodeStats
  };
}
