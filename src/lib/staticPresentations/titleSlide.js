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
slide2.setData({
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products9999",
  showAt1: 15,
  showAt2: 20,
  showAt3: 25
});
deck.add(30, slide2);

// Slide 3 – Title + Image
const slide3 = Templates.TitleWithImage();
slide3.setData({
  title: "Photosynthesis",
  imageSrc: "images/atom.png", // without .png
  showAtTitle: 0,
  showAtImage: 31
});
deck.add(50, slide3);

// Slide 4 – Image With Caption
const slide4 = Templates.ImageWithCaption();
slide4.setData({
  imageSrc: "images/mad_scientist.jpg",
  caption: "Plant cell structure",
  showAtImage: 51,
  showAtCaption: 5
});
deck.add(70, slide4);

// Slide 5 – Image Left, Text Right
const slide5 = Templates.ImageLeftTextRight();
slide5.setData({
  imageSrc: "images/drops.png",
  text: "The microscope allows us to see microscopic organisms.",
  showAtImage: 71,
  showAtText: 5
});
deck.add(90, slide5);

// Finalize and export
export const slidesData = deck.build();
