export const prerender = false;

import { getTcode, listChapters, listExercises } from '$lib/services/syllabusService.js';

export async function load({ url, setHeaders }) {
  const tParam = url.searchParams.get('tcode');
  const cParam = url.searchParams.get('chapter');
  const tcodeId = tParam ? Number(tParam) : null;
  const chapterId = cParam ? Number(cParam) : null;

  const tcode = tcodeId ? await getTcode(tcodeId) : null;
  const chapters = tcodeId ? await listChapters(tcodeId) : [];
  const chapter = chapterId ? (chapters.find(c => c.id === chapterId) || null) : null;

  const exercises = chapter ? await listExercises(chapter.id) : [];

  setHeaders({ 'cache-control': 'public, max-age=15' });

  return {
    tcode:   tcode   ? { id: tcode.id, slug: tcode.slug, name: tcode.name } : null,
    chapter: chapter ? { id: chapter.id, slug: chapter.slug, name: chapter.name } : null,
    items: exercises.map(e => ({
      id: e.id,
      slug: e.slug,
      name: e.name,
      sortOrder: e.sortOrder ?? 0,
      updatedAt: e.updatedAt ?? null
    }))
  };
}
