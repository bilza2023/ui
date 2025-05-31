import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { GlobalBackgrounds } from "../editor/theme/globalBackgrounds.js";

// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass" , 0.08)

// Slide 1: Title Image with Drops
deck.addHeader("header", [{ text: "Physics Concepts Intro" }]);
deck.full(6, "image", [], {
  src: "physicsClass",
  showAt: 0,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});

// Slide 2: Definition of Force
deck.addHeader("header", [{ text: "What is Force?" }]);
deck.full(14, "bullets", [
  { text: "A push or pull on an object", showAt: 7 },
  { text: "Can cause a change in motion", showAt: 8 },
  { text: "Measured in Newtons (N)", showAt: 9 },
  { text: "Vector quantity – has direction", showAt: 10 },
  { text: "F = m × a (Newton's Second Law)", showAt: 11 }
], {
  x: 120,
  y: 90,
  lineGap: 65,
  stylePresetKey: "text.bulletSmall"
});

// Slide 3: Image Slide – Class Scene
deck.addHeader("header", [{ text: "What is Force" }]);
deck.full(20, "image", [], {
  src: "whatisforce",
  showAt: 15,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});

// Slide 4: Side-by-Side – Practical Forces
deck.addHeader("header", [{ text: "Examples of Forces" }]);
deck.half(
  30,
  "image", [], {
    src: "typesOfForce",
    showAt: 21,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets", [
    { text: "Friction opposes motion", showAt: 22 },
    { text: "Tension in ropes and cables", showAt: 23 },
    { text: "Gravity pulls objects down", showAt: 24 },
    { text: "Applied force by hand or tool", showAt: 25 }
  ],
  { lineGap: 58, fontSize: 30 }
);

// Slide 5: Wrap-Up Quote
deck.addHeader("header", [{ text: "Final Thoughts" }]);
deck.full(38, "quote", [
  { text: "The most incomprehensible thing", showAt: 32 },
  { text: "about the world", showAt: 33 },
  { text: "is that it is comprehensible.", showAt: 34 },
  { text: "— Albert Einstein", showAt: 35 }
]);

export const presentationData = deck.build();
