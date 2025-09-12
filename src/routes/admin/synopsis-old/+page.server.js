// /src/routes/admin/synopsis/+page.server.js
export const prerender = false;

import { listTcodes, listChapters } from '$lib/services/syllabusService.js';

export async function load({ setHeaders }) {
  const rows = await listTcodes();

  const tcodes = await Promise.all(
    (rows ?? []).map(async (r) => {
      const chs = await listChapters(r.id);
      return {
        slug: r.slug,
        name: r.name,
        description: r.description ?? null,
        image: r.image ?? null,
        chapterCount: chs.length
      };
    })
  );

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes };
}
