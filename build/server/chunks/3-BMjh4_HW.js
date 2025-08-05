import { g as getAllQuestions } from './questionServices-DaKNuo2j.js';
import '@prisma/client';

async function load() {
  const decks = await getAllQuestions();
  return { decks };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-6-tyqvDx.js')).default;
const server_id = "src/routes/admin/+page.server.js";
const imports = ["_app/immutable/nodes/3.D4RjSiyS.js","_app/immutable/chunks/CpLwJuMr.js","_app/immutable/chunks/Bwyb_Tvk.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/WFewFlOZ.js"];
const stylesheets = ["_app/immutable/assets/Nav.DcPKAiC_.css","_app/immutable/assets/3.CRrRmzZs.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-BMjh4_HW.js.map
