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
const imports = ["_app/immutable/nodes/8.W-WH_jY-.js","_app/immutable/chunks/DDeVi4Lk.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Czpy7-X8.js","_app/immutable/chunks/Wj6S-I06.js","_app/immutable/chunks/AdLms93S.js","_app/immutable/chunks/BLtivtm7.js","_app/immutable/chunks/CTGweSmG.js"];
const stylesheets = ["_app/immutable/assets/8.CNjJzsLC.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-BB6j0-A_.js.map
