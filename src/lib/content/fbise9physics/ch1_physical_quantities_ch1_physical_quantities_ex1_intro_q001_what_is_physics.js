import { DeckBuilder } from "deckbuilderpivot";
const deckbuilder = new DeckBuilder();

deckbuilder.setTheme("royalBlue");
deckbuilder.setBackground({
  backgroundColor: "#ffffff",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 1.0,
  pattern: null
});

deckbuilder.s.titleSlide([
  { name: "title", content: "What is Physics?" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Physics is the most fundamental of all sciences.", start: 0 },
  { name: "author", content: "— Textbook Insight", start: 2 }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "Book Definition:\n\"Physics is the branch of science which deals with the study of matter, energy and their mutual relationship.\"" },
  { name: "right", content: "Simple View:\n• What things are made of\n• How they move or interact\n• Why natural phenomena happen" },
  { name: "title", content: "Definition of Physics" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Physics helps us understand the universe — from atoms to galaxies.", start: 0 },
  { name: "author", content: "— FSc Textbook Theme", start: 2 }
]);

deckbuilder.s.imageLeftBulletsRight([
  { name: "image", content: "/pivot/physics_in_life.webp" },
  { name: "bullet", content: "Observes natural phenomena" },
  { name: "bullet", content: "Formulates laws" },
  { name: "bullet", content: "Predicts outcomes" },
  { name: "bullet", content: "Applies principles to solve problems" }
]);

deckbuilder.s.table([
  {
    name: "table",
    content: [
      ["Situation", "Physics Involved"],
      ["Using microwave", "Electromagnetic waves"],
      ["Driving a car", "Mechanics, friction"],
      ["Electricity usage", "Circuits, energy"],
      ["Phone call", "Waves, electronics"],
      ["Medical scans", "Radiation, optics"]
    ]
  }
]);

deckbuilder.s.statistic([
  { name: "number", content: "90%" },
  { name: "label", content: "of technology is rooted in physics" }
]);

deckbuilder.s.imageRightBulletsLeft([
  { name: "image", content: "/pivot/physics_modern_life.webp" },
  { name: "bullet", content: "Engineering & Robotics" },
  { name: "bullet", content: "Transportation systems" },
  { name: "bullet", content: "Energy generation" },
  { name: "bullet", content: "Medical technology" }
]);

deckbuilder.s.cornerWordsSlide([
  { name: "card", icon: "🔍", label: "Predict" },
  { name: "card", icon: "💡", label: "Innovate" },
  { name: "card", icon: "📘", label: "Explain" },
  { name: "card", icon: "⚙️", label: "Empower" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Physics is not just a subject — it's a mindset for discovery.", start: 0 },
  { name: "author", content: "— Student Reflection", start: 2 }
]);

export const deck = deckbuilder.build();
