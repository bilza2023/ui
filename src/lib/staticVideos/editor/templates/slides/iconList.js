
// iconList.js
// Displays arbitrary icons with titles at given positions and times.
// data = {
//   items: [
//     {
//       icon:  string,  // icon name key
//       x:     number,  // horizontal position
//       y:     number,  // vertical position
//       title: string,  // label under the icon
//       showAt:number   // absolute time to fade in
//     },
//     ...
//   ]
// }

import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function iconList(globalTheme, data = {}) {
  const items = [];
  (data.items || []).forEach(entry => {
    const size = entry.size ?? 60;
    const labelOffset = entry.labelOffset ?? 10;

    // Icon
    const iconItem = T.ItemBuilders.icon(globalTheme, {
      iconName: entry.icon,
      x:        entry.x,
      y:        entry.y,
      width:    size,
      height:   size
    });
    T.AniHelpers.fadeIn(iconItem, entry.showAt, 0.5);

    // Title label below icon (stacked)
    const labelItem = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.caption, {
        text:       entry.title,
        x:          entry.x,
        y:          entry.y + size + labelOffset,
        width:      size * 2,
        textAlign:  "center"
      })
    );
    T.AniHelpers.fadeIn(labelItem, entry.showAt, 0.5);

    items.push(iconItem, labelItem);
  });
  return items;
}

// Example usage in DeckBuilder:
//
// t += 8;
// deck.add(templates.iconList, t, {
//   items: [
//     { icon: "BULB", x: 100, y: 200, title: "Idea",           showAt: t + 1 },
//     { icon: "LOCK", x: 300, y: 200, title: "Security",        showAt: t + 2 },
//     { icon: "ROCKET", x:500, y: 200, title: "Fast Performance", showAt: t + 3 }
//   ]
// });
