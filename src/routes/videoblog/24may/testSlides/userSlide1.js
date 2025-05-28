// realNumbersPresentation.js – Real Numbers (14–17 yrs)

import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(getDefaultBackground(theme));

// Slide 1: Title Slide with Rich Header
deck.addHeader("header", [{ text: "Chapter 1" }]);
deck.full(5, "quote", [
  { text: "“Numbers are the foundation of all science.”", showAt: 1 },
  { text: "From the moment we count,", showAt: 2 },
  { text: "we enter the realm of logic.", showAt: 3 }
], {
  author: { text: "— Mathematics Teacher", showAt: 4 }
});

// Slide 2: Definition
deck.addHeader("header", [{ text: "What are Real Numbers?" }]);
deck.full(10, "bullets", [
  { text: "Include all rational and irrational numbers", showAt: 6 },
  { text: "Can be positive, negative or zero", showAt: 7 },
  { text: "Represented on a number line", showAt: 8 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});

// Slide 3: Image Alone
deck.addHeader("header", [{ text: "Visual Example" }]);
deck.full(15, "image", [], {
  src: "chalkboard",
  showAt: 11,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});

// Slide 4: Side-by-Side Half Slide
// deck.clearHeader(); // No header for this slide
deck.addHeader("header", [{ text: "Visual Example" }]);
deck.half(
  22,
  "image",   [], { 
    src: "chalkboard", showAt: 16,
    stylePresetKey: "fullWidth", layoutMode: "center"
  },
  "bullets", [
    { text: "Zero is a real number", showAt: 17 },
    { text: "So is π (pi)", showAt: 18 },
    { text: "And −7.3 is too", showAt: 19 }
  ],
  { x: 40, y: 80, lineGap: 60 }
);

// Final Slide: Rich Header + Quote
deck.addHeader("header", [{ text: "Wrap Up" }]);
deck.full(28, "quote", [
  { text: "“Without numbers, there is no certainty.”", showAt: 23 },
  { text: "— Galileo", showAt: 24 }
]);

// Export
export const presentationData = deck.build();
