// headingWith2Bullets.js
// Displays a heading and two bullet points.
// data = {
//   title:        string,           // main heading text
//   titleShowAt?: number,           // when to fade in the heading (absolute seconds)
//   bullets: [                       // exactly two bullets
//     { text: string, showAt: number },
//     { text: string, showAt: number }
//   ]
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function headingWith2Bullets(globalTheme, data = {}) {
  const items = [];
  
  // 1️⃣ Heading
  const titleShowAt = data.titleShowAt ?? 0;
  const titleItem = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.heading, {
      text: data.title || "Key Takeaways"
    })
  );
  // center horizontally, 10% down
  T.layout(titleItem, "center", 0.1);
  // fade in over 1s at titleShowAt
  T.AniHelpers.fadeIn(titleItem, titleShowAt, 1);
  items.push(titleItem);
  
  // 2️⃣ Bullets
  (data.bullets || []).forEach((entry, i) => {
    const text   = entry.text;
    const showAt = entry.showAt;  // absolute time e.g. 2, 4, etc.

    const bulletItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.bullet, { text })
    );
    // stack: center horizontally, then down by 40% + offset per bullet
    T.layout(bulletItem, "center", 0.4 + i * 0.25);
    // fade in over 0.5s at showAt
    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}

// Example usage in your slide deck:
//
// // Slide duration = 8s
// t += 8;
// deck.add(templates.headingWith2Bullets, t, {
//   title:         "Key Takeaways",
//   titleShowAt:   t,         // fade in heading immediately at slide start
//   bullets: [
//     { text: "First point",  showAt: t + 2 },
//     { text: "Second point", showAt: t + 5 }
//   ]
// });
