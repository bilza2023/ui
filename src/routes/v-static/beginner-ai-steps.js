
import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("taleemclass", 0.07);

// Slide 1: Welcome
deck.addHeader("header", [{ text: "Beginner’s Guide to AI" }]);
deck.half(5,
  "bullets", [
    { text: "AI is shaping our world", showAt: 1 },
    { text: "Here’s how to start learning", showAt: 2 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "femaleTeacher", showAt: 1, width: 360, height: 280 }
);

// Slide 2: What is AI?
deck.half(10,
  "bullets", [
    { text: "Machines that learn from data", showAt: 6 },
    { text: "Used in apps, games, and more", showAt: 7 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "class", showAt: 6, width: 360, height: 280 }
);

// Slide 3: Step 1 – Growth Mindset
deck.half(15,
  "bullets", [
    { text: "Ask questions", showAt: 11 },
    { text: "Be okay with failure", showAt: 12 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "appleFallingFromTree", showAt: 11, width: 360, height: 280 }
);

// Slide 4: Step 2 – Learn Basics
deck.half(20,
  "bullets", [
    { text: "Start with Python", showAt: 16 },
    { text: "Use beginner tools", showAt: 17 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "taleemclass", showAt: 16, width: 360, height: 280 }
);

// Slide 5: Step 3 – Understand AI
deck.half(25,
  "bullets", [
    { text: "Machine learning is key", showAt: 21 },
    { text: "Data trains models", showAt: 22 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "class", showAt: 21, width: 360, height: 280 }
);

// Slide 6: Step 4 – Build Projects
deck.half(30,
  "bullets", [
    { text: "Start with simple apps", showAt: 26 },
    { text: "Use visual tools", showAt: 27 }
  ],
  { fontSize: 34, lineGap: 66, gapFromTop: 60 },
  "image", [], { src: "everyDayItems", showAt: 26, width: 360, height: 280 }
);

// Slide 7: Step 5 – Join Community
deck.half(35,
  "bullets", [
    { text: "Watch AI tutorials", showAt: 31 },
    { text: "Join online forums", showAt: 32 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "drops", showAt: 31, width: 360, height: 280 }
);

// Slide 8: Step 6 – Keep Growing
deck.half(40,
  "bullets", [
    { text: "Explore deep learning", showAt: 36 },
    { text: "Try real data challenges", showAt: 37 }
  ],
  { fontSize: 36, lineGap: 68, gapFromTop: 60 },
  "image", [], { src: "rocketTakeoff", showAt: 36, width: 360, height: 280 }
);

// Final Slide – Quote
deck.full(45, "quote", [
  { text: "AI isn’t just about machines —", showAt: 41 },
  { text: "it’s about us learning to teach them.", showAt: 42 }
], {
  author: { text: "— AI Learning Path", showAt: 43 },
  fontSize: 46,
  lineHeight: 1.4,
  startY: 120
});

export const presentationData = deck.build();
