export default class Ticker {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.elapsedTime = 0;
    this.running = false;
    this._rafId = null;
    this._lastFrameTime = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this._lastFrameTime = performance.now();
    this._tick();
  }

  pause() {
    this.running = false;
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  reset() {
    this.pause();
    this.elapsedTime = 0;
    this._lastFrameTime = null;
    if (this.onTick) this.onTick(0); // force refresh
  }

  _tick = () => {
    if (!this.running) return;

    const now = performance.now();
    const delta = (now - this._lastFrameTime) / 1000; // convert ms to seconds
    this._lastFrameTime = now;

    this.elapsedTime += delta;
    if (this.onTick) this.onTick(this.elapsedTime);

    this._rafId = requestAnimationFrame(this._tick);
  };
}
