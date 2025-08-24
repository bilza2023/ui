import { p as prisma } from './prisma-CbVrW2fI.js';
import '@prisma/client';

const prerender = false;
async function load({ url }) {
  const q = (url.searchParams.get("q") || "").trim();
  const type = url.searchParams.get("type");
  const tcode = url.searchParams.get("tcode") || null;
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "200", 10), 500);
  const offset = Math.max(parseInt(url.searchParams.get("offset") || "0", 10), 0);
  const sort = url.searchParams.get("sort") || "edited_desc";
  const where = {};
  if (type === "deck" || type === "note") where.type = type;
  if (tcode) where.tcode = tcode;
  if (q) {
    where.OR = [
      { filename: { contains: q, mode: "insensitive" } },
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { exercise: { contains: q, mode: "insensitive" } }
    ];
  }
  let orderBy;
  if (sort === "created_desc") orderBy = [{ createdAt: "desc" }];
  else if (sort === "name_asc") orderBy = [{ name: "asc" }, { filename: "asc" }];
  else orderBy = [{ editedAt: "desc" }];
  const items = await prisma.question.findMany({
    where,
    orderBy,
    skip: offset,
    take: limit,
    select: {
      filename: true,
      type: true,
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
  const [totalAll, totalDecks, totalNotes] = await Promise.all([
    prisma.question.count(),
    prisma.question.count({ where: { type: "deck" } }),
    prisma.question.count({ where: { type: "note" } })
  ]);
  const tcodeRows = await prisma.question.groupBy({
    by: ["tcode", "type"],
    _count: { _all: true }
  }).catch(() => []);
  const tcodeStats = {};
  for (const r of tcodeRows) {
    if (!r.tcode) continue;
    tcodeStats[r.tcode] ??= { total: 0, deck: 0, note: 0 };
    tcodeStats[r.tcode].total += r._count._all;
    if (r.type === "deck") tcodeStats[r.tcode].deck += r._count._all;
    if (r.type === "note") tcodeStats[r.tcode].note += r._count._all;
  }
  return {
    items,
    filters: { q, type: type === "deck" || type === "note" ? type : null, tcode, limit, offset, sort },
    totals: { all: totalAll, decks: totalDecks, notes: totalNotes },
    tcodeStats
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DkIwywYo.js')).default;
const server_id = "src/routes/admin/+page.server.js";
const imports = ["_app/immutable/nodes/5.BL19nHf-.js","_app/immutable/chunks/C5V-7dkx.js","_app/immutable/chunks/DF3-wX0J.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/CqL6qkBr.js","_app/immutable/chunks/CXNmKXog.js","_app/immutable/chunks/mOD5hCtY.js","_app/immutable/chunks/NgHeIh7M.js"];
const stylesheets = ["_app/immutable/assets/Nav.BS7ocfio.css","_app/immutable/assets/AdminNav.kezn9mMg.css","_app/immutable/assets/5.Dp9Y15_m.css","_app/immutable/assets/tables.B1wubMX-.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=5-X2ozf9Gs.js.map
