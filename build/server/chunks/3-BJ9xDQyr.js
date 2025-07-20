import { g as getAllDecks } from './deckService-D4ctYXnz.js';
import '@prisma/client';

async function load() {
  const decks = await getAllDecks();
  return { decks };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BqnwEHfs.js')).default;
const server_id = "src/routes/admin/+page.server.js";
const imports = ["_app/immutable/nodes/3.DtKbuKp9.js","_app/immutable/chunks/DDeVi4Lk.js","_app/immutable/chunks/CTGweSmG.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/2ifakB5s.js"];
const stylesheets = ["_app/immutable/assets/Nav.DcPKAiC_.css","_app/immutable/assets/3.BAQtYwln.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-BJ9xDQyr.js.map
