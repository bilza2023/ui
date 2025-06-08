import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1 — The SI System: A Global Standard
deck.addHeader("header", [{ text: "The International System of Units (SI)" }]);
deck.full(6, "bullets", [
  { text: "Developed in 1960 in Paris", showAt: 1 },
  { text: "Used worldwide for science and engineering", showAt: 2 },
  { text: "Replaces older systems for consistency", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Slide 2 — The Seven SI Base Units
deck.addHeader("header", [{ text: "The 7 Base SI Units" }]);
deck.full(12, "bullets", [
  { text: "Length – metre (m)", showAt: 6 },
  { text: "Mass – kilogram (kg)", showAt: 7 },
  { text: "Time – second (s)", showAt: 8 },
  { text: "Electric current – ampere (A)", showAt: 9 },
  { text: "Temperature – kelvin (K)", showAt: 10 },
  { text: "Amount of substance – mole (mol)", showAt: 11 },
  { text: "Luminous intensity – candela (cd)", showAt: 12 }
], {
  fontSize: 30,
  lineGap: 52,
  alignment: "top",
  textAlign: "center",
  gapFromTop: 60
});

// Slide 3 — Derived Units Explained
deck.addHeader("header", [{ text: "Derived SI Units" }]);
deck.startQuickHalf(18);
deck.setLeftHalf("bullets", [
  { text: "Formed by combining base units", showAt: 13 },
  { text: "Speed → metre/second (m/s)", showAt: 14 },
  { text: "Force → newton (N = kg·m/s²)", showAt: 15 },
  { text: "Pressure → pascal (Pa = N/m²)", showAt: 16 }
], {
  fontSize: 32,
  lineGap: 64,
  gapFromTop: 70
});
deck.setRightHalf("image", [], {
  src: "physicsClass",
  showAt: 13,
  width: 340,
  height: 280,
  margin: 20
});
deck.commitHalf();

// Slide 4 — Why Use SI Units?
deck.addHeader("header", [{ text: "Why SI Units Matter" }]);
deck.full(24, "bullets", [
  { text: "Ensure global consistency", showAt: 19 },
  { text: "Make scientific communication easier", showAt: 20 },
  { text: "Avoid confusion in international research", showAt: 21 }
], {
  fontSize: 36,
  lineGap: 70,
  textAlign: "center",
  alignment: "center",
  gapFromTop: 80
});

// Finalize
export const presentationData = deck.build();
