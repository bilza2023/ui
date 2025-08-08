// soundServices.js
// One API, two backends (Howler or clock). Zero decisions in UI.

import Player from './Player.js';   // Howler-backed
import Timer  from './Timer.js';    // setInterval-backed

/**
 * Create a timing source with a unified API.
 * @param {string|null} soundUrl  e.g. "/sounds/foo.opus" or null for silent
 * @returns {{play:Function,pause:Function,seek:Function,onTick:Function,destroy:Function}}
 */
export function createSoundPlayer(soundUrl) {
  return soundUrl ? new Player(soundUrl) : new Timer();
}

/**
 * Optional: convenience to respect ?sound=on/off and deck hints.
 * @param {object} opts
 * @param {URLSearchParams} [opts.searchParams]
 * @param {object} [opts.deckMeta] e.g. { hasAudio: true }
 * @param {string} [opts.filename]
 * @returns {string|null} soundUrl or null
 */
export function decideSoundUrl({ searchParams, deckMeta, filename } = {}) {
  const pref = searchParams?.get?.('sound'); // 'on' | 'off' | null
  if (pref === 'off') return null;
  if (pref === 'on')  return filename ? `/sounds/${filename}.opus` : null;

  // Default: only if deck explicitly says it has audio
  if (deckMeta?.hasAudio && filename) return `/sounds/${filename}.opus`;
  return null;
}
