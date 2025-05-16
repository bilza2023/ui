// DrawEngine.js

import renderCanvasItems from './renderer/CanvasRenderer.js';
import { getActiveSlide } from './SlideUtils.js';

export default class DrawEngine {
  constructor(slidesData, app) {
    this.slides = slidesData.slides;
    this.designWidth = slidesData.designWidth;
    this.designHeight = slidesData.designHeight;
    this.app = app;
    this.lastSlideId = null;
  }

  draw(currentTime) {
    debugger;
    const slide = getActiveSlide(this.slides, currentTime);
    if (!slide) return;

    // Prevent re-rendering the same slide if desired
    if (slide.id === this.lastSlideId) return;
    this.lastSlideId = slide.id;

    renderCanvasItems(
      this.app,
      slide.items,
      this.designWidth,
      this.designHeight,
      slide.backgroundColor || "#000"
    );
  }
}
