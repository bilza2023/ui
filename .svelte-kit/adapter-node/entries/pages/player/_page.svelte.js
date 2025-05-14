import { c as create_ssr_component, f as escape, v as validate_component, b as subscribe, o as onDestroy, d as add_attribute } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
import "pixi.js";
import { L as Logo } from "../../../chunks/Logo.js";
const SlideNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { player } = $$props;
  let { slide = "—" } = $$props;
  let { time = "0:00" } = $$props;
  if ($$props.player === void 0 && $$bindings.player && player !== void 0)
    $$bindings.player(player);
  if ($$props.slide === void 0 && $$bindings.slide && slide !== void 0)
    $$bindings.slide(slide);
  if ($$props.time === void 0 && $$bindings.time && time !== void 0)
    $$bindings.time(time);
  return `<div class="flex justify-between items-center p-3 px-6 m-0 bg-[#c4a77f] shadow-sm"> <div class="flex items-center space-x-2"><button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" data-svelte-h="svelte-1p7cjmk">▶</button> <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" data-svelte-h="svelte-z1igvk">⏸</button> <button class="px-3 py-1 rounded bg-[#d6b88d] hover:bg-[#cfae83] text-gray-900 shadow" data-svelte-h="svelte-1aon4m7">⟲</button> <div class="ml-4 flex items-baseline space-x-2 text-sm font-mono text-gray-900"><span>${escape(time)}</span> <span class="opacity-70" data-svelte-h="svelte-spidqk">|</span> <span class="italic">${escape(slide)}</span></div></div>  ${validate_component(Logo, "Logo").$$render(
    $$result,
    {
      url: "/",
      bg: "bg-[#c4a77f]",
      hoverBg: "hover:bg-[#bc9661]",
      titleColor: "text-gray-900"
    },
    {},
    {}
  )}</div>`;
});
const css = {
  code: "body{background:#1e1e1e}",
  map: null
};
const FOOT_H = 60;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentSlide, $$unsubscribe_currentSlide;
  let $currentTime, $$unsubscribe_currentTime;
  let canvasEl;
  let player;
  const currentSlide = writable("—");
  $$unsubscribe_currentSlide = subscribe(currentSlide, (value) => $currentSlide = value);
  const currentTime = writable("0:00");
  $$unsubscribe_currentTime = subscribe(currentTime, (value) => $currentTime = value);
  onDestroy(() => {
    return;
  });
  $$result.css.add(css);
  $$unsubscribe_currentSlide();
  $$unsubscribe_currentTime();
  return ` ${validate_component(SlideNav, "SlideNav").$$render(
    $$result,
    {
      player,
      slide: $currentSlide,
      time: $currentTime
    },
    {},
    {}
  )} <canvas style="display:block;margin:0 auto;"${add_attribute("this", canvasEl, 0)}></canvas>  <div style="${"height:" + escape(FOOT_H, true) + "px"}"></div>`;
});
export {
  Page as default
};
