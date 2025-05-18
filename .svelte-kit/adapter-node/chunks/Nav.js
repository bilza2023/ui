import { c as create_ssr_component, d as add_attribute, f as escape, v as validate_component } from "./ssr.js";
import "./client.js";
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
  return `  <div class="flex justify-between items-center p-3 px-6 m-0 bg-[#c4a77f] shadow-sm"><div class="flex">${validate_component(Logo, "Logo").$$render(
    $$result,
    {
      url: "/",
      bg: "bg-[#c4a77f]",
      hoverBg: "hover:bg-[#bc9661]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )}</div>   <div class="flex">${validate_component(NavBtn, "NavBtn").$$render(
    $$result,
    {
      title: "AI",
      icon: "🧠 ",
      url: "/courses/ai",
      bgColor: "bg-[#d6b88d]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )} ${validate_component(NavBtn, "NavBtn").$$render(
    $$result,
    {
      title: "IT",
      icon: "🧰",
      url: "/courses/it",
      bgColor: "bg-[#d6b88d]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )} ${validate_component(NavBtn, "NavBtn").$$render(
    $$result,
    {
      title: "FBISE",
      icon: "🇵🇰",
      url: "/courses/fbise",
      bgColor: "bg-[#d6b88d]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )}  ${validate_component(NavBtn, "NavBtn").$$render(
    $$result,
    {
      title: "Contact",
      icon: "📱",
      url: "/contact",
      bgColor: "bg-[#d6b88d]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )} ${validate_component(NavBtn, "NavBtn").$$render(
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
  )}   </div> </div>`;
});
export {
  Nav as N
};
