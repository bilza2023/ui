import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../../editor";

// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – What is Measurement?
deck.addHeader("header", [{ text: "What is Measurement?" }]);
deck.full(6, "bullets", [
  { text: "Determining quantity by comparing with a standard", showAt: 1 },
  { text: "Fundamental in physics for observation and analysis", showAt: 2 },
  { text: "Units must be defined and consistent", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Slide 2 – Accuracy vs. Precision
deck.addHeader("header", [{ text: "Accuracy and Precision" }]);
deck.startQuickHalf(12);
deck.setLeftHalf("bullets", [
  { text: "Accuracy: Closeness to actual value", showAt: 6 },
  { text: "Precision: Repeatability of results", showAt: 7 },
  { text: "Both are important in experiments", showAt: 8 }
], {
  fontSize: 32,
  lineGap: 60,
  gapFromTop: 70
});
deck.setRightHalf("image", [], {
  src: "physicsClass", // fallback for 'targetWithArrows'
  showAt: 6,
  width: 340,
  height: 280,
  margin: 20
});
deck.commitHalf();

// Slide 3 – Types of Errors
deck.addHeader("header", [{ text: "Errors in Measurement" }]);
deck.full(18, "bullets", [
  { text: "Systematic errors: Consistent and predictable", showAt: 13 },
  { text: "Random errors: Unpredictable and vary", showAt: 14 },
  { text: "Human error is often unavoidable", showAt: 15 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});


// Finalize
export const presentationData = deck.build();
