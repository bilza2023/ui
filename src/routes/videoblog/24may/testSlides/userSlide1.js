// realNumbersPresentation.js – Real Numbers (14–17 yrs)

import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import {getDefaultBackground} from "../editor/getDefaultBackground.js";

// 1. Initialize deck
const theme = GlobalThemes.royalBlue;
const deck  = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(getDefaultBackground(theme));

// 2. No header for this test
deck.clearHeader();

// 3. Bullet data (left column)
const bulletsData = [
  { text: "Point A", showAt: 1 },
  { text: "Point B", showAt: 2 },
  { text: "Point C", showAt: 3 }
];

// 4. Image config (right column)
const imgConfig = {
  src: "chalkboard",
  showAt: 1,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
};
debugger;
// 5. Build one half‐width slide
deck.half(
  10,
  "image",          // right component key
  [],               // right component data
  imgConfig,
  
  "bullets",        // left component key
  bulletsData,      // left component data
  { x: 40, y: 80, lineGap: 60 }, // left config

  
);

// Build and export the assembled presentation data
export const presentationData = deck.build();
