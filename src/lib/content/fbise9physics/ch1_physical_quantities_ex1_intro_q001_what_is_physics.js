import { DeckBuilder } from "deckbuilderpivot";
const deckbuilder = new DeckBuilder();

deckbuilder.s.titleSlide([
  { name: "title", content: "Understanding Acceleration" }
]);

deckbuilder.s.imageLeftBulletsRight([
  { name: "image", content: "/pivot/box.webp" },
  { name: "bullet", content: "Rate of change of velocity" },
  { name: "bullet", content: "Measured in m/s²" },
  { name: "bullet", content: "Can be positive or negative" }
]);

deckbuilder.s.statistic([
  { name: "number", content: "9.8 m/s²" },
  { name: "label", content: "Acceleration due to gravity" }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "Examples:\n• Car speeding up\n• Falling object" },
  { name: "right", content: "Non-examples:\n• Constant speed\n• Stationary object" },
  { name: "title", content: "Acceleration vs No Acceleration" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Acceleration is the second derivative", start: 0 },
  { name: "quoteLine", content: "of position with respect to time.", start: 2 },
  { name: "author", content: "— Physics Insight", start: 3 }
]);

export const deck = deckbuilder.build();
