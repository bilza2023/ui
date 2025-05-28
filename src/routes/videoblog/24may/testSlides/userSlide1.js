// realNumbersPresentation.js – Real Numbers (14–17 yrs)

import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import {getDefaultBackground} from "../editor/getDefaultBackground.js";



const themeUsed = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));

deck.addHeader("header", [{ text: "Real Numbers 101", showAt: 0 }], {
  fontSize: 56,
  y: 20,
  stylePresetKey: "text.heading"
});

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

// deck.full(
//   20,            // slide end time
//   "bullets",    // picks bulletsComponent
//   [             // loopData: your bullets array
//     { text: "First point",  showAt: 12 },
//     { text: "Second point", showAt: 14 },
//     { text: "Third point",  showAt: 16 }
//   ],
//   {             // config: positioning & style tweaks
//     x: 120,
//     y: 100,
//     lineGap: 90,
//     stylePresetKey: "text.bulletSmall"
//   }
// );
// debugger;
// deck.full(
//   25,           // slide end time
//   "image",     // picks imageComponent
//   [],          // loopData (unused here)
//   {            // config
//     src: "chalkboard",
//     showAt: 21,              // appears immediately
//     stylePresetKey: "fullWidth",
//     layoutMode: "center"
//   }
// );

// Build and export the assembled presentation data
export const presentationData = deck.build();
