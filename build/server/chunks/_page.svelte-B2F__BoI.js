import { c as create_ssr_component, v as validate_component, e as each, d as add_attribute, b as escape } from './ssr-BKqIka7n.js';
import { P as ProjectToolbar } from './ProjectToolbar-5JEBRuLl.js';

const css = {
  code: ".flex.svelte-1ygjuha{display:flex}.flex-wrap.svelte-1ygjuha{flex-wrap:wrap}.gap-6.svelte-1ygjuha{gap:1.5rem}.p-6.svelte-1ygjuha{padding:1.5rem}.rounded-lg.svelte-1ygjuha{border-radius:0.5rem}.border.svelte-1ygjuha{border-width:1px}.border-gray-700.svelte-1ygjuha{border-color:rgb(55 65 81)}.w-72.svelte-1ygjuha{width:18rem}.text-lg.svelte-1ygjuha{font-size:1.125rem;line-height:1.75rem}.font-semibold.svelte-1ygjuha{font-weight:600}.mb-2.svelte-1ygjuha{margin-bottom:0.5rem}.text-sm.svelte-1ygjuha{font-size:0.875rem;line-height:1.25rem}.text-gray-400.svelte-1ygjuha{color:rgb(156 163 175)}.shadow-md.svelte-1ygjuha{box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)}.transition-transform.svelte-1ygjuha{transition-property:transform, box-shadow;transition-duration:0.3s}.hover\\:scale-105.svelte-1ygjuha:hover{transform:scale(1.05)}.hover\\:shadow-lg.svelte-1ygjuha:hover{box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)}",
  map: null
};
const imageUrlRoutePath = "/thunbnails_slides/";
const pathUrl = "/canvas_slides/?slide=";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const cards = [
    {
      title: "Slide Zero",
      comments: "First Try.",
      imageUrl: "slide0.png",
      url: "slide0"
    },
    {
      title: "Title 01",
      comments: "Testing...",
      imageUrl: "title01.png",
      url: "title01"
    },
    {
      title: "three_points_and_a_pic",
      comments: "three_points_and_a_pic",
      imageUrl: "three_points_and_a_pic.png",
      url: "three_points_and_a_pic"
    },
    {
      title: "venn_diagram",
      comments: "venn_diagram",
      imageUrl: "venn_diagram.png",
      url: "venn_diagram"
    },
    {
      title: "venn_diagram2",
      comments: "venn_diagram2",
      imageUrl: "venn_diagram2.png",
      url: "venn_diagram2"
    },
    {
      title: "circles",
      comments: "circles",
      imageUrl: "circles.png",
      url: "circles"
    }
  ];
  $$result.css.add(css);
  return `${validate_component(ProjectToolbar, "ProjectToolbar").$$render($$result, {}, {}, {})} <div class="flex flex-wrap gap-6 p-6 svelte-1ygjuha">${each(cards, (card) => {
    return `<a${add_attribute("href", pathUrl + card.url, 0)}><div class="rounded-lg border border-gray-700 p-4 w-72 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg svelte-1ygjuha"><img${add_attribute("src", imageUrlRoutePath + card.imageUrl, 0)}${add_attribute("alt", card.title, 0)} class="rounded-md mb-4 w-full h-40 object-cover"> <h3 class="text-lg font-semibold mb-2 svelte-1ygjuha">${escape(card.title)}</h3> <p class="text-sm text-gray-400 svelte-1ygjuha">${escape(card.comments)}</p></div> </a>`;
  })} </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B2F__BoI.js.map
