// $lib/userPresentations/titleSlide.js

import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { coffeeNote } from '../deckBuilder/theme/globalThemes.js';
import { Templates } from '../deckBuilder/templates/templateRegistry/Templates.js';

const deck = new DeckBuilder({
  globalTheme: coffeeNote,
  globalBackground: null
});

// Slide 1 – JumboTron
deck.add(10, Templates.JumboTron());

// Slide 2 – Title With Bullets
const slide2 = Templates.TitleWithBullets();
slide2.data = {
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products9999",
  showAt1: 15,
  showAt2: 20,
  showAt3: 25
};
deck.add(30, slide2);

// Slide 3 – Test Visuals
deck.add(35, Templates.TestVisuals());

//..................................
const slide = Templates.TitleWithImage();
slide.data = {
  title: "Photosynthesis",
  imageSrc: "images/atom.png",
  showAtTitle: 0,
  showAtImage: 37
};
deck.add(50, slide);

//..................................
// Finalize and export
export const slidesData = deck.build();
