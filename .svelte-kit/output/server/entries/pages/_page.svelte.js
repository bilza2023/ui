import { c as create_ssr_component, d as each, e as escape, b as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { N as Nav } from "../../chunks/Nav.js";
import { B as BetaWarning } from "../../chunks/BetaWarning.js";
const css = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = ["Home", "AI Track", "IT Track", "Contact"];
  $$result.css.add(css);
  return `<footer class="footer svelte-1w1amng"><div class="footer-top svelte-1w1amng"><div class="brand svelte-1w1amng" data-svelte-h="svelte-cspdkz">Taleem.Help</div> <nav class="nav-links svelte-1w1amng">${each(links, (link) => {
    return `<a href="https://taleem.help" class="footer-link svelte-1w1amng">${escape(link)}</a>`;
  })}</nav></div> <div class="footer-bottom svelte-1w1amng" data-svelte-h="svelte-1999gmq"><p>© 2025 Taleem.Help — Education for Every Pakistani</p> <p class="credits svelte-1w1amng">Built with ❤️ in Islamabad</p></div> </footer>`;
});
const SidebarCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "" } = $$props;
  let { title = "" } = $$props;
  let { details = "" } = $$props;
  let { url = "#" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<a${add_attribute("href", url, 0)} class="block no-underline"><div class="bg-[#fef6ec] border border-[#c4a77f] rounded-lg p-4 text-sm shadow-sm hover:shadow-md transition cursor-pointer"><h4 class="font-semibold text-[#3d2e1e] mb-1">${escape(icon)} ${escape(title)}</h4> <p class="text-gray-700">${escape(details)}</p></div></a>`;
});
const TcodeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tcodes = [] } = $$props;
  if ($$props.tcodes === void 0 && $$bindings.tcodes && tcodes !== void 0)
    $$bindings.tcodes(tcodes);
  return `<div class="flex flex-wrap gap-10 justify-center ">${each(tcodes, (t) => {
    return `<a${add_attribute("href", `/syllabus?tcode=${t.tcodeName}`, 0)}><div class="block max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all"><div class="block bg-white rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all"><img${add_attribute("src", t.image, 0)}${add_attribute("alt", t.tcodeName, 0)} class="w-full h-48 object-cover"> <div class="p-4"><h2 class="text-lg font-bold text-gray-800">${escape(t.tcodeName)}</h2> <p class="text-sm text-gray-600 mt-1">${escape(t.tcodeName)}</p></div> </div></div> </a>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="min-h-screen flex flex-col justify-start bg-[#160c00]">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(BetaWarning, "BetaWarning").$$render($$result, {}, {}, {})} <section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen"> <div${add_attribute("class", ` p-6 rounded-xl shadow-inner flex flex-col space-y-6 border-2 border-[#93754b]  `, 0)}> ${validate_component(TcodeCard, "TcodeCard").$$render($$result, { tcodes: data.tcodes }, {}, {})}</div>  <div${add_attribute("class", ` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white`, 0)}><h4 class="text-lg font-bold mb-2 text-white" data-svelte-h="svelte-1yw9ttk">📢 Updates &amp; Insights</h4> ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🚀",
      title: "Be Part of AI Revolution",
      details: "World is entering into a new era. This is a time to act for Pakistani Students. AI bring new oppertunities.",
      url: "/blog/be-part-of-ai-revolution.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "📜",
      title: "AI Foundation Track",
      details: "Introducing AI Foundation Track - Taleem.Help. In the current economic conditions AI is a new form of business and earning.",
      url: "/blog/ai-foundation-track-brochure.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "👨‍🎓",
      title: "Future in AI Era for Pakistani Students",
      details: "A brief blog post about some of the steps suggested for Pakistani Students",
      ".": true,
      url: "/blog/future-in-the-ai-era-for--pakistani-students.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🌳",
      title: "Brief: Pakistani IT Industry 2025",
      details: "A snap shot of Pakistani IT industray in 2025. Some of the Top Earners and the Industrial sectors they target",
      ".": true,
      url: "blog/backend-servies-presentation/pakistani-it-industry-overview.html"
    },
    {},
    {}
  )}</div></section> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
