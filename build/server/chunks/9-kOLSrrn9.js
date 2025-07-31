import { a as getQuestionByFilename } from './questionServices-DaKNuo2j.js';
import '@prisma/client';

async function load({ url }) {
  const filename = url.searchParams.get("filename");
  if (!filename) {
    return {
      deck: null,
      background: null,
      timed: false,
      error: "Filename parameter is required."
    };
  }
  const record = await getQuestionByFilename(filename);
  if (!record) {
    return {
      deck: null,
      background: null,
      timed: false,
      error: "Deck not found."
    };
  }
  const meta = record.deck;
  return {
    deck: meta.deck,
    // slides array
    background: meta.background,
    // { backgroundColor, backgroundImage, … }
    timed: record.timed,
    // boolean flag from Question row
    error: null
  };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D_BM_MEB.js')).default;
const server_id = "src/routes/player/+page.server.js";
const imports = ["_app/immutable/nodes/9.CoCWh0f-.js","_app/immutable/chunks/DyFPC5PL.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Cp5rmMj5.js","_app/immutable/chunks/K5mjMA8r.js","_app/immutable/chunks/opwKl07l.js","_app/immutable/chunks/C-qTzmt-.js","_app/immutable/chunks/Zx2PVfEw.js","_app/immutable/chunks/Da83IlZz.js"];
const stylesheets = ["_app/immutable/assets/SveltePlayer.CTSeT9ex.css","_app/immutable/assets/9.BzNg_0ch.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=9-kOLSrrn9.js.map
