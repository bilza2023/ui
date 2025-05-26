// userSlide1.js

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import {getDefaultBackground} from "../editor/getDefaultBackground.js";


const deck = new DeckBuilder();
//Deck Setup 
const themeUsed = GlobalThemes.pastel;
deck.setGlobalTheme(themeUsed);
const bg = getDefaultBackground(themeUsed)
deck.setGlobalBackground(bg);
///////////////////////////////////////
deck.add(templates.scrollingListSlide, 35, {
  items: [
    { text: "Welcome to the session", showAt: 1 },
    { text: "Let's explore visual learning", showAt: 3 },
    { text: "Use images to boost understanding", showAt: 5 },
    { text: "Icons make content memorable", showAt: 7 },
    { text: "Bullets help organize thoughts", showAt: 9 },
    { text: "Text + visuals = magic", showAt: 11 },
    { text: "Animations guide attention", showAt: 13 },
    { text: "Keep designs clean", showAt: 15 },
    { text: "Consistency builds trust", showAt: 17 },
    { text: "Color adds emotion", showAt: 19 },
    { text: "Fonts should be readable", showAt: 21 },
    { text: "Less is more", showAt: 23 },
    { text: "Practice leads to mastery", showAt: 25 },
    { text: "Test and iterate", showAt: 27 },
    { text: "Thanks for watching!", showAt: 29 }
  ]
});

///////////////////////////////////////

// deck.add(templates.imageWithCaption, 10, {
//   src: "chalkboard",
//   caption: "A classroom scene representing traditional learning."
// });
// deck.add(templates.centeredHeading, 10, {
//   text: "Chapter 2 — Visual Thinking"
// });

/////////////////////////////////////////////////////

// deck.add(templates.featureGrid4, 20, {
//   features: [
//     { icon: "BULB", label: "Creative" },
//     { icon: "STAR", label: "Reliable" },
//     { icon: "ROCKET", label: "Fast" },
//     { icon: "HEART", label: "Loved" }
//   ]
// });

/////////////////////////////////////////////////////
// deck.add(templates.quoteSlide, 6, {
//   text: [
//     "“The ink of the scholar",
//     "is more sacred",
//     "than the blood of the martyr.”"
//   ],
//   author: "— Prophet Muhammad ﷺ",
//   fontSize: 52,
//   lineHeight: 1.5
// });

/////////////////////////////////////////////////////
// deck.add(templates.imageLeftWithBullets, 10, {
//   src: "chalkboard",
//   bullets: [
//     { text: "Visuals are powerful", showAt: 1 },
//     { text: "They aid retention", showAt: 3 },
//     { text: "They engage learners", showAt: 5 }
//   ]
// });

/////////////////////////////////////////////////////
// deck.add(templates.titleWith3Bullets, 10, {
//   title: "Why Islam?",
//   bullets: [
//     { text: "In the Name of Allah", showAt: 1 },
//     { text: "Most Merciful", showAt: 3 },
//     { text: "Most Compassionate", showAt: 8 }
//   ]
// });

/////////////////////////////////////////////////////
// deck.add(templates.headingWith2Bullets, 10, {
//   title: "Core Values",
//   bullets: [
//     { text: "Integrity matters", showAt: 2 },
//     { text: "Keep learning", showAt: 7 }
//   ]
// });

/////////////////////////////////////////////////////
// deck.add(templates.jumbotron, 5, {
//   text: "Education for Everyone"
// });
/////////////////////////////////////////////////////
// deck.add(templates.titleWith3Bullets, 10, 
// {title: "Why Islam?",bullets: ["In the Name of Allah", "Most Merficul", "Most Compasionate"]}
// );
// deck.overrideLastSlideBackground({
//   pattern: {
//     type: "dots",
//     props: {
//       color: themeUsed.primaryColor
//     }
//   }
// });
// deck.overrideLastSlideBackground({
//   backgroundImage: "chalkboard"
// });
/////////////////////////
// deck.add(templates.headingWithImage,20, 
//   {
//   title: "The Power of Visual Learning",
//   src: "chalkboard" // or any other valid image name
// });

export const presentationData = deck.build();