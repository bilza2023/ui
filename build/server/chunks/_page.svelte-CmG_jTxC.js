import { c as create_ssr_component } from './ssr-DD2Fi2eU.js';
import 'howler';
import 'katex';
import { D as DeckBuilder } from './Deckbuilder-qWql4bEs.js';
import 'zod';

function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_4",
    description: "Slide for Theorem 11.1.1",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });
  b.setBackgroundColor("#F5F5F5");
  b.setBackgroundOpacity(0.1);
  b.s.imageWithTitle(10, [
    { name: "image", content: "/images/theorems9old_11.1.4.svg", showAt: 0 },
    { name: "title", content: "Theorem 11.1.4", showAt: 1 }
  ]);
  b.s.eq(30, [
    { type: "spImage", content: "/images/theorems9old_11.1.4.svg" },
    { type: "heading", content: "Theorem 11.1.1 — Opposite Sides of Parallelogram", showAt: 5 }
  ]);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const deckbuilder = new DeckBuilder();
  defineDeck(deckbuilder);
  const question = deckbuilder.build();
  question.deck;
  question.background ?? {};
  return `${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CmG_jTxC.js.map
