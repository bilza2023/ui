
import renderCanvasItems from './renderer/CanvasRenderer.js';
import { getActiveSlide } from './SlideUtils.js';

export default class TickerPlayer {
  constructor({ app, slidesData }) {
    this.app = app;
    this.slides = slidesData.slides;
    this.designWidth = slidesData.designWidth;
    this.designHeight = slidesData.designHeight;
    this.currentTime = 0;
    this.currentSlideId = null;
    this.interval = null;
    this.isPlaying = false;
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.interval = setInterval(() => this.tick(), 100);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.currentTime = 0;
    this.currentSlideId = null;
    this.app.stage.removeChildren();
  }

  tick() {
    this.currentTime += 0.1;

    const activeSlide = getActiveSlide(this.slides, this.currentTime);
    if (!activeSlide) return;

    if (activeSlide.id !== this.currentSlideId) {
      this.currentSlideId = activeSlide.id;
      renderCanvasItems(this.app, activeSlide.items, this.designWidth, this.designHeight);
    }

    if (this.currentTime >= this.slides.at(-1).endTime) {
      this.pause();
    }
  }
}
