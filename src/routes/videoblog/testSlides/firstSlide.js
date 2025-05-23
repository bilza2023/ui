// main.js (or presentation file)
import { DeckBuilder } from "./deckBuilder/DeckBuilder.js";
import { IconTitleSlide } from "./threeAndHalf/slideTemplates/IconTitleSlide.js";
import { GlobalThemes } from "./threeAndHalf/themes/globalThemes.js";

const deck = new DeckBuilder({
  globalTheme: GlobalThemes.highContrast,
  designWidth: 1020,
  designHeight: 576
});

deck.addSlide(IconTitleSlide, {
  data: {
    title: "New Ideas",
    icon: "ROCKET"
  },
  duration: 5
});

export const presentationData = deck.build();
