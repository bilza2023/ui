import { c as create_ssr_component } from "./ssr.js";
const BetaWarning = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="bg-yellow-500 border-l-4 border-yellow-500 text-yellow-800 p-4 mx-0 my-2 text-center rounded shadow-md text-md font-semibold mt-0" data-svelte-h="svelte-ybtape">🛠️ This App is in Beta Testing Mode.</div>`;
});
export {
  BetaWarning as B
};
