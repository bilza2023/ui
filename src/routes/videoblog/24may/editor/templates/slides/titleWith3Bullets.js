import { TemplateToolkit as T } from "../toolkit/Toolkit";

export default function titleWith3Bullets(theme, data) {
  const items = [];

  // Heading
  const titleData = T.applyPreset(T.stylePresets.text.heading, {
    text: data.title,
    y: 60,
    x: 100 // Target final position
  });
  const title = T.ItemBuilders.text(theme, titleData);
  T.addAnimation(title, "text", "flyInRight", 1); // Animate in from right
  title.animations[0].props.to = title.x; // Set final x as animation target
  items.push(title);

  // Bullets
  const baseY = 200;
  data.bullets.forEach((b, i) => {
    const bulletData = T.applyPreset(T.stylePresets.text.bullet, {
      text: b.text || b,
      y: baseY + i * 60,
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
