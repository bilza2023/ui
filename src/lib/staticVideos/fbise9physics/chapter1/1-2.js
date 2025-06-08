import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";


// Setup
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);
// Slide 1: What are Physical Quantities?
deck.addHeader("header", [{ text: "What are Physical Quantities?" }]);
deck.full(6, "bullets", [
  { text: "Measurable properties of physical objects", showAt: 1 },
  { text: "Always expressed with a number and a unit", showAt: 2 },
  { text: "Essential for scientific descriptions", showAt: 3 }
], {
  fontSize: 36,
  lineGap: 64,
  textAlign: "center",
  alignment: "center",
  containerWidth: 820
});

// Slide 2: Types of Physical Quantities
deck.addHeader("header", [{ text: "Types of Quantities" }]);
deck.full(12, "bullets", [
  { text: "Base: Fundamental; cannot be broken down", showAt: 7 },
  { text: "Derived: Formed by combinations of base quantities", showAt: 8 },
  { text: "Examples: mass (base), speed (derived)", showAt: 9 }
], {
  fontSize: 36,
  lineGap: 64,
  textAlign: "center",
  alignment: "center",
  containerWidth: 820
});


// Slide 3: Base Quantities & SI Units
deck.addHeader("header", [{ text: "Base Quantities & SI Units" }]);
deck.full(18, "bullets", [
  { text: "Length – meter (m)", showAt: 13 },
  { text: "Mass – kilogram (kg)", showAt: 14 },
  { text: "Time – second (s)", showAt: 15 },
  { text: "Electric current – ampere (A)", showAt: 15.5 },
  { text: "Temperature – kelvin (K)", showAt: 16 },
  { text: "Luminous intensity – candela (cd)", showAt: 16.5 },
  { text: "Amount of substance – mole (mol)", showAt: 17 }
], {
  fontSize: 34,
  lineGap: 50,
  containerWidth: 800,
  textAlign: "center",
  alignment: "top",
  gapFromTop: 50
});

// Slide 4: Why Use Physical Quantities?
deck.addHeader("header", [{ text: "Role in Science" }]);
deck.full(24, "bullets", [
  { text: "Ensure accurate and repeatable results", showAt: 19 },
  { text: "Enable global scientific communication", showAt: 20 },
  { text: "Basis for all physical laws and equations", showAt: 21 }
], {
  fontSize: 36,
  lineGap: 66,
  alignment: "center",
  textAlign: "center",
  containerWidth: 820
});


// Final Slide: Quote Summary
deck.addHeader("header", [{ text: "Conclusion" }]);
deck.full(30, "quote", [
  { text: "Without measurement,", showAt: 25 },
  { text: "scientific communication is impossible.", showAt: 26 },
  { text: "Standard units bring clarity", showAt: 27 }
], {
  author: { text: "- Physics Principle", showAt: 28 },
  fontSize: 48,
  lineHeight: 1.5,
  startY: 140
});

export const presentationData = deck.build();
