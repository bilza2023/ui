// /src/routes/admin/synopsis/export/+server.js
import { exportSnapshot } from '$lib/services/synopisisServices2.server.js';

export async function GET({ url }) {
  const tcode = url.searchParams.get('tcode') || null;
  const payload = await exportSnapshot({ tcode });
  const fname = tcode ? `synopsis-${tcode}.json` : 'synopsis-all.json';
  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'content-disposition': `attachment; filename="${fname}"`
    }
  });
}
