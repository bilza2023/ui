import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { GlobalBackgrounds } from "../editor/theme/globalBackgrounds.js";

// Setup
const theme = GlobalThemes.neonDark;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.gridBg(theme));

// Slide 2: Basic Physics Table
deck.full(10, "barGraph", [
  { value: 30, color: "#ff6666", showAt: 2 },
  { value: 70, color: "#66ccff", showAt: 3 },
  { value: 50, color: "#99ff99", showAt: 4 }
], 
{ height: 280 }
);


export const presentationData = deck.build();
