import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../editor";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.2);

// Slide 1: Image left, bullets right
deck.addHeader("header", [{ text: "Half Slide - Image Left" }]);
deck.half(5, "image", [], {
  src: "femaleTeacher",
  showAt: 1,
  width: 360,
  height: 280,
  margin: 20
}, "bullets", [
  { text: "Start with a smile", showAt: 2 },
  { text: "Build student trust", showAt: 3 },
  { text: "Encourage curiosity", showAt: 4 }
], {});

// Slide 2: Bullets left, image right
deck.addHeader("header", [{ text: "Half Slide - Bullets Left" }]);
deck.half(10, "bullets", [
  { text: "Define the goal", showAt: 6 },
  { text: "Explain the steps", showAt: 7 },
  { text: "Use simple visuals", showAt: 8 },
  { text: "Check understanding", showAt: 9 }
], {}, "image", [], {
  src: "taleemclass",
  showAt: 6,
  width: 360,
  height: 280,
  margin: 20
});

// Slide 3: Image left, bullets right
deck.addHeader("header", [{ text: "Half Slide - Inspire Learning" }]);
deck.half(15, "image", [], {
  src: "class",
  showAt: 11,
  width: 360,
  height: 280,
  margin: 20
}, "bullets", [
  { text: "Spark curiosity early", showAt: 12 },
  { text: "Ask engaging questions", showAt: 13 },
  { text: "Connect to real life", showAt: 14 }
], {});

// Slide 4: Bullets left, image right
deck.addHeader("header", [{ text: "Half Slide - Strategy Tips" }]);
deck.half(20, "bullets", [
  { text: "Plan clear objectives", showAt: 16 },
  { text: "Use visual aids", showAt: 17 },
  { text: "Encourage note-taking", showAt: 18 },
  { text: "Review together", showAt: 19 }
], {}, "image", [], {
  src: "physicsClass",
  showAt: 16,
  width: 360,
  height: 280,
  margin: 20
});

// Slide 5: Image left, bullets right
deck.addHeader("header", [{ text: "Half Slide - Classroom Energy" }]);
deck.half(25, "image", [], {
  src: "class",
  showAt: 21,
  width: 360,
  height: 280,
  margin: 20
}, "bullets", [
  { text: "Keep energy high", showAt: 22 },
  { text: "Switch activities", showAt: 23 },
  { text: "Give positive feedback", showAt: 24 }
], {});

export const presentationData = deck.build();
