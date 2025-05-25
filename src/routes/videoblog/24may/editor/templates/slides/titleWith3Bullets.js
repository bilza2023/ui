// templates/slide/titleWith3Bullets.js

import { TemplateToolkit as T } from "../toolkit/Toolkit";

export default function titleWith3Bullets(globalTheme, data = {}) {
  const headingItem = T.ItemBuilders.heading(globalTheme, {
    text: data.title || "Main Title",
    x: 100,
    y: 80,
    width: 800,
    height: 100,
    fontSize: 54,
    textAlign: "center",
  });

  // Add fadeIn animation to heading
  headingItem.forEach(item => {
    item.animate = [T.Anim.fadeIn(0, 1.5)];
  });

  const bullets = T.ItemBuilders.bulletList(globalTheme, {
    items: data.bullets || ["First point", "Second point", "Third point"],
    x: 150,
    y: 220,
    width: 720,
    lineHeight: 60,
    fontSize: 32,
  });

  // Animate each bullet to slide up with staggered delay
  bullets.forEach((item, i) => {
    const delay = 1 + i * 0.3;
    item.animate = [T.Anim.slideUp(delay, 0.8, 30)];
  });

  return [...headingItem, ...bullets];
}
