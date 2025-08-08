// soundServices.js — one API, two backends, with silent auto-detect.
// Works for both silent & sounded decks. No console spam.

import Player from './Player.js';   // Howler-backed
import Timer  from './Timer.js';    // setInterval-backed

/** Create timing source (Howler if url, Timer otherwise). */
export function createSoundPlayer(soundUrl) {
  return soundUrl ? new Player(soundUrl) : new Timer();
}

/**
 * Probe a URL with HEAD and return true/false without throwing or logging.
 * Pass SvelteKit's fetch from load/onMount to avoid SSR fetch issues.
 */
export async function headOk(url, fetchFn = globalThis.fetch) {
  try {
    const res = await fetchFn(url, { method: 'HEAD', cache: 'no-store' });
    return !!res.ok;
  } catch {
    return false;
  }
}

/**
 * Detect an .opus for a given filename under /sounds.
 * Returns the URL if it exists, otherwise null.
 * Example: filename="theorem_revision_ch10_11"
 */
export async function detectSoundUrl(filename, fetchFn = globalThis.fetch) {
  if (!filename) return null;
  const url = `/sounds/${filename}.opus`;
  const ok = await headOk(url, fetchFn);
  return ok ? url : null;
}

/**
 * Convenience: detect + create player in one shot.
 * Use this inside onMount AFTER the deck is loaded.
 */
export async function createDetectedSoundPlayer(filename, fetchFn = globalThis.fetch) {
  const url = await detectSoundUrl(filename, fetchFn);
  return { player: createSoundPlayer(url), soundUrl: url };
}
