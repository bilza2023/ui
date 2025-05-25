// userSlide1.js

import { DeckBuilder } from "../deckBuilder/DeckBuilder.js";
import { templates } from "../templates";
import { GlobalThemes } from "../theme/globalThemes.js";

const deck = new DeckBuilder({
  globalTheme: GlobalThemes.highContrast,
  designWidth: 1020,
  designHeight: 576,
});

deck.add(templates.slide.titleWith3Bullets, 4, {
  title: "Why Taleem?",
  bullets: ["Affordable", "Accessible", "AI-powered"],
  background: {
    backgroundColor: "#ceef10"
  }
});


export const presentationData = deck.build();