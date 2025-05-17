



import { DeckBuilder } from '../deckBuilder/DeckBuilder.js';
import { blueEducation } from '../deckBuilder/theme/globalThemes.js';
import { loadTemplate } from '../deckBuilder/templates/loadTemplate.js';

const deck = new DeckBuilder({ globalTheme: blueEducation });


deck.add(10, loadTemplate("testVisuals"));

export const slidesData = deck.build();
