

export const prerender = false;

import { listTcodes, listChapters } from '$lib/services/syllabusService.js';

export async function load({ setHeaders }) {
  const base = await listTcodes();              // [{ id, slug, name, description, image }]
  const tcodes = await Promise.all(
    base.map(async t => ({
      id: t.id,
      slug: t.slug,
      name: t.name,
      description: t.description ?? '',
      image: t.image ?? '',
      chapterCount: (await listChapters(t.id)).length
    }))
  );

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes };
}
