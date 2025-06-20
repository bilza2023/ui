import { DeckBuilder } from "deckbuilderpivot";
const deckbuilder = new DeckBuilder();

deckbuilder.s.titleSlide([
  { name: "title", content: "Chapter 2: Kinematics — Scope Overview" }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "Covered:\n• Rest and motion\n• Speed\n• Velocity\n• Acceleration" },
  { name: "right", content: "Not Covered:\n• Causes of motion\n• Forces\n• Energy" },
  { name: "title", content: "Scope of Kinematics in Exercise 1" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Understanding motion is the first step", start: 0 },
  { name: "quoteLine", content: "to understanding the universe.", start: 2 },
  { name: "author", content: "— Physics Educator", start: 3 }
]);

deckbuilder.s.imageWithTitle([
  { name: "image", content: "/pivot/fbise9physics.webp" },
  { name: "title", content: "Kinematics in Action" }
]);

export const deck = deckbuilder.build();
