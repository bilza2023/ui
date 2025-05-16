// $lib/slideBuilder/templates/title-with-bullets.js

import { SlideBuilder } from '../SlideBuilder.js';
import { items } from '../items/index.js';
import { centerHorizontally, placeBelow } from './layoutUtils.js';

let idCounter = 0;

export class titleWithBullets {
  constructor() {
    this.data = {
      title: "Welcome to SlideBuilder",
      bullet1: "Composable templates",
      bullet2: "Scriptable slides",
      bullet3: "Production-ready output",
      startTime: 0,
      endTime: 5
    };

    this.theme = {
      backgroundColor: "#223344",
      titleColor: "white",
      titleFontSize: 70,
      titleTopGap: 40,

      bulletsTopGap: 40,
      bulletGap: 20,
      bulletColor: "white",
      bulletFontSize: 40
    };

    this._id = `titleWithBullets_${idCounter++}`;
  }

  build() {
    const builder = new SlideBuilder({
      id: this._id,
      startTime: this.data.startTime || 0,
      endTime: this.data.endTime || 5,
      backgroundColor: this.theme.backgroundColor
    });

    const canvasWidth = 1020;
    const itemWidth = 800;

    const title = items.heading(this.data.title, this.theme.titleColor, this.theme.titleFontSize);
    title.y = this.theme.titleTopGap;
    title.height = 80;
    centerHorizontally(title, canvasWidth, itemWidth);
    builder.add(title);

    const bullet1 = items.bulletPoint(this.data.bullet1 || "", this.theme.bulletColor, this.theme.bulletFontSize);
    bullet1.height = 50;
    placeBelow(bullet1, title, this.theme.bulletsTopGap);
    centerHorizontally(bullet1, canvasWidth, itemWidth);
    bullet1.textAlign = "center";
    builder.add(bullet1);

    const bullet2 = items.bulletPoint(this.data.bullet2 || "", this.theme.bulletColor, this.theme.bulletFontSize);
    bullet2.height = 50;
    placeBelow(bullet2, bullet1, this.theme.bulletGap);
    centerHorizontally(bullet2, canvasWidth, itemWidth);
    bullet2.textAlign = "center";
    builder.add(bullet2);

    const bullet3 = items.bulletPoint(this.data.bullet3 || "", this.theme.bulletColor, this.theme.bulletFontSize);
    bullet3.height = 50;
    placeBelow(bullet3, bullet2, this.theme.bulletGap);
    centerHorizontally(bullet3, canvasWidth, itemWidth);
    bullet3.textAlign = "center";
    builder.add(bullet3);

    return builder.build();
  }
}
