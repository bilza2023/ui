// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import prisma from '../../../lib/server/prisma.js';
import { isAdmin } from '../../../lib/services/loginServices.js';
import { addSubscription } from '../../../lib/services/subscriptionServices.js';
import { listTcodes } from '../../../lib/services/synopsisServeces.js'; // must return string[]

const DAY_MS = 86_400_000;

function getToken(event) {
  const cookie = event.cookies.get('token');
  if (cookie) return cookie;
  const auth = event.request.headers.get('authorization');
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

function toIso(d) {
  try { return new Date(d).toISOString(); } catch { return null; }
}

function computeRow(sub) {
  const start = new Date(sub.start_date);
  const expiryMs = start.getTime() + sub.duration * DAY_MS;
  const expiry = new Date(expiryMs);
  const now = new Date();

  const upcoming = now < start;
  const expired  = now >= expiry;
  const active   = !upcoming && !expired;

  const remainingDays = active ? Math.ceil((expiryMs - now.getTime()) / DAY_MS) : 0;

  return {
    id: sub.id,
    tcode: sub.tcode,
    start_date: toIso(start),
    duration: sub.duration,
    expiresAt: toIso(expiry),
    status: upcoming ? 'upcoming' : expired ? 'expired' : 'active',
    remainingDays
  };
}

async function requireAdmin(event) {
  const token = getToken(event);
  if (!token) throw redirect(302, '/login');
  const ok = await isAdmin(token);
  if (!ok) throw error(403, 'Forbidden');
  return token;
}

async function findUserByEmail(email) {
  const e = (email ?? '').toString().trim().toLowerCase();
  if (!e) return null;
  return prisma.user.findUnique({
    where: { email: e },
    select: { id: true, email: true, created_at: true }
  });
}

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
  await requireAdmin(event);

  // Inputs (querystring)
  const email = event.url.searchParams.get('email') ?? '';

  // Data sources
  const tcodes = await listTcodes(); // string[]

  // Optional user lookup
  let selectedUser = null;
  let subscriptions = [];

  if (email) {
    const u = await findUserByEmail(email);
    if (u) {
      selectedUser = u;
      const rows = await prisma.subscription.findMany({
        where: { user_id: u.id },
        orderBy: [{ tcode: 'asc' }, { start_date: 'desc' }],
        select: { id: true, tcode: true, start_date: true, duration: true }
      });
      subscriptions = rows.map(computeRow);
    }
  }

  return {
    tcodes,
    selectedEmail: email,
    selectedUser,
    subscriptions
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  // Grant a subscription to a user (by email) for a tcode
  grant: async (event) => {
    await requireAdmin(event);

    const data = await event.request.formData();
    const email    = (data.get('email')    ?? '').toString().trim().toLowerCase();
    const tcode    = (data.get('tcode')    ?? '').toString().trim();
    const duration = Number((data.get('duration') ?? '').toString().trim());
    const startRaw = (data.get('startDate') ?? '').toString().trim();

    if (!email)  return { ok: false, message: 'Email is required' };
    if (!tcode)  return { ok: false, message: 'Tcode is required' };
    if (!Number.isFinite(duration) || duration < 1) {
      return { ok: false, message: 'Duration must be an integer ≥ 1' };
    }

    const user = await findUserByEmail(email);
    if (!user) return { ok: false, message: 'User not found' };

    const startDate = startRaw ? new Date(startRaw) : new Date();
    if (isNaN(startDate.getTime())) {
      return { ok: false, message: 'Invalid start date' };
    }

    try {
      const created = await addSubscription(user.id, tcode, duration, { startDate });
      return {
        ok: true,
        message: `Granted ${tcode} to ${email} for ${duration} day(s).`,
        created
      };
    } catch (e) {
      return { ok: false, message: e?.message ?? 'Failed to add subscription' };
    }
  }
};
