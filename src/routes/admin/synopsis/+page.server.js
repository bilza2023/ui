export const prerender = false;

import * as admin from '$lib/services/adminServices.js';

export async function load({ setHeaders }) {
  const rows = await admin.listTcodes();
  const tcodes = (rows ?? []).map(r => ({
    slug: r.slug,
    name: r.name,
    description: r.description ?? null,
    image: r.image ?? null,
    chapterCount: Number(r.chapterCount ?? r._count?.chapters ?? 0)
  }));

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodes };
}
