// bulletsComponent.js
// Simplest full-width bullet list with configurable fontSize and lineGap

import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a vertical list of bullets centered horizontally.
 * @param {object} theme        Global theme (used for width)
 * @param {Array<{text:string, showAt:number}>} data  List entries
 * @param {object} config       Configuration options:
 *   - fontSize       (number): font size in px (default: 35)
 *   - lineGap        (number): vertical gap between lines (default: fontSize * 1.4)
 *   - fontFamily     (string): font family (default: 'Arial')
 *   - color          (string): text color (default: '#000')
 *   - containerWidth (number): width of text container (default: 820)
 *   - textAlign      (string): horizontal text alignment (default: 'center')
 *   - alignment      ('top'|'center'|'bottom'): vertical alignment (default: 'top')
 *   - gapFromTop     (number): extra top gap when alignment is 'top' (default: 0)
 *   - xOffset        (number): manual x offset (default: 0)
 *   - yOffset        (number): manual y offset (default: 0)
 *   - padding        (number): horizontal padding inside container (default: 10)
 */
export default function bullets(theme, data = [], config = {}) {
  const {
    fontSize = 32,
    lineGap = fontSize * 1.4,
    fontFamily = 'Arial',
    color = '#000',
    containerWidth = 820,
    textAlign = 'center',
    alignment = 'top',
    gapFromTop = 40,
    xOffset = 0,
    yOffset = 0,
    padding = 10,
  } = config;

  // Compute total height occupied
  const contentHeight = data.length * lineGap;

  // Determine base Y
  let baseY = T.layout.getBodyY(alignment, contentHeight);
  if (alignment === 'top') baseY += gapFromTop;

  // Determine horizontal center
  const slideWidth = T.designWidth;
  const baseX = xOffset + (slideWidth - containerWidth) / 2 + padding;

  const items = [];
  data.forEach((entry, i) => {
    const { text, showAt } = entry;
    const yPos = baseY + i * lineGap + yOffset;

    const bulletItem = T.ItemBuilders.text(theme, {
      text,
      x: baseX,
      y: yPos,
      fontSize,
      fontFamily,
      lineHeight: lineGap,
      textAlign,
    });

    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}
