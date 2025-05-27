// quoteSlide.js
// Reveals each line of a quote one by one, then the author.
// data = {
//   lines: [                    // array of { text: string, showAt: number }
//     { text: string, showAt: number },
//     ...
//   ],
//   author: { text: string, showAt: number },
//   fontSize?: number,          // optional font size for quote lines
//   lineHeight?: number         // optional multiplier for spacing
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function quoteSlide(globalTheme, data = {}) {
  const items = [];
  const linesData = data.lines || [];
  const fontSize = data.fontSize || 48;
  const lineHeight = data.lineHeight ? fontSize * data.lineHeight : fontSize * 1.4;
  const startY = data.startY ?? 140;

  // === Quote Lines ===
  linesData.forEach((entry, i) => {
    const showAt = entry.showAt;   // absolute time for this line
    const text = entry.text;

    const lineItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.quote, {
        text,
        x: 100,
        y: startY + i * lineHeight,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    // fade in each line
    T.AniHelpers.fadeIn(lineItem, showAt, 0.5);
    items.push(lineItem);
  });

  // === Author ===
  if (data.author && data.author.text) {
    const authorShowAt = data.author.showAt;
    const authorItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.caption, {
        text: data.author.text,
        x: 100,
        y: startY + linesData.length * lineHeight + 30,
        width: 820,
        textAlign: "right",
        fontSize: 28
      })
    );
    T.AniHelpers.fadeIn(authorItem, authorShowAt, 0.5);
    items.push(authorItem);
  }

  return items;
}

// Example usage in DeckBuilder:
//
// t += 8;
// deck.add(templates.quoteSlide, t, {
//   lines: [
//     { text: "The ink of the scholar",   showAt: t + 1 },
//     { text: "is more sacred",            showAt: t + 2 },
//     { text: "than the blood of the martyr.", showAt: t + 3 }
//   ],
//   author: { text: "— Prophetic Traditions", showAt: t + 4 }
// });
