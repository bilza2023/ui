// SveltePlayer.js
import { Ticker } from "./useTicker.js";

export class SveltePlayer {
  constructor({ deck, audio = null }) {
    this.deck = deck;
    this.slides = deck.slidesData || [];
    this.globalBackground = deck.globalBackground || {};
    this.globalTheme = deck.globalTheme || {};

    this.currentTime = 0;
    this.currentIndex = 0;
    this.ticker = new Ticker();

    this.getTime = () => this.ticker.getTime();

    this.isAudio = audio && typeof audio.play === "function";
    this.audio = audio;

    if (this.isAudio) {
      this.getTime = () => audio.seek();
    }
  }

  play() {
    if (this.isAudio) this.audio.play();
    this.ticker.play();
    this._loop();
  }

  pause() {
    if (this.isAudio) this.audio.pause();
    this.ticker.pause();
  }

  reset() {
    this.pause();
    this.currentTime = 0;
    this.ticker.reset();
    if (this.isAudio) this.audio.seek(0);
  }

  _loop() {
    if (!this.ticker.isPlaying()) return;

    this.currentTime = this.getTime();
    this._updateSlideIndex();
    requestAnimationFrame(() => this._loop());
  }

  _updateSlideIndex() {
    for (let i = 0; i < this.slides.length; i++) {
      const s = this.slides[i];
      if (this.currentTime >= s.startTime && this.currentTime < s.endTime) {
        this.currentIndex = i;
        break;
      }
    }
  }

  getCurrentSlide() {
    return this.slides[this.currentIndex];
  }
}
