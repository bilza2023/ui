
// templates/slide/titleWith3Bullets.js

import { TemplateToolkit as T } from "../toolkit/Toolkit";

export default function titleWith3Bullets(globalTheme, data = {}) {
  // === Heading ===
  const headingItem = T.ItemBuilders.heading(globalTheme, {
    text: data.title,
  });
// debugger;
  T.layout(headingItem[0], "left");
  // T.layout(headingItem, alignLeft, 30, 43);
  // headingItem[0].y = 50;
  // Slide in from below, then stay
  // const headingY = headingItem[0].y;
  // headingItem[0].y = headingY + 40;
  // headingItem[0].animate = [T.Anim.slideUp(0.5, 1.0, 40)];


  // === Bullets ===
  const bullets = T.ItemBuilders.bulletList(globalTheme, {
    items: data.bullets || ["First point", "Second point", "Third point"],
  });

  bullets.forEach((item, i) => {
    const originalY = item.y;
    item.y = originalY + 40;
    const delay = 1.5 + i * 0.4;
    item.animate = [T.Anim.slideUp(delay, 0.8, 40)];
  });

  return [...headingItem, ...bullets];
}
