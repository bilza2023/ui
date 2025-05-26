// userSlide1.js

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import {getDefaultBackground} from "../editor/getDefaultBackground.js";


const deck = new DeckBuilder();
//Deck Setup 
const themeUsed = GlobalThemes.neonDark;
deck.setGlobalTheme(themeUsed);
const bg = getDefaultBackground(themeUsed)
deck.setGlobalBackground(bg);
/////////////////////////////////////////////////////
deck.add(templates.slide.titleWith3Bullets, 10, 
{title: "Why Islam?",bullets: ["In the Name of Allah", "Most Merficul", "Most Compasionate"]}
);
// deck.add(templates.slide.titleWith3Bullets, 4, 
// {title: "Why Taleem?",bullets: ["Affordable", "Accessible", "AI-powered"]},
// {backgroundColor: "#ceef10"}
// );


export const presentationData = deck.build();