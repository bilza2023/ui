import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – SI Prefixes: The Basics
deck.addHeader("header", [{ text: "What Are SI Prefixes?" }]);
deck.full(6, "bullets", [
  { text: "Help express very large or very small values", showAt: 1 },
  { text: "Applied before SI units (e.g., kilometer, milligram)", showAt: 2 },
  { text: "Each prefix represents a specific power of ten", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Slide 2 – Frequently Used Prefixes
deck.addHeader("header", [{ text: "Common SI Prefixes" }]);
deck.startQuickHalf(12);
deck.setLeftHalf("bullets", [
  { text: "kilo (k) = 10³ → 1 kilometer = 1000 meters", showAt: 6 },
  { text: "centi (c) = 10⁻² → 1 centimeter = 0.01 meter", showAt: 7 },
  { text: "milli (m) = 10⁻³ → 1 milligram = 0.001 gram", showAt: 8 }
], {
  fontSize: 32,
  lineGap: 60,
  gapFromTop: 70
});
deck.setRightHalf("image", [], {
  src: "physicsClass", // fallback for 'prefixScaleEveryday'
  showAt: 6,
  width: 340,
  height: 280,
  margin: 20
});
deck.commitHalf();

// Slide 3 – Why Prefixes Matter
deck.addHeader("header", [{ text: "Why Use Prefixes?" }]);
deck.full(18, "bullets", [
  { text: "Make measurements easier to read and write", showAt: 13 },
  { text: "Avoid long strings of zeros", showAt: 14 },
  { text: "Standardized use in all sciences", showAt: 15 }
], {
  fontSize: 34,
  lineGap: 66,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Finalize
export const presentationData = deck.build();
