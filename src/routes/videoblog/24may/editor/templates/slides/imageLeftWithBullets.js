import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function imageLeftWithBullets(globalTheme, data = {}) {
  // === Image on Left ===
  const image = T.ItemBuilders.image(globalTheme, {
    src: data.src || "book",
    x: 60,
    y: 100,
    width: 400,
    height: 350
  });

  // === Bullets on Right ===
  const bulletData = data.bullets || [];
  const bullets = bulletData.map((entry, i) => {
    const text = typeof entry === "string" ? entry : entry.text;
    const showAt = typeof entry === "string" ? 2 + i * 2 : entry.showAt ?? 2 + i * 2;

    const item = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.bullet, {
        text,
        x: 500,
        y: 120 + i * 100,
        width: 480,
        textAlign: "left"
      })
    );

    item[0].animate = [T.Anim.enterFromLeft(showAt, 0.5, item[0])];
    return item[0];
  });

  return [image[0], ...bullets];
}
