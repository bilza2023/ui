import { DeckBuilder } from '../slideBuilder/DeckBuilder.js';
// import { titleWithBulletsTemplate } from '../slideBuilder/templates/titleWithBullets.js';
import { templates } from '../slideBuilder/templates/index.js';


const deck = new DeckBuilder();
deck.add(templates.titleWithBullets({
  title: "Welcome to SlideBuilder",
  bullets: [
    "Composable templates",
    "Scriptable slides",
    "Production-ready output"
  ]
}));

export const slidesData = deck.build();
