// $lib/slideBuilder/templates/jumboTron.js

import { SlideBuilder } from '../SlideBuilder.js';
import { items } from '../items/index.js';
import { centerHorizontally } from './layoutUtils.js';

let idCounter = 0;

export class JumboTron {
  constructor() {
    this.data = {
      text: "Jumbo Headline",
      startTime: 0,
      endTime: 5
    };

    this.theme = {
      backgroundColor: "#111",
      color: "white",
      fontSize: 100,
      topGap: 150
    };

    this._id = `jumboTron_${idCounter++}`;
  }

  build() {
    const builder = new SlideBuilder({
      id: this._id,
      startTime: this.data.startTime,
      endTime: this.data.endTime,
      backgroundColor: this.theme.backgroundColor
    });

    const canvasWidth = 1020;
    const itemWidth = 800;

    const jumbo = items.jumboText(this.data.text, this.theme.color, this.theme.fontSize);
    jumbo.y = this.theme.topGap;
    jumbo.height = 120;
    centerHorizontally(jumbo, canvasWidth, itemWidth);
    builder.add(jumbo);

    return builder.build();
  }
}
