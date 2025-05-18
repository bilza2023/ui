



import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { blueEducation } from '../deckBuilder/theme/globalThemes.js';
import { loadTemplate } from '../deckBuilder/templates/loadTemplate.js';

const deck = new DeckBuilder({ globalTheme: blueEducation });


deck.add(5, loadTemplate("testVisuals"));
/////////////////////////////////////////////
deck.add(10, loadTemplate("jumbotron", { text: "😃 🚀 📘 From The Slide" }));

deck.add(20, loadTemplate("titleWithBullets", {
  title: "Welcome To Bilza Player",
  bullet1: "Taleem Player",
  bullet2: "Slim Player",
  bullet3: "Pixi Player",
  showAt1: 12,
  showAt2: 14,
  showAt3: 16
}));











//////////////////////////////////////////////////
export const slidesData = deck.build();
