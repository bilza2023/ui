import { DeckBuilder } from '../slideBuilder/DeckBuilder.js';
import { templates } from '../slideBuilder/templates/index.js';

const deck = new DeckBuilder();

// Slide 1
templates.titleWithBullets.data = {
  title: "Welcome to SlideBuilder",
  bullet1: "Composable templates",
  bullet2: "Scriptable slides",
  bullet3: "Production-ready output",
  startTime: 0,
  endTime: 5
};

templates.titleWithBullets.theme = {
  backgroundColor: "#ede8e1",
  titleColor: "red",
  titleFontSize: 70,
  titleTopGap: 60,
  bulletsTopGap: 70,
  bulletGap: 60,
  bulletColor: "blue",
  bulletFontSize: 58
};

deck.add(templates.titleWithBullets.build());

// Slide 2
templates.titleWithBullets.data = {
  title: "Build With Confidence",
  bullet1: "Templates are cheap",
  bullet2: "Each slide is unique",
  bullet3: "No magic, just control",
  startTime: 5,
  endTime: 10
};

templates.titleWithBullets.theme = {
  backgroundColor: "#1a1a1a",
  titleColor: "#00ffaa",
  titleFontSize: 68,
  titleTopGap: 50,
  bulletsTopGap: 50,
  bulletGap: 30,
  bulletColor: "#ffffff",
  bulletFontSize: 44
};

deck.add(templates.titleWithBullets.build());

export const slidesData = deck.build();
