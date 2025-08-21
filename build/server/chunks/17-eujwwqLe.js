import { e as error } from './index-BIDRY2MQ.js';

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

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C1s03wPP.js')).default;
const universal_id = "src/routes/notes-old/[filename]/+page.js";
const imports = ["_app/immutable/nodes/17.BfZc5e6d.js","_app/immutable/chunks/OBsGlrAT.js","_app/immutable/chunks/MRdXX-TE.js","_app/immutable/chunks/C8m_8st_.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/DnkUNHIT.js","_app/immutable/chunks/ReGSdYAt.js","_app/immutable/chunks/CJSbV-1-.js"];
const stylesheets = ["_app/immutable/assets/Nav.CFAbyXMU.css","_app/immutable/assets/Comment.RpbiVNIT.css","_app/immutable/assets/17.DJ3gAM4f.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=17-eujwwqLe.js.map
