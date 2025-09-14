
// /src/lib/services/soundServices.js
// ID-anchored audio lookup. No legacy filename API.

import { Player, Timer } from '../taleem';

// const AUDIO_BASE = '/media/audio'; // e.g. /media/audio/q33.opus
const AUDIO_BASE = '/sounds';
/** Create timing source: Howler Player if url, else silent Timer. */
export function createSoundPlayer(soundUrl) {
  return soundUrl ? new Player(soundUrl) : new Timer();
}

/** HEAD probe without logs or throws. Works in SSR and browser. */
export async function headOk(url, fetchFn = globalThis.fetch) {
  try {
    const res = await fetchFn(url, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

/** Build canonical audio URL for a question id. */
export function urlForId(id) {
  const n = Number(id);
  if (!Number.isInteger(n) || n <= 0) return null;
  return `${AUDIO_BASE}/q${n}.opus`;
}

/** Detect playable audio by question id. Returns URL or null. */
export async function detectSoundById(id, fetchFn = globalThis.fetch) {
  const url = urlForId(id);
  if (!url) return null;
  return (await headOk(url, fetchFn)) ? url : null;
}

/** Detect then construct a player. Returns { player, soundUrl }. */
export async function createDetectedSoundPlayerById(id, fetchFn = globalThis.fetch) {
  const url = await detectSoundById(id, fetchFn);
  return { player: createSoundPlayer(url), soundUrl: url };
}
