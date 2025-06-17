import { DeckBuilder } from "deckbuilderpivot";

const deckbuilder = new DeckBuilder();

deckbuilder.setTheme("royalBlue");
deckbuilder.setBackground({
  backgroundColor: "#eaf4fc",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 1.0,
  pattern: null
});

deckbuilder.s.titleSlide([
  { name: "title", content: "Introduction to Kinematics" }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "• Describes motion\n• Uses terms like displacement, velocity" },
  { name: "right", content: "• Ignores forces\n• Focuses on how objects move" },
  { name: "title", content: "What is Kinematics?" }
]);

deckbuilder.s.imageRightBulletsLeft([
  { name: "image", content: "/pivot/box.webp" },
  { name: "bullet", content: "Distance vs Displacement" },
  { name: "bullet", content: "Speed vs Velocity" },
  { name: "bullet", content: "Uniform vs Non-uniform motion" }
]);

deckbuilder.s.barChart([
  { name: "title", content: "Velocity of Different Objects" },
  { name: "bar", label: "Car", value: 60, color: "#4CAF50" },
  { name: "bar", label: "Bike", value: 20, color: "#2196F3" },
  { name: "bar", label: "Train", value: 90, color: "#FFC107" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Motion is the key to understanding the world.", start: 0 },
  { name: "quoteLine", content: "Kinematics shows us how.", start: 2 },
  { name: "author", content: "— Physics Teacher", start: 3 }
]);

deckbuilder.s.imageWithCaption([
  { name: "image", content: "/pivot/fbise9physics.webp" },
  { name: "caption", content: "Graphical representation of motion" }
]);

export const deck = deckbuilder.build();
