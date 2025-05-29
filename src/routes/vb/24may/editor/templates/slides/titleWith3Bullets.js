// titleWith3Bullets.js
// Title + 3 bullets, each fading in at its own absolute `showAt` time.
// Example usage in DeckBuilder:
//
// deck.add(templates.titleWith3Bullets, t += 6, {
//   title: "Why Islam?",
//   bullets: [
//     { text: "In the Name of Allah", showAt: 2 },
//     { text: "Most Merciful", showAt: 3 },
//     { text: "Most Compassionate", showAt: 4 }
//   ]
// });

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function titleWith3Bullets(theme, data = {}) {
  const items = [];

  // 1. Title: assume it shows at time 0 (or data.titleShowAt if you want)
  const titleItem = T.ItemBuilders.text(
    theme,
    T.applyPreset(T.stylePresets.text.heading, {
      text: data.title || "Your Title",
      x: 100,
      y: 60
    })
  );
  // fade in from 0→1 over 1s, starting at t=0
  T.AniHelpers.fadeIn(titleItem, data.titleShowAt ?? 0, 1);
  items.push(titleItem);

  // 2. Bullets: each uses its own showAt from data.bullets
  const lineGap = data.lineGap ?? 100;
  const gapBelowHeading = data.gapBelowHeading ?? 130;
  const baseY = 60 + gapBelowHeading;

  (data.bullets || []).forEach((b, i) => {
    const showAt = b.showAt;           // absolute time passed in by caller
    const bulletItem = T.ItemBuilders.text(
      theme,
      T.applyPreset(T.stylePresets.text.bullet, {
        text: b.text,
        x: 100,
        y: baseY + i * lineGap
      })
    );
    // fade in over 0.5s at [showAt → showAt+0.5]
    T.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });

  return items;
}
