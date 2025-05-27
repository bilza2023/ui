import { TemplateToolkit as T } from "../toolkit/Toolkit";

export default function titleWith3Bullets(theme, data) {
  const items = [];

  // Optional spacing config
  const lineGap = data.lineGap ?? 100;
  const gapBelowHeading = data.gapBelowHeading ?? 130;

  // Title block
  const titleData = T.applyPreset(T.stylePresets.text.heading, {
    text: data.title,
    x: 100,
    y: 60
  });
  const title = T.ItemBuilders.text(theme, titleData);
  T.addAnimation(title, "text", "flyInRight", 1);
  title.animations[0].props.to = title.x;
  items.push(title);

  // Bullet list
  const baseY = title.y + gapBelowHeading;
  data.bullets.forEach((b, i) => {
    const bulletData = T.applyPreset(T.stylePresets.text.bullet, {
      text: b.text || b,
      y: baseY + i * lineGap,
      x: 100,
      showAt: b.showAt ?? i + 1
    });

    const bullet = T.ItemBuilders.text(theme, bulletData);
    T.addAnimation(bullet, "text", "flyInRight", bulletData.showAt);
    bullet.animations[0].props.to = bullet.x;
    items.push(bullet);
  });

  return items;
}
