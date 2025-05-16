import { DeckBuilder } from '../slideBuilder/DeckBuilder.js';
import { templates } from '../slideBuilder/templates/index.js';

const deck = new DeckBuilder();

deck.add(templates.titleWithBullets(
  {
    title: "Welcome to SlideBuilder!!!!",
    bullet1: "Composable templates",
    bullet2: "Scriptable slides",
    bullet3: "Production-ready output"
  },
 {
    backgroundColor: "#ede8e1",   // Slide background
    titleColor: "red",        // Title text color
    titleFontSize: 70,            // Title font size
    titleTopGap: 60,              // Gap from top of canvas to title
  
    bulletsTopGap: 70,            // Gap from title bottom to first bullet
    bulletGap: 60,                // Vertical gap between bullets
    bulletColor: "blue",       // Bullet text color
    bulletFontSize: 58            // Bullet font size
  }
  
));

export const slidesData = deck.build();
