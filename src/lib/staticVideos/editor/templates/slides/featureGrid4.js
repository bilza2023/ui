// featureGrid4.js
// Displays 4 features in a 2x2 grid.
// Each feature is an object: { icon: string, label: string, showAt: number }
// Each icon + label pair fades in at its own showAt time.

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function featureGrid4(globalTheme, data = {}) {
  const features = data.features || [
    { icon: "BULB", label: "Fast", showAt: 0 },
    { icon: "LOCK", label: "Secure", showAt: 1 },
    { icon: "ROCKET", label: "Smooth", showAt: 2 },
    { icon: "TOOLS", label: "Flexible", showAt: 3 }
  ];

  const positions = [
    { x: 180, y: 160 },
    { x: 560, y: 160 },
    { x: 180, y: 360 },
    { x: 560, y: 360 }
  ];

  const items = [];
  features.forEach((f, i) => {
    const centerX = positions[i].x;
    const itemWidth = 200;
    const showAt = f.showAt ?? 0;

    // Build icon item
    const iconItem = T.ItemBuilders.icon(globalTheme, {
      iconName: f.icon,
      x: centerX + itemWidth / 2 - 40,
      y: positions[i].y,
      width: 80
    });

    // Build label item
    const labelItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.caption, {
        text: f.label,
        x: centerX,
        y: positions[i].y + 90,
        width: itemWidth,
        textAlign: "center",
        fontSize: 28
      })
    );

    // Apply animations directly on items
    T.AniHelpers.fadeIn(iconItem, showAt, 0.5);
    T.AniHelpers.fadeIn(labelItem, showAt, 0.5);

    items.push(iconItem, labelItem);
  });

  return items;
}

// Example usage in DeckBuilder:
//
// deck.add(templates.featureGrid4, t += 6, {
//   features: [
//     { icon: "BULB", label: "Fast", showAt: 0 },
//     { icon: "LOCK", label: "Secure", showAt: 1 },
//     { icon: "ROCKET", label: "Smooth", showAt: 2 },
//     { icon: "TOOLS", label: "Flexible", showAt: 3 }
//   ]
// });
