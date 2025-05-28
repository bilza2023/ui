// realNumbersPresentation.js – Real Numbers (14–17 yrs)

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();
const themeUsed = GlobalThemes.neonDark;

deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

let t = 0;

/*──────────────────────────────
  Slide 1  | 0 – 10 · Title
──────────────────────────────*/
t += 10;
deck.add(templates.titleWith3Bullets, t, {
  title: "Introduction to Real Numbers",
  bullets: [
    { text: "Used in daily life", showAt: t - 8 },
    { text: "Foundation of all math", showAt: t - 5 },
    { text: "Includes many types", showAt: t - 3 }
  ]
});
deck.overrideLastSlideBackground({
  pattern: { type: "dots", props: { color: themeUsed.primaryColor } }
});

/*──────────────────────────────
  Slide 2  | 10 – 20 · History
──────────────────────────────*/
const slide2Start = t;
t += 10;
deck.add(templates.titleWith3Bullets, t, {
  title: "A Brief History",
  bullets: [
    { text: "Greeks started with whole numbers", showAt: slide2Start + 1 },
    { text: "Rational numbers in trade", showAt: slide2Start + 3 },
    { text: "Irrationals surprised mathematicians", showAt: slide2Start + 6 }
  ]
});

/*──────────────────────────────
  Slide 3  | 20 – 30 · Quote
──────────────────────────────*/
const slide3Start = t;
t += 10;
deck.add(templates.quoteSlide, t, {
  lines: [
    { text: "“The discovery of irrational numbers", showAt: slide3Start + 1 },
    { text: "was a turning point in math.”", showAt: slide3Start + 2 }
  ],
  author: { text: "— Math Historian", showAt: slide3Start + 4 }
});

/*──────────────────────────────
  Slide 4  | 30 – 40 · Types (as bullets)
──────────────────────────────*/
const slide4Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "drops",
  imageShowAt: slide4Start,
  bullets: [
    { text: "Natural: 1, 2, 3", showAt: slide4Start + 1 },
    { text: "Whole: 0, 1, 2", showAt: slide4Start + 2 },
    { text: "Integers: -2, 0, 3", showAt: slide4Start + 3 },
    { text: "Rational: 1/2, 0.75", showAt: slide4Start + 4 },
    { text: "Irrational: π, √2", showAt: slide4Start + 5 }
  ]
});

/*──────────────────────────────
  Slide 5  | 40 – 50 · Natural Numbers
──────────────────────────────*/
const slide5Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "femaleTeacher",
  imageShowAt: slide5Start,
  bullets: [
    { text: "Start from 1", showAt: slide5Start + 2 },
    { text: "Used for counting", showAt: slide5Start + 4 }
  ]
});

/*──────────────────────────────
  Slide 6  | 50 – 60 · Whole Numbers
──────────────────────────────*/
const slide6Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "chalkboard",
  imageShowAt: slide6Start,
  bullets: [
    { text: "Include zero", showAt: slide6Start + 2 },
    { text: "Natural + 0", showAt: slide6Start + 4 }
  ]
});

/*──────────────────────────────
  Slide 7  | 60 – 70 · Integers
──────────────────────────────*/
const slide7Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "chalkboard",
  imageShowAt: slide7Start,
  bullets: [
    { text: "Negative + Positive + Zero", showAt: slide7Start + 2 },
    { text: "Examples: -3, 0, 2", showAt: slide7Start + 4 }
  ]
});

/*──────────────────────────────
  Slide 8  | 70 – 80 · Rational Numbers
──────────────────────────────*/
const slide8Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "chalkboard",
  imageShowAt: slide8Start,
  bullets: [
    { text: "Written as fractions", showAt: slide8Start + 2 },
    { text: "e.g., 1/2, 0.75", showAt: slide8Start + 4 }
  ]
});

/*──────────────────────────────
  Slide 9  | 80 – 90 · Irrational Numbers
──────────────────────────────*/
const slide9Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "chalkboard",
  imageShowAt: slide9Start,
  bullets: [
    { text: "Not written as fractions", showAt: slide9Start + 2 },
    { text: "e.g., π, √2", showAt: slide9Start + 4 }
  ]
});

/*──────────────────────────────
  Slide 10 | 90 – 100 · Summary
──────────────────────────────*/
const slide10Start = t;
t += 10;
deck.add(templates.titleWith3Bullets, t, {
  title: "Summary",
  bullets: [
    { text: "Real numbers = all useful numbers", showAt: slide10Start + 1 },
    { text: "They form the number line", showAt: slide10Start + 3 },
    { text: "Understanding them = powerful math", showAt: slide10Start + 6 }
  ]
});

/*──────────────────────────────
  Build deck
──────────────────────────────*/
export const presentationData = deck.build();


// import { templates }      from "../editor/templates/index.js";
// import { itemTemplates }  from "../editor/itemTemplates/index.js";

// deck.add(
//   templates.headerHalfBody,     // choose one of the four core fns
//   tEnd,
//   {
//     header: {
//       fn: itemTemplates.titleBar,
//       data: { text: "Lesson 1: Real Numbers" }
//     },
//     body: {
//       fn: itemTemplates.bulletListHalf,
//       data: { lines: ["Natural", "Whole", "Integers"] }
//     },
//     footer: {
//       fn: itemTemplates.progressFooter,
//       data: { current: 1, total: 10 }
//     }
//   }
// );
