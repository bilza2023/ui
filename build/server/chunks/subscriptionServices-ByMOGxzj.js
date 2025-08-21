import { p as prisma } from './prisma-CbVrW2fI.js';
import { v as verify, i as isAdmin } from './loginServices-Bq3E1A-x.js';

const DAY_MS = 864e5;
const FREE_TCODES = ["blog"];
function normTcode(t) {
  return (t ?? "").toString().trim();
}
async function isSubscribed(tcode, token) {
  const code = (tcode ?? "").toString().trim();
  if (FREE_TCODES.includes(code)) {
    return { allowed: true, reason: "free", userId: null, tcode: code, expiresAt: null, remainingDays: null };
  }
  if (!token) {
    return { allowed: false, reason: "no-token", userId: null, tcode: code, expiresAt: null, remainingDays: null };
  }
  if (!code) {
    return { allowed: false, reason: "no-subscription", userId: null, tcode: code, expiresAt: null, remainingDays: null };
  }
  try {
    const { user } = await verify(token);
    if (await isAdmin(token)) {
      return { allowed: true, reason: "ok", userId: user.id, tcode: code, expiresAt: null, remainingDays: null };
    }
    const now = Date.now();
    const sub = await prisma.subscription.findFirst({
      where: { user_id: user.id, tcode: code },
      orderBy: { start_date: "desc" },
      select: { start_date: true, duration: true }
    });
    if (!sub) {
      return { allowed: false, reason: "no-subscription", userId: user.id, tcode: code, expiresAt: null, remainingDays: null };
    }
    const startMs = sub.start_date.getTime();
    const expiryMs = startMs + sub.duration * DAY_MS;
    if (now < startMs) {
      return { allowed: false, reason: "no-subscription", userId: user.id, tcode: code, expiresAt: new Date(expiryMs).toISOString(), remainingDays: Math.ceil((expiryMs - now) / DAY_MS) };
    }
    if (now >= expiryMs) {
      return { allowed: false, reason: "expired", userId: user.id, tcode: code, expiresAt: new Date(expiryMs).toISOString(), remainingDays: 0 };
    }
    const remainingDays = Math.ceil((expiryMs - now) / DAY_MS);
    return { allowed: true, reason: "ok", userId: user.id, tcode: code, expiresAt: new Date(expiryMs).toISOString(), remainingDays };
  } catch {
    return { allowed: false, reason: "invalid-token", userId: null, tcode: code, expiresAt: null, remainingDays: null };
  }
}
async function addSubscription(userId, tcode, durationDays, opts = {}) {
  const uid = (userId ?? "").toString().trim();
  const code = normTcode(tcode);
  const duration = Number.isFinite(durationDays) ? Math.trunc(durationDays) : NaN;
  const startDate = opts.startDate instanceof Date ? opts.startDate : /* @__PURE__ */ new Date();
  if (!uid) throw new Error("userId is required");
  if (!code) throw new Error("tcode is required");
  if (!Number.isFinite(duration) || duration < 1) throw new Error("duration must be an integer >= 1");
  const user = await prisma.user.findUnique({ where: { id: uid }, select: { id: true } });
  if (!user) throw new Error("user not found");
  const created = await prisma.subscription.create({
    data: {
      user_id: uid,
      tcode: code,
      start_date: startDate,
      duration
    },
    select: {
      id: true,
      user_id: true,
      tcode: true,
      start_date: true,
      duration: true
    }
  });
  const expiryMs = created.start_date.getTime() + created.duration * DAY_MS;
  const expiresAt = new Date(expiryMs).toISOString();
  return {
    id: created.id,
    userId: created.user_id,
    tcode: created.tcode,
    start_date: created.start_date,
    duration: created.duration,
    expiresAt
  };
}

export { addSubscription as a, isSubscribed as i };
//# sourceMappingURL=subscriptionServices-ByMOGxzj.js.map
