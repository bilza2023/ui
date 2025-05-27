// workingSlides.js

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();

// Setup
const themeUsed = GlobalThemes.pastel;
deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

let t = 0; // Time tracker


deck.add(templates.titleWith3Bullets, t += 10, {
  title: "Why Islam?",
  bullets: [
    { text: "In the Name of Allah", showAt: 2 },
    { text: "Most Merciful", showAt: 3 },
    { text: "Most Compassionate", showAt: 4 }
  ]
});

// deck.overrideLastSlideBackground({backgroundImage:drops,backgroundImageOpacity:0.2});
deck.overrideLastSlideBackground({
  pattern: {
    type: "dots",
    props: { color: themeUsed.primaryColor }
  }
});
// debugger;
export const presentationData = deck.build();
