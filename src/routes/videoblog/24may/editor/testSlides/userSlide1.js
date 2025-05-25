// userSlide1.js

import { DeckBuilder } from "../deckBuilder/DeckBuilder.js";
import { templates } from "../templates";
import { GlobalThemes } from "../theme/globalThemes.js";

const deck = new DeckBuilder({
  globalTheme: GlobalThemes.highContrast,
  designWidth: 1020,
  designHeight: 576,
});

// Build a simple slide manually using an item-template
// const slide = {
//   background: { backgroundColor: "#ceef10" },
//   items: templates.items.heading(GlobalThemes.darkTheme, {
//     text: "Welcome to Taleem!",
//     x: 100,
//     y: 200,
//   }),
// };

deck.add(templates.slide.titleWith3Bullets, {
    title: "Why Taleem?",
    bullets: ["Affordable", "Accessible", "AI-powered"],
    backgroundColor: "#ceef10"
  }, 4);

export const presentationData = deck.build();