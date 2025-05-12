import { c as create_ssr_component, v as validate_component, b as escape, d as add_attribute } from './ssr-BVZaZd41.js';
import { N as Nav } from './Nav-COc8t245.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".banner-container.svelte-xanf9x{display:flex;flex-direction:column;justify-content:space-between;width:100%;background-color:rgba(61, 46, 30, 0.9);padding:3rem 3rem;gap:8rem}@media(min-width: 768px){.banner-container.svelte-xanf9x{flex-direction:row}}.banner-image.svelte-xanf9x{overflow:hidden;border-radius:12px}.banner-img.svelte-xanf9x{max-height:300px;width:100%;-o-object-fit:contain;object-fit:contain;border-radius:12px;border:none}.banner-text.svelte-xanf9x{flex:1;color:rgba(248, 237, 224, 0.9);;;display:flex;flex-direction:column;justify-content:center;gap:1.25rem}.banner-title.svelte-xanf9x{font-size:2.5rem;font-weight:bold;border-bottom:2px solid #c4a77f;padding-bottom:0.5rem;margin:0}.banner-description.svelte-xanf9x{font-size:1.75rem;font-weight:600;line-height:1.7}.banner-note.svelte-xanf9x{font-size:1rem;font-style:italic;opacity:0.9}",
  map: null
};
const TaleemBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="banner-container svelte-xanf9x" data-svelte-h="svelte-1rbj0e9"> <div class="banner-image svelte-xanf9x"><img src="/brand/taleem-banner.webp" alt="Taleem Banner" class="banner-img svelte-xanf9x"></div>  <div class="banner-text svelte-xanf9x"><h2 class="banner-title svelte-xanf9x">taleem.help</h2> <p class="banner-description svelte-xanf9x">Education for Every Pakistani — we offer AI, IT, and Board classes built to empower the next generation.
      Learn at your own pace, with modern tools, and practical outcomes. For curious learners from schools to startups.</p> <div class="banner-note svelte-xanf9x">🌍 Part of the <strong>Taleem.Help</strong> national learning initiative.</div></div> </div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<footer class="text-center text-sm text-gray-700 py-6 border-t border-[#c8b59e] bg-[#ecdcc6]" data-svelte-h="svelte-11k54fs">© 2025 Taleem.help — Built with ❤️ in Islamabad</footer>`;
});
const SubjectCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { heading = "🧠 AI Learning Tracks" } = $$props;
  let { description = "Learn to use, build, and earn with modern AI tools. From prompt basics to business automation." } = $$props;
  let { link = "/courses/ai" } = $$props;
  let { buttonText = "View AI Courses →" } = $$props;
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0)
    $$bindings.heading(heading);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.buttonText === void 0 && $$bindings.buttonText && buttonText !== void 0)
    $$bindings.buttonText(buttonText);
  return `<div class="bg-[#f3e8d9] border border-[#8b5306] rounded-xl p-5 shadow hover:shadow-lg transition"><h3 class="text-xl font-semibold text-[#3d2e1e] mb-2">${escape(heading)}</h3> <p class="text-sm text-gray-700 mb-3">${escape(description)}</p> <a${add_attribute("href", link, 0)} class="inline-block text-sm font-medium text-white bg-[#3d2e1e] px-4 py-2 rounded hover:bg-[#2a1e13]">${escape(buttonText)}</a></div>`;
});
const SidebarCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-[#fef6ec] border border-[#c4a77f] rounded-lg p-4 text-sm shadow-sm hover:shadow-md transition" data-svelte-h="svelte-1j5yx2y"><h4 class="font-semibold text-[#3d2e1e] mb-1">📊 AI Trends 2025</h4> <p class="text-gray-700">Prompt marketplaces are booming. Students are selling their GPTs globally.</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex flex-col justify-between bg-[#d5c3ab]">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(TaleemBanner, "TaleemBanner").$$render($$result, {}, {}, {})} <section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12"> <div class="bg-[#f3e8d9] p-6 rounded-xl shadow-inner flex flex-col space-y-6">${validate_component(SubjectCard, "SubjectCard").$$render(
    $$result,
    {
      heading: "🧠 AI Learning Tracks",
      description: "Learn to use, build, and earn with modern AI tools. From prompt basics to system design and business automation — tailored for Pakistani learners.",
      link: "/courses/ai",
      buttonText: "View AI Courses →"
    },
    {},
    {}
  )} ${validate_component(SubjectCard, "SubjectCard").$$render(
    $$result,
    {
      heading: "💻 IT Learning Tracks",
      description: "Master practical IT skills like file handling, system setup, and website basics. For jobs, freelancing, and self-reliance.",
      link: "/courses/it",
      buttonText: "View IT Courses →"
    },
    {},
    {}
  )} ${validate_component(SubjectCard, "SubjectCard").$$render(
    $$result,
    {
      heading: "🇵🇰 FEBISE - Federal Board Courses",
      description: "At the moment we also offer class 9th Math, Physics and English Classes.",
      link: "/courses/fbise",
      buttonText: "View FBISE Courses →"
    },
    {},
    {}
  )}</div>  <div class="bg-[#ecdcc6] p-4 rounded-xl shadow flex flex-col space-y-4"><h4 class="text-lg font-bold text-[#3d2e1e] mb-2" data-svelte-h="svelte-13fclf8">📢 Updates &amp; Insights</h4> ${validate_component(SidebarCard, "SidebarCard").$$render($$result, {}, {}, {})} ${validate_component(SidebarCard, "SidebarCard").$$render($$result, {}, {}, {})}</div></section>  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Bzo3UC94.js.map
