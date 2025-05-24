
import { HowlerTicker } from './HowlerTicker.js';
import { IntervalTicker } from './IntervalTicker.js';
import PlayerObj from './PlayerObj.js'; // uses Player.js internally


export function createPlayer({ app, slides, sound = null }) {
  const ticker = sound ? new HowlerTicker(sound) : new IntervalTicker();

  return new PlayerObj({
    app,
    slides,
    timeSource: ticker
  });
}