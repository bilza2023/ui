



import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { blueBusiness } from '../deckBuilder/theme/globalThemes.js';
import { loadTemplate } from '../deckBuilder/templates/loadTemplate.js';

const deck = new DeckBuilder({ globalTheme: blueBusiness });

deck.add(5, loadTemplate("jumbotron", 5, { text: "This is From The Slide" }));

deck.add(20, loadTemplate("titleWithBullets", 20, {
  title: "Welcome To Bilza Player",
  bullet1: "Taleem Player",
  bullet2: "Slim Player",
  bullet3: "Pixi Player",
  showAt1: 7,
  showAt2: 10,
  showAt3: 15
}));

export const slidesData = deck.build();
