// templates/slide/titleWith3Bullets.js

import heading from "../items/heading.js";
import bulletList from "../items/bulletList.js";

export default function titleWith3Bullets(globalTheme, data = {}) {
  const headingItem = heading(globalTheme, {
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
    item.animate = [
      { field: "alpha", fn: "fadeIn", start: 0, end: 1.5, props: { from: 0, to: 1 } }
    ];
  });

  const bullets = bulletList(globalTheme, {
    items: data.bullets || ["First point", "Second point", "Third point"],
    x: 150,
    y: 220,
    width: 720,
    lineHeight: 60,
    fontSize: 32,
  });

  // Animate each bullet to slide in from below
  bullets.forEach((item, i) => {
    const delay = 1 + i * 0.3;
    item.animate = [
      {
        field: "y",
        fn: "moveTo",
        start: delay,
        end: delay + 0.8,
        props: { fromY: item.y + 30, toY: item.y }
      }
    ];
  });

  return [...headingItem, ...bullets];
}
