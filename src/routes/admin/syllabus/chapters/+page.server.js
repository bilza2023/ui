export const prerender = false;

import { getTcode, listChapters } from '$lib/services/syllabusService.js';

export async function load({ url, setHeaders }) {
  const idParam = url.searchParams.get('tcodeId');
  const tcodeId = idParam ? Number(idParam) : null;

  const tcode = tcodeId ? await getTcode(tcodeId) : null;
  const chapters = tcodeId ? await listChapters(tcodeId) : [];

  setHeaders({ 'cache-control': 'public, max-age=15' });

  return {
    tcode: tcode ? { id: tcode.id, slug: tcode.slug, name: tcode.name } : null,
    items: chapters.map(c => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      sortOrder: c.sortOrder ?? 0,
      updatedAt: c.updatedAt ?? null
    }))
  };
}
