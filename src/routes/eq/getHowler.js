// getHowler.js
import { Howl } from "howler";

const howlerCache = new Map();
let instanceCount = 0;

/**
 * Returns a cached Howl instance for the given URL.
 * Logs for debug purposes.
 */
export function getHowler(url) {
  if (howlerCache.has(url)) {
    console.debug(`[getHowler] Using cached Howl for: ${url}`);
    return howlerCache.get(url);
  }

  console.info(`[getHowler] Creating new Howl instance for: ${url}`);
  instanceCount++;
  console.info(`[getHowler] Total Howl instances: ${instanceCount}`);

  const sound = new Howl({
    src: [url],
    html5: true,
    preload: true,
    onloaderror: (id, err) => {
      console.error(`[getHowler] Load error for ${url}:`, err);
    },
    onplayerror: (id, err) => {
      console.error(`[getHowler] Play error for ${url}:`, err);
    }
  });

  howlerCache.set(url, sound);
  return sound;
}
