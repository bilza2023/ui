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
const imports = ["_app/immutable/nodes/3.BoDip8Bo.js","_app/immutable/chunks/DyFPC5PL.js","_app/immutable/chunks/Da83IlZz.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Dh-DK349.js"];
const stylesheets = ["_app/immutable/assets/Nav.DcPKAiC_.css","_app/immutable/assets/3.CRrRmzZs.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-DPy-MO5Q.js.map
