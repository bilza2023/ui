
// GET /api/auth/verify
import { json } from '@sveltejs/kit';
import { verify as svcVerify } from '$lib/services/loginServices.js';

function getTokenFrom(req, cookies, url) {
  const h = req.headers.get('authorization') || req.headers.get('Authorization');
  if (h?.startsWith('Bearer ')) return h.slice(7).trim();
  const fromCookie = cookies.get('token');
  if (fromCookie) return fromCookie;
  const fromQuery = url.searchParams.get('token');
  if (fromQuery) return fromQuery;
  return null;
}

export async function GET({ request, cookies, url }) {
  try {
    const token = getTokenFrom(request, cookies, url);
    if (!token) return json({ error: 'missing token' }, { status: 401 });

    const { payload, user } = await svcVerify(token);
    return json({ ok: true, user, payload });
  } catch (err) {
    return json({ error: 'invalid token', detail: String(err?.message ?? err) }, { status: 401 });
  }
}
