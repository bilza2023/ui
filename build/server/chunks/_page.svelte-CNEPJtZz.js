import { c as create_ssr_component, v as validate_component, e as each, d as add_attribute, b as escape } from './ssr-BVZaZd41.js';

const blogs = [
  {
    emoji: "📢",
    title: "Pakistan Educational Crisis - Taleem.Help",
    href: "/vb",
    description: "AI Foundation Course Brochure.",
    thumbnail: "/thumbnails/class.jpg"
  }
  // {
  //   emoji: "📢",
  //   title: "Future in the AI Era – For the Pakistani Students",
  //   href: "/blog/future-in-the-ai-era-for--pakistani-students.html",
  //   description: "Explore how AI is shaping education for the next generation.",
  //   thumbnail: "/images/thumb-ai-era.jpg"
  // },
  // {
  //   emoji: "📢",
  //   title: "Be Part of AI Revolution",
  //   href: "/blog/be-part-of-ai-revolution.html",
  //   description: "Why Learning AI is a must now.",
  //   thumbnail: "/images/thumb-ai-revolution.jpg"
  // },
  // {
  //   emoji: "⚙️",
  //   title: "Installing NginX on Server",
  //   href: "/blog/devops/installing_nginx.html",
  //   description: "Step-by-step guide for setting up your server environment.",
  //   thumbnail: "/images/thumb-nginx.jpg"
  // }
];
const BlogList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blogs: blogs2 = [] } = $$props;
  if ($$props.blogs === void 0 && $$bindings.blogs && blogs2 !== void 0)
    $$bindings.blogs(blogs2);
  return `<ul class="space-y-6">${each(blogs2, ({ emoji, title, href, description, thumbnail }) => {
    return `<li class="bg-[#f8f2dd] p-5 rounded-lg shadow hover:shadow-md transition flex items-center gap-4"><img${add_attribute("src", thumbnail, 0)} alt="thumbnail" class="w-24 h-24 object-cover rounded"> <div><a${add_attribute("href", href, 0)} class="text-2xl text-[#023047] font-semibold hover:underline flex items-center gap-2"><span>${escape(emoji)}</span> <span>${escape(title)}</span></a> <p class="text-sm text-gray-500 mt-1">${escape(description)}</p></div> </li>`;
  })}</ul>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-6gdkyo_START -->${$$result.title = `<title>taleem.help : Education for Every Pakistani</title>`, ""}<!-- HEAD_svelte-6gdkyo_END -->`, ""} <nav class="bg-[#fff3cd] shadow-sm py-3 px-6 sticky top-0 z-50" data-svelte-h="svelte-ljsapa"><div class="max-w-5xl mx-auto flex justify-between items-center"><span class="text-lg font-semibold">taleem.help : Education for Every Pakistani</span> <a href="/" class="text-[#0077b6] hover:underline font-medium">🏠 Back to Home</a></div></nav> <main class="max-w-3xl mx-auto py-10 px-6"><header class="mb-10 text-center" data-svelte-h="svelte-8soz0s"><h1 class="text-4xl font-bold text-[#ffb703] mb-2">📚 Blog Library</h1> <p class="text-md italic text-gray-600">Inspiration and knowledge for every learner</p></header>  ${validate_component(BlogList, "BlogList").$$render($$result, { blogs }, {}, {})} <footer class="mt-12 text-center text-xs text-gray-500" data-svelte-h="svelte-1glw0x9">📝 Curated by Taleem.Help • Updated regularly</footer></main>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CNEPJtZz.js.map
