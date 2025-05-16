import { DeckBuilder } from '../slideBuilder/DeckBuilder.js';
import { titleWithBulletsTemplate } from '../slideBuilder/templates/title-with-bullets.js';

const deck = new DeckBuilder();

deck.add(titleWithBulletsTemplate({
  title: "Welcome to SlideBuilder",
  bullets: [
    "Composable templates",
    "Scriptable slides",
    "Production-ready output"
  ]
}));

export const slidesData = deck.build();
