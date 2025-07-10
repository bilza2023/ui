import { c as create_ssr_component } from "../../../chunks/ssr.js";
import "howler";
import "../../../chunks/ZodDeckV1.js";
import "katex";
const css = {
  code: '.player-container.svelte-j3swyg.svelte-j3swyg{padding:0;display:flex;justify-content:center;align-items:center;min-height:80vh}.placeholder.svelte-j3swyg.svelte-j3swyg{color:#6c757d;font-size:1.2rem}.upload-container.svelte-j3swyg.svelte-j3swyg{text-align:center;margin:1rem 0}.upload-button.svelte-j3swyg.svelte-j3swyg{position:relative;display:inline-block;padding:1rem 2rem;background-color:#007bff;color:#fff;font-size:1rem;font-weight:bold;border:none;border-radius:4px;cursor:pointer}.upload-button.svelte-j3swyg input[type="file"].svelte-j3swyg{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="player-container svelte-j3swyg">${`<p class="placeholder svelte-j3swyg" data-svelte-h="svelte-oz2adn">Please upload a deck JS file to start.</p>`}</main> <div class="upload-container svelte-j3swyg"><label class="upload-button svelte-j3swyg">Upload Deck JS
    <input type="file" accept=".js" class="svelte-j3swyg"></label> </div>`;
});
export {
  Page as default
};
