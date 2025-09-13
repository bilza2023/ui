// /src/routes/+page.server.js
export const prerender = false;

import { questions } from '$lib/services/questionServices.js';

export async function load({ setHeaders }) {
  // Fetch only questions pinned to home
  const rows = await questions.list({
    filters: { },
    includePayload: false
  });

  console.log("rows" ,rows);
  // Keep only those with homeCategory set
  const homeRows = rows.filter(r => r.homeCategory);

  // Normalize: stable id, card shape for ListTable
  const questionsData = homeRows.map((q, i) => ({
    id: q.id ?? `q_${i}`,
    slug: q.slug,
    name: q.name,
    type: q.type,
    tcode: q.tcodeId ? String(q.tcodeId) : '',
    chEx: q.chapterId && q.exerciseId ? `Ch ${q.chapterId} · Ex ${q.exerciseId}` : '—',
    status: q.status ?? '—',
    thumbnail: q.thumbnail ?? '',
    editedAt: q.editedAt ?? null,
    homeCategory: q.homeCategory,
    homeSort: q.homeSort ?? 0,
    homePinned: q.homePinned ?? false
  }));

  setHeaders({ 'cache-control': 'public, max-age=30' });
  return { questions: questionsData };
}
