export class HowlerTicker {
  constructor(sound) {
    this.sound = sound;
  }

  play() {
    this.sound.play();
  }

  pause() {
    this.sound.pause();
  }

  reset() {
    this.sound.seek(0);
  }

  isPlaying() {
    return this.sound.playing();
  }

  getTime() {
    return this.sound.seek();
  }
}
