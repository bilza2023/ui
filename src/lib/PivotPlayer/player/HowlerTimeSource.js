// pivot-player/src/HowlerTimeSource.js
import TimeSource from './TimeSource.js';
import { Howl } from 'howler';

export default class HowlerTimeSource extends TimeSource {
  constructor(srcUrl) {
    super();
    this.sound = new Howl({ src: [srcUrl] });
    this._cbs = [];
  }

  start() {
    this.sound.play();
    this._tickLoop();
  }

  pause() {
    this.sound.pause();
  }

  seek(time) {
    this.sound.seek(time);
    this._cbs.forEach(cb => cb(time));
  }

  onTick(cb) {
    this._cbs.push(cb);
  }

  destroy() {
    this.sound.stop();
    this.sound.unload();
    this._cbs = [];
  }

  _tickLoop() {
    if (!this.sound.playing()) return;
    const t = this.sound.seek() || 0;
    this._cbs.forEach(cb => cb(t));
    requestAnimationFrame(() => this._tickLoop());
  }
}
