// /src/routes/+page.server.js
export const prerender = false;

import { listHomeBlogEntries } from '$lib/services/questionServices.js';
import { syllabusService } from '$lib/services/syllabusService.js';

export async function load({ setHeaders }) {
  const [blogRaw, courseCards] = await Promise.all([
    listHomeBlogEntries({}),
    syllabusService.listCoursesAsCards()
  ]);

  // Ensure stable ids for Svelte keyed each
  const blogCards = blogRaw.map((q, i) => ({ id: q.id ?? `q_${q.slug ?? i}`, ...q }));

  const questions = [...blogCards, ...courseCards];

  setHeaders({ 'cache-control': 'public, max-age=30' });
  return { questions };
}
