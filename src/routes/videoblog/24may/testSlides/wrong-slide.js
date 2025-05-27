// userSlide1.js

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import {getDefaultBackground} from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();

// Theme & background setup
const themeUsed = GlobalThemes.pastel;
deck.setGlobalTheme(themeUsed);
debugger;
deck.setGlobalBackground(getDefaultBackground(themeUsed));

let t = 0; // start time marker

deck.add(templates.imageWithCaption, t += 6, {
  src: "chalkboard",
  caption: "A classroom scene representing traditional learning."
});

deck.add(templates.centeredHeading, t += 6, {
  text: "Chapter 2 — Visual Thinking"
});

deck.add(templates.featureGrid4, t += 10, {
  features: [
    { icon: "BULB", label: "Creative" },
    { icon: "STAR", label: "Reliable" },
    { icon: "ROCKET", label: "Fast" },
    { icon: "HEART", label: "Loved" }
  ]
});

deck.add(templates.quoteSlide, t += 6, {
  text: [
    "“The ink of the scholar",
    "is more sacred",
    "than the blood of the martyr.”"
  ],
  author: "— Prophet Muhammad ﷺ",
  fontSize: 52,
  lineHeight: 1.5
});

// deck.add(templates.imageLeftWithBullets, t += 10, {
//   src: "chalkboard",
//   bullets: [
//     { text: "Visuals are powerful", showAt: 1 },
//     { text: "They aid retention", showAt: 3 },
//     { text: "They engage learners", showAt: 5 }
//   ]
// });

deck.add(templates.titleWith3Bullets, t += 10, {
  title: "Why Islam?",
  bullets: [
    { text: "In the Name of Allah", showAt: 1 },
    { text: "Most Merciful", showAt: 3 },
    { text: "Most Compassionate", showAt: 8 }
  ]
});

deck.add(templates.headingWith2Bullets, t += 10, {
  title: "Core Values",
  bullets: [
    { text: "Integrity matters", showAt: 2 },
    { text: "Keep learning", showAt: 7 }
  ]
});

deck.add(templates.jumbotron, t += 5, {
  text: "Education for Everyone"
});

deck.add(templates.titleWith3Bullets, t += 10, {
  title: "Why Islam?",
  bullets: ["In the Name of Allah", "Most Merciful", "Most Compassionate"]
});
// deck.overrideLastSlideBackground({
//   pattern: {
//     type: "dots",
//     props: { color: themeUsed.primaryColor }
//   }
// });
// deck.overrideLastSlideBackground({
//   backgroundImage: "chalkboard"
// });

deck.add(templates.headingWithImage, t += 10, {
  title: "The Power of Visual Learning",
  src: "chalkboard"
});

export const presentationData = deck.build();
