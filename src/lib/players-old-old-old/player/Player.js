// lib/players/player/Player.js

export default class Player {
  constructor(sound) {
    if (!sound) throw new Error("Player requires a Howl sound object");
    this.sound = sound;
    this.onTick = () => {};
    this.loopId = null;
  }

  // play() {
  //   this.sound.play();
  //   this._startLoop();
  // }
  play() {
    if (this.sound.state() !== 'loaded') {
      this.sound.once('load', () => {
        this.sound.play();
        this._startLoop();
      });
    } else {
      this.sound.play();
      this._startLoop();
    }
  }
  
  
  pause() {
    this.sound.pause();
    cancelAnimationFrame(this.loopId);
    this.loopId = null;
  }

  seek(time) {
    this.sound.seek(time);
    this.onTick(this.getTime());
  }

  reset() {
    this.pause();
    this.seek(0);
  }

  getTime() {
    return this.sound.seek();
  }

  isPlaying() {
    return this.sound.playing();
  }

  _startLoop() {
    const loop = () => {
      if (!this.isPlaying()) return;

      const t = this.getTime();
      this.onTick(t);

      if (t >= this.sound.duration()) {
        this.pause();
        this.seek(this.sound.duration());
        return;
      }

      this.loopId = requestAnimationFrame(loop);
    };

    this.loopId = requestAnimationFrame(loop);
  }
}
