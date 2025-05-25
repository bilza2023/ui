// userSlide1.js

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";

const deck = new DeckBuilder({
  globalTheme: GlobalThemes.highContrast,
  designWidth: 1020,
  designHeight: 576,
});

deck.add(templates.slide.titleWith3Bullets, 4, 
{title: "Why Islam?",bullets: ["In the Name of Allah", "Most Merficul", "Most Compasionate"]}
);
// deck.add(templates.slide.titleWith3Bullets, 4, 
// {title: "Why Taleem?",bullets: ["Affordable", "Accessible", "AI-powered"]},
// {backgroundColor: "#ceef10"}
// );


export const presentationData = deck.build();