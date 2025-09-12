export const prerender = false;

import { listTcodes, listChapters, listExercises } from '$lib/services/syllabusService.js';

export async function load({ url, setHeaders }) {
  const tcodeSlug = url.searchParams.get('tcode') || '';
  const chapterSlug = url.searchParams.get('chapter') || '';

  const tcodes = await listTcodes();                         // [{ id, slug, name }]
  const tcode = tcodes.find(t => t.slug === tcodeSlug) || null;

  const chapters = tcode ? await listChapters(tcode.id) : []; // [{ id, slug, name, sortOrder, updatedAt }]
  const chapter = chapters.find(c => c.slug === chapterSlug) || null;

  const exercises = chapter ? await listExercises(chapter.id) : []; // [{ id, slug, name, sortOrder, updatedAt }]

  setHeaders({ 'cache-control': 'public, max-age=15' });

  return {
    tcode:   tcode   ? { id: tcode.id, slug: tcode.slug, name: tcode.name }   : null,
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
