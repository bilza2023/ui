

import { DeckBuilder } from "pivot-deckbuilder";
const deckbuilder = new DeckBuilder();

deckbuilder.setBackground({
  backgroundColor: "#1a1a1a",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 0.8
});

deckbuilder.s.barChart(10, [
  { name: "bar", label: "Physics", value: 70, color: "#3498db", showAt: 0 },
  { name: "bar", label: "Chemistry", value: 55, color: "#2ecc71", showAt: 1 },
  { name: "bar", label: "Biology", value: 60, color: "#f39c12", showAt: 2 },
  { name: "bar", label: "Computer", value: 90, color: "#9b59b6", showAt: 3 }
]);

  

export const deck = deckbuilder.build();
