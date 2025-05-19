import { c as create_ssr_component, o as onDestroy } from './ssr-BVZaZd41.js';
import 'pixi.js';
import 'howler';
import './titleSlide-DzkQuvtF.js';
import './client-CjdeEz1m.js';
import 'zod';
import './exports-DuWZopOC.js';

const css = {
  code: "#pixi-container.svelte-1ta8o1r{display:flex;align-items:center;justify-content:center;width:100vw;height:calc(100vh - 60px);background-color:green;overflow:hidden}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  onDestroy(() => {
    return;
  });
  $$result.css.add(css);
  return `<div class="bg-blue-400 min-h-screen flex flex-col"> <div class="">${`<div class="text-sm text-yellow-400 px-4 py-1 font-mono" data-svelte-h="svelte-5acemh">Loading audio...</div>`}</div> <div id="pixi-container" class="flex-1 svelte-1ta8o1r"></div> <div class="bg-gray-900 text-white h-10 flex items-center justify-center" data-svelte-h="svelte-1badp65">Footer</div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BL4_MLXp.js.map
