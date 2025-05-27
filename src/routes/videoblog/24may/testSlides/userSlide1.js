// userSlide1.js – example presentation using global timeline `t`

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();

// Setup
const themeUsed = GlobalThemes.pastel;
deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

// Slide 1: Title with 3 Bullets
// Each bullet appears at a specific time on the global timeline
// Slide duration: 10s


const slide1StartTime = 0;
const slide1EndTime = 10;
// debugger;
deck.add(templates.titleWith3Bullets, slide1EndTime, {
  title: "Why Islam?",
  bullets: [
    { text: "In the Name of Allah", showAt: slide1StartTime + 2 },
    { text: "Most Merciful", showAt: slide1StartTime + 5 },
    { text: "Most Compassionate", showAt: slide1StartTime + 7 }
  ]
});
deck.overrideLastSlideBackground({
  pattern: {
    type: "dots",
    props: { color: themeUsed.primaryColor }
  }
});

// Slide 2: Centered Heading
// Appears at t + 1s after slide start
// Slide duration: 15s
const slide2EndTime = 15;

/////////////////////////////
// deck.add(templates.headingWith2Bullets, slide2EndTime, {
//   title:         "Key Takeaways",
//   titleShowAt:   slide1EndTime,         // fade in heading immediately at slide start
//   bullets: [
//     { text: "First point",  showAt: slide1EndTime + 2 },
//     { text: "Second point", showAt: slide1EndTime + 3 }
//   ]
// });
/////////////////////////////
// deck.add(templates.featureGrid4, slide2EndTime, {
//   features: [
//     { icon: "BULB", label: "Fast",      showAt:       slide1EndTime },
//     { icon: "LOCK", label: "Secure",    showAt:     slide1EndTime + 1 },
//     { icon: "ROCKET", label: "Smooth",  showAt:   slide1EndTime + 2 },
//     { icon: "TOOLS", label: "Flexible", showAt:  slide1EndTime + 3 }
//   ]
// });
/////////////////////////////
// deck.add(templates.centeredHeading, slide2EndTime, {
//   text: "Chapter 1: Introduction",
//   showAt: slide1EndTime + 1 ///// note this 
// });

// Build deck
export const presentationData = deck.build();