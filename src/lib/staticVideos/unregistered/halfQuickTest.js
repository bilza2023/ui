import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.2);

// Slide 1: Using quick half builder pattern
deck.addHeader("header", [{ text: "Half Builder - Image + Bullets" }]);
deck.startQuickHalf(5);
deck.setLeftHalf("image", [], {
  src: "femaleTeacher",
  showAt: 1,
  width: 360,
  height: 280,
  margin: 20
});
deck.setRightHalf("bullets", [
  { text: "Start with a smile", showAt: 2 },
  { text: "Build student trust", showAt: 3 },
  { text: "Encourage curiosity", showAt: 4 }
]);
deck.commitHalf();

// Slide 2: Bullets + Image (again using builder pattern)
deck.addHeader("header", [{ text: "Half Builder - Bullets + Image" }]);
deck.startQuickHalf(10);
deck.setLeftHalf("bullets", [
  { text: "Define the goal", showAt: 6 },
  { text: "Explain the steps", showAt: 7 },
  { text: "Use visuals", showAt: 8 },
  { text: "Check understanding", showAt: 9 }
]);
deck.setRightHalf("image", [], {
  src: "taleemclass",
  showAt: 6,
  width: 360,
  height: 280,
  margin: 20
});
deck.commitHalf();

// Slide 3: Image + Image
deck.addHeader("header", [{ text: "Half Builder - Image + Image" }]);
deck.startQuickHalf(15);
deck.setLeftHalf("image", [], {
  src: "whatisforce",
  showAt: 11,
  width: 340,
  height: 260,
  margin: 20
});
deck.setRightHalf("image", [], {
  src: "physicsClass",
  showAt: 12,
  width: 340,
  height: 260,
  margin: 20
});
deck.commitHalf();

// Slide 4: Bullets + Bullets
deck.addHeader("header", [{ text: "Half Builder - Bullets + Bullets" }]);
deck.startQuickHalf(20);
deck.setLeftHalf("bullets", [
  { text: "Introduction to Force", showAt: 16 },
  { text: "Real-life Examples", showAt: 17 },
  { text: "Why it matters", showAt: 17.5 }
]);
deck.setRightHalf("bullets", [
  { text: "Newton’s Laws", showAt: 18 },
  { text: "Applications", showAt: 18.5 },
  { text: "Conclusion & Summary", showAt: 19 }
]);
deck.commitHalf();
/////////////////////////////////////
export const presentationData = deck.build();
