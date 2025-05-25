
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

  const bullets = bulletList(globalTheme, {
    items: data.bullets || ["First point", "Second point", "Third point"],
    x: 150,
    y: 220,
    width: 720,
    lineHeight: 60,
    fontSize: 32,
  });

  return [...headingItem, ...bullets];
}
