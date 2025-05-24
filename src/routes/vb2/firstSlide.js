// main.js (or presentation file)
import { DeckBuilder } from "./deckBuilder/DeckBuilder.js";
import { Templates } from "./threeAndHalf/slideTemplates";
import { GlobalThemes } from "./threeAndHalf/themes/globalThemes.js";

const deck = new DeckBuilder({
  globalTheme: GlobalThemes.darkTheme,
  designWidth: 1020,
  designHeight: 576
});

deck.addSlide(Templates.ListWithIconsSlide, {
  data: {
    item1: { text: "Affordable pricing", icon: "BULB" },
    item2: { text: "Easy customization", icon: "STAR" },
    item3: { text: "Pixi-powered speed", icon: "ROCKET" }
  },
  config: {
    fontSize: 42,
    spacing: 80
  },
  duration: 5
});


export const presentationData = deck.build();
