
// DrawEngine.js
import * as PIXI from 'pixi.js';

export default class DrawEngine {
  constructor(app, options = {}) {
    this.app = app;
    this.stage = app.stage;
    this.debug = options.debug || false;

    // === Layer setup ===
    this.backgroundLayer = new PIXI.Container();

    // Add a hardcoded light gray background
    const bg = new PIXI.Graphics();
    bg.beginFill(0x333366); // light gray
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();
    this.backgroundLayer.addChild(bg);

    this.itemLayer = new PIXI.Container();

    // Add both layers to the stage
    this.stage.addChild(this.backgroundLayer);
    this.stage.addChild(this.itemLayer);
  }

  draw(slide, currentTime) {
    // Only clear and update the item layer
    this.itemLayer.removeChildren();

    const visibleItems = slide.items.filter(item =>
      item.data.showAt === undefined || currentTime >= item.data.showAt
    );

    visibleItems.forEach(item => {
      if (this.debug) {
        console.log(`Rendering item: ${item.data.id} at time ${currentTime}`);
      }
      this.itemLayer.addChild(item.displayObject);
    });
  }
}
