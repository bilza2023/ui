import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – Why Use Scientific Notation?
deck.addHeader("header", [{ text: "The Need for Scientific Notation" }]);
deck.full(6, "bullets", [
  { text: "Scientific values can be very large or tiny", showAt: 1 },
  { text: "Writing them in full is impractical", showAt: 2 },
  { text: "Scientific notation makes them manageable", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Slide 2 – What is Scientific Notation?
deck.addHeader("header", [{ text: "Format of Scientific Notation" }]);
deck.startQuickHalf(12);
deck.setLeftHalf("bullets", [
  { text: "General form: N × 10ⁿ", showAt: 6 },
  { text: "N is a number between 1 and 10", showAt: 7 },
  { text: "n is an integer (positive or negative)", showAt: 8 }
], {
  fontSize: 32,
  lineGap: 60,
  gapFromTop: 70
});
deck.setRightHalf("image", [], {
  src: "physicsClass", // fallback for 'notationFormulaDiagram'
  showAt: 6,
  width: 340,
  height: 280,
  margin: 20
});
deck.commitHalf();

// Slide 3 – Examples in Physics
deck.addHeader("header", [{ text: "Scientific Notation in Action" }]);
deck.startQuickHalf(18);
deck.setLeftHalf("bullets", [
  { text: "Speed of light: 3.0 × 10⁸ m/s", showAt: 13 },
  { text: "Radius of hydrogen atom: 5.3 × 10⁻¹¹ m", showAt: 14 },
  { text: "Earth’s mass: 5.97 × 10²⁴ kg", showAt: 15 }
], {
  fontSize: 32,
  lineGap: 60,
  gapFromTop: 70
});
deck.setRightHalf("image", [], {
  src: "physicsClass", // fallback for 'physicsExamplesNotation'
  showAt: 13,
  width: 340,
  height: 280,
  margin: 20
});
deck.commitHalf();

// Finalize
export const presentationData = deck.build();
