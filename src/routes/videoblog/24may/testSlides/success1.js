import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();
// debugger;
// Setup
const themeUsed = GlobalThemes.pastel;
deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

let t = 0; // Time tracker

// Slide 1: Title with 3 Bullets
deck.add(templates.titleWith3Bullets, t += 6, {
  title: "Why Islam?",
  bullets: [
    { text: "In the Name of Allah", showAt: 2 },
    { text: "Most Merciful", showAt: 3 },
    { text: "Most Compassionate", showAt: 4 }
  ]
});
deck.overrideLastSlideBackground({
  pattern: {
    type: "dots",
    props: { color: themeUsed.primaryColor }
  }
});

// Slide 2: Quote Slide
// deck.add(templates.quoteSlide, t += 6, {
//   text: [
//     "“The ink of the scholar",
//     "is more sacred",
//     "than the blood of the martyr.”"
//   ],
//   author: "— Prophet Muhammad ﷺ"
// });

// Build deck
export const presentationData = deck.build();
