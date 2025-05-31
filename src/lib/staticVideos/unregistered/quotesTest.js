import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../editor";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.2);

// Slide 1: Basic quote - well-distributed lines
deck.addHeader("header", [{ text: "Quote Component - Basic" }]);
deck.full(4, "quote", [
  { text: "Education is", showAt: 1 },
  { text: "the most powerful weapon", showAt: 2 },
  { text: "which you can use", showAt: 3 },
  { text: "to change the world.", showAt: 4 }
], {
  author: { text: "- Nelson Mandela", showAt: 5 },
  fontSize: 46,
  lineHeight: 1.7,
  startY: 120
});

// Slide 2: Second quote - broken into short lines
deck.addHeader("header", [{ text: "Quote Component - Second Example" }]);
deck.full(8, "quote", [
  { text: "The only limit", showAt: 1 },
  { text: "to our realization", showAt: 2 },
  { text: "of tomorrow is", showAt: 3 },
  { text: "our doubts of today.", showAt: 4 }
], {
  author: { text: "- F.D. Roosevelt", showAt: 5 },
  fontSize: 46,
  lineHeight: 1.7,
  startY: 120
});

// Slide 3: Custom layout - improved fill with 3 lines
deck.addHeader("header", [{ text: "Quote Component - Custom Layout" }]);
deck.full(12, "quote", [
  { text: "Imagination is more", showAt: 1 },
  { text: "important than knowledge,", showAt: 2 },
  { text: "because it has no limit.", showAt: 3 }
], {
  author: { text: "- Albert Einstein", showAt: 4 },
  fontSize: 50,
  lineHeight: 1.8,
  startY: 130
});

// Slide 4: Pyramid styled quote
deck.addHeader("header", [{ text: "Quote Component - Pyramid Style" }]);
deck.full(16, "quote", [
  { text: "Think", showAt: 1 },
  { text: "Think deeper", showAt: 2 },
  { text: "Think without limits", showAt: 3 },
  { text: "Think different", showAt: 4 }
], {
  author: { text: "- Inspired by Jobs", showAt: 5 },
  fontSize: 48,
  lineHeight: 1.8,
  startY: 120
});

export const presentationData = deck.build();
