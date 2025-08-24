import { f as fail } from './index-BcL6zcUs.js';
import { s as setSetting } from './AppServices-DZRFS0yf.js';
import './prisma-CbVrW2fI.js';
import '@prisma/client';

const ALLOWED_KEYS = /* @__PURE__ */ new Set(["index_data", "blog_index"]);
const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const targetKeyRaw = data.get("target_key") ?? "index_data";
    const target_key = String(targetKeyRaw);
    if (!ALLOWED_KEYS.has(target_key)) {
      return fail(400, { ok: false, error: `Key "${target_key}" is not allowed.` });
    }
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
      return fail(400, {
        ok: false,
        error: "Expected a JSON array (your file is not an array)."
      });
    }
    await setSetting(target_key, json);
    return { ok: true, key: target_key, count: json.length };
  }
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Dw04thaw.js')).default;
const server_id = "src/routes/admin/settings/+page.server.js";
const imports = ["_app/immutable/nodes/8.BkumPbtj.js","_app/immutable/chunks/Z9DZtfMg.js","_app/immutable/chunks/DtyEnmTo.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BItVA5Ku.js","_app/immutable/chunks/29W-Tj8B.js","_app/immutable/chunks/BXF6U4GO.js","_app/immutable/chunks/-hQ6QV1S.js"];
const stylesheets = ["_app/immutable/assets/Nav.DvKJZNZc.css","_app/immutable/assets/AdminNav.kezn9mMg.css","_app/immutable/assets/8.D7iOD9XS.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-DcqOGDt6.js.map
