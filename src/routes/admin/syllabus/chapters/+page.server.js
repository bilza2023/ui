export const prerender = false;

import { listTcodes, getTcode, listChapters } from '$lib/services/syllabusService.js';

export async function load({ url, setHeaders }) {
  const tcodeId = Number.parseInt(url.searchParams.get('tcodeId') || '', 10) || 0;

  const [tcodes, tcode, chapters] = await Promise.all([
    tcodeId ? Promise.resolve(null) : listTcodes(),
    tcodeId ? getTcode(tcodeId) : Promise.resolve(null),
    tcodeId ? listChapters(tcodeId) : Promise.resolve([])
  ]);

  setHeaders({ 'cache-control': 'public, max-age=15' });
  return { tcodeId, tcode, tcodes, chapters };
}
