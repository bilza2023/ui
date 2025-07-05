import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "howler";
/* empty css                                                        */
import "katex";
import "taleem-pivot-deckbuilder";
const css = {
  code: '.player-container.svelte-1hcsibl.svelte-1hcsibl{padding:0rem;display:flex;justify-content:center;align-items:center;min-height:80vh}.placeholder.svelte-1hcsibl.svelte-1hcsibl{color:#6c757d;font-size:1.2rem}.upload-container.svelte-1hcsibl.svelte-1hcsibl{text-align:center;margin:1rem 0}.upload-button.svelte-1hcsibl.svelte-1hcsibl{position:relative;display:inline-block;padding:1rem 2rem;background-color:#007bff;color:#fff;font-size:1rem;font-weight:bold;border:none;border-radius:4px;cursor:pointer}.upload-button.svelte-1hcsibl input[type="file"].svelte-1hcsibl{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="player-container svelte-1hcsibl">${`<p class="placeholder svelte-1hcsibl" data-svelte-h="svelte-oz2adn">Please upload a deck JS file to start.</p>`}</main> <div class="upload-container svelte-1hcsibl"><label class="upload-button svelte-1hcsibl">Upload Deck JS
    <input type="file" accept=".js" class="svelte-1hcsibl"></label> </div>`;
});
export {
  Page as default
};
