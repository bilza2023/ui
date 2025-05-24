
import DrawEngine from "./engine/DrawEngine.js";
// Player.js
export default class Player {
  constructor({ app, slides }) {
    this.app = app;
    this.slides = slides;
    this.currentIndex = 0;
    this.currentTime = 0;
    this.isPlaying = false;

    this.drawEngine = new DrawEngine(app); // assumes you've imported it
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }

  pause() {
    this.isPlaying = false;
  }

  reset() {
    this.pause();
    this.currentTime = 0;
    this.currentIndex = 0;
    this.renderCurrentSlide();
  }

  goToTime(time) {
    this.currentTime = time;
    this.updateIndexByTime(time);
    this.renderCurrentSlide();
  }

  loop(now) {
    if (!this.isPlaying) return;
    const delta = (now - this.lastFrameTime) / 1000;
    this.lastFrameTime = now;

    this.tick(delta);
    requestAnimationFrame(this.loop.bind(this));
  }

  tick(deltaTime) {
    this.currentTime += deltaTime;
    this.updateIndexByTime(this.currentTime);
    this.renderCurrentSlide();
  }
  updateIndexByTime(time) {
    for (let i = 0; i < this.slides.length; i++) {
      const s = this.slides[i];
      if (time >= s.startTime && time < s.endTime) {
        this.currentIndex = i;
        break;
      }
    }
  }
  

  renderCurrentSlide() {
    const slide = this.currentSlide;
    this.drawEngine.draw(slide, this.currentTime);
  }

  get currentSlide() {
    return this.slides[this.currentIndex];
  }
}
