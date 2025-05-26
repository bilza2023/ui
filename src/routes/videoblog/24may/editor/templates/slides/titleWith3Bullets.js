import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function titleWith3Bullets(globalTheme, data = {}) {
  // === Title ===
//  debugger;
  const title = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.heading, {
      text: data.title || "Presentation Title"
    })
  );
  T.layout(title[0], "center", 0.1);

  // === Bullets ===
  const bulletTexts = data.bullets || ["First point", "Second point", "Third point"];
  const bullets = bulletTexts.map((txt, i) => {
    const item = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.bullet, { text: txt })
    );
    T.layout(item[0], "center", 0.4 + i * 0.2);
    item[0].animate = [T.Anim.enterFromLeft(2 + i * 2, 0.5, item[0])];
    return item[0];
  });

  return [title[0], ...bullets];
}
