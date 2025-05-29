

import { TemplateToolkit as T } from "../../../toolkit/Toolkit";

/**
 * @param {Theme}       globalTheme
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
export default function quoteComponent(globalTheme, data = [], config = {}) {
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

  // === Quote Lines ===
  data.forEach((entry, i) => {
    const { text, showAt } = entry;
    const lineItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.quote, {
        text,
        x: xOffset + 100,
        y: yOffset + startY + i * lineHeight,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    T.AniHelpers.fadeIn(lineItem, showAt, 0.5);
    items.push(lineItem);
  });

  // === Author ===
  if (author?.text) {
    const { text, showAt } = author;
    const authorItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.caption, {
        text,
        x: xOffset + 100,
        y: yOffset + startY + data.length * lineHeight + 30,
        width: 820,
        textAlign: "right",
        fontSize: 28
      })
    );
    T.AniHelpers.fadeIn(authorItem, showAt, 0.5);
    items.push(authorItem);
  }

  return items;
}
