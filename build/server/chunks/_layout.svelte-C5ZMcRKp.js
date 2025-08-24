import { c as create_ssr_component } from './ssr-CO7PFcwR.js';

/* empty css                  */
const css = {
  code: ".svelte-1gnogz8{padding:0;margin:0}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n  import '$lib/styles/tokens.css';\\n\\n\\n<\/script>\\n\\n<div class=\\"min-h-screen p-0 m-0\\" style=\\"background: var(--backgroundColor); color: var(--primaryText);\\">\\n  <slot />\\n</div>\\n\\n<style>\\n  *{\\n    padding: 0;\\n    margin: 0;\\n  }\\n</style>"],"names":[],"mappings":"AAWE,eAAC,CACC,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CACV"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="min-h-screen p-0 m-0 svelte-1gnogz8" style="background: var(--backgroundColor); color: var(--primaryText);">${slots.default ? slots.default({}) : ``} </div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-C5ZMcRKp.js.map
