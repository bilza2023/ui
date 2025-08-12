// src/routes/api/interactions/reaction/+server.js
import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';
import { verify as verifyToken } from '$lib/services/loginServices.js';

const ALLOWED = new Set(['like', 'confused']);

function getBearer(request, cookies, url) {
  const h = request.headers.get('authorization') || request.headers.get('Authorization');
  if (h?.startsWith('Bearer ')) return h.slice(7).trim();
  return cookies.get('token') || url.searchParams.get('token') || null;
}

export async function POST({ request, cookies, url }) {
  try {
    const { anchorId, reactionType, actorId, tags = [] } = await request.json();
    if (!anchorId || !actorId) return json({ error: 'anchorId and actorId are required' }, { status: 400 });
    if (!ALLOWED.has(reactionType)) return json({ error: `reactionType must be one of: ${[...ALLOWED].join(', ')}` }, { status: 400 });

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
        category: 'reaction',
        tags,
        payload_json: { reactionType }
      },
      select: { id: true, created_at: true }
    });

    return json({ ok: true, ...row });
  } catch (err) {
    return json({ error: 'Server error', detail: String(err?.message ?? err) }, { status: 500 });
  }
}
