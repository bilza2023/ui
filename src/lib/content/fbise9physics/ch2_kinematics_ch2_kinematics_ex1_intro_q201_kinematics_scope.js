import { DeckBuilder } from "taleem-pivot-deckbuilder";
const deckbuilder = new DeckBuilder();

deckbuilder.s.titleSlide(8, [
  { name: "title", content: "Kinesmatics Scope", showAt: 0 }
]);

deckbuilder.s.twoColumnText(18, [
  { name: "title", content: "Pros and Cons", showAt: 0 },
  { name: "left", content: "• Simple\n• Lightweight\n• Fast", showAt: 1 },
  { name: "right", content: "• Limited detail\n• No visuals\n• Basic only", showAt: 3 }
]);

export const deck = deckbuilder.build();
