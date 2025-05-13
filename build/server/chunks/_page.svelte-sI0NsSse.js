import { c as create_ssr_component, v as validate_component, o as onDestroy, d as add_attribute } from './ssr-BVZaZd41.js';
import 'pixi.js';

const PlayerCanvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvas;
  let app;
  onDestroy(() => app?.destroy(true, { children: true }));
  return `<canvas class="w-full h-full"${add_attribute("this", canvas, 0)}></canvas>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="h-screen">${validate_component(PlayerCanvas, "PlayerCanvas").$$render($$result, {}, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-sI0NsSse.js.map
