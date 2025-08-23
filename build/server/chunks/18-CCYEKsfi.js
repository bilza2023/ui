import { e as error } from './index-BcL6zcUs.js';

const files = /* @__PURE__ */ Object.assign({});
const bySlug = Object.fromEntries(
  Object.entries(files).map(([path, html]) => {
    const slug = path.split("/").pop().replace(".html", "");
    return [slug, html];
  })
);
function load({ params }) {
  const html = bySlug[params.filename];
  if (!html) throw error(404, `Note not found: ${params.filename}`);
  return { html, filename: params.filename };
}

var _page = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B4DjxpeO.js')).default;
const universal_id = "src/routes/notes-old/[filename]/+page.js";
const imports = ["_app/immutable/nodes/18.BREY-H_k.js","_app/immutable/chunks/BxIKGKka.js","_app/immutable/chunks/6VfYvrwu.js","_app/immutable/chunks/D39yorKK.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/B_jSr6FE.js","_app/immutable/chunks/CXMHU-kk.js","_app/immutable/chunks/DGeev42o.js","_app/immutable/chunks/DFDpRNI1.js"];
const stylesheets = ["_app/immutable/assets/Nav.DvKJZNZc.css","_app/immutable/assets/Footer.U4J3fwii.css","_app/immutable/assets/Comment.RpbiVNIT.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=18-CCYEKsfi.js.map
