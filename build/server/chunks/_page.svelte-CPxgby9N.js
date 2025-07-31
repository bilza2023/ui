import { c as create_ssr_component, v as validate_component, e as each, b as add_attribute, d as escape } from './ssr-DD2Fi2eU.js';
import { N as Nav } from './Nav-CdkUCx1n.js';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const css$1 = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["\\n<script>\\n    const links = ['Home', 'AI Track', 'IT Track', 'Contact'];\\n  <\/script>\\n  \\n  <footer class=\\"footer\\">\\n    <div class=\\"footer-top\\">\\n      <div class=\\"brand\\">Taleem.Help</div>\\n      <nav class=\\"nav-links\\">\\n        {#each links as link}\\n    <a href=\\"https://taleem.help\\" class=\\"footer-link\\">{link}</a>\\n        {/each}\\n      </nav>\\n    </div>\\n  \\n    <div class=\\"footer-bottom\\">\\n      <p>© 2025 Taleem.Help — Education for Every Pakistani</p>\\n      <p class=\\"credits\\">Built with ❤️ in Islamabad</p>\\n    </div>\\n  </footer>\\n  \\n  <style>\\n  .footer {\\n    background-color: #504234;\\n    color: #f1e9df;\\n    padding: 2rem;\\n    font-size: 0.9rem;\\n  }\\n  \\n  .footer-top {\\n    display: flex;\\n    justify-content: space-between;\\n    align-items: center;\\n    flex-wrap: wrap;\\n    border-bottom: 1px solid #c4a77f;\\n    padding-bottom: 1rem;\\n    margin-bottom: 1rem;\\n  }\\n  \\n  .brand {\\n    font-weight: bold;\\n    font-size: 1.25rem;\\n    color: #c4a77f;\\n  }\\n  \\n  .nav-links {\\n    display: flex;\\n    gap: 1rem;\\n    flex-wrap: wrap;\\n  }\\n  \\n  .footer-link {\\n    color: #f1e9df;\\n    text-decoration: none;\\n    transition: color 0.2s;\\n  }\\n  \\n  .footer-link:hover {\\n    color: #c4a77f;\\n  }\\n  \\n  .footer-bottom {\\n    display: flex;\\n    justify-content: space-between;\\n    flex-wrap: wrap;\\n    font-size: 0.85rem;\\n    opacity: 0.9;\\n  }\\n  \\n  .credits {\\n    font-style: italic;\\n  }\\n  </style>\\n  "],"names":[],"mappings":"AAsBE,sBAAQ,CACN,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MACb,CAEA,0BAAY,CACV,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IAAI,CACf,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,IACjB,CAEA,qBAAO,CACL,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,OAAO,CAClB,KAAK,CAAE,OACT,CAEA,yBAAW,CACT,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,IACb,CAEA,2BAAa,CACX,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,CAAC,IACpB,CAEA,2BAAY,MAAO,CACjB,KAAK,CAAE,OACT,CAEA,6BAAe,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,OAAO,CAClB,OAAO,CAAE,GACX,CAEA,uBAAS,CACP,UAAU,CAAE,MACd"}`
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = ["Home", "AI Track", "IT Track", "Contact"];
  $$result.css.add(css$1);
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
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div${add_attribute("class", ` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white bg-[#2E1C02]`, 0)}><h4 class="text-lg font-bold mb-2 text-white" data-svelte-h="svelte-1nme1y6">📢 Updates &amp; Insights</h4> ${validate_component(SidebarCard, "SidebarCard").$$render(
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
  )}</div>`;
});
const css = {
  code: "body{background-color:#1e1e1e;color:#f0f0f0;font-family:Arial, sans-serif;margin:0}h2.svelte-11k4kfu.svelte-11k4kfu{text-align:center;margin-bottom:2rem;color:#ffffff}.gallery.svelte-11k4kfu.svelte-11k4kfu{display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:1.5rem;padding:0 1rem}.gallery-item.svelte-11k4kfu.svelte-11k4kfu{background-color:#C4A77F;border:1px solid #444;border-radius:8px;padding:1rem;text-align:center;box-shadow:0 0 10px rgba(0,0,0,0.3)}.gallery-item.svelte-11k4kfu img.svelte-11k4kfu{max-width:100%;height:auto;border-radius:4px;margin-bottom:0.5rem;border:1px solid #555;display:block;margin-left:auto;margin-right:auto}.details.svelte-11k4kfu.svelte-11k4kfu{font-size:0.9rem;color:#291701;font-weight:bold}",
  map: '{"version":3,"file":"TcodeCard.svelte","sources":["TcodeCard.svelte"],"sourcesContent":["<script>\\n  export let tcodes = [];\\n  let folderName = \\"subject\\";\\n<\/script>\\n\\n<style>\\n  :global(body) {\\n    background-color: #1e1e1e;\\n    color: #f0f0f0;\\n    font-family: Arial, sans-serif;\\n    margin: 0;\\n  }\\n\\n  h2 {\\n    text-align: center;\\n    margin-bottom: 2rem;\\n    color: #ffffff;\\n  }\\n\\n  .gallery {\\n    display: grid;\\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\\n    gap: 1.5rem;\\n    padding: 0 1rem;\\n  }\\n\\n  .gallery-item {\\n    background-color: #C4A77F;\\n    border: 1px solid #444;\\n    border-radius: 8px;\\n    padding: 1rem;\\n    text-align: center;\\n    box-shadow: 0 0 10px rgba(0,0,0,0.3);\\n  }\\n\\n  .gallery-item img {\\n    max-width: 100%;\\n    height: auto;\\n    border-radius: 4px;\\n    margin-bottom: 0.5rem;\\n    border: 1px solid #555;\\n    display: block; /* Ensures image is centered within the container */\\n    margin-left: auto;\\n    margin-right: auto;\\n  }\\n\\n  .details {\\n    font-size: 0.9rem;\\n    color: #291701;\\n    font-weight: bold;\\n  }\\n</style>\\n\\n<div>\\n  <h2>Courses</h2>\\n  <div class=\\"gallery\\">\\n    {#each tcodes as t}\\n      <a href={`/${folderName}?tcode=${t.tcodeName}`}>\\n        <div class=\\"gallery-item\\">\\n          <img src={t.image} alt={t.tcodeName} />\\n          <div class=\\"details\\">{t.tcodeName}</div>\\n        </div>\\n      </a>\\n    {/each}\\n  </div>\\n</div>"],"names":[],"mappings":"AAMU,IAAM,CACZ,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,KAAK,CAAC,CAAC,UAAU,CAC9B,MAAM,CAAE,CACV,CAEA,gCAAG,CACD,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,OACT,CAEA,sCAAS,CACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,SAAS,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC5D,GAAG,CAAE,MAAM,CACX,OAAO,CAAE,CAAC,CAAC,IACb,CAEA,2CAAc,CACZ,gBAAgB,CAAE,OAAO,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CACrC,CAEA,4BAAa,CAAC,kBAAI,CAChB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,aAAa,CAAE,MAAM,CACrB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAChB,CAEA,sCAAS,CACP,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IACf"}'
};
let folderName = "subject";
const TcodeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tcodes = [] } = $$props;
  if ($$props.tcodes === void 0 && $$bindings.tcodes && tcodes !== void 0) $$bindings.tcodes(tcodes);
  $$result.css.add(css);
  return `<div><h2 class="svelte-11k4kfu" data-svelte-h="svelte-t4s7z4">Courses</h2> <div class="gallery svelte-11k4kfu">${each(tcodes, (t) => {
    return `<a${add_attribute("href", `/${folderName}?tcode=${t.tcodeName}`, 0)}><div class="gallery-item svelte-11k4kfu"><img${add_attribute("src", t.image, 0)}${add_attribute("alt", t.tcodeName, 0)} class="svelte-11k4kfu"> <div class="details svelte-11k4kfu">${escape(t.tcodeName)}</div></div> </a>`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let syllabus = [];
  return `<div class="min-h-screen flex flex-col justify-start bg-[#594112]">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}  <div><button class="bg-[#C4A77F] text-[#0e3d0c] p-1 m-1 rounded-md " data-svelte-h="svelte-9clmav">Courses/Videos</button></div> <section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen">${`${validate_component(TcodeCard, "TcodeCard").$$render($$result, { tcodes: syllabus }, {}, {})}`} ${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}</section> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CPxgby9N.js.map
