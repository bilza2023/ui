// bulletsComponent.js
// Full-width bullet list template with fixed body zone and configurable gapFromTop

import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

/**
 * Renders a vertical list of bullet text items inside the full body zone.
 * @param {object} theme        Your global theme object
 * @param {Array<{text:string, showAt:number}>} data  List entries
 * @param {object} config       Configuration options:
 *   - x               (number) horizontal start offset (default: 100)
 *   - lineGap         (number) vertical spacing between items (default: 80)
 *   - stylePresetKey  (string) key for style preset (default: "text.bullet")
 *   - gapFromTop      (number) extra gap from top of body zone (default: 0)
 *   - xOffset         (number) additional x offset (default: 0)
 *   - yOffset         (number) additional y offset (default: 0)
 */
export default function bullets(theme, data = [], config = {}) {
  const {
    x = 100,
    lineGap = 80,
    stylePresetKey = "text.bullet",
    gapFromTop = 0,
    xOffset = 0,
    yOffset = 0,
  } = config;

  const items = [];

  // Total height occupied by all bullets
  const contentHeight = data.length * lineGap;
  // Base Y: top of body zone + optional extra gap
  const baseY = T.layout.getBodyY('top', contentHeight) + gapFromTop;

  data.forEach((entry, i) => {
    const { text, showAt } = entry;
    const yPos = baseY + i * lineGap + yOffset;

    const bulletItem = T.ItemBuilders.text(
      theme,
      T.applyPreset(T.stylePresets[stylePresetKey], {
        text,
        x: xOffset + x,
        y: yPos,
      })
    );

    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}