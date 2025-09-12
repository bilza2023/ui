// /src/routes/admin/syllabus/exercises/+page.server.js
export const prerender = false;

import { getChapter, getTcode, listExercises } from '$lib/services/syllabusService.js';

export async function load({ url, setHeaders }) {
  const chapterId = Number.parseInt(url.searchParams.get('chapterId') || '', 10);

  let chapter = null, tcode = null, exercises = [];
  if (chapterId) {
    chapter = await getChapter(chapterId).catch(() => null);
    if (chapter) {
      tcode = await getTcode(chapter.tcodeId).catch(() => null);
      exercises = await listExercises(chapterId);
    }
  }

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { chapterId: chapterId || 0, chapter, tcode, exercises };
}
