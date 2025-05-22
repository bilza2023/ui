// DrawEngine.js
import * as PIXI from 'pixi.js';

export default class DrawEngine {
  constructor(app, options = {}) {
    this.app = app;
    this.stage = app.stage;
    this.debug = options.debug || false;

    // === Layer setup ===
    this.backgroundLayer = new PIXI.Container();
    this.itemLayer = new PIXI.Container();

    this.stage.addChild(this.backgroundLayer);
    this.stage.addChild(this.itemLayer);
  }

  draw(slide, currentTime) {
    // Clear both layers

    this.backgroundLayer.removeChildren();
    this.itemLayer.removeChildren();
  debugger;
    // Draw background
    this.drawBackground(slide);

    // Filter visible items
    const visibleItems = slide.items.filter(item =>
      item.data.showAt === undefined || currentTime >= item.data.showAt
    );

    // Render items
    visibleItems.forEach(item => {
      if (this.debug) {
        console.log(`Rendering item: ${item.data.id} at time ${currentTime}`);
      }
      this.itemLayer.addChild(item.displayObject);
    });
  }

  drawBackground(slide) {
   
    const bg = new PIXI.Graphics();
    const color = slide.backgroundColor ?? 0x000000;

    bg.beginFill(color);
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();

    this.backgroundLayer.addChild(bg);
  }
}