import { c as create_ssr_component, v as validate_component, e as each, d as add_attribute } from './ssr-BKqIka7n.js';
import { N as Nav } from './Nav-CVissfuD.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const fallback = "/brand/placeholder.webp";
const FlexBoxCom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let thumbnails = [
    {
      src: "/brand/web.webp",
      url: "/courses/webdevelopment"
    },
    {
      src: "/brand/it2.webp",
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
      src: "/brand/ai4professionals.webp",
      url: "/courses/ai"
    },
    {
      src: "/brand/mathclass9fbise.webp",
      url: "/courses/fbise9math"
    },
    {
      src: "/brand/english9th2.webp",
      url: "/courses/ai"
    }
  ];
  return `<div class="flex flex-wrap justify-center gap-4 p-4">${each(thumbnails, (thumb) => {
    return `<a${add_attribute("href", thumb.url, 0)}><div class="w-[200px] h-[240px] bg-[#f3e8d9] border border-[#8b5306] rounded-xl overflow-hidden hover:shadow-[12px_0px_24px_-4px_#C4A77F] transition-shadow duration-200"><img${add_attribute("src", thumb.src || fallback, 0)} alt="thumbnail" class="w-full h-full object-cover"></div> </a>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex flex-col justify-between bg-[#d5c3ab]"> ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <section class="w-full bg-[#ecdcc6]/90 px-6 py-3 shadow-sm" data-svelte-h="svelte-1lptgjk"><div class="flex items-baseline space-x-2"><h1 class="text-xl font-bold text-gray-800 tracking-tight">taleem.help</h1> <p class="text-sm text-gray-700 font-light leading-snug">Education for Every Pakistani</p></div></section>  <main class="flex-grow flex justify-center items-start py-8">${validate_component(FlexBoxCom, "FlexBoxCom").$$render($$result, {}, {}, {})}</main>  <footer class="text-center text-sm text-gray-700 py-6 border-t border-[#c8b59e] bg-[#ecdcc6]" data-svelte-h="svelte-11k54fs">© 2025 Taleem.help — Built with ❤️ in Islamabad</footer></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-P7KuEkR0.js.map
