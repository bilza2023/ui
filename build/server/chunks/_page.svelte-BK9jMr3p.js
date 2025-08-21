import { c as create_ssr_component, v as validate_component, e as escape } from './ssr-CO7PFcwR.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';
import { N as Nav } from './Nav--rKTEABU.js';
import { L as Like, C as Comment } from './Comment-j8Qbdo2-.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let html;
  let filename;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  title = data?.meta?.title ?? "Notes";
  data?.meta?.description ?? "";
  html = data?.html ?? "";
  filename = data?.meta?.filename;
  return `${$$result.head += `<!-- HEAD_svelte-53v0d5_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<!-- HEAD_svelte-53v0d5_END -->`, ""} ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${!html ? `<div class="empty" data-svelte-h="svelte-2yjoy1">This note is empty.</div>` : `<main class="notes"><article class="note-html"><!-- HTML_TAG_START -->${html}<!-- HTML_TAG_END --></article></main>`} <div class="bg-[#594112]">${validate_component(Like, "Like").$$render($$result, { contentId: filename }, {}, {})} <hr> ${validate_component(Comment, "Comment").$$render($$result, { contentId: filename }, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BK9jMr3p.js.map
