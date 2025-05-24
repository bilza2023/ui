import { c as create_ssr_component, d as add_attribute } from "../../../chunks/ssr.js";
import "pixi.js";
import "howler";
const css = {
  code: ".stage.svelte-109ibgs{display:flex;justify-content:center;align-items:start;height:100vh;background-color:#111}body{margin:0}.stage.svelte-109ibgs{margin-top:0;padding-top:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let container;
  $$result.css.add(css);
  return `${``} <div class="stage svelte-109ibgs"${add_attribute("this", container, 0)}></div>`;
});
export {
  Page as default
};
