import { DeckBuilder } from "pivot-deckbuilder";
const deckbuilder = new DeckBuilder();

deckbuilder.setBackground({
  backgroundColor: "#1a1a1a",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 0.8
});

// Slide 1: bulletList
deckbuilder.s.bulletList(10, [
  { name: "bullet", content: "Physics", showAt: 0 },
  { name: "bullet", content: "Chemistry", showAt: 1 },
  { name: "bullet", content: "Biology", showAt: 2 },
  { name: "bullet", content: "Computer Science", showAt: 3 }
]);

// Slide 2: imageLeftBulletsRight
deckbuilder.s.imageLeftBulletsRight(20, [
  { name: "image", content: "/pivot/box.webp", showAt: 10 },
  { name: "bullet", content: "Energy is conserved", showAt: 11 },
  { name: "bullet", content: "Forces act in pairs", showAt: 12 },
  { name: "bullet", content: "Acceleration is proportional to force", showAt: 13 }
]);

// Slide 3: imageRightBulletsLeft
deckbuilder.s.imageRightBulletsLeft(30, [
  { name: "image", content: "/pivot/box.webp", showAt: 20 },
  { name: "bullet", content: "Energy is conserved", showAt: 21 },
  { name: "bullet", content: "Forces act in pairs", showAt: 22 },
  { name: "bullet", content: "Acceleration is proportional to force", showAt: 23 }
]);

// Slide 4: barChart
deckbuilder.s.barChart(40, [
  { name: "bar", label: "Physics", value: 70, color: "#3498db", showAt: 30 },
  { name: "bar", label: "Chemistry", value: 55, color: "#2ecc71", showAt: 31 },
  { name: "bar", label: "Biology", value: 60, color: "#f39c12", showAt: 32 },
  { name: "bar", label: "Computer", value: 90, color: "#9b59b6", showAt: 33 }
]);

// Slide 5: cornerWordsSlide
deckbuilder.s.cornerWordsSlide(50, [
  { name: "card", icon: "🔭", label: "Observation", showAt: 40 },
  { name: "card", icon: "⚗️", label: "Experimentation", showAt: 41 },
  { name: "card", icon: "📐", label: "Measurement", showAt: 42 },
  { name: "card", icon: "💡", label: "Theory", showAt: 43 }
]);

export const deck = deckbuilder.build();
