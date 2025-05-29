// src/components/halfComponents/halfBullets.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function halfBullets(theme, data = [], config = {}) {
  const {
    // horizontal & vertical offsets from DeckBuilder.half()
    xOffset = 0,
    yOffset = 0,
    // style choices
    stylePresetKey = "bullet",
    fontSize=32,
    lineGap = 80,
    leftMargin = 40,
    gapFromTop = 60
  } = config;

  // 1) Horizontal start: either user x or default margin
  const baseX = xOffset + (config.x != null ? config.x : leftMargin);

  // 2) Vertical start: compute top-aligned body Y, then add gap + header offset
  const contentHeight = data.length * lineGap;
  let baseY = T.layout.getBodyY("top", contentHeight);
  baseY += gapFromTop;    // mirror your full-width bullets :contentReference[oaicite:1]{index=1}
  baseY += yOffset;       // reserve header space

  // 3) Build each bullet via style preset + animation
  return data.map(({ text, showAt }, i) => {
    const preset = T.stylePresets.text[stylePresetKey] || T.stylePresets.text.bullet;
    const bulletItem = T.ItemBuilders.text(
      theme,
      T.applyPreset(preset, {
        text,
        x: baseX,
        y: baseY + i * lineGap,
        fontSize
      })
    );
    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    return bulletItem;
  });
}
