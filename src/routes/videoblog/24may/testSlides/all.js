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
const slide2EndTime = 25;

/////////////////////////////
deck.add(templates.iconsGrid, slide2EndTime, {
  heading:        "Our Capabilities",
  headingShowAt:  slide1EndTime,
  columns:        4,
  itemSize:       80,
  gutterX:        60,
  gutterY:        80,
  startX:         120,
  startY:         220,
  items: [
    { icon: "BULB",     title: "Innovation",   showAt: slide1EndTime + 1 },
    { icon: "LOCK",     title: "Security",     showAt: slide1EndTime + 2 },
    { icon: "ROCKET",   title: "Performance",  showAt: slide1EndTime + 3 },
    { icon: "TOOLS",    title: "Tools",        showAt: slide1EndTime + 4 },
    { icon: "CIRCLE",   title: "Precision",    showAt: slide1EndTime + 5 }
  ]
});
/////////////////////////////


// deck.add(templates.iconList, slide2EndTime, {
//   items: [
//     { icon: "BULB",     x: 100, y: 200, title: "Idea",             showAt: slide1EndTime + 1 },
//     { icon: "LOCK",     x: 100, y: 400, title: "Security",         showAt: slide1EndTime + 2 },
//     { icon: "ROCKET",   x: 400, y: 200, title: "Fast Performance", showAt: slide1EndTime + 3 },
//     { icon: "CHARTDOWN",x: 400, y: 400, title: "Analytics",        showAt: slide1EndTime + 4 },
//     { icon: "CIRCLE",   x: 700, y: 200, title: "Overview",         showAt: slide1EndTime + 5 },
//     { icon: "CLOCK",    x: 700, y: 400, title: "Time Savings",     showAt: slide1EndTime + 6 },
//     { icon: "EXPLOSION",x: 100, y: 100, title: "Analytics",        showAt: slide1EndTime + 7 },
//     { icon: "ELLIPSE",   x: 400, y: 50, title: "Overview",         showAt: slide1EndTime + 8 },
//     { icon: "FILESBOX",    x: 700, y: 50, title: "Time Savings",     showAt: slide1EndTime + 9 },
//   ]
// });

/////////////////////////////
// deck.add(templates.quoteSlide, slide2EndTime, {
//   lines: [
//     { text: "The Ink of the Scholar",   showAt:       slide1EndTime + 1 },
//     { text: "is More Sacred",            showAt:      slide1EndTime + 2 },
//     { text: "than the Blood of the Martyr.", showAt:  slide1EndTime + 3 }
//   ],
//   author: { text: "Prophet Muhammad ", showAt: slide1EndTime + 4 }
// });
/////////////////////////////
    // deck.add(templates.imageLeftWithBullets, slide2EndTime, {
    //   src:         "drops",
    //   imageShowAt: slide1EndTime,
    //   bullets: [
    //     { text: "Point A", showAt: slide1EndTime + 2 },
    //     { text: "Point B", showAt: slide1EndTime + 3 },
    //     { text: "Point B", showAt: slide1EndTime + 4 }
    //   ],
    //   lineGap:     120
    // });
/////////////////////////////
// deck.add(templates.imageWithCaption, slide2EndTime, {
//   src:             "drops",
//   showAt:          slide1EndTime,       // image fades in immediately
//   caption:         "The Dew Drops Of Rain.",
//   captionShowAt:   slide1EndTime + 1    // caption fades in 1s after image
// });
/////////////////////////////
// deck.add(templates.headingWithImage, slide2EndTime, {
//   title:       "Our Story",
//   titleShowAt: slide1EndTime,            // heading appears immediately
//   imageSrc:    "chalkboard",
//   imageShowAt: slide1EndTime + 1         // image fades in 1s after slide start
// });
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