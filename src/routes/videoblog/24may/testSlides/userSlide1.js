// realNumbersPresentation.js – Real Numbers (14–17 yrs)

import { DeckBuilder } from "../editor";
import { templates } from "../editor/templates/index.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const deck = new DeckBuilder();
const themeUsed = GlobalThemes.neonDark;

deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

let slideStart = 0;
let slideEnd= 10;
/*──────────────────────────────
  Slide 1  | 0 – 10 · Title
──────────────────────────────*/
deck.add(templates.quoteSlide, slideEnd, {
  lines: [
    { text: "“The ink of the scholar",           showAt: slideStart + 1 },
    { text: "is more sacred",                    showAt: slideStart + 2 },
    { text: "than the blood of the martyr.”",    showAt: slideStart + 3 }
  ],
  author: { text: "— Prophetic Tradition",       showAt: slideStart + 4 }
});

/*──────────────────────────────
  Build deck
──────────────────────────────*/
export const presentationData = deck.build();
