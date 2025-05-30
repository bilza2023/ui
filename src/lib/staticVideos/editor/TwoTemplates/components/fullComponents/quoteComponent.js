// quoteComponent.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit";

/**
 * Renders a multi-line quote with an optional author caption.
 *
 * @param {Theme} theme
 * @param {Array<{ text: string, showAt: number }>} data
 * @param {{
 *   author?: { text: string, showAt: number },
 *   fontSize?: number,
 *   lineHeight?: number,
 *   startY?: number,
 *   xOffset?: number,
 *   yOffset?: number
 * }} config
 * @returns {SlideItem[]}
 */
export default function quoteComponent(theme, data = [], config = {}) {
  const {
    author,
    fontSize = 48,
    lineHeight: lineMul = 1.4,
    startY = 140,
    xOffset = 0,
    yOffset = 0
  } = config;

  const items = [];
  const lineHeight = fontSize * lineMul;

  // Quote lines
  data.forEach((entry, i) => {
    const { text, showAt } = entry;
    const y = yOffset + startY + i * lineHeight;

    const lineItem = T.ItemBuilders.text(theme, {
      text,
      x: xOffset + 100,
      y,
      width: 820,
      textAlign: "center",
      fontSize,
      fontFamily: theme.fontFamilyBase,
      color: theme.baseTextColor
    });

    T.AnimApi.animate(lineItem, "alpha", 0, 1, showAt, showAt + 0.5);
    items.push(lineItem);
  });

  // Author caption
  if (author?.text) {
    const { text, showAt } = author;
    const y = yOffset + startY + data.length * lineHeight + 30;

    const authorItem = T.ItemBuilders.text(theme, {
      text,
      x: xOffset + 100,
      y,
      width: 820,
      textAlign: "right",
      fontSize: 28,
      fontFamily: theme.fontFamilyBase,
      color: theme.secondaryColor
    });

    T.AnimApi.animate(authorItem, "alpha", 0, 1, showAt, showAt + 0.5);
    items.push(authorItem);
  }

  return items;
}