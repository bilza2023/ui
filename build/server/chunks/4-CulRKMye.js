import { g as getSetting } from './AppServices-DZRFS0yf.js';
import './prisma-CbVrW2fI.js';
import '@prisma/client';

const prerender = false;
async function load({ setHeaders }) {
  const fromIndexData = await getSetting("index_data", null);
  const blog_index = await getSetting("blog_index", null);
  const questions = fromIndexData ?? [];
  setHeaders({ "cache-control": "public, max-age=60" });
  return { questions, blog_index };
}

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load,
  prerender: prerender
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BTUPKPAL.js')).default;
const server_id = "src/routes/+page.server.js";
const imports = ["_app/immutable/nodes/4.TnhjTW0U.js","_app/immutable/chunks/C5V-7dkx.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/mOD5hCtY.js","_app/immutable/chunks/DF3-wX0J.js","_app/immutable/chunks/CqL6qkBr.js","_app/immutable/chunks/CXNmKXog.js","_app/immutable/chunks/D1FHg2ZF.js","_app/immutable/chunks/B9_b_OnU.js"];
const stylesheets = ["_app/immutable/assets/Nav.BS7ocfio.css","_app/immutable/assets/QuestionCards.Bi96CsV5.css","_app/immutable/assets/4.Bv9kjpSP.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=4-CulRKMye.js.map
