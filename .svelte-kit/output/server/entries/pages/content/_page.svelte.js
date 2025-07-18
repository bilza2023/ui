import { c as create_ssr_component, a as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import "howler";
import "katex";
const css = {
  code: ".flex.svelte-9znuby{display:flex}.items-center.svelte-9znuby{align-items:center}.justify-center.svelte-9znuby{justify-content:center}.h-full.svelte-9znuby{height:100%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${``}`;
});
export {
  Page as default
};
