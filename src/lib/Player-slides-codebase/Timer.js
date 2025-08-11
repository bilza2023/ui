// timer.js — silent replacement for Player.js
// Mimics the exact public API: play(), pause(), onTick(cb, interval), destroy()

export default class Timer {
    constructor() {
      this._tickCbs   = [];      // registered listeners
      this._interval  = 200;     // default tick rate (ms)
      this._intervalId = null;   // setInterval handle
  
      this._elapsed   = 0;       // ms accumulated while paused
      this._startedAt = null;    // epoch ms when play() last called
    }
  
    /* --- public API parity ------------------------------------------ */
  
    play() {
      if (this._intervalId) return;                // already running
      this._startedAt = Date.now();
      this._startTickLoop(this._interval);
    }
  
    pause() {
      if (!this._intervalId) return;               // already paused
      this._elapsed += Date.now() - this._startedAt;
      this._clearTickLoop();
    }
  
    /** Attach a callback fired every `interval` ms with current time (s) */
    onTick(cb, interval = 200) {
      this._tickCbs.push(cb);
      this._interval = interval;                   // remember caller’s preference
      // If playing and no loop yet (first listener), start it
      if (this._startedAt && !this._intervalId) this._startTickLoop(interval);
    }
  
    destroy() {
      this._clearTickLoop();
      // nothing else to unload
    }
  
    seek(sec) { this._elapsed = sec * 1000; this._startedAt = Date.now(); }
    /* --- internal helpers ------------------------------------------- */
  
    _currentTime() {
      // milliseconds → seconds (Howler.seek() returns seconds)
      const runtime = this._startedAt ? Date.now() - this._startedAt : 0;
      return (this._elapsed + runtime) / 1000;
    }
  
    _startTickLoop(interval) {
      this._clearTickLoop();
      this._intervalId = setInterval(() => {
        const t = this._currentTime();
        this._tickCbs.forEach(fn => fn(t));
      }, interval);
    }
  
    _clearTickLoop() {
      if (this._intervalId) {
        clearInterval(this._intervalId);
        this._intervalId = null;
      }
    }
  }
  