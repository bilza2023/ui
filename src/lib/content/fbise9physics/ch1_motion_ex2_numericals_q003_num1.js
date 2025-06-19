import { DeckBuilder } from "deckbuilderpivot";
const deckbuilder = new DeckBuilder();

deckbuilder.setTheme("royalBlue");
deckbuilder.setBackground({
  backgroundColor: "#ffffff",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 0.8,
  pattern: null
});

deckbuilder.s.titleSlide([
  { name: "title", content: "Prefixes in SI Units" }
]);
deckbuilder.s.barChart([
  { name: "title", content: "Common SI Prefixes" },
  { name: "bar", label: "kilo (k)", value: 1000, color: "#4CAF50" },
  { name: "bar", label: "centi (c)", value: 0.01, color: "#2196F3" },
  { name: "bar", label: "milli (m)", value: 0.001, color: "#FFC107" }
]);
deckbuilder.s.twoColumnText([
  { name: "left", content: "• kilo = 1000\n• centi = 1/100\n• milli = 1/1000" },
  { name: "right", content: "• 1 km = 1000 m\n• 5 mm = 0.005 m\n• 2 cm = 0.02 m" },
  { name: "title", content: "Conversions with Prefixes" }
]);
console.log("deckbuilder.build()" ,deckbuilder.build());

// export const deck = deckbuilder.build();
export default deckbuilder.build();