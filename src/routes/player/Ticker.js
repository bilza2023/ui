export default class Ticker {
  constructor({ onTick }) {
    this.time = 0;
    this.onTick = onTick;
    this.interval = null;
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      this.time += 0.1;
      this.onTick(this.time);
    }, 100);
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.pause();
    this.time = 0;
    this.onTick(0);
  }
}
