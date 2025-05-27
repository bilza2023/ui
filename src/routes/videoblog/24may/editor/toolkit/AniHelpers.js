// aniHelpers.js
// Preset helpers for common slide animations using AnimApi.

import AnimApi from "./AnimApi.js";

/**
 * Fade in: alpha 0→1.
 * @param {object} item
 * @param {number} start    - Time (s) when fade starts
 * @param {number} duration - Duration (s) of fade
 */
export function fadeIn(item, start = 0, duration = 1) {
  AnimApi.set(item, "alpha", 0, start);
  AnimApi.animate(item, "alpha", 0, 1, start, start + duration, "linear");
}

/**
 * Fade out: alpha current→0.
 * @param {object} item
 * @param {number} start    - Time (s) when fade starts
 * @param {number} duration - Duration (s) of fade
 */
export function fadeOut(item, start = 0, duration = 1) {
  const initial = item.alpha ?? 1;
  AnimApi.animate(item, "alpha", initial, 0, start, start + duration, "linear");
}

/**
 * Focus on a single item: dim others, then restore.
 * @param {object[]} items        - All items on slide
 * @param {object} focusItem      - The item to highlight
 * @param {number} dimAlpha       - Alpha for non-focus items
 * @param {number} start          - Time when dimming starts
 * @param {number} duration       - Duration of dimming
 * @param {number} restoreStart   - Time when restoration starts
 * @param {number} restoreDuration- Duration of restoration
 */
export function focus(items, focusItem, dimAlpha = 0.3,
                      start = 0, duration = 1,
                      restoreStart = start + duration + 0.5,
                      restoreDuration = 1) {
  items.forEach(item => {
    const initial = item.alpha ?? 1;
    const targetAlpha = item === focusItem ? 1 : dimAlpha;
    AnimApi.animate(item, "alpha", initial, targetAlpha, start, start + duration, "linear");
    AnimApi.animate(item, "alpha", targetAlpha, 1, restoreStart, restoreStart + restoreDuration, "linear");
  });
}

/**
 * Shake an item horizontally.
 * @param {object} item
 * @param {number} start     - Time when shake begins
 * @param {number} duration  - Total duration (s)
 * @param {number} magnitude - Max offset (px)
 * @param {number} freq      - Oscillations per second
 */
export function shake(item, start = 0, duration = 0.5, magnitude = 10, freq = 20) {
  const steps = Math.ceil(duration * freq);
  const stepDuration = duration / steps;
  const originalX = item.x;

  for (let i = 0; i <= steps; i++) {
    const t0 = start + i * stepDuration;
    const t1 = t0 + stepDuration;
    const dir = i % 2 === 0 ? 1 : -1;
    AnimApi.animate(item, "x", originalX, originalX + dir * magnitude, t0, t1, "linear");
  }
}
