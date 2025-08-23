import { c as create_ssr_component, v as validate_component } from './ssr-CO7PFcwR.js';
import { N as Nav } from './Nav-CIe9NOWg.js';
import './ssr2-6RDSickK.js';
import './state.svelte-BCeRBbkS.js';

const css = {
  code: ".blog_container.svelte-1xb4zta{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:2rem;background-color:#C1B294;min-height:100vh}.blog_link.svelte-1xb4zta{display:inline-block;background-color:#ffffff;color:#333333;font-size:larger;text-decoration:none;padding:1rem 1.5rem;border-radius:0.5rem;box-shadow:0 2px 4px rgba(0, 0, 0, 0.1);transition:transform 0.2s ease, box-shadow 0.2s ease}.blog_link.svelte-1xb4zta:hover{transform:translateY(-4px);box-shadow:0 6px 12px rgba(0, 0, 0, 0.15)}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\t\\n\\timport Nav from '$lib/appComps/Nav.svelte';\\n\\t\\n<\/script>\\n\\n<div class=\\"app-container\\">\\n\\t<Nav />\\n<div class=\\"blog_container\\">\\n \\n    <a class=\\"blog_link\\" href=\\"/blog/class9_all_theorems_pt1.html\\" >Class9 All Theorems Pt-1</a>\\n    \\n</div>\\n</div>\\n\\n<style>\\n.blog_container {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    align-items: flex-start;\\n    gap: 2rem;\\n    background-color: #C1B294;\\n    min-height: 100vh;\\n}\\n\\n.blog_link {\\n    display: inline-block;\\n    background-color: #ffffff;\\n    color: #333333;\\n    font-size: larger;\\n    text-decoration: none;\\n    padding: 1rem 1.5rem;\\n    border-radius: 0.5rem;\\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\\n}\\n\\n.blog_link:hover {\\n    transform: translateY(-4px);\\n    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\\n}\\n\\n\\n\\n</style>"],"names":[],"mappings":"AAgBA,8BAAgB,CACZ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,UAAU,CACvB,GAAG,CAAE,IAAI,CACT,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,KAChB,CAEA,yBAAW,CACP,OAAO,CAAE,YAAY,CACrB,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,IAAI,CAAC,MAAM,CACpB,aAAa,CAAE,MAAM,CACrB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CACxC,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,UAAU,CAAC,IAAI,CAAC,IACrD,CAEA,yBAAU,MAAO,CACb,SAAS,CAAE,WAAW,IAAI,CAAC,CAC3B,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAC7C"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="app-container">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <div class="blog_container svelte-1xb4zta" data-svelte-h="svelte-4n92uf"><a class="blog_link svelte-1xb4zta" href="/blog/class9_all_theorems_pt1.html">Class9 All Theorems Pt-1</a></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BMS6uRc-.js.map
