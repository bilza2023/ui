// /src/routes/admin/synopsis/import/+server.js
import { json } from '@sveltejs/kit';
import { importSnapshot } from '$lib/services/synopisisServices2.server.js';

export async function POST({ request }) {
  let payload;
  const ctype = request.headers.get('content-type') || '';
  if (ctype.includes('multipart/form-data')) {
    const fd = await request.formData();
    const file = fd.get('file');
    if (!file || file.size === 0) return new Response('No file', { status: 400 });
    payload = JSON.parse(await file.text());
  } else {
    payload = await request.json().catch(() => null);
    if (!payload) return new Response('Invalid JSON', { status: 400 });
  }
  const res = await importSnapshot(payload); // [{ tcode, created: true }, ...]
  return json({ ok: true, imported: res.length, details: res });
}
