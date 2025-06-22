

import { DeckBuilder } from "pivot-deckbuilder";
const deckbuilder = new DeckBuilder();

deckbuilder.setBackground({
  backgroundColor: "#1a1a1a",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 0.8
});
deckbuilder.s.twoColumnText(10, [
  { name: "title", content: "Branches of Physics", showAt: 0 },
  { name: "left", content: "• Mechanics\n• Thermodynamics", showAt: 1 },
  { name: "right", content: "• Optics\n• Quantum Physics", showAt: 2 }
]);



  

export const deck = deckbuilder.build();
