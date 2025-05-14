import { c as create_ssr_component, d as add_attribute } from './ssr-BKqIka7n.js';

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

export { Logo as L };
//# sourceMappingURL=Logo-xs-b_3wm.js.map
