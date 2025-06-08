import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1: What is Physics?
deck.addHeader("header", [{ text: "What is Physics?" }]);
deck.half(
  6,
  "bullets", [
    { text: "Study of matter and energy", showAt: 1 },
    { text: "Explains natural laws", showAt: 2 },
    { text: "Basis of all sciences", showAt: 3 }
  ],
  {
    fontSize: 34,
    lineGap: 78,
    leftMargin: 40,
    gapFromTop: 60
  },
  "image", [],
  {
    src: "appleFallingFromTree",
    showAt: 1,
    width: 360,
    height: 280,
    margin: 20
  }
);

// Slide 2: Physics All Around Us
deck.addHeader("header", [{ text: "Physics All Around Us" }]);
deck.half(
  11,
  "image", [],
  {
    src: "rocketTakeoff",
    showAt: 6,
    width: 360,
    height: 280,
    margin: 20
  },
  "bullets", [
    { text: "Ripples in water", showAt: 7 },
    { text: "A ball falling to the ground", showAt: 8 },
    { text: "A rocket launching", showAt: 9 }
  ],
  {
    fontSize: 34,
    lineGap: 78,
    leftMargin: 40,
    gapFromTop: 60
  }
);

// Slide 3: Why Study Physics?
deck.addHeader("header", [{ text: "Why Study Physics?" }]);
deck.full(16, "bullets", [
  { text: "Answers how and why things happen", showAt: 12 },
  { text: "Helps invent tools and machines", showAt: 13 },
  { text: "Builds logical and problem-solving skills", showAt: 14 }
], {
  fontSize: 40,
  lineGap: 72,
  textAlign: "center",
  alignment: "center"
});

// Slide 4: Physics Drives Invention
deck.addHeader("header", [{ text: "Physics Drives Invention" }]);
deck.full(21, "image", [], {
  src: "physicsArt",
  showAt: 17,
  width: 800,
  height: 420,
  xOffset: 0,
  yOffset: 0
});

// Slide 5: Branches of Physics
deck.addHeader("header", [{ text: "Branches of Physics" }]);
deck.full(26, "bullets", [
  { text: "Mechanics – Motion and forces", showAt: 22 },
  { text: "Thermodynamics – Heat and energy", showAt: 23 },
  { text: "Electromagnetism – Electricity and magnetism", showAt: 24 },
  { text: "Modern Physics – Atoms and quantum", showAt: 25 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center"
});

// Slide 6: Physics at Home
deck.addHeader("header", [{ text: "Physics at Home" }]);
deck.half(
  31,
  "bullets", [
    { text: "Light bulbs and fans", showAt: 27 },
    { text: "Mobile phones and speakers", showAt: 28 },
    { text: "Cooking and refrigerators", showAt: 29 }
  ],
  {
    fontSize: 34,
    lineGap: 78,
    leftMargin: 40,
    gapFromTop: 60
  },
  "image", [],
  {
    src: "everyDayItems",
    showAt: 27,
    width: 360,
    height: 280,
    margin: 20
  }
);
// Slide 7: Conclusion Quote
deck.addHeader("header", [{ text: "Physics is All Around" }]);
deck.full(36, "quote", [
  { text: "From atoms to galaxies —", showAt: 32 },
  { text: "from motion to energy —", showAt: 33 },
  { text: "physics is the language.", showAt: 34 },
  { text: "of nature.", showAt: 35 }
], {
  author: { text: "— Lesson 1.1", showAt: 35 },
  fontSize: 46,
  lineHeight: 1.4,
  startY: 120
});


export const presentationData = deck.build();
