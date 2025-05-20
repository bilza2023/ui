

import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { blueEducation } from '../deckBuilder/theme/globalThemes.js';
import { loadTemplate } from '../deckBuilder/templates/loadTemplate.js';

const deck = new DeckBuilder({ globalTheme: blueEducation });

deck.add(5, loadTemplate("jumbotron", { text: "🚀 Taleem.help Presentation 📘" }));
/////////////////////////////////////////////
deck.add(20, loadTemplate("titleWithBullets", {
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products",
  showAt1: 6,
  showAt2: 10,
  showAt3: 15
}));
////////////////////////////////////////////////
deck.add(30, loadTemplate("testVisuals"));











//////////////////////////////////////////////////
export const slidesData = deck.build();
