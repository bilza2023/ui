

import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import {   JumboTron ,TitleWithBullets} from '../deckBuilder/templates';
import { blueBusiness } from '../deckBuilder/theme/globalThemes.js';

const deck = new DeckBuilder({ globalTheme: blueBusiness });

////////////////////////////////////////
const jumbotronSlide = JumboTron(); // factory returns the template object
jumbotronSlide.data.text = "This is From The Slide";
deck.add(20, jumbotronSlide);

////////////////////////////////////////
const slideTitleWith3Bullets = TitleWithBullets();
slideTitleWith3Bullets.data = {
    title: "Welcome To Bilza Player",
    bullet1: "Taleem Player",
    bullet2: "Slim Player",
    bullet3: "Pixi Player",
    showAt1:3,
    showAt2:6,
    showAt3:9,
  };
deck.add(12, slideTitleWith3Bullets);
////////////////////////////////////////


export const slidesData = deck.build();
