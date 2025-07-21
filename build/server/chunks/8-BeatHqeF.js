import { a as getDeckByFilename } from './deckService-D4ctYXnz.js';
import '@prisma/client';

async function load({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return { deck: null, error: "Filename parameter is required." };
  }
  const record = await getDeckByFilename(filename);
  if (!record) {
    return { deck: null, error: "Deck not found." };
  }
  return {
    deck: record.content.deck,
    background: record.content.background,
    error: null
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-whj3y_Ut.js')).default;
const server_id = "src/routes/player/+page.server.js";
const imports = ["_app/immutable/nodes/8.Ccv9Cce3.js","_app/immutable/chunks/DDeVi4Lk.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/DQCCefk3.js","_app/immutable/chunks/D1Z8yXs9.js","_app/immutable/chunks/VQ_FC-za.js","_app/immutable/chunks/BLtivtm7.js","_app/immutable/chunks/CTGweSmG.js"];
const stylesheets = ["_app/immutable/assets/8.CNjJzsLC.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-BeatHqeF.js.map
