import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1: Introduction to Newton's Laws
deck.addHeader("header", [{ text: "Introduction to Newton's Laws" }]);
deck.full(6, "bullets", [
  { text: "Isaac Newton formulated three fundamental laws of motion.", showAt: 1 },
  { text: "These laws explain how objects move and interact.", showAt: 3 },
  { text: "They are the foundation of classical mechanics.", showAt: 5 }
]);

// Slide 2: Newton's First Law - Inertia
deck.addHeader("header", [{ text: "Newton's First Law" }]);
deck.half(
  12,
  "image", [], {
    src: "whatisforce",
    showAt: 7
  },
  "bullets", [
    { text: "An object remains at rest or in uniform motion unless acted upon.", showAt: 8 },
    { text: "This resistance to change is called inertia.", showAt: 10 }
  ],
  { fontSize: 32, lineGap: 80 }
);

// Slide 3: Newton's Second Law - Force and Acceleration
deck.addHeader("header", [{ text: "Newton's Second Law" }]);
deck.full(18, "barchart", [
  { value: 30, label: "Low Force", color: "#3498db", showAt: 13 },
  { value: 60, label: "Medium", color: "#e67e22", showAt: 14 },
  { value: 90, label: "High", color: "#2ecc71", showAt: 15 }
], {
  maxValue: 100,
  height: 240,
  barPadding: 18,
  maxBarWidth: 28,
  fontSize: 22,
  labelFontSize: 20
});

// Slide 4: Newton's Third Law - Action and Reaction
deck.addHeader("header", [{ text: "Newton's Third Law" }]);
deck.full(24, "quote", [
  { text: "For every action,", showAt: 19 },
  { text: "there is an equal and opposite reaction.", showAt: 21 }
], {
  author: { text: "- Newton's Third Law", showAt: 22 },
  fontSize: 48,
  lineHeight: 1.4,
  startY: 140
});

// Slide 5: Summary of Newton's Laws
deck.addHeader("header", [{ text: "Summary of Newton's Laws" }]);
deck.full(30, "bullets", [
  { text: "1st Law: Objects resist changes in motion (inertia).", showAt: 25 },
  { text: "2nd Law: F = ma — force equals mass times acceleration.", showAt: 27 },
  { text: "3rd Law: Every action has an equal and opposite reaction.", showAt: 29 }
]);

export const presentationData = deck.build();
