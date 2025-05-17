



import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { blueEducation } from '../deckBuilder/theme/globalThemes.js';
import { loadTemplate } from '../deckBuilder/templates/loadTemplate.js';

const deck = new DeckBuilder({ globalTheme: blueEducation });

deck.add(5, loadTemplate("jumbotron", { text: "😃 🚀 📘 From The Slide" }));

deck.add(20, loadTemplate("titleWithBullets", {
  title: "Welcome To Bilza Player",
  bullet1: "Taleem Player",
  bullet2: "Slim Player",
  bullet3: "Pixi Player",
  showAt1: 7,
  showAt2: 10,
  showAt3: 15
}));

deck.add(25, loadTemplate("testVisuals"));

export const slidesData = deck.build();
