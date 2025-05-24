// Player.js
import DrawEngine from "../engine/DrawEngine.js";
import { runAnimation } from "../../hooks/runAnimation.js";

export  class Player {
  constructor({ app, slides, timeSource }) {
    this.app = app;
    this.slides = slides;
    this.timeSource = timeSource;

    this.currentIndex = 0;
    this.currentTime = 0;
    this.drawEngine = new DrawEngine(app);
  }

  setTime(time) {
    this.currentTime = time;
    this.updateIndexByTime(time);
    this.renderCurrentSlide();
  }

  play() {
    this.timeSource.play();
    this.startLoop();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  startLoop() {
    const maxTime = this.slides[this.slides.length - 1].endTime;
  
    const loop = () => {
      if (!this.timeSource.isPlaying()) return;
  
      const t = this.timeSource.getTime();
      if (t >= maxTime) {
        this.timeSource.pause(); // stop audio + ticker
        this.setTime(maxTime);   // clamp at end
        return;
      }
  
      this.setTime(t);
      requestAnimationFrame(loop);
    };
  
    requestAnimationFrame(loop);
  }
  

  reset() {
    this.timeSource.reset();
    this.setTime(0);
  }

  renderCurrentSlide() {
    const slide = this.currentSlide;
    slide.items?.forEach(item => runAnimation(item, this.currentTime));
    this.drawEngine.draw(slide, this.currentTime);
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

  get currentSlide() {
    return this.slides[this.currentIndex];
  }
}
