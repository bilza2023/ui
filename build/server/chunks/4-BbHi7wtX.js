import { g as getSetting } from './AppServices-DZRFS0yf.js';
import './prisma-CbVrW2fI.js';
import '@prisma/client';

const prerender = false;
async function load({ setHeaders }) {
  const fromIndexData = await getSetting("index_data", null);
  const questions = fromIndexData ?? [];
  setHeaders({ "cache-control": "public, max-age=60" });
  return { questions };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DvNZDIlx.js')).default;
const server_id = "src/routes/+page.server.js";
const imports = ["_app/immutable/nodes/4.DbTvh9J0.js","_app/immutable/chunks/6VfYvrwu.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/B_jSr6FE.js","_app/immutable/chunks/CXMHU-kk.js","_app/immutable/chunks/BxIKGKka.js","_app/immutable/chunks/D39yorKK.js","_app/immutable/chunks/81YouEea.js","_app/immutable/chunks/DGeev42o.js","_app/immutable/chunks/DhL9JzV6.js"];
const stylesheets = ["_app/immutable/assets/Nav.DvKJZNZc.css","_app/immutable/assets/QuestionCards.DyvG9z5c.css","_app/immutable/assets/Footer.U4J3fwii.css","_app/immutable/assets/4.CMg04bEF.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=4-BbHi7wtX.js.map
