// DrawEngine.js
import * as PIXI from 'pixi.js';
import {
  drawIcon,
  drawCircle,
  drawImage,
  drawRect,
  drawText,
  drawTriangle
} from "../threeAndHalf/items";

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

    // Draw background
    this.drawBackground(slide);

    // Filter and render visible items
    const visibleItems = slide.items.filter(item =>
      item.showAt === undefined || currentTime >= item.showAt
    );

    visibleItems.forEach(item => {
      // const displayObject = this.drawObject(item);
      // if (displayObject) {
        this.itemLayer.addChild(item);
        if (this.debug) {
          console.log(`Rendering ${item.type} at time ${currentTime}`);
        }
      // }
    });
  }

  drawBackground(slide) {
    const bg = new PIXI.Graphics();
    // debugger;
    const color = slide.backgroundColor ?? 0x000000; //gives 1710618
    // const color = 0x0e20ed;
    bg.beginFill(color);
    bg.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
    bg.endFill();
    this.backgroundLayer.addChild(bg);
  }

  drawObject(item) {
    switch (item.type) {
      case 'text': return drawText(item);
      case 'icon': return drawIcon(item);
      case 'rect': return drawRect(item);
      case 'circle': return drawCircle(item);
      case 'triangle': return drawTriangle(item);
      case 'image': return drawImage(item);
      default:
        if (this.debug) console.warn(`Unknown item type: ${item.type}`);
        return null;
    }
  }
}
