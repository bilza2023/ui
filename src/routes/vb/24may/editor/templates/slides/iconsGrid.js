// iconsGrid.js
// Displays a centered grid of icons with small titles under a main heading.
// data = {
//   heading:           string,              // main heading text
//   headingShowAt?:    number,              // when to fade in heading
//   items: [                                // icon entries
//     { icon: string, title: string, showAt: number },
//     ...
//   ],
//   columns?:           number,              // number of columns (default: 4)
//   itemSize?:          number,              // icon size in px (default: 80)
//   gutterX?:           number,              // horizontal spacing in px (default: 40)
//   gutterY?:           number,              // vertical spacing in px (default: 60)
//   startY?:            number               // top offset below heading in px (default: 200)
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function iconsGrid(globalTheme, data = {}) {
  const items = [];
  const headingText   = data.heading || "Features";
  const headingShowAt = data.headingShowAt ?? 0;

  const columns     = data.columns    ?? 4;
  const itemSize    = data.itemSize   ?? 80;
  const gutterX     = data.gutterX    ?? 40;
  const gutterY     = data.gutterY    ?? 60;
  const startY      = data.startY     ?? 200;

  // compute total grid width and center it
  const totalWidth = columns * itemSize + (columns - 1) * gutterX;
  const startX = (T.designWidth - totalWidth) / 2;

  // --- Heading centered above grid ---
  const headingItem = T.ItemBuilders.richText(
    globalTheme,
    T.applyPreset(T.stylePresets.richText.title, {
      text: headingText,
      x: startX,
      y: startY - 120,
      width: totalWidth,
      textAlign: "center"
    })
  );
  T.AniHelpers.fadeIn(headingItem, headingShowAt, 1);
  items.push(headingItem);

  // --- Grid Items ---
  (data.items || []).forEach((entry, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = startX + col * (itemSize + gutterX);
    const y = startY + row * (itemSize + gutterY);

    // Icon
    const iconItem = T.ItemBuilders.icon(globalTheme, {
      iconName: entry.icon,
      x,
      y,
      width:  itemSize,
      height: itemSize
    });
    T.AniHelpers.fadeIn(iconItem, entry.showAt, 0.5);
    items.push(iconItem);

    // Title label below icon, small font
    const labelItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.small, {
        text: entry.title,
        x,
        y: y + itemSize + 10,
        width: itemSize,
        textAlign: "center",
        fontSize: data.labelFontSize ?? 24
      })
    );
    T.AniHelpers.fadeIn(labelItem, entry.showAt, 0.5);
    items.push(labelItem);
  });

  return items;
}

// Example usage in DeckBuilder:
//
// t += 12;
// deck.add(templates.iconsGrid, t, {
//   heading:        "Our Capabilities",
//   headingShowAt:  t,
//   columns:        5,
//   itemSize:       80,
//   gutterX:        60,
//   gutterY:        80,
//   startY:         220,
//   items: [
//     { icon: "BULB",     title: "Innovation",    showAt: t + 1 },
//     { icon: "LOCK",     title: "Security",      showAt: t + 2 },
//     { icon: "ROCKET",   title: "Performance",   showAt: t + 3 },
//     { icon: "TOOLS",    title: "Tools",         showAt: t + 4 },
//     { icon: "CIRCLE",   title: "Precision",     showAt: t + 5 }
//   ]
// });
