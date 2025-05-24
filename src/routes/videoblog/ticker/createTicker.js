
// createPlayerWithTicker.js
import { HowlerTicker } from "./HowlerTicker.js";
import { IntervalTicker } from "./IntervalTicker.js";


///////////////////////////////////////////
export function createTicker({sound=null }) {
  return sound ? new HowlerTicker(sound) : new IntervalTicker();
  
}
