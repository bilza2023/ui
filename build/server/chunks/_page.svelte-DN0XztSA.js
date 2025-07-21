import { c as create_ssr_component, v as validate_component, b as add_attribute, e as each, d as escape } from './ssr-B0JoWuEN.js';
import { N as Nav, B as BetaWarning } from './BetaWarning-Bita0OIU.js';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const css = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["\\n<script>\\n    const links = ['Home', 'AI Track', 'IT Track', 'Contact'];\\n  <\/script>\\n  \\n  <footer class=\\"footer\\">\\n    <div class=\\"footer-top\\">\\n      <div class=\\"brand\\">Taleem.Help</div>\\n      <nav class=\\"nav-links\\">\\n        {#each links as link}\\n    <a href=\\"https://taleem.help\\" class=\\"footer-link\\">{link}</a>\\n        {/each}\\n      </nav>\\n    </div>\\n  \\n    <div class=\\"footer-bottom\\">\\n      <p>© 2025 Taleem.Help — Education for Every Pakistani</p>\\n      <p class=\\"credits\\">Built with ❤️ in Islamabad</p>\\n    </div>\\n  </footer>\\n  \\n  <style>\\n  .footer {\\n    background-color: #504234;\\n    color: #f1e9df;\\n    padding: 2rem;\\n    font-size: 0.9rem;\\n  }\\n  \\n  .footer-top {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    flex-wrap: wrap;\\n    border-bottom: 1px solid #c4a77f;\\n    padding-bottom: 1rem;\\n    margin-bottom: 1rem;\\n  }\\n  \\n  .brand {\\n    font-weight: bold;\\n    font-size: 1.25rem;\\n    color: #c4a77f;\\n  }\\n  \\n  .nav-links {\\n    display: flex;\\n    gap: 1rem;\\n    flex-wrap: wrap;\\n  }\\n  \\n  .footer-link {\\n    color: #f1e9df;\\n    text-decoration: none;\\n    transition: color 0.2s;\\n  }\\n  \\n  .footer-link:hover {\\n    color: #c4a77f;\\n  }\\n  \\n  .footer-bottom {\\n    display: flex;\\n    justify-content: space-between;\\n    flex-wrap: wrap;\\n    font-size: 0.85rem;\\n    opacity: 0.9;\\n  }\\n  \\n  .credits {\\n    font-style: italic;\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AAsBE,sBAAQ,CACN,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MACb,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,IACjB,CAEA,qBAAO,CACL,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,OAAO,CAClB,KAAK,CAAE,OACT,CAEA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,IACb,CAEA,2BAAa,CACX,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,CAAC,IACpB,CAEA,2BAAY,MAAO,CACjB,KAAK,CAAE,OACT,CAEA,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,OAAO,CAClB,OAAO,CAAE,GACX,CAEA,uBAAS,CACP,UAAU,CAAE,MACd"}`
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
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0) $$bindings.details(details);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
  return `<a${add_attribute("href", url, 0)} class="block no-underline"><div class="bg-[#fef6ec] border border-[#c4a77f] rounded-lg p-4 text-sm shadow-sm hover:shadow-md transition cursor-pointer"><h4 class="font-semibold text-[#3d2e1e] mb-1">${escape(icon)} ${escape(title)}</h4> <p class="text-gray-700">${escape(details)}</p></div></a>`;
});
const TcodeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tcodes = [] } = $$props;
  if ($$props.tcodes === void 0 && $$bindings.tcodes && tcodes !== void 0) $$bindings.tcodes(tcodes);
  return `<div class="grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-6 px-4 py-8">${each(tcodes, (t) => {
    return `<a${add_attribute("href", `/syllabus?tcode=${t.tcodeName}`, 0)}><div class="bg-[#2d2d2d] border border-gray-700 rounded-xl shadow-md hover:ring-2 hover:ring-yellow-500 transition-all overflow-hidden"><img${add_attribute("src", t.image, 0)}${add_attribute("alt", t.tcodeName, 0)} class="w-full h-48 object-cover border-b border-gray-600"> <div class="p-4 text-center bg-[#6d4d26] "><h2 class="text-white font-semibold text-lg">${escape(t.tcodeName)}</h2> </div></div> </a>`;
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let syllabus = [];
  return `<div class="min-h-screen flex flex-col justify-start bg-[#160c00]">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(BetaWarning, "BetaWarning").$$render($$result, {}, {}, {})} <section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen"> <div${add_attribute("class", ` p-6 rounded-xl shadow-inner flex flex-col space-y-6 border-2 border-[#93754b]  `, 0)}> ${validate_component(TcodeCard, "TcodeCard").$$render($$result, { tcodes: syllabus }, {}, {})}</div>  <div${add_attribute("class", ` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white`, 0)}><h4 class="text-lg font-bold mb-2 text-white" data-svelte-h="svelte-1nme1y6">📢 Updates &amp; Insights</h4> ${validate_component(SidebarCard, "SidebarCard").$$render(
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

export { Page as default };
//# sourceMappingURL=_page.svelte-DN0XztSA.js.map
