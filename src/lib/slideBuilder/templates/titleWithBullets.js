// $lib/slideBuilder/templates/title-with-bullets.js

import { SlideBuilder } from '../SlideBuilder.js';
import { items } from '../items/index.js';
import { centerHorizontally, placeBelow } from './layoutUtils.js';

export const titleWithBullets = {
  data: {
    title: "Welcome to SlideBuilder",
    bullet1: "Composable templates",
    bullet2: "Scriptable slides",
    bullet3: "Production-ready output"
  },

  theme: {
    backgroundColor: "#223344",
    titleColor: "white",
    titleFontSize: 70,
    titleTopGap: 40,

    bulletsTopGap: 40,
    bulletGap: 20,
    bulletColor: "white",
    bulletFontSize: 40
  },

  build() {
    const { data, theme } = this;

    const builder = new SlideBuilder({
      id: data.id || 'title-with-3-bullets',
      startTime: data.startTime || 0,
      endTime: data.endTime || 5,
      backgroundColor: theme.backgroundColor
    });

    const canvasWidth = 1020;
    const itemWidth = 800;

    // Title
    const title = items.heading(data.title, theme.titleColor, theme.titleFontSize);
    title.y = theme.titleTopGap;
    title.height = 80;
    centerHorizontally(title, canvasWidth, itemWidth);
    builder.add(title);

    // Bullet 1
    const bullet1 = items.bulletPoint(data.bullet1 || "", theme.bulletColor, theme.bulletFontSize);
    bullet1.height = 50;
    placeBelow(bullet1, title, theme.bulletsTopGap);
    centerHorizontally(bullet1, canvasWidth, itemWidth);
    bullet1.textAlign = "center";
    builder.add(bullet1);

    // Bullet 2
    const bullet2 = items.bulletPoint(data.bullet2 || "", theme.bulletColor, theme.bulletFontSize);
    bullet2.height = 50;
    placeBelow(bullet2, bullet1, theme.bulletGap);
    centerHorizontally(bullet2, canvasWidth, itemWidth);
    bullet2.textAlign = "center";
    builder.add(bullet2);

    // Bullet 3
    const bullet3 = items.bulletPoint(data.bullet3 || "", theme.bulletColor, theme.bulletFontSize);
    bullet3.height = 50;
    placeBelow(bullet3, bullet2, theme.bulletGap);
    centerHorizontally(bullet3, canvasWidth, itemWidth);
    bullet3.textAlign = "center";
    builder.add(bullet3);

    return builder.build();
  }
};
