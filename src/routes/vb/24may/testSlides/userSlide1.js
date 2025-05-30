import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { GlobalBackgrounds } from "../editor/theme/globalBackgrounds.js";

// Setup
const theme = GlobalThemes.pastel;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.gridBg(theme));

// deck.addHeader("header", [{ text: "Percentages" }]);
deck.addHeader("header", [{ text: "Examples of Forces" }]);
// Slide 2: Basic Physics Table
deck.full(10, "pieChart", [
  { value: 30, color: "#ff6666", showAt: 2 , label:"label-One"},
  { value: 70, color: "#66ccff", showAt: 3 , label:"label-Two"},
  { value: 50, color: "#99ff99", showAt: 4 , label:"label-Three"}
], {
  radius: 120
});

export const presentationData = deck.build();
