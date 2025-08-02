import { c as create_ssr_component, a as subscribe, d as escape } from './ssr-DD2Fi2eU.js';
import { p as page } from './stores-Cwm5axpg.js';
import { marked } from 'marked';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filename;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let html = "";
  let error = "";
  async function load() {
    try {
      const res = await fetch(`/md/${filename}.md`);
      if (!res.ok) throw new Error(`"${filename}.md" not found`);
      html = marked.parse(await res.text());
      error = "";
    } catch (e) {
      error = e.message;
      html = "";
    }
  }
  filename = $page.url.searchParams.get("filename") || "test";
  {
    if (filename) load();
  }
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-60n12f_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css"><!-- HEAD_svelte-60n12f_END -->`, ""} ${error ? `<p>${escape(error)}</p>` : `<article><!-- HTML_TAG_START -->${html}<!-- HTML_TAG_END --></article>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CV6L1xPp.js.map
