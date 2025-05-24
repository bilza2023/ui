

export function handleSeek(sound, engine, setCurrentTime) {
    return (event) => {
      const time = parseFloat(event.target.value);
      if (!isNaN(time)) {
        sound.seek(time);
        engine.draw(time);
        setCurrentTime(time);
      }
    };
  }
  
  export function handleVolume(sound) {
    return (event) => {
      const volume = parseFloat(event.target.value);
      if (!isNaN(volume)) {
        sound.volume(volume);
      }
    };
  }
  
  export function createTickLoop(sound, engine, getMaxEndTime, setCurrentTime, stopCallback) {
    function tick() {
      const t = sound.seek();
      const maxEnd = getMaxEndTime();
  
      if (t >= maxEnd) {
        sound.stop();
        stopCallback();
        engine.draw(maxEnd);
        return;
      }
  
      setCurrentTime(t);
      engine.draw(t);
  
      if (sound.playing()) {
        requestAnimationFrame(tick);
      } else {
        stopCallback();
      }
    }
    return tick;
  }
  