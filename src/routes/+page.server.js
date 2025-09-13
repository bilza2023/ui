// /src/routes/+page.server.js
export const prerender = false;

import { questions } from '$lib/services/questionServices.js';
import { listTcodes } from '$lib/services/syllabusService.js';

export async function load({ setHeaders }) {

  const tcodes = await listTcodes();

  // console.log("tcodes===>" ,tcodes);
  
  // Fetch only questions pinned to home
  const rows = await questions.list({
    filters: { },
    includePayload: false
  });

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
  return { questions: questionsData , tcodes };
}
