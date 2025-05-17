

import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import {   JumboTron ,TitleWithBullets} from '../deckBuilder/templates';
import { blueBusiness } from '../deckBuilder/theme/globalThemes.js';

const deck = new DeckBuilder({ theme: blueBusiness });

// Slide 0 - JumboTron
const slide0 = JumboTron(); // factory returns the template object
slide0.data.text = "SlideBuilder";
slide0.theme.fontSize = 200;

deck.add(5, slide0);



const slideTitleWith3Bullets = TitleWithBullets();
debugger;
deck.add(10, slideTitleWith3Bullets);

// You can do the same for more slides like TitleWithBullets
// const slide1 = titleWithBulletsTemplate();
// slide1.data = { ... };
// deck.add(10, slide1);

export const slidesData = deck.build();
