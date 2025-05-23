// DrawEngine.js
import * as PIXI from "pixi.js";
import getBackgroundColor from "./getBackgroundColor.js";

export default class DrawEngine {
  constructor(app) {
    this.app = app;
    this.stage = app.stage;

    // Setup layers
    this.backgroundLayer = new PIXI.Container();
    this.itemLayer = new PIXI.Container();
    this.stage.addChild(this.backgroundLayer, this.itemLayer);
  }

  draw(slide, currentTime) {
    // ---- background ----
    this.backgroundLayer.removeChildren();
    const bgColor = getBackgroundColor(slide);
    const bg = new PIXI.Graphics();
    bg.beginFill(bgColor);
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();
    this.backgroundLayer.addChild(bg);

    // ---- items ----
    this.itemLayer.removeChildren();

    const visibleItems = slide.items?.filter(
      (it) => it.data?.showAt === undefined || currentTime >= it.data.showAt
    ) ?? [];

    visibleItems.forEach((it) => {
      // if (!it.displayObject) return;
      this.itemLayer.addChild(it);
    });
  }
}
