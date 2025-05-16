// $lib/staticPresentations/titleSlide.js

import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { templates } from '../deckBuilder/templates/index.js';
import { lightTheme } from '../deckBuilder/theme/globalThemes.js';

const deck = new DeckBuilder({ theme: lightTheme });

// Slide 0 - JumboTron
const slide0 = new templates.JumboTron();
slide0.data = {
  text: "SlideBuilder",
  fontSize : 200
};

// debugger;
deck.add(5, slide0); // don't call .build()
// slide0.theme.fontSize = 200;



// Slide 1 - TitleWithBullets
const slide1 = new templates.TitleWithBullets();
slide1.data = {
  title: "Welcome to SlideBuilder",
  bullet1: "Composable templates",
  bullet2: "Scriptable slides",
  bullet3: "Production-ready output"
};
////////////////////////////////////////
deck.add(10, slide1);


// Slide 2 - TitleWithBullets
const slide2 = new templates.TitleWithBullets();
slide2.data = {
  title: "Build With Confidence",
  bullet1: "Templates are cheap",
  bullet2: "Each slide is unique",
  bullet3: "No magic, just control"
};
deck.add(15, slide2);

///////////////////////////////
export const slidesData = deck.build();
