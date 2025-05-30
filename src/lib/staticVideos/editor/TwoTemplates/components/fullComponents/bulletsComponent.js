// bulletsComponent.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a vertical list of bullets centered horizontally.
 * @param {object} theme – Global theme (used for width and fonts)
 * @param {Array<{text:string, showAt:number}>} data – List entries
 * @param {object} config – Optional overrides:
 *   - fontSize, lineGap, containerWidth, textAlign, alignment,
 *     gapFromTop, xOffset, yOffset, padding, fontFamily, color
 */
export default function bullets(theme, data = [], config = {}) {
  const {
    fontSize = 32,
    lineGap = fontSize * 1.4,
    fontFamily = theme.fontFamilyBase,
    color = theme.baseTextColor,
    containerWidth = 820,
    textAlign = 'center',
    alignment = 'top',
    gapFromTop = 40,
    xOffset = 0,
    yOffset = 0,
    padding = 10
  } = config;

  const contentHeight = data.length * lineGap;
  let baseY = T.layout.getBodyY(alignment, contentHeight);
  if (alignment === 'top') baseY += gapFromTop;

  const baseX = xOffset + (T.designWidth - containerWidth) / 2 + padding;

  return data.map((entry, i) => {
    const { text, showAt } = entry;
    const y = baseY + i * lineGap + yOffset;

    const bulletItem = T.ItemBuilders.text(theme, {
      text,
      x: baseX,
      y,
      fontSize,
      fontFamily,
      lineHeight: lineGap,
      textAlign,
      color
    });

    T.AnimApi.animate(bulletItem, "alpha", 0, 1, showAt, showAt + 0.5, "easeOut");

    return bulletItem;
  });
}
