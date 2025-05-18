// DrawEngine.js

import renderSlide from './renderer/SlideRenderer.js';
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
    const slide = getActiveSlide(this.slides, currentTime);
    if (!slide) return;

    // Future: prevent unnecessary re-renders by comparing slide.id
    renderSlide(
      this.app,
      this.designWidth,
      this.designHeight,
      slide
    );
  }
}
