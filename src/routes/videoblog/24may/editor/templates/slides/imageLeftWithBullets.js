// imageLeftWithBullets.js
// Displays an image on the left and bullet points on the right.
// data = {
//   src:        string,            // image source key
//   imageShowAt?: number,          // when to fade in image
//   bullets: [                      // bullet entries
//     { text: string, showAt: number }
//   ],
//   lineGap?:   number             // vertical gap between bullets
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function imageLeftWithBullets(globalTheme, data = {}) {
  const items = [];

  // --- Image on the Left ---
  const imageShowAt = data.imageShowAt ?? 0;
  const imageItem = T.ItemBuilders.image(globalTheme, {
    src:    data.src || "drops",
    x:      60,
    y:      100,
    width:  400,
    height: 350
  });
  T.AniHelpers.fadeIn(imageItem, imageShowAt, 1);
  items.push(imageItem);

  // --- Bullets on the Right ---
  const lineGap = data.lineGap ?? 100;
  (data.bullets || []).forEach((entry, i) => {
    const text   = entry.text;
    const showAt = entry.showAt; // absolute time for fade in

    const bulletItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.bullet, {
        text,
        x:        500,
        y:        120 + i * lineGap,
        width:    480,
        textAlign: "left"
      })
    );
    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}

// Example usage in DeckBuilder:
//
// t += 10;
// deck.add(templates.imageLeftWithBullets, t, {
//   src:         "book",
//   imageShowAt: t,
//   bullets: [
//     { text: "Point A", showAt: t + 2 },
//     { text: "Point B", showAt: t + 4 }
//   ],
//   lineGap:     120
// });
