// DrawEngine.js
import * as PIXI from "pixi.js";
import getBackgroundColor from "./getBackgroundColor.js";
import { drawItem } from "../../hooks/drawItem.js";

export default class DrawEngine {
  constructor(app) {
    this.app = app;
    this.stage = app.stage;
 
    this.backgroundLayer = new PIXI.Container();
    this.itemLayer = new PIXI.Container();
    this.stage.addChild(this.backgroundLayer, this.itemLayer);
  }

  draw(slide, currentTime) {
    // Draw background
    this.backgroundLayer.removeChildren();
    const bgColor = getBackgroundColor(slide);
    const bg = new PIXI.Graphics();
    bg.beginFill(bgColor);
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();
    this.backgroundLayer.addChild(bg);

    // Draw items
    this.itemLayer.removeChildren();
    const items = slide.items ?? [];

    for (const item of items) {
      // animateItem(item, currentTime); // 🔸 will apply props later
      const displayObject = drawItem(item);
      if (displayObject) this.itemLayer.addChild(displayObject);
    }
  }
}
 