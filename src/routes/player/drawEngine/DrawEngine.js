
// drawEngine/DrawEngine.js
import { getActiveSlide } from './getActiveSlide.js';
import drawBackground from './drawBackground.js';
import renderItems from './renderItems.js';

export default class DrawEngine {
  constructor(slidesData, app) {
    this.slides = slidesData.slides;
    this.designWidth = slidesData.designWidth;
    this.designHeight = slidesData.designHeight;
    this.app = app;
    this.lastSlideId = null;
  }

  draw(currentTime) {
    const slide = getActiveSlide(this.slides, currentTime);
    if (!slide) return;

    const stage = this.app.stage;
    stage.removeChildren();

    const canvasW = this.app.view.width;
    const canvasH = this.app.view.height;

    // 1. Draw background (always)
    drawBackground(this.app, slide.background, canvasW, canvasH, slide.backgroundColor || "#dcdcdc");

    // 2. Filter visible items
    const visibleItems = slide.items.filter(item =>
      item.visible !== false &&
      (item.showAt === undefined || currentTime >= item.showAt)
    );

    // 3. Draw visible items
    renderItems(this.app, visibleItems, this.designWidth, this.designHeight);

    stage.sortChildren();
  }
}
