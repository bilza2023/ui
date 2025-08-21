import { r as redirect, e as error } from './index-BIDRY2MQ.js';
import { p as prisma } from './prisma-CbVrW2fI.js';
import { i as isAdmin } from './loginServices-Bq3E1A-x.js';
import { a as addSubscription } from './subscriptionServices-ByMOGxzj.js';
import { l as listTcodes } from './synopsisServices-C-26dl2-.js';
import '@prisma/client';
import 'bcryptjs';
import 'jsonwebtoken';
import './index2-CbmtHu8g.js';

const DAY_MS = 864e5;
function getToken(event) {
  const cookie = event.cookies.get("token");
  if (cookie) return cookie;
  const auth = event.request.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);
  return null;
}
function toIso(d) {
  try {
    return new Date(d).toISOString();
  } catch {
    return null;
  }
}
function computeRow(sub) {
  const start = new Date(sub.start_date);
  const expiryMs = start.getTime() + sub.duration * DAY_MS;
  const expiry = new Date(expiryMs);
  const now = /* @__PURE__ */ new Date();
  const upcoming = now < start;
  const expired = now >= expiry;
  const active = !upcoming && !expired;
  const remainingDays = active ? Math.ceil((expiryMs - now.getTime()) / DAY_MS) : 0;
  return {
    id: sub.id,
    tcode: sub.tcode,
    start_date: toIso(start),
    duration: sub.duration,
    expiresAt: toIso(expiry),
    status: upcoming ? "upcoming" : expired ? "expired" : "active",
    remainingDays
  };
}
async function requireAdmin(event) {
  const token = getToken(event);
  if (!token) throw redirect(302, "/login");
  const ok = await isAdmin(token);
  if (!ok) throw error(403, "Forbidden");
  return token;
}
async function findUserByEmail(email) {
  const e = (email ?? "").toString().trim().toLowerCase();
  if (!e) return null;
  return prisma.user.findUnique({
    where: { email: e },
    select: { id: true, email: true, created_at: true }
  });
}
async function load(event) {
  await requireAdmin(event);
  const email = event.url.searchParams.get("email") ?? "";
  const tcodes = await listTcodes();
  let selectedUser = null;
  let subscriptions = [];
  if (email) {
    const u = await findUserByEmail(email);
    if (u) {
      selectedUser = u;
      const rows = await prisma.subscription.findMany({
        where: { user_id: u.id },
        orderBy: [{ tcode: "asc" }, { start_date: "desc" }],
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
const actions = {
  // Grant a subscription to a user (by email) for a tcode
  grant: async (event) => {
    await requireAdmin(event);
    const data = await event.request.formData();
    const email = (data.get("email") ?? "").toString().trim().toLowerCase();
    const tcode = (data.get("tcode") ?? "").toString().trim();
    const duration = Number((data.get("duration") ?? "").toString().trim());
    const startRaw = (data.get("startDate") ?? "").toString().trim();
    if (!email) return { ok: false, message: "Email is required" };
    if (!tcode) return { ok: false, message: "Tcode is required" };
    if (!Number.isFinite(duration) || duration < 1) {
      return { ok: false, message: "Duration must be an integer ≥ 1" };
    }
    const user = await findUserByEmail(email);
    if (!user) return { ok: false, message: "User not found" };
    const startDate = startRaw ? new Date(startRaw) : /* @__PURE__ */ new Date();
    if (isNaN(startDate.getTime())) {
      return { ok: false, message: "Invalid start date" };
    }
    try {
      const created = await addSubscription(user.id, tcode, duration, { startDate });
      return {
        ok: true,
        message: `Granted ${tcode} to ${email} for ${duration} day(s).`,
        created
      };
    } catch (e) {
      return { ok: false, message: e?.message ?? "Failed to add subscription" };
    }
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D4yJsYdm.js')).default;
const server_id = "src/routes/admin/subscriptions/+page.server.js";
const imports = ["_app/immutable/nodes/8.B7YQ1qls.js","_app/immutable/chunks/MRdXX-TE.js","_app/immutable/chunks/ReGSdYAt.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/OBsGlrAT.js","_app/immutable/chunks/C8m_8st_.js"];
const stylesheets = ["_app/immutable/assets/8.5GKuKWhi.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-CRpT67-9.js.map
