
// halfBullets.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function halfBullets(theme, data = [], config = {}) {
  const {
    x,
    y,
    lineGap = 80,
    stylePresetKey = "text.bullet",
    xOffset = 0,
    yOffset = 0,
    leftMargin = 40
  } = config;

  const baseX = xOffset + (x != null ? x : leftMargin);
  const baseY = yOffset + (y != null ? y : 60);

  const items = [];
  data.forEach((entry, i) => {
    const { text, showAt } = entry;

    const bulletItem = T.ItemBuilders.text(
      theme,
      T.applyPreset(T.stylePresets[stylePresetKey], {
        text,
        x: baseX,
        y: baseY + i * lineGap
      })
    );
    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}
