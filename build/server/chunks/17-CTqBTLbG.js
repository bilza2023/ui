import { e as error } from './index-BcL6zcUs.js';
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

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DEoO0NM9.js')).default;
const server_id = "src/routes/notes/+page.server.js";
const imports = ["_app/immutable/nodes/17.NPK3dkHU.js","_app/immutable/chunks/6VfYvrwu.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BxIKGKka.js","_app/immutable/chunks/D39yorKK.js","_app/immutable/chunks/B_jSr6FE.js","_app/immutable/chunks/CXMHU-kk.js","_app/immutable/chunks/DFDpRNI1.js"];
const stylesheets = ["_app/immutable/assets/Nav.DvKJZNZc.css","_app/immutable/assets/Comment.RpbiVNIT.css","_app/immutable/assets/notes.B6Ax9UIW.css","_app/immutable/assets/AdminNav.kezn9mMg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=17-CTqBTLbG.js.map
