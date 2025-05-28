// bulletsComponent.js
import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

/**
 * Renders a vertical list of bullets, each fading in at its own showAt time.
 *
 * @param {Theme} theme
 * @param {{ text: string, showAt: number }[]} loopData
 * @param {{
 *   x?: number,
 *   y?: number,
 *   lineGap?: number,
 *   stylePresetKey?: string
 * }} config
 * @returns {SlideItem[]}
 */
export default function bullets(theme, loopData = [], config = {}) {
  const {
    x = 100,
    y = 60,
    lineGap = 80,
    stylePresetKey = "text.bullet"
  } = config;

  const items = [];
  loopData.forEach((entry, i) => {
    const { text, showAt } = entry;
    const bulletItem = T.ItemBuilders.text(
      theme,
      T.applyPreset(T.stylePresets[stylePresetKey], {
        text,
        x,
        y: y + i * lineGap
      })
    );
    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}
