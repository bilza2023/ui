import { p as prisma } from './prisma-CbVrW2fI.js';
import { i as isSubscribed } from './subscriptionServices-ByMOGxzj.js';
import { e as error, r as redirect } from './index-BcL6zcUs.js';
import '@prisma/client';
import './loginServices-Bq3E1A-x.js';
import 'bcryptjs';
import 'jsonwebtoken';

const prerender = false;
function getToken(cookies, request) {
  const cookie = cookies.get("token");
  if (cookie) return cookie;
  const auth = request.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7);
  return null;
}
async function load({ url, cookies, request }) {
  const filename = url.searchParams.get("filename");
  if (!filename) throw error(400, "filename is required");
  const row = await prisma.question.findUnique({
    where: { filename },
    select: {
      type: true,
      deck: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      timed: true,
      tcode: true,
      chapter: true,
      exercise: true,
      editedAt: true,
      createdAt: true
    }
  });
  if (!row) throw error(404, `Deck "${filename}" not found`);
  if (row.type !== "deck" || !row.deck) throw error(415, `Item "${filename}" is not a deck`);
  const slides = Array.isArray(row.deck) ? row.deck : row.deck.deck ?? [];
  if (!Array.isArray(slides) || slides.length === 0) {
    throw error(422, `Deck "${filename}" has no slides`);
  }
  const token = getToken(cookies, request);
  const authz = await isSubscribed(row.tcode ?? "", token);
  if (!authz.allowed) {
    const q = new URLSearchParams({
      tcode: row.tcode ?? "",
      filename,
      reason: authz.reason ?? "denied"
    }).toString();
    throw redirect(302, `/sales?${q}`);
  }
  return {
    meta: {
      filename,
      name: row.name ?? filename,
      description: row.description ?? "",
      status: row.status ?? null,
      tags: row.tags ?? [],
      timed: !!row.timed,
      tcode: row.tcode,
      chapter: row.chapter,
      exercise: row.exercise,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    deckRaw: row.deck,
    authz
    // { allowed, reason, userId, tcode, expiresAt, remainingDays }
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CXAhnj46.js')).default;
const server_id = "src/routes/player/+page.server.js";
const imports = ["_app/immutable/nodes/19.BXPZ7lJf.js","_app/immutable/chunks/6VfYvrwu.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Bzh7EdXh.js","_app/immutable/chunks/BxIKGKka.js","_app/immutable/chunks/D39yorKK.js","_app/immutable/chunks/DFDpRNI1.js","_app/immutable/chunks/CXMHU-kk.js","_app/immutable/chunks/S6W6QF8m.js"];
const stylesheets = ["_app/immutable/assets/Comment.RpbiVNIT.css","_app/immutable/assets/player-utility.CXSAzuce.css","_app/immutable/assets/19.DJCTMJHy.css","_app/immutable/assets/tables.B1wubMX-.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=19-Dyjodimb.js.map
