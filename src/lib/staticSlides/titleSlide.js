

import { DeckBuilder } from '../slideBuilder/DeckBuilder.js';
import { templates } from '../slideBuilder/templates/index.js';

const deck = new DeckBuilder();

// Slide 0
const slide0 = new templates.JumboTron();
slide0.data = {
  text: "SlideBuilder",
  startTime: 0,
  endTime: 5
};
slide0.theme = {
  backgroundColor: "#000000",
  color: "#00ffcc",
  fontSize: 120,
  topGap: 180
};
deck.add(slide0.build());

// Slide 1
const slide1 = new templates.TitleWithBullets();
slide1.data = {
  title: "Welcome to SlideBuilder",
  bullet1: "Composable templates",
  bullet2: "Scriptable slides",
  bullet3: "Production-ready output",
  startTime: 5,
  endTime: 10
};
slide1.theme = {
  backgroundColor: "#ede8e1",
  titleColor: "red",
  titleFontSize: 70,
  titleTopGap: 60,
  bulletsTopGap: 70,
  bulletGap: 60,
  bulletColor: "blue",
  bulletFontSize: 58
};
deck.add(slide1.build());

// Slide 2
const slide2 = new templates.TitleWithBullets();
slide2.data = {
  title: "Build With Confidence",
  bullet1: "Templates are cheap",
  bullet2: "Each slide is unique",
  bullet3: "No magic, just control",
  startTime: 10,
  endTime: 15
};
slide2.theme = {
  backgroundColor: "#1a1a1a",
  titleColor: "#00ffaa",
  titleFontSize: 68,
  titleTopGap: 50,
  bulletsTopGap: 50,
  bulletGap: 30,
  bulletColor: "#ffffff",
  bulletFontSize: 44
};
deck.add(slide2.build());

export const slidesData = deck.build();
