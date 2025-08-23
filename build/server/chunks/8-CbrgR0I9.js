import { f as fail } from './index-BcL6zcUs.js';
import { s as setSetting } from './AppServices-DZRFS0yf.js';
import './prisma-CbVrW2fI.js';
import '@prisma/client';

const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const file = data.get("index_json");
    if (!file || typeof file.text !== "function") {
      return fail(400, { ok: false, error: "No file received" });
    }
    let text;
    try {
      text = await file.text();
    } catch {
      return fail(400, { ok: false, error: "Unable to read file" });
    }
    let json;
    try {
      json = JSON.parse(text);
    } catch {
      return fail(400, { ok: false, error: "Invalid JSON" });
    }
    if (!Array.isArray(json)) {
      return fail(400, { ok: false, error: "Expected a JSON array" });
    }
    await setSetting("index_data", json);
    return { ok: true, count: json.length };
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-6aJfvdlq.js')).default;
const server_id = "src/routes/admin/settings/+page.server.js";
const imports = ["_app/immutable/nodes/8.DFpZBc1u.js","_app/immutable/chunks/6VfYvrwu.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/B_jSr6FE.js","_app/immutable/chunks/CXMHU-kk.js","_app/immutable/chunks/BxIKGKka.js","_app/immutable/chunks/D39yorKK.js","_app/immutable/chunks/C5KAMFK-.js"];
const stylesheets = ["_app/immutable/assets/Nav.DvKJZNZc.css","_app/immutable/assets/AdminNav.kezn9mMg.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-CbrgR0I9.js.map
