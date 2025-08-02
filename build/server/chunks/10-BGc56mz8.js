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

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D_92f669.js')).default;
const server_id = "src/routes/player/+page.server.js";
const imports = ["_app/immutable/nodes/10.DpXjlEdS.js","_app/immutable/chunks/C7a5JP4Z.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Vex8-AdU.js","_app/immutable/chunks/Dc_49xjg.js","_app/immutable/chunks/pVfpwFuY.js","_app/immutable/chunks/CxHVtY5f.js","_app/immutable/chunks/8-Y6PPrK.js","_app/immutable/chunks/DyS28_Hb.js"];
const stylesheets = ["_app/immutable/assets/SveltePlayer.CTSeT9ex.css","_app/immutable/assets/10.BzNg_0ch.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=10-BGc56mz8.js.map
