import { c as create_ssr_component, o as onDestroy, d as add_attribute, b as escape } from './ssr-BVZaZd41.js';
import 'pixi.js';
import 'howler';
import './titleSlide-DzkQuvtF.js';
import 'zod';

const css = {
  code: "body{background:#2e2e30}canvas.svelte-xap6dr{max-width:100%;height:auto;display:block}",
  map: null
};
const FOOT_H = 60;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const DESIGN_RES = { width: 1020, height: 576 };
  let canvasEl;
  onDestroy(() => {
    return;
  });
  if ($$props.DESIGN_RES === void 0 && $$bindings.DESIGN_RES && DESIGN_RES !== void 0)
    $$bindings.DESIGN_RES(DESIGN_RES);
  $$result.css.add(css);
  return `  <div class="mb-8">${`<div class="text-sm text-yellow-400 px-4 py-1 font-mono" data-svelte-h="svelte-yuaaw1">Loading audio...</div>`}</div>  <canvas style="display:block;margin:0 auto;max-width:100%;height:auto;" class="svelte-xap6dr"${add_attribute("this", canvasEl, 0)}></canvas>  <div style="${"height:" + escape(FOOT_H, true) + "px"}"></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Cbgm0gft.js.map
