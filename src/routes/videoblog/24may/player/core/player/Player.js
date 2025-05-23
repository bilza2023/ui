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
  
    // ✅ Defer loop to allow layout to settle
    requestIdleCallback(() => {
      this.startLoop();
    });
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
    this.timeSource.pause?.();  // 1️⃣ stop sound / ticker
    this.timeSource.reset();    // 2️⃣ rewind to 0 without auto-play
    this.setTime(0);            // 3️⃣ render first frame
  }

  renderCurrentSlide() {
    const slide = this.currentSlide;
    //Animations
    // debugger;
    slide.items?.forEach(item => runAnimation(item, this.currentTime));
    //Draw
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
