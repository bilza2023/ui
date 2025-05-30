// halfBullets.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function halfBullets(theme, data = [], config = {}) {
  const {
    xOffset = 0,
    yOffset = 0,
    fontSize = 32,
    lineGap = 80,
    leftMargin = 40,
    gapFromTop = 60
  } = config;

  const baseX = xOffset + (config.x != null ? config.x : leftMargin);
  const contentHeight = data.length * lineGap;
  let baseY = T.layout.getBodyY("top", contentHeight) + gapFromTop + yOffset;

  return data.map(({ text, showAt }, i) => {
    const bulletItem = T.ItemBuilders.text(theme, {
      text,
      x: baseX,
      y: baseY + i * lineGap,
      fontSize,
      fontFamily: theme.fontFamilyBase,
      color: theme.bulletColor,
      textAlign: "left"
    });

    T.AnimApi.animate(bulletItem, "alpha", 0, 1, showAt, showAt + 0.5);

    return bulletItem;
  });
}
