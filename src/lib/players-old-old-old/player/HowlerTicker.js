// HowlerTicker.js

export class HowlerTicker {
  constructor(sound) {
    this.sound = sound;
    this.onTick = () => {};
    this._playing = false;
    this._loop = this._loop.bind(this);
  }

  play() {
    this._playing = true;
    this.sound.play();
    requestAnimationFrame(this._loop); // ensure loop starts every time
  }

  pause() {
    this._playing = false;
    this.sound.pause();
  }

  reset() {
    this.seek(0);
    this.pause();
  }

  seek(t) {
    this.sound.seek(t);
  }

  getTime() {
    return this.sound.seek();
  }

  isPlaying() {
    return this.sound.playing();
  }

  _loop() {
    if (!this._playing) return;
    const t = this.getTime();
    this.onTick(t);
    requestAnimationFrame(this._loop);
  }
}
