import { e as error } from './index-BIDRY2MQ.js';
import { p as prisma } from './prisma-CbVrW2fI.js';
import '@prisma/client';

const prerender = false;
async function load({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) throw error(400, "filename is required");
  const row = await prisma.question.findUnique({
    where: { filename },
    select: {
      type: true,
      note: true,
      name: true,
      description: true,
      status: true,
      tags: true,
      tcode: true,
      chapter: true,
      exercise: true,
      editedAt: true,
      createdAt: true
    }
  });
  if (!row) throw error(404, `Note "${filename}" not found`);
  if (row.type !== "note" || !row.note) throw error(415, `Item "${filename}" is not a note`);
  return {
    meta: {
      filename,
      title: row.name ?? filename,
      description: row.description ?? "",
      status: row.status ?? null,
      tags: row.tags ?? [],
      tcode: row.tcode,
      chapter: row.chapter,
      exercise: row.exercise,
      editedAt: row.editedAt,
      createdAt: row.createdAt
    },
    html: row.note
    // trusted HTML you uploaded
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BK9jMr3p.js')).default;
const server_id = "src/routes/notes/+page.server.js";
const imports = ["_app/immutable/nodes/16.CBj_bP26.js","_app/immutable/chunks/MRdXX-TE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/OBsGlrAT.js","_app/immutable/chunks/C8m_8st_.js","_app/immutable/chunks/DnkUNHIT.js","_app/immutable/chunks/CJSbV-1-.js","_app/immutable/chunks/ReGSdYAt.js"];
const stylesheets = ["_app/immutable/assets/Nav.CFAbyXMU.css","_app/immutable/assets/Comment.RpbiVNIT.css","_app/immutable/assets/notes.B6Ax9UIW.css","_app/immutable/assets/AdminNav.kezn9mMg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=16-BWFz40Ri.js.map
