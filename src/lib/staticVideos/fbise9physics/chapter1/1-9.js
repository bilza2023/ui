import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – Purpose of Rounding
deck.addHeader("header", [{ text: "Why Round Numbers?" }]);
deck.full(6, "bullets", [
  { text: "Simplifies lengthy results", showAt: 1 },
  { text: "Matches measurement precision", showAt: 2 },
  { text: "Common in reporting scientific data", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Slide 2 – General Rules for Rounding
deck.addHeader("header", [{ text: "Basic Rounding Rules" }]);
deck.full(12, "bullets", [
  { text: "If digit after is < 5 → drop it", showAt: 6 },
  { text: "If digit after is ≥ 5 → increase the last kept digit by 1", showAt: 7 },
  { text: "Only round final results, not intermediate steps", showAt: 8 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Slide 3 – Applying Rounding to Measurements
deck.addHeader("header", [{ text: "Rounding in Practice" }]);
deck.full(18, "bullets", [
  { text: "Match rounded result to significant figures", showAt: 13 },
  { text: "Keep units intact", showAt: 14 },
  { text: "Maintain scientific clarity", showAt: 15 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Finalize
export const presentationData = deck.build();
