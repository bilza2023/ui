import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { GlobalBackgrounds } from "../editor/theme/globalBackgrounds.js";

// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
// deck.setGlobalBackground(GlobalBackgrounds.stripesBg(theme));

deck.setGlobalBackground({
  // backgroundColor: "#000000", // fallback background color
  backgroundImage: "physicsClass", // name of the image key
  backgroundImageOpacity: 0.1, // controls transparency (0 = invisible, 1 = full)
  pattern: null // ensure no pattern overrides the image
});
// Slide 1: Header + Barchart
deck.addHeader("header", [{ text: "Bar Chart Component" }]);
deck.full(5, "barchart", [
  { label: "Alpha", value: 45, color: "#e74c3c", showAt: 1 },
  { label: "Beta", value: 60, color: "#2ecc71", showAt: 2 },
  { label: "Gamma", value: 30, color: "#3498db", showAt: 3 }
]
);

// Slide 2: Header + Quote
deck.addHeader("header", [{ text: "Quote Component" }]);
deck.full(10, "quote", [
  { text: "In every walk with nature", showAt: 6 },
  { text: "one receives far more", showAt: 7 },
  { text: "than he seeks.", showAt: 8 },
  { text: "— John Muir", showAt: 9 }
]);

// Slide 3: Header + Bullets
deck.addHeader("header", [{ text: "Bullets Component" }]);
deck.full(15, "bullets", [
  { text: "This component animates each bullet", showAt: 11 },
  { text: "Bullets appear one at a time", showAt: 12 },
  { text: "Good for listing ideas", showAt: 13 },
  { text: "Avoid overflow by keeping it short", showAt: 14 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});

// Slide 4: Header + Image
deck.addHeader("header", [{ text: "Image Component" }]);
deck.full(20, "image", [], {
  src: "physicsClass",
  showAt: 16,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});

// Slide 5: Half-slide: image + bullets
deck.addHeader("header", [{ text: "Half Slide: Image + Bullets" }]);
deck.half(
  27,
  "image", [], {
    src: "class",
    showAt: 21,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets", [
    { text: "Use half layout for comparisons", showAt: 22 },
    { text: "Balance text and visuals", showAt: 23 },
    { text: "Ensure clarity in both panes", showAt: 24 },
    { text: "Font must be smaller", showAt: 25 }
  ],
  { lineGap: 60, fontSize: 32 }
);

// Final Slide: Wrap up with Quote
deck.addHeader("header", [{ text: "Conclusion" }]);
deck.full(33, "quote", [
  { text: "Design is not just what it looks like", showAt: 29 },
  { text: "and feels like.", showAt: 30 },
  { text: "Design is how it works.", showAt: 31 },
  { text: "— Steve Jobs", showAt: 32 }
]);

export const presentationData = deck.build();
