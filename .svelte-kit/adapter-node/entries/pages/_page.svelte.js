import { c as create_ssr_component, d as add_attribute, f as escape, v as validate_component, e as each } from "../../chunks/ssr.js";
import "../../chunks/client.js";
const NavBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url = "https://taleem.help" } = $$props;
  let { icon = "🧪" } = $$props;
  let { title = "Menu" } = $$props;
  let { bg = "bg-transparent" } = $$props;
  let { hoverBg = "hover:bg-[#bfa074]" } = $$props;
  let { titleColor = "text-gray-900" } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0)
    $$bindings.bg(bg);
  if ($$props.hoverBg === void 0 && $$bindings.hoverBg && hoverBg !== void 0)
    $$bindings.hoverBg(hoverBg);
  if ($$props.titleColor === void 0 && $$bindings.titleColor && titleColor !== void 0)
    $$bindings.titleColor(titleColor);
  return `<a${add_attribute("href", url, 0)} class="w-15 group rounded-md"><button${add_attribute("class", `w-full flex flex-col items-center p-2 m-0 rounded ${bg} ${hoverBg} active:bg-gray-900 transition-colors`, 0)}><span class="text-md">${escape(icon)}</span> <span${add_attribute("class", `text-xs font-medium transition-colors group-hover:${titleColor}`, 0)}>${escape(title)}</span></button></a>`;
});
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url = "/" } = $$props;
  let { bg = "bg-transparent" } = $$props;
  let { hoverBg = "hover:bg-[#bfa074]" } = $$props;
  let { titleColor = "text-gray-900" } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0)
    $$bindings.bg(bg);
  if ($$props.hoverBg === void 0 && $$bindings.hoverBg && hoverBg !== void 0)
    $$bindings.hoverBg(hoverBg);
  if ($$props.titleColor === void 0 && $$bindings.titleColor && titleColor !== void 0)
    $$bindings.titleColor(titleColor);
  return `<div class="w-20 group rounded-md"><a${add_attribute("href", url, 0)}><button${add_attribute("class", `w-full flex flex-col items-center p-2 m-0 rounded ${bg} ${hoverBg} active:bg-gray-900 transition-colors`, 0)}><span class="text-md" data-svelte-h="svelte-d8yi6b">🏠</span> <span${add_attribute("class", `text-xs font-medium transition-colors group-hover:${titleColor}`, 0)}>Home</span></button></a></div>`;
});
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `  <div class="flex justify-between items-center p-3 px-6 m-0 bg-[#d6b88d] shadow-sm"><div class="flex">${validate_component(Logo, "Logo").$$render(
    $$result,
    {
      url: "/",
      bg: "bg-[#d6b88d]",
      hoverBg: "hover:bg-[#bfa074]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )}</div>   <div class="flex">${`${validate_component(NavBtn, "NavBtn").$$render(
    $$result,
    {
      title: "Blog",
      icon: "📘",
      url: "/blog",
      bgColor: "bg-[#d6b88d]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )}   `}</div> </div>`;
});
const fallback = "/brand/vv/placeholder.webp";
const FlexBoxCom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let thumbnails = [
    "/brand/ai4.webp",
    "/brand/it.webp",
    "/brand/math_class9.webp",
    "/brand/english.webp"
  ];
  return `<div class="flex flex-wrap justify-center gap-4 p-2">${each(Array(4), (_, i) => {
    return `<div class="w-[200px] h-[240px] bg-[#f3e8d9] border border-[#8b5306] rounded-xl overflow-hidden"><img${add_attribute("src", thumbnails[i] || fallback, 0)} alt="thumbnail" class="w-full h-full object-cover"> </div>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen h-full" style="background-color:#dbc6ab">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <section class="w-full bg-[#ecdcc6]/90 px-6 py-3 shadow-sm" data-svelte-h="svelte-1bee5xc"><div class="flex items-baseline space-x-2"><h1 class="text-xl font-bold text-gray-800 tracking-tight">taleem.help</h1> <p class="text-sm text-gray-700 font-light leading-snug">Education for Every Pakistani</p></div></section>  <div class="w-full flex justify-center">${validate_component(FlexBoxCom, "FlexBoxCom").$$render($$result, {}, {}, {})}</div></div> `;
});
export {
  Page as default
};
