import { c as create_ssr_component, o as onDestroy, d as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import "pixi.js";
const PlayerCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  let app;
  onDestroy(() => app?.destroy(true, { children: true }));
  return `<canvas class="w-full h-full"${add_attribute("this", canvas, 0)}></canvas>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="h-screen">${validate_component(PlayerCanvas, "PlayerCanvas").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
