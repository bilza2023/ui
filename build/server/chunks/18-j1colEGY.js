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
const imports = ["_app/immutable/nodes/18.D-IDU9iE.js","_app/immutable/chunks/29W-Tj8B.js","_app/immutable/chunks/Z9DZtfMg.js","_app/immutable/chunks/BXF6U4GO.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/BItVA5Ku.js","_app/immutable/chunks/DtyEnmTo.js","_app/immutable/chunks/CmLg6sKh.js","_app/immutable/chunks/BSQYcAN4.js"];
const stylesheets = ["_app/immutable/assets/Nav.DvKJZNZc.css","_app/immutable/assets/Footer.U4J3fwii.css","_app/immutable/assets/Comment.RpbiVNIT.css"];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page as universal, universal_id };
//# sourceMappingURL=18-j1colEGY.js.map
