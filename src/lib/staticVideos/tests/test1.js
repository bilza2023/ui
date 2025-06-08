import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1: Optimized spacing for short labels
deck.addHeader("header", [{ text: "Label Clarity - Short Names" }]);
deck.full(5, "barchart", [
  { label: "Math", value: 75, color: "#e74c3c" },
  { label: "Music", value: 55, color: "#3498db" },
  { label: "Biology", value: 90, color: "#2ecc71" }
]);

// Slide 2: Longer labels with extra spacing
deck.addHeader("header", [{ text: "Label Clarity - Long Names" }]);
deck.full(10, "barchart", [
  { label: "Geography", value: 65, color: "#f1c40f" },
  { label: "Chemistry", value: 85, color: "#8e44ad" },
  { label: "Literature", value: 40, color: "#1abc9c" }
]);

// Slide 3: Balanced layout
deck.addHeader("header", [{ text: "Balanced Spacing" }]);
deck.full(15, "barchart", [
  { label: "Art", value: 50, color: "#e67e22" },
  { label: "History", value: 70, color: "#2c3e50" },
  { label: "Physics", value: 95, color: "#d35400" }
]);

export const presentationData = deck.build();
