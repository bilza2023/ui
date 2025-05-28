// leftHeaderRich.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";
import richTextBuilder           from "../../../../items/richText";  // your richText item factory

/**
 * A subtle, left-aligned rich-text header that fades in.
 *
 * @param {Theme} theme
 * @param {{ text: string, showAt?: number }[]} data
 * @param {{
 *   x?: number,
 *   y?: number,
 *   width?: number,
 *   fontSize?: number,
 *   color?: string,
 *   fontFamily?: string,
 *   lineHeight?: number,
 *   rotation?: number
 * }} config
 * @returns {SlideItem[]}
 */
export default function leftHeaderRich(theme, data = [], config = {}) {
  const {
    text = data[0]?.text || "Header",
    showAt = data[0]?.showAt || 0,
    x = 60,
    y = 40,
    width = 700,
    fontSize = 36,
    color = theme.baseTextColor || "#333",
    fontFamily = theme.fontFamilyBase || "Georgia",
    lineHeight = 1.2,
    rotation = 0
  } = { ...config, ...data[0] };

  // build the richText item
  const item = richTextBuilder(theme, {
    text,
    x,
    y,
    width,
    height: null,   // allow auto height
    fontSize,
    fontFamily,
    color,
    textAlign: "left",
    lineHeight,
    rotation,
    visible: true,
    zIndex: 1
  });

  // fade-in animation
  T.AniHelpers.fadeIn(item, showAt, 0.5);

  return [item];
}
