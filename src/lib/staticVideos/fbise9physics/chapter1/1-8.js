import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../../editor";

// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – Defining Significant Figures
deck.addHeader("header", [{ text: "What Are Significant Figures?" }]);
deck.full(6, "bullets", [
  { text: "Digits that carry meaning in a measurement", showAt: 1 },
  { text: "Reflect accuracy of the instrument", showAt: 2 },
  { text: "All non-zero digits are significant", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Slide 2 – Counting Significant Figures
deck.addHeader("header", [{ text: "Rules for Significant Figures" }]);
deck.full(12, "bullets", [
  { text: "Leading zeros → not significant", showAt: 6 },
  { text: "Captive zeros → significant", showAt: 7 },
  { text: "Trailing zeros → significant if after decimal", showAt: 8 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Slide 3 – Using Significant Figures in Math
deck.addHeader("header", [{ text: "Significant Figures in Calculations" }]);
deck.full(18, "bullets", [
  { text: "Add/Subtract: round to least decimal places", showAt: 13 },
  { text: "Multiply/Divide: round to least sig figs", showAt: 14 },
  { text: "Keeps results consistent with measurement accuracy", showAt: 15 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Finalize
export const presentationData = deck.build();
