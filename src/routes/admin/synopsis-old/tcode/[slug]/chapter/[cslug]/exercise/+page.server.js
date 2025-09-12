export const prerender = false;

import { error } from '@sveltejs/kit';
import { getChapterBySlug } from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const tcodeSlug = params.slug;
  const chapterSlug = params.cslug;

  const chapter = await getChapterBySlug(tcodeSlug, chapterSlug, { includeExercises: true })
    .catch(() => null);
  if (!chapter) throw error(404, 'Chapter not found');

  const tcode = { slug: chapter.tcode.slug, name: chapter.tcode.name };
  const chap  = { slug: chapter.slug, name: chapter.name };

  const exercises = (chapter.exercises ?? [])
    .map((e) => ({
      slug: e.slug,
      name: e.name,
      sortOrder: Number(e.sortOrder ?? 0)
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, chapter: chap, exercises };
}
