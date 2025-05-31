import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../editor";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.2);

// Slide 1: Short healthy habits
deck.addHeader("header", [{ text: "Bullets - Healthy Habits" }]);
deck.full(5, "bullets", [
  { text: "Eat healthy", showAt: 1 },
  { text: "Drink water", showAt: 2 },
  { text: "Sleep early", showAt: 3 },
  { text: "Exercise daily", showAt: 4 }
], {
  fontSize: 40,
  lineGap: 60,
  alignment: "top",
  textAlign: "left",
  containerWidth: 820,
  gapFromTop: 60
});

// Slide 2: Morning routine - centered layout
deck.addHeader("header", [{ text: "Bullets - Morning Routine (Centered)" }]);
deck.full(10, "bullets", [
  { text: "Wake up early", showAt: 6 },
  { text: "Stretch and move", showAt: 7 },
  { text: "Hydrate immediately", showAt: 8 },
  { text: "Plan your day", showAt: 9 }
], {
  fontSize: 50,
  lineGap: 80,
  alignment: "center",
  textAlign: "center",
  containerWidth: 820
});

// Slide 3: Focus habits
deck.addHeader("header", [{ text: "Bullets - Stay Focused" }]);
deck.full(15, "bullets", [
  { text: "Eliminate distractions", showAt: 11 },
  { text: "Use a task list", showAt: 12 },
  { text: "Work in short sprints", showAt: 13 },
  { text: "Take mindful breaks", showAt: 14 }
], {
  fontSize: 40,
  lineGap: 60,
  alignment: "top",
  textAlign: "left",
  containerWidth: 820,
  gapFromTop: 60
});

export const presentationData = deck.build();