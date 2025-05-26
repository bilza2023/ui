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
deck.add(templates.titleWith3Bullets, 10, 
{title: "Why Islam?",bullets: ["In the Name of Allah", "Most Merficul", "Most Compasionate"]}
);
deck.overrideLastSlideBackground({
  pattern: {
    type: "dots",
    props: {
      color: themeUsed.primaryColor
    }
  }
});
// deck.overrideLastSlideBackground({
//   backgroundImage: "chalkboard"
// });
/////////////////////////

deck.add(templates.headingWithImage,20, 
  {
  title: "The Power of Visual Learning",
  src: "chalkboard" // or any other valid image name
});

export const presentationData = deck.build();