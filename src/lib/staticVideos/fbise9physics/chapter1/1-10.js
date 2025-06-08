import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 – Why These Rules Matter
deck.addHeader("header", [{ text: "Importance of Sig Fig Rules" }]);
deck.full(6, "bullets", [
  { text: "Helps ensure accuracy in reporting results", showAt: 1 },
  { text: "Maintains consistency across experiments", showAt: 2 },
  { text: "Avoids misleading precision", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Slide 2 – Key Rules for Identifying Significant Figures
deck.addHeader("header", [{ text: "Rules for Significant Figures" }]);
deck.full(12, "bullets", [
  { text: "Non-zero digits are always significant", showAt: 6 },
  { text: "Zeros between non-zero digits are significant", showAt: 7 },
  { text: "Leading zeros are not significant", showAt: 8 },
  { text: "Trailing zeros are significant only if decimal is present", showAt: 9 }
], {
  fontSize: 32,
  lineGap: 62,
  alignment: "top",
  textAlign: "center",
  gapFromTop: 60
});

// Slide 3 – Apply the Rules
deck.addHeader("header", [{ text: "Examples of Significant Figures" }]);
deck.full(18, "bullets", [
  { text: "0.00450 → 3 sig figs", showAt: 13 },
  { text: "1500 → 2 sig figs (if no decimal)", showAt: 14 },
  { text: "2.300 → 4 sig figs", showAt: 15 }
], {
  fontSize: 36,
  lineGap: 70,
  alignment: "center",
  textAlign: "center",
  gapFromTop: 80
});

// Finalize
export const presentationData = deck.build();
