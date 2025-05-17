

import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import {   JumboTron ,TitleWithBullets} from '../deckBuilder/templates';
import { coffeeNote } from '../deckBuilder/theme/globalThemes.js';

const deck = new DeckBuilder({ globalTheme: coffeeNote });



const slideTitleWith3Bullets = TitleWithBullets();
deck.add(12, slideTitleWith3Bullets);

// Slide 0 - JumboTron
const slide0 = JumboTron(); // factory returns the template object
slide0.data.text = "SlideBuilder";
slide0.theme.fontSize = 200;

deck.add(20, slide0);




// You can do the same for more slides like TitleWithBullets
// const slide1 = titleWithBulletsTemplate();
// slide1.data = { ... };
// deck.add(10, slide1);

export const slidesData = deck.build();
