import { TemplateToolkit as T } from "../toolkit/Toolkit";

export default function titleWith3Bullets(theme, data) {
  const items = [];

  // Apply heading style preset + override text & y
  const titleData = T.applyPreset(T.stylePresets.text.heading, {
    text: data.title,
    y: 60
  });
  const title = T.ItemBuilders.text(theme, titleData);
  T.addAnimation(title, "text", "fadeInFast", 1);
  items.push(title);

  const baseY = 200;
  data.bullets.forEach((b, i) => {
    const bulletData = T.applyPreset(T.stylePresets.text.bullet, {
      text: b.text || b,
      y: baseY + i * 60,
      showAt: b.showAt ?? i + 1
    });
    const bullet = T.ItemBuilders.text(theme, bulletData);
    T.addAnimation(bullet, "text", "fadeInFast", bulletData.showAt);
    items.push(bullet);
  });

  return items;
}
