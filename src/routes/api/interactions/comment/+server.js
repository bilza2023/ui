// src/routes/api/interactions/comment/+server.js
import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';
import { verify as verifyToken } from '$lib/services/loginServices.js';

const MAX_BYTES = 2048;
function getBearer(request, cookies, url) {
  const h = request.headers.get('authorization') || request.headers.get('Authorization');
  if (h?.startsWith('Bearer ')) return h.slice(7).trim();
  return cookies.get('token') || url.searchParams.get('token') || null;
}

export async function POST({ request, cookies, url }) {
  try {
    const { anchorId, text, actorId, tags = [] } = await request.json();
    if (!anchorId || !actorId) return json({ error: 'anchorId and actorId are required' }, { status: 400 });

    const body = (text ?? '').toString().trim();
    if (!body) return json({ error: 'text is required' }, { status: 400 });
    if (Buffer.byteLength(JSON.stringify({ text: body }), 'utf8') > MAX_BYTES) {
      return json({ error: 'comment too large' }, { status: 413 });
    }

    let userId = null;
    const token = getBearer(request, cookies, url);
    if (token) {
      try { const { user } = await verifyToken(token); userId = user?.id ?? null; } catch {}
    }

    const row = await prisma.userInteraction.create({
      data: {
        anchor_id: anchorId,
        actor_id: actorId,
        user_id: userId,                // ✅ real user attached if logged in
        category: 'comment',
        tags,
        payload_json: { text: body }
      },
      select: { id: true, created_at: true }
    });

    return json({ ok: true, ...row });
  } catch (err) {
    return json({ error: 'Server error', detail: String(err?.message ?? err) }, { status: 500 });
  }
}
