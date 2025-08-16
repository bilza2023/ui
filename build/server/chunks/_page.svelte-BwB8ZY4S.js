import { c as create_ssr_component } from './ssr-DD2Fi2eU.js';
import '@svgdotjs/svg.js';

const css = {
  code: "#canvas.svelte-hrihrc{width:400px;height:400px;border:1px solid #ccc;margin:2rem auto;display:block}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from \\"svelte\\";\\nimport { SVG } from \\"@svgdotjs/svg.js\\";\\nonMount(() => {\\n  const draw = SVG().addTo(\\"#canvas\\").size(400, 400);\\n  draw.rect(100, 100).fill(\\"red\\").move(50, 50);\\n});\\n<\/script>\\n  \\n  <style>\\n    #canvas {\\n      width: 400px;\\n      height: 400px;\\n      border: 1px solid #ccc;\\n      margin: 2rem auto;\\n      display: block;\\n    }\\n  </style>\\n  \\n  <h1 style=\\"text-align: center;\\">SVG.js Test</h1>\\n  <div id=\\"canvas\\"></div>\\n  "],"names":[],"mappings":"AASI,qBAAQ,CACN,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,OAAO,CAAE,KACX"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 style="text-align: center;" data-svelte-h="svelte-14ygaas">SVG.js Test</h1> <div id="canvas" class="svelte-hrihrc"></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BwB8ZY4S.js.map
