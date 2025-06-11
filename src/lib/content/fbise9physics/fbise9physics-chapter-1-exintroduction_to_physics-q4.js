import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.07); // fallback

// Slide 1 – Title
deck.addHeader("header", [{ text: "Pakistan's Education Crisis" }]);
deck.full(5, "quote", [
  { text: "A broken system needs bold fixes.", showAt: 1 },
  { text: "Let's explore the problems — and the solutions.", showAt: 3 }
], {
  author: { text: "— Taleem.Help", showAt: 4 },
  fontSize: 42,
  lineHeight: 1.5,
  startY: 120
});

// Slide 2 – Problem: Poor Infrastructure
deck.half(
  11,
  "bullets", [
    { text: "Leaky roofs and broken walls", showAt: 6 },
    { text: "No electricity or clean water", showAt: 7 },
    { text: "Unsafe buildings for learning", showAt: 8 }
  ], {
    fontSize: 34,
    lineGap: 60,
    gapFromTop: 60,
    leftMargin: 40
  },
  "image", [], {
    src: "taleemclass",
    showAt: 6,
    width: 360,
    height: 280,
    margin: 20
  }
);

// Slide 3 – Problem: Teacher Shortages
deck.half(
  17,
  "image", [], {
    src: "femaleTeacher",
    showAt: 12,
    width: 360,
    height: 280,
    margin: 20
  },
  "bullets", [
    { text: "No teachers in 20% of schools", showAt: 12 },
    { text: "Untrained and unmotivated", showAt: 13 },
    { text: "Low accountability", showAt: 14 }
  ], {
    fontSize: 34,
    lineGap: 60,
    gapFromTop: 60,
    leftMargin: 40
  }
);

// Slide 4 – Impact: Who Suffers?
deck.full(22, "bullets", [
  { text: "Girls in rural areas left behind", showAt: 18 },
  { text: "Poor children drop out early", showAt: 19 },
  { text: "Urban-rural gap keeps growing", showAt: 20 }
], {
  fontSize: 34,
  lineGap: 68,
  gapFromTop: 70,
  textAlign: "center"
});

// Slide 5 – Real Solutions
deck.full(28, "bullets", [
  { text: "Double funding for public schools", showAt: 23 },
  { text: "Train teachers with modern tools", showAt: 24 },
  { text: "Incentivize rural education", showAt: 25 }
], {
  fontSize: 34,
  lineGap: 68,
  textAlign: "center",
  gapFromTop: 70
});

// Slide 6 – Innovation to the Rescue
deck.half(
  34,
  "bullets", [
    { text: "Mobile learning apps expand reach", showAt: 29 },
    { text: "Community-led schools fill the gap", showAt: 30 },
    { text: "Youth-driven advocacy gains power", showAt: 31 }
  ], {
    fontSize: 34,
    lineGap: 64,
    gapFromTop: 60,
    leftMargin: 40
  },
  "image", [], {
    src: "rocketTakeoff",
    showAt: 29,
    width: 360,
    height: 280,
    margin: 20
  }
);

// Slide 7 – Final Message
deck.full(40, "quote", [
  { text: "Education must be our top priority.", showAt: 35 },
  { text: "It’s not just a right — it’s survival.", showAt: 37 }
], {
  author: { text: "— Taleem.Help", showAt: 39 },
  fontSize: 44,
  lineHeight: 1.5,
  startY: 120
});

export const presentationData = deck.build();
