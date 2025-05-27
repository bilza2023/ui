// titleWith3Bullets.js – final version
// Builds a title + three-bullet slide. AnimApi adds spec-only tweens; runtime
// engine consumes them. Items start fully off-screen right and invisible.

import { TemplateToolkit as T } from "../../toolkit/Toolkit";
import AnimApi from "../../toolkit/AnimApi.js";

/**
 * @param {object} theme – global theme (colors, fonts)
 * @param {object} data  – {
 *   title:   string,
 *   bullets: string[] | { text, showAt? }[],
 *   lineGap?, gapBelowHeading?
 * }
 * @returns {object[]} items array for the slide
 */
export default function titleWith3Bullets(theme, data = {}) {
  const items = [];

  // ---------------------------------------------------------------- spacing
  const lineGap         = data.lineGap ?? 100;
  const gapBelowHeading = data.gapBelowHeading ?? 130;

  // ---------------------------------------------------------------- layout
  const stageWidth = T.designWidth || 1020;   // guarantee off-screen start
  const offscreenX = stageWidth + 40;         // 40px safety margin

  // ---------------------------------------------------------------- title
  const titleData = T.applyPreset(T.stylePresets.text.heading, {
    text: data.title || "Your Title",
    x: 100,
    y: 60,
  });
  const title = T.ItemBuilders.text(theme, titleData);

  AnimApi.set(title, "alpha", 0, 0);
  AnimApi.animate(title, "alpha", 0, 1, 1, 2, "linear");
  // Hide immediately & tween in
  // AnimApi.set(title, "alpha", 0, 0);
  // AnimApi.animate(title, "x", offscreenX, title.x, 1, 2, "easeOut");
  // AnimApi.animate(title, "alpha", 0, 1, 1, 2, "linear");
  items.push(title);

  // ---------------------------------------------------------------- bullets
  const baseY = title.y + gapBelowHeading;
  (data.bullets || ["Bullet 1", "Bullet 2", "Bullet 3"]).forEach((b, i) => {
    const text    = typeof b === "string" ? b : b.text;
    const showAt  = (typeof b === "string" ? i + 1 : b.showAt ?? i + 1);

    const bulletData = T.applyPreset(T.stylePresets.text.bullet, {
      text,
      x: 100,
      y: baseY + i * lineGap,
      showAt,
    });

    const bullet = T.ItemBuilders.text(theme, bulletData);

      // Hide immediately & fade in
  AnimApi.set(bullet, "alpha", 0, 0);
  AnimApi.animate(bullet, "alpha", 0, 1, showAt, showAt + 1, "linear");

    // AnimApi.set(bullet, "alpha", 0, 0);
    // AnimApi.animate(bullet, "x", offscreenX, bullet.x, showAt, showAt + 1, "easeOut");
    // AnimApi.animate(bullet, "alpha", 0, 1, showAt, showAt + 1, "linear");

    items.push(bullet);
  });

  return items;
}
