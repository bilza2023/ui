// realNumbersPresentation.js – Real Numbers (14–17 yrs)

import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import {getDefaultBackground} from "../editor/getDefaultBackground.js";


const themeUsed = GlobalThemes.pastel;
const deck = new DeckBuilder();
deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));


// Slide 1: quoteComponent as a full-width slide
deck.full(10,"quote",
  [            
    { text: "“The ink of the scholar",     showAt: 1 },
    { text: "is more sacred",              showAt: 2 },
    { text: "than the blood of the martyr.”", showAt: 3 }
  ],
  {             // config (was everything else on data)
    author: { text: "— Prophetic Tradition", showAt: 4 }
  }
);


// Build and export the assembled presentation data
export const presentationData = deck.build();
