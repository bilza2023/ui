// /src/routes/admin/delete/+server.js
import { json, redirect } from '@sveltejs/kit';
import { taleemServices as svc } from '$lib/taleemServices';

function wantsJson(request) {
  const accept = request.headers.get('accept') || '';
  const mode   = request.headers.get('sec-fetch-mode') || '';
  return accept.includes('application/json') || mode !== 'navigate';
}

export async function POST({ request }) {
  const ct = request.headers.get('content-type') || '';
  let filename = '';
  if (ct.includes('application/json')) {
    const body = await request.json().catch(() => ({}));
    filename = String(body.filename ?? '').trim();
  } else {
    const form = await request.formData();
    filename = String(form.get('filename') ?? '').trim();
  }

  if (!filename) {
    const msg = 'filename required';
    return wantsJson(request)
      ? json({ success: false, error: msg }, { status: 400 })
      : (() => { throw redirect(303, `/admin?error=${encodeURIComponent(msg)}`); })();
  }

  try {
    await svc.questions.delete(filename);

    return wantsJson(request)
      ? json({ success: true, deleted: filename })
      : (() => { throw redirect(303, `/admin?deleted=${encodeURIComponent(filename)}`); })();

  } catch (err) {
    const notFound = err?.code === 'P2025' || /Record.*not.*exist/i.test(err?.message || '');
    const msg = notFound ? 'Question not found' : (err?.message || 'Delete failed');

    return wantsJson(request)
      ? json({ success: false, error: msg }, { status: notFound ? 404 : 500 })
      : (() => { throw redirect(303, `/admin?error=${encodeURIComponent(msg)}`); })();
  }
}
