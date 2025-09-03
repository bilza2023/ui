export const prerender = false;

import { error } from '@sveltejs/kit';
import { getTcodeBySlug } from '$lib/services/syllabusService.js';

export async function load({ params, setHeaders }) {
  const tcodeSlug = params.slug;

  const t = await getTcodeBySlug(tcodeSlug, { includeChapters: true });
  if (!t) throw error(404, 'Tcode not found');

  const tcode = {
    slug: t.slug,
    name: t.name,
    description: t.description ?? '',
    image: t.image ?? '',
    chapterCount: Array.isArray(t.chapters) ? t.chapters.length : 0
  };

  const chapters = (t.chapters ?? [])
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      sortOrder: Number(c.sortOrder ?? 0),
      exerciseCount: Number(c.exerciseCount ?? c._count?.exercises ?? 0)
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcode, chapters };
}
