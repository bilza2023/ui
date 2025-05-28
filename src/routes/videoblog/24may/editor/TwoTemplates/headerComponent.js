
// headerComponent.js
import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

/**
 * Renders a single line of header text at the top.
 *
 * @param {Theme} theme
 * @param {{ text: string, showAt?: number }[]} data      – array with one entry
 * @param {{
 *   fontSize?: number,
 *   y?: number,
 *   stylePresetKey?: string
 * }} config
 * @returns {SlideItem[]}
 */
export default function header(theme, data = [], config = {}) {
  const {
    fontSize = 64,
    y = 40,
    stylePresetKey = "text.heading"
  } = config;
  const items = [];
  if (data[0]?.text) {
    const { text, showAt = 0 } = data[0];
    const item = T.ItemBuilders.text(
      theme,
      T.applyPreset(T.stylePresets[stylePresetKey], {
        text,
        x: 100,
        y,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    T.AniHelpers.fadeIn(item, showAt, 0.5);
    items.push(item);
  }
  return items;
}
