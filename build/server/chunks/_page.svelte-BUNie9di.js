import { c as create_ssr_component } from './ssr-DD2Fi2eU.js';
import 'howler';
import 'katex';
import { D as DeckBuilder } from './Deckbuilder-qWql4bEs.js';
import 'zod';

function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_5",
    description: "Slide for Theorem 11.1.5",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });
  b.s.svgPointer(90, [
    { type: "image", content: "/images/theorems9old_11.1.5.svg" },
    { type: "arrow", x: 120, y: 80, showAt: 5, duration: 90 },
    { type: "circle", x: 200, y: 100, showAt: 10, duration: 90 },
    { type: "dot", x: 100, y: 100, showAt: 10, duration: 90 }
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
//# sourceMappingURL=_page.svelte-BUNie9di.js.map
