// src/routes/api/comment/+server.js
import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';
import { verify } from '$lib/services/loginServices.js';

async function getUserIdFromAuth(request) {
  const auth = request.headers.get('authorization') || '';
  if (!auth.toLowerCase().startsWith('bearer ')) throw new Error('E_UNAUTHORIZED');
  const token = auth.slice(7).trim();
  const { user } = await verify(token);
  const user_id = user?.id ?? null;
  if (!user_id) throw new Error('E_UNAUTHORIZED');
  return user_id;
}

// GET: fetch all comments for a content_id
export async function GET({ url }) {
  try {
    const content_id = url.searchParams.get('content_id');
    if (!content_id) {
      return json({ ok: false, code: 'E_MISSING_FIELD:content_id', message: 'content_id required' }, { status: 400 });
    }

    const comments = await prisma.comments.findMany({
      where: { content_id },
      orderBy: { created_at: 'asc' }
    });

    return json({ ok: true, comments }, { status: 200 });
  } catch (err) {
    console.error('[/api/comment GET] error:', err);
    return json({ ok: false, code: 'E_INTERNAL', message: err?.message || 'Internal error' }, { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const { content_id, text } = await request.json().catch(() => ({}));

    if (!content_id || typeof content_id !== 'string') {
      return json({ ok: false, code: 'E_MISSING_FIELD:content_id', message: 'content_id required' }, { status: 400 });
    }
    if (!text || typeof text !== 'string') {
      return json({ ok: false, code: 'E_MISSING_FIELD:text', message: 'text required' }, { status: 400 });
    }

    const user_id = await getUserIdFromAuth(request);

    // --- 24h rolling window rate-limit: max 5 comments per user ---
    const now = Date.now();
    const WINDOW_MS = 24 * 60 * 60 * 1000;
    const windowStart = new Date(now - WINDOW_MS);

    const recentCount = await prisma.comments.count({
      where: { user_id, created_at: { gte: windowStart } }
    });

    if (recentCount >= 5) {
      const recent = await prisma.comments.findMany({
        where: { user_id, created_at: { gte: windowStart } },
        select: { created_at: true },
        orderBy: { created_at: 'desc' },
        take: 5
      });
      const oldest = recent.at(-1)?.created_at ?? null;
      const resetsAt = oldest ? new Date(oldest.getTime() + WINDOW_MS) : null;
      const retryAfterSeconds = resetsAt
        ? Math.max(1, Math.ceil((resetsAt.getTime() - now) / 1000))
        : 3600;

      return json(
        {
          ok: false,
          code: 'E_RATE_LIMIT',
          message: 'You reached the 24h comment limit (5). Please try again later.',
          limit: 5,
          used: recentCount,
          windowStart: windowStart.toISOString(),
          resetsAt: resetsAt?.toISOString() ?? null
        },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
      );
    }

    // proceed if under the limit
    const comment = await prisma.comments.create({
      data: { user_id, content_id, text }
    });

    return json({ ok: true, comment }, { status: 201 });
  } catch (err) {
    const code =
      err?.message === 'E_UNAUTHORIZED' || err?.code === 'E_UNAUTHORIZED'
        ? 'E_UNAUTHORIZED'
        : err?.code || 'E_INTERNAL';
    const status =
      code === 'E_UNAUTHORIZED' ? 401 :
      code?.startsWith?.('E_MISSING_FIELD') ? 400 :
      500;
    return json({ ok: false, code, message: err?.message ?? 'Internal error' }, { status });
  }
}
