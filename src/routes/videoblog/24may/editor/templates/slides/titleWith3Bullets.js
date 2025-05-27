// titleWith3Bullets.js – sequential fade template
// Heading and bullets fade in one after another.

import { TemplateToolkit as T } from "../../toolkit/Toolkit";
import AnimApi from "../../toolkit/AnimApi.js";

/**
 * @param {object} theme – global theme (colors, fonts)
 * @param {object} data  – { title: string, bullets: string[] | { text, showAt }[], lineGap?, gapBelowHeading? }
 * @returns {object[]} items array for the slide
 */
export default function titleWith3Bullets(theme, data = {}) {
  const items = [];
  const {
    title = "Your Title",
    bullets = ["Bullet 1", "Bullet 2", "Bullet 3"],
    lineGap = 100,
    gapBelowHeading = 130
  } = data;

  // ---- heading: fade in at 0–1s ------------------------------------------
  const titleData = T.applyPreset(T.stylePresets.text.heading, {
    text: title,
    x: 100,
    y: 60
  });
  const titleItem = T.ItemBuilders.text(theme, titleData);
  T.AniHelpers.fadeIn(titleItem, 0, 1);
  items.push(titleItem);

  // ---- bullets: each fades in sequentially --------------------------------
  const baseY = titleData.y + gapBelowHeading;
  bullets.forEach((b, i) => {
    const text = typeof b === "string" ? b : b.text;
    // compute fade start time: title 0–1, bullet1 1–2, bullet2 2–3, etc.
    const start = i + 1;

    const bulletData = T.applyPreset(T.stylePresets.text.bullet, {
      text,
      x: 100,
      y: baseY + i * lineGap
    });
    const bulletItem = T.ItemBuilders.text(theme, bulletData);

    // hide until fade
    AnimApi.set(bulletItem, "alpha", 0, 0);
    // fade in over 1s at [start, start+1]
    T.AniHelpers.fadeIn(bulletItem, start, 1);
    items.push(bulletItem);
  });

  return items;
}
