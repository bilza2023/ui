import { c as create_ssr_component, v as validate_component } from './ssr-BKqIka7n.js';
import './CoreItemsMap-Clsy97CY.js';
import './katex-DO6cVBGF.js';
import 'howler';
import './SvelteToast.svelte_svelte_type_style_lang-B7k2UuT-.js';
import { P as ProjectToolbar } from './ProjectToolbar-5JEBRuLl.js';
import './index-ClERLwKE.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(ProjectToolbar, "ProjectToolbar").$$render($$result, {}, {}, {})} ${``}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DQtTdlGZ.js.map
