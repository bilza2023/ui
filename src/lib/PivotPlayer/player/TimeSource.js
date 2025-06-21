// pivot-player/src/TimeSource.js
export default class TimeSource {
    start() {
      throw new Error('start() not implemented');
    }
    pause() {
      throw new Error('pause() not implemented');
    }
    seek(time) {
      throw new Error('seek() not implemented');
    }
    onTick(cb) {
      throw new Error('onTick() not implemented');
    }
    destroy() {
      throw new Error('destroy() not implemented');
    }
  }
  