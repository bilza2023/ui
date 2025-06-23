import { c as create_ssr_component, v as validate_component, e as each, b as escape } from './ssr-DxeigfMQ.js';
import './client-CjdeEz1m.js';
import { N as Nav } from './Nav-CHLJryKr.js';
import './exports-DuWZopOC.js';

const css$1 = {
  code: ".card.svelte-g5urb7{width:240px;min-height:180px;background-color:#ffffff;border:2px solid var(--card-color);border-top:8px solid var(--card-color);padding:1.2rem 1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;transition:transform 0.15s ease, box-shadow 0.15s ease;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:sans-serif;text-align:center}.card.svelte-g5urb7:hover{transform:translateY(-4px);box-shadow:0 6px 16px rgba(0,0,0,0.12);background-color:#fdfdfd}.card-icon.svelte-g5urb7{font-size:3rem;margin-bottom:0.75rem;color:var(--card-color)}.card-title.svelte-g5urb7{font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}.card-desc.svelte-g5urb7{font-size:0.9rem;color:#555;opacity:0.85;margin-top:auto}",
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "📘" } = $$props;
  let { title = "Untitled" } = $$props;
  let { description = "" } = $$props;
  let { color = "#007BFF" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$1);
  return `  <div class="card svelte-g5urb7" style="${"--card-color: " + escape(color, true)}"><div class="card-icon svelte-g5urb7">${escape(icon)}</div> <div class="card-title svelte-g5urb7">${title ? `${escape(title.slice(0, 20))}${escape(title.length > 20 ? "…" : "")}` : ``}</div> ${description ? `<div class="card-desc svelte-g5urb7">${escape(description)}</div>` : ``} </div>`;
});
const css = {
  code: ".view-container.svelte-124hnu0{text-align:center;margin-top:2rem}button.svelte-124hnu0{margin:0.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chapters;
  $$result.css.add(css);
  chapters = [];
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <div class="bg-yellow-500 border-l-4 border-yellow-500 text-yellow-800 p-3 mx-4 my-2 text-center rounded shadow-md text-sm font-semibold" data-svelte-h="svelte-1fbdek6">🛠️ This App is in Beta Testing Mode.</div> ${``} <div class="view-container svelte-124hnu0">${`${each(chapters, (ch) => {
    return `<button class="svelte-124hnu0">${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: ch.name,
        description: "",
        icon: "📁"
      },
      {},
      {}
    )} </button>`;
  })}`} ${``} ${``} </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-T_nUB0pE.js.map
