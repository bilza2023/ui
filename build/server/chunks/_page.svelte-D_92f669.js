import { c as create_ssr_component, a as subscribe } from './ssr-DD2Fi2eU.js';
import { p as page } from './stores-Cwm5axpg.js';
import 'howler';
import 'katex';
import './exports-DKuYoYKl.js';
import './state.svelte-ChAriFL2.js';

const css = {
  code: ".flex.svelte-9znuby{display:flex}.items-center.svelte-9znuby{align-items:center}.justify-center.svelte-9znuby{justify-content:center}.h-full.svelte-9znuby{height:100%}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<svelte:head>\\n  <meta name=\\"robots\\" content=\\"index,follow\\" />\\n</svelte:head>\\n\\n<img\\n  src=\\"/images/taleem.webp\\"\\n  alt=\\"Taleem Slide Preview\\"\\n  style=\\"display: none;\\"\\n  width=\\"1200\\"\\n  height=\\"630\\"\\n/>\\n\\n<script>\\n  import { onMount } from 'svelte';\\n  import { page }      from '$app/stores';\\n  import { SveltePlayer } from '../../lib/Player';\\n\\n  export let data;\\n  const { deck, background,error } = data;\\n\\n  // let deck       = null;        // slide array for the player\\n  // let background = null;        // background config   \\n  let notFound   = false;\\n  let soundUrl   = '/media/sounds/music.opus';\\n  let mounted    = false;\\n\\n\\n  // Run once after the component mounts\\n  onMount(() => {\\n    // debugger;\\n    console.log(\\"deck\\",deck);\\n    const params   = new URLSearchParams($page.url.search);\\n    const filename = params.get('filename');\\n\\n    if (!filename) {\\n      notFound = true;\\n    } else {\\n      // Optionally look for a matching .opus file\\n      const opusName = \`\${filename}.opus\`;\\n      fetch(\`/sounds/\${opusName}\`, { method: 'HEAD' })\\n        .then((res) => { if (res.ok) soundUrl = \`/sounds/\${opusName}\`; })\\n        .catch(() => {});\\n    }\\n\\n    mounted = true;\\n  });\\n<\/script>\\n\\n{#if mounted}\\n  {#if notFound}\\n  <!-- dont remove this text-black -->\\n    <div class=\\"flex items-center justify-center h-full p-8\\">\\n      <p class=\\"text-lg font-semibold text-gray-700\\">Content not found.</p>\\n    </div>\\n  {:else if deck}\\n    {#key soundUrl}\\n      <SveltePlayer\\n        {deck}\\n        {soundUrl}\\n        {background}\\n      />\\n    {/key}\\n  {:else}\\n    <div class=\\"flex items-center justify-center h-full p-8\\">\\n      <p class=\\"text-lg font-medium text-gray-600\\">Loading…</p>\\n    </div>\\n  {/if}\\n{/if}\\n\\n<style>\\n  /* Basic centering helpers */\\n  .flex {\\n    display: flex;\\n  }\\n  .items-center {\\n    align-items: center;\\n  }\\n  .justify-center {\\n    justify-content: center;\\n  }\\n  .h-full {\\n    height: 100%;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAuEE,mBAAM,CACJ,OAAO,CAAE,IACX,CACA,2BAAc,CACZ,WAAW,CAAE,MACf,CACA,6BAAgB,CACd,eAAe,CAAE,MACnB,CACA,qBAAQ,CACN,MAAM,CAAE,IACV"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  const { deck, background, error } = data;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-11evgey_START --><meta name="robots" content="index,follow"><!-- HEAD_svelte-11evgey_END -->`, ""} <img src="/images/taleem.webp" alt="Taleem Slide Preview" style="display: none;" width="1200" height="630">  ${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D_92f669.js.map
