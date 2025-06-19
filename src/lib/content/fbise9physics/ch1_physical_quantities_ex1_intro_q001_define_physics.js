
import { DeckBuilder } from "deckbuilderpivot";
const deckbuilder = new DeckBuilder();

deckbuilder.s.titleSlide([
  { name: "title", content: "Benefits of Reading" }
]);

deckbuilder.s.imageLeftBulletsRight([
  { name: "image", content: "/pivot/box.webp" },
  { name: "bullet", content: "Improves vocabulary" },
  { name: "bullet", content: "Enhances imagination" },
  { name: "bullet", content: "Boosts focus and memory" },
  { name: "bullet", content: "Reduces stress" }
]);

deckbuilder.s.statistic([
  { name: "number", content: "68%" },
  { name: "label", content: "Adults read at least 1 book a year" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "A reader lives a thousand lives", start: 0 },
  { name: "quoteLine", content: "before he dies.", start: 2 },
  { name: "author", content: "— George R.R. Martin", start: 3 }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "Fiction:\n• Sparks creativity\n• Builds empathy" },
  { name: "right", content: "Non-Fiction:\n• Teaches facts\n• Informs decisions" },
  { name: "title", content: "Types of Reading" }
]);

deckbuilder.s.imageWithCaption([
  { name: "image", content: "/pivot/fbise9physics.webp" },
  { name: "caption", content: "Books expand your universe." }
]);

export default deckbuilder.build();
