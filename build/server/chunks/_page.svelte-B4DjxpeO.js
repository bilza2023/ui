import { c as create_ssr_component, v as validate_component } from './ssr-CO7PFcwR.js';
import { N as Nav } from './Nav-CIe9NOWg.js';
import { F as Footer } from './Footer-C66-uE5b.js';
import { L as Like, C as Comment } from './Comment-j8Qbdo2-.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let userId = null;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return ` ${$$result.head += `<!-- HEAD_svelte-1rj4c7e_START --><link rel="stylesheet" href="/data/css/notes.css"><!-- HEAD_svelte-1rj4c7e_END -->`, ""}  ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <main class="notes"><!-- HTML_TAG_START -->${data.html}<!-- HTML_TAG_END --></main> <hr>  ${validate_component(Like, "Like").$$render(
    $$result,
    {
      anchorId: "notesPage",
      userId,
      contentId: data.filename
    },
    {},
    {}
  )}  <hr> <div class="mt-5 px-40">${validate_component(Comment, "Comment").$$render($$result, { contentId: data.filename, userId }, {}, {})}</div> <br> <br> <br> <br> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B4DjxpeO.js.map
