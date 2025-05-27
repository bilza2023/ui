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
deck.add(templates.titleWith3Bullets, t += 10, {
  title: "Why Islam?",
  bullets: [
    { text: "In the Name of Allah", showAt: 2 },
    { text: "Most Merciful", showAt: 5 },
    { text: "Most Compassionate", showAt: 7 }
  ]
});
deck.overrideLastSlideBackground({
  pattern: {
    type: "dots",
    props: { color: themeUsed.primaryColor }
  }
});

deck.add(templates.centeredHeading, t += 15, {
  text: "Chapter 1: Introduction",
  showAt: 11,          // absolute timeline time
  duration: 1         // fade duration in seconds
});

/////////////////////////////////////////////////////
// Build deck
export const presentationData = deck.build();
