import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function scrollingListSlide(globalTheme, data = {}) {
  const points = data.items || [];

  const baseY = 240; // Center
  const lineSpacing = 80;

  const items = points.map((entry, i) => {
    const text = entry.text || "";
    const showAt = entry.showAt ?? i * 2;

    const item = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.bullet, {
        text,
        x: 100,
        y: baseY + i * lineSpacing,
        width: 820,
        textAlign: "center"
      })
    );

    // No animation: let all appear statically
    return item[0];
  });

  return items;
}
