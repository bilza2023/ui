import { c as create_ssr_component, v as validate_component, e as each, d as add_attribute } from './ssr-BKqIka7n.js';
import { N as Nav } from './Nav-CucaHKu4.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const fallback = "/brand/placeholder.webp";
const FlexBoxCom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let thumbnails = [
    {
      src: "/brand/math4.webp",
      url: "/courses/ai"
    },
    {
      src: "/brand/english9th2.webp",
      url: "/courses/ai"
    },
    {
      src: "/brand/ai101.webp",
      url: "/courses/ai"
    },
    {
      src: "/brand/ai4.webp",
      url: "/courses/ai"
    },
    {
      src: "/brand/web.webp",
      url: "/courses/ai"
    },
    {
      src: "/brand/it2.webp",
      url: "/courses/ai"
    }
  ];
  return `<div class="flex flex-wrap justify-center gap-4 p-4">${each(thumbnails, (thumb) => {
    return `<a${add_attribute("href", thumb.url, 0)}><div class="w-[200px] h-[240px] bg-[#f3e8d9] border border-[#8b5306] rounded-xl overflow-hidden hover:shadow-[12px_0px_24px_-4px_#C4A77F] transition-shadow duration-200"><img${add_attribute("src", thumb.src || fallback, 0)} alt="thumbnail" class="w-full h-full object-cover"></div> </a>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen h-full bg-[#d5c3ab]"> ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <section class="w-full bg-[#ecdcc6]/90 px-6 py-3 shadow-sm" data-svelte-h="svelte-1bee5xc"><div class="flex items-baseline space-x-2"><h1 class="text-xl font-bold text-gray-800 tracking-tight">taleem.help</h1> <p class="text-sm text-gray-700 font-light leading-snug">Education for Every Pakistani</p></div></section>  <div class="w-full flex justify-center">${validate_component(FlexBoxCom, "FlexBoxCom").$$render($$result, {}, {}, {})}</div></div> `;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BasiM0B1.js.map
