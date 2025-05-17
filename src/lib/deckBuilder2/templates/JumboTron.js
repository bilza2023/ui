// $lib/slideBuilder/templates/jumboTron.js

import { SlideBuilder } from '../SlideBuilder.js';
import { items } from '../items/index.js';
import { centerHorizontally } from './layoutUtils.js';

let idCounter = 0;

export class JumboTron {
  constructor() {
    this.data = {
      text: "Jumbo Headline",
    };

    this.theme = {
      backgroundColor: "#111",
      color: "white",
      fontSize: 200,
      topGap: 150
    };

    this._id = `jumboTron_${idCounter++}`;
  }

  mapTheme(global) {
    return {
      backgroundColor: global.bgColor,
      color: global.primaryColor,
      // fontSize: global.headingFontSize,
      topGap: global.gapLarge
    };
  }
  
  
  build() {
    const builder = new SlideBuilder({
        id: this._id,
        backgroundColor: this.theme.backgroundColor      
    });

    const canvasWidth = 1020;
    const itemWidth = 800;

    const jumbo = items.text(this.data.text);
    jumbo.y = this.theme.topGap;
    // jumbo.height = 1200;
    centerHorizontally(jumbo, canvasWidth, itemWidth);
    builder.add(jumbo);

    // return builder.build();
    return builder.slide;
  }
}
