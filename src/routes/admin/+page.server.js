

// /src/routes/admin/+page.server.js
export const prerender = false;

import * as admin from '$lib/services/adminServices.js';

const S = (v) => (typeof v === 'string' ? v.trim() : '');

export async function load({ url, setHeaders }) {
  const highlight = {
    tcode:   S(url.searchParams.get('tcode')),
    chapter: S(url.searchParams.get('chapter')),
    exercise:S(url.searchParams.get('exercise'))
  };
  const msg   = S(url.searchParams.get('msg'));
  const error = S(url.searchParams.get('error'));

  const tcodes = await admin.listTcodes();

  // Counts per tcode (parallel; falls back to local reduce inside admin.getCounts)
  const countsEntries = await Promise.all(
    tcodes.map(async (t) => {
      const c = await admin.getCounts({ tcodeSlug: t.slug });
      return [t.slug, c];
    })
  );
  const counts = Object.fromEntries(countsEntries);

  // Orphans (best-effort; keep light for index)
  let orphans = [];
  try { orphans = await admin.listOrphanQuestions(); } catch {}

  setHeaders({ 'cache-control': 'public, max-age=15' });

  return {
    tcodes,                  // [{ slug, name, ...}]
    counts,                  // { [tcodeSlug]: { total, byChapter? } }
    orphans: orphans.slice(0, 50),
    highlight, msg, error
  };
}
