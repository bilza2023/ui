
// GET /studio  (JSON when Accept: application/json)
import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';
import { verify as verifyToken } from '$lib/services/loginServices.js';

function getBearer(request, cookies, url) {
  const h = request.headers.get('authorization') || request.headers.get('Authorization');
  if (h?.startsWith('Bearer ')) return h.slice(7).trim();
  return cookies.get('token') || url.searchParams.get('token') || null;
}

export async function GET({ request, cookies, url }) {
  try {
    const token = getBearer(request, cookies, url);
    if (!token) return json({ ok: true, user: null, messages: [] });

    const { user } = await verifyToken(token); // throws if invalid
    if (!user) return json({ ok: true, user: null, messages: [] });

    const messages = await prisma.studentMessage.findMany({
      where: { user_id: user.id, read: false },
      orderBy: { created_at: 'desc' },
      select: { id: true, category: true, message: true, created_at: true, read: true }
    });

    return json({ ok: true, user: { id: user.id, email: user.email }, messages });
  } catch {
    // don’t leak details; treat as not logged in
    return json({ ok: true, user: null, messages: [] });
  }
}
