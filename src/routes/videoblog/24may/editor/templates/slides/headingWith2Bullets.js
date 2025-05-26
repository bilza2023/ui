
import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function headingWith2Bullets(globalTheme, data = {}) {
  // === Title ===
  const title = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.heading, {
      text: data.title || "Key Takeaways"
    })
  );
  T.layout(title[0], "center", 0.1);

  // === Bullets (with optional showAt)
  const bulletData = data.bullets || [];
  const bullets = bulletData.map((entry, i) => {
    const text = typeof entry === "string" ? entry : entry.text;
    const showAt = typeof entry === "string" ? 2 + i * 2 : entry.showAt ?? 2 + i * 2;

    const item = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.bullet, { text })
    );
    T.layout(item[0], "center", 0.4 + i * 0.25);
    item[0].animate = [T.Anim.enterFromLeft(showAt, 0.5, item[0])];
    return item[0];
  });

  return [title[0], ...bullets];
}
