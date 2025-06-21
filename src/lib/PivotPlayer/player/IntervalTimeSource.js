// pivot-player/src/IntervalTimeSource.js
import TimeSource from './TimeSource.js';

export default class IntervalTimeSource extends TimeSource {
  constructor(interval = 1000) {
    super();
    this.interval = interval;
    this.currentTime = 0;
    this._timer = null;
    this._cbs = [];
  }

  start() {
    if (this._timer) return;
    this._timer = setInterval(() => {
      this.currentTime += this.interval;
      this._cbs.forEach(cb => cb(this.currentTime));
    }, this.interval);
  }

  pause() {
    clearInterval(this._timer);
    this._timer = null;
  }

  seek(time) {
    this.currentTime = time;
    this._cbs.forEach(cb => cb(this.currentTime));
  }

  onTick(cb) {
    this._cbs.push(cb);
  }

  destroy() {
    this.pause();
    this._cbs = [];
  }
}
