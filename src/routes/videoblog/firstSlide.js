
import { DeckBuilder } from './deckBuilder/DeckBuilder.js';
import { coffeeNote } from './deckBuilder/theme/globalThemes.js';
import { Templates } from './pixiTemplates/Templates.js';


const deck = new DeckBuilder({
  globalTheme: coffeeNote,
  globalBackground: null
});

// Slide 1 – JumboTron

const introSlide = Templates.JumboTron();
introSlide.setData({ title : "Welcome To Taleem Help"});

deck.add(3, introSlide);


// Slide 2 – Title With Bullets
// const slide3 = Templates.TitleWithBullets();
// slide3.setData({
//   title: "Taleem Help",
//   bullet1: "Mission Objectives",
//   bullet2: "Products",
//   bullet3: "Up Comming..",
//   showAt1: 4,
//   showAt2: 6,
//   showAt3: 8
// });
// deck.add(10, slide3);





// Finalize and export
export const slidesData = deck.build();
