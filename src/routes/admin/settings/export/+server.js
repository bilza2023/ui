// /src/routes/admin/settings/export/+server.js
import { error } from '@sveltejs/kit';
import { getNested, listTcodes } from '$lib/services/synopisisServices2.js';

export async function GET({ url }) {
  const tcode = (url.searchParams.get('tcode') || '').trim();
  if (!tcode) throw error(400, 'Missing ?tcode=<tcodeName>');

  // Try direct single snapshot
  let snapshot = null;
  try {
    const one = await getNested(tcode);
    if (one && typeof one === 'object' && one.tcodeName) snapshot = one;
  } catch { /* ignore */ }

  // Fallback: scan all
  if (!snapshot) {
    try {
      const all = await getNested(null);
      if (Array.isArray(all)) {
        snapshot = all.find((x) => x && (x.tcodeName === tcode || x.tcode === tcode));
      }
    } catch { /* ignore */ }
  }

  if (!snapshot) {
    const tcodes = await listTcodes();
    const exists =
      Array.isArray(tcodes) &&
      tcodes.some((t) =>
        typeof t === 'string'
          ? t === tcode
          : (t.tcode && t.tcode === tcode) || (t.tcodeName && t.tcodeName === tcode)
      );

    if (!exists) throw error(404, `Unknown tcode: ${tcode}`);
    throw error(500, 'Could not build tcode snapshot.');
  }

  const body = JSON.stringify(snapshot, null, 2);
  const filename = `tcode_${tcode}.json`;

  return new Response(body, {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`
    }
  });
}
