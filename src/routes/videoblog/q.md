

A problem that i solved few days back as well

At this line when deckbuilder adds Jumbotron

import { DeckBuilder } from './deckBuilder/DeckBuilder.js';
import { coffeeNote } from './deckBuilder/theme/globalThemes.js';
import { Templates } from './pixiTemplates/Templates.js';


debugger;
const deck = new DeckBuilder({
  globalTheme: coffeeNote,
  globalBackground: null
});

// Slide 1 – JumboTron

const introSlide = deck.add(3, Templates.JumboTron()); <<<<=========

the jumbo tron runs ===> return tmpl.buildSlide(); at the end. this should be deffered till 


deckbuilder.build() // buildDeck 

Why : 

Deckbuilder in "add" inject globalTemplate and background


  add(endAt, template) {

    timeCheck(endAt);
    injectGlobalTheme(template, this.globalTheme);
    injectGlobalBackground(template, this.globalBackground);

so if jumbotron calls return tmpl.buildSlide(); ... the globalTemplate is not available


We need to re-factor - jumbo tron as well as deck builder if needed
