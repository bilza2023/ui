// demoPresentation.js  –  stitched 10-slide example

import { DeckBuilder }      from "../editor";
import { templates }        from "../editor/templates/index.js";
import { GlobalThemes }     from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();
const themeUsed = GlobalThemes.neonDark;

deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

let t = 0;                 // master timeline cursor (seconds)

/*───────────────────────────
  Slide 1  |  0 – 10  · Title + 3 bullets
───────────────────────────*/
t += 10;
deck.add(templates.titleWith3Bullets, t, {
  title:  "Taleem Help Demo",
  bullets: [
    { text: "An AI First Institute",   showAt: t - 8 },
    { text: "State of Art Education",          showAt: t - 5 },
    { text: "Cutting Edge Technologies",     showAt: t - 3 }
  ]
});
deck.overrideLastSlideBackground({
  pattern: { type: "dots", props: { color: themeUsed.primaryColor } }
});

/*───────────────────────────
  Slide 2  | 10 – 15  · Centered heading
───────────────────────────*/
const slide2Start = t;
t += 5;
deck.add(templates.centeredHeading, t, {
  text:   "Taleem Help Vision",
  showAt: slide2Start + 1            // fade at 11 s
});

/*───────────────────────────
  Slide 3  | 15 – 25  · Icons grid
───────────────────────────*/
const slide3Start = t;
t += 10;
deck.add(templates.iconsGrid, t, {
  heading:        "Our Capabilities",
  headingShowAt:  slide3Start,
  columns:        4,
  items: [
    { icon: "BULB",   title: "Innovation", showAt: slide3Start + 1 },
    { icon: "LOCK",   title: "Security",   showAt: slide3Start + 2 },
    { icon: "ROCKET", title: "Performance",showAt: slide3Start + 3 },
    { icon: "TOOLS",  title: "Tools",      showAt: slide3Start + 4 },
    { icon: "CIRCLE", title: "Precision",  showAt: slide3Start + 5 }
  ]
});

/*───────────────────────────
  Slide 4  | 25 – 35  · Icon list (free-form positions)
───────────────────────────*/
const slide4Start = t;
t += 10;
deck.add(templates.iconList, t, {
  items: [
    { icon: "BULB",   x: 120, y: 220, title: "Idea",          showAt: slide4Start + 1 },
    { icon: "LOCK",   x: 120, y: 400, title: "Security",      showAt: slide4Start + 2 },
    { icon: "DEL",   x: 120, y: 620, title: "Security",      showAt: slide4Start + 3 },
    
    { icon: "ROCKET", x: 420, y: 220, title: "Speed",         showAt: slide4Start + 4 },
    { icon: "EXPLOSION",  x: 420, y: 400, title: "Tools",         showAt: slide4Start + 5 },
    { icon: "ELLIPSE",  x: 420, y: 620, title: "Tools",         showAt: slide4Start + 6 },
  ]
});

/*───────────────────────────
  Slide 5  | 35 – 45  · Quote
───────────────────────────*/
const slide5Start = t;
t += 10;
deck.add(templates.quoteSlide, t, {
  lines: [
    { text: "“The ink of the scholar",           showAt: slide5Start + 1 },
    { text: "is more sacred",                    showAt: slide5Start + 2 },
    { text: "than the blood of the martyr.”",    showAt: slide5Start + 3 }
  ],
  author: { text: "— Prophetic Tradition",       showAt: slide5Start + 4 }
});

/*───────────────────────────
  Slide 6  | 45 – 55  · Image left + bullets
───────────────────────────*/
const slide6Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src:         "drops",
  imageShowAt: slide6Start,
  bullets: [
    { text: "Future Proof Yourself", showAt: slide6Start + 2 },
    { text: "Updated Education", showAt: slide6Start + 3 },
    { text: "Systems Mindset", showAt: slide6Start + 4 }
  ]
});

/*───────────────────────────
  Slide 7  | 55 – 63  · Image with caption
───────────────────────────*/
const slide7Start = t;
t += 8;
deck.add(templates.imageWithCaption, t, {
  src:           "drops",
  showAt:        slide7Start,
  caption:       "The beauty of Complete Understanding",
  captionShowAt: slide7Start + 1
});

/*───────────────────────────
  Slide 8  | 63 – 73  · Heading + image
───────────────────────────*/
const slide8Start = t;
t += 10;
deck.add(templates.headingWithImage, t, {
  title:       "Our Story",
  titleShowAt: slide8Start,
  imageSrc:    "chalkboard",
  imageShowAt: slide8Start + 1
});

/*───────────────────────────
  Slide 9  | 73 – 81  · Heading + 2 bullets
───────────────────────────*/
const slide9Start = t;
t += 8;
deck.add(templates.headingWith2Bullets, t, {
  title:       "Why Taleem Help",
  titleShowAt: slide9Start,
  bullets: [
    { text: "Eucation to Business",  showAt: slide9Start + 2 },
    { text: "Cutting Edge Technologies", showAt: slide9Start + 5 }
  ]
});

/*───────────────────────────
  Slide 10 | 81 – 91  · Feature grid (2×2)
───────────────────────────*/
const slide10Start = t;
t += 10;
deck.add(templates.featureGrid4, t, {
  features: [
    { icon: "BULB",   label: "Future Vision",      showAt: slide10Start },
    { icon: "LOCK",   label: "Secure Future",    showAt: slide10Start + 1 },
    { icon: "ROCKET", label: "Technical Dev",    showAt: slide10Start + 2 },
    { icon: "TOOLS",  label: "Skills",  showAt: slide10Start + 3 }
  ]
});

/*───────────────────────────
  Build deck
───────────────────────────*/
export const presentationData = deck.build();
