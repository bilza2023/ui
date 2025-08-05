import { c as create_ssr_component } from './ssr-DD2Fi2eU.js';
import 'howler';
import 'katex';
import { D as DeckBuilder } from './Deckbuilder-xL1x3ztt.js';
import 'zod';

function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_5",
    description: "Slide series for Theorem 11.1.5 (dual-window demo)",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });
  b.s.svgPointer(50, [
    { type: "image", content: "/images/theorems9old_11.1.5.svg" },
    { type: "circle", x: 180, y: 95, showAt: 1, duration: 10, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 2, duration: 10, label: "AD" },
    { type: "dot", x: 100, y: 50, showAt: 3, duration: 10, label: "A" },
    { type: "circle", x: 10, y: 10, showAt: 15, duration: 20, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 15, duration: 20, label: "AD" },
    { type: "dot", x: 100, y: 50, showAt: 15, duration: 20, label: "A" }
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
//# sourceMappingURL=_page.svelte-BS0X7264.js.map
