import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { coffeeNote } from '../deckBuilder/theme/globalThemes.js';
import { Templates } from '../deckBuilder/templates/templateRegistry/Templates.js';

const deck = new DeckBuilder({
  globalTheme: coffeeNote,
  globalBackground: null
});

// Slide 1 – JumboTron
debugger;
const introSlide = Templates.JumboTron();

introSlide.setData({ title : "Welcome To Taleem Help"});

deck.add(5, introSlide);

// Slide 2 – Title With Bullets
const slide2 = Templates.TitleWithBullets();
slide2.setData({
  title: "Taleem Help",
  bullet1: "Mission Objectives",
  bullet2: "Products",
  bullet3: "Up Comming..",
  showAt1: 11,
  showAt2: 13,
  showAt3: 15
});
deck.add(18, slide2);

// Slide 3 – Title + Image
const slide3 = Templates.TitleWithImage();
slide3.setData({
  title: "Courses",
  imageSrc: "brand/facebook_page_profile.webp", // without .png
  showAtTitle: 0,
  showAtImage: 19
});
deck.add(25, slide3);

// Slide 4 – Image With Caption
const slide4 = Templates.ImageWithCaption();
slide4.setData({
  imageSrc: "images/mad_scientist.jpg",
  caption: "AI Based Education",
  showAtImage: 31,
  showAtCaption: 5
});
deck.add(30, slide4);

// Slide 5 – Image Left, Text Right
const slide5 = Templates.ImageLeftTextRight();
slide5.setData({
  imageSrc: "images/drops.png",
  text: "Career Building Blocks",
  showAtImage: 0,
  showAtText: 0
});
deck.add(35, slide5);

// Finalize and export
export const slidesData = deck.build();
