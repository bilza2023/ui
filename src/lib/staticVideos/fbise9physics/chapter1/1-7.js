import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – Understanding Measurement Uncertainty
deck.addHeader("header", [{ text: "What is Uncertainty?" }]);
deck.full(6, "bullets", [
  { text: "No instrument is 100% perfect", showAt: 1 },
  { text: "Uncertainty = range within which true value lies", showAt: 2 },
  { text: "It’s not a mistake—it's part of the process", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Slide 2 – Where Does Uncertainty Come From?
deck.addHeader("header", [{ text: "Sources of Uncertainty" }]);
deck.full(12, "bullets", [
  { text: "Instrument limitations", showAt: 6 },
  { text: "Observer reaction time", showAt: 7 },
  { text: "Environmental conditions", showAt: 8 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Slide 3 – How to Write Uncertainty
deck.addHeader("header", [{ text: "Expressing Uncertainty" }]);
deck.full(18, "bullets", [
  { text: "Format: (measured value ± uncertainty) units", showAt: 13 },
  { text: "Example: (5.0 ± 0.1) cm", showAt: 14 },
  { text: "Indicates range where true value lies", showAt: 15 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Finalize
export const presentationData = deck.build();
