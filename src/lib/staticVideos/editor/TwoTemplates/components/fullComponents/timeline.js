
// timeline.js
import { TemplateToolkit as T } from "../../../toolkit/Toolkit.js";

export default function timeline(theme, data = [], config = {}) {
  const items = [];
  const lineY = T.layout.getBodyY("center", 2);
  const startX = 100;
  const endX = T.designWidth - 100;
  const totalWidth = endX - startX;

  const stepX = data.length > 1 ? totalWidth / (data.length - 1) : 0;

  // Line
  items.push(T.ItemBuilders.rect(theme, {
    x: startX,
    y: lineY,
    width: totalWidth,
    height: 4,
    color: theme.borderColor || "#999"
  }));

  data.forEach((entry, i) => {
    const x = startX + i * stepX;
    const color = T.toPixiColor(entry.color || theme.primaryColor);
    const y = lineY;

    // Dot / marker
    items.push(T.ItemBuilders.circle(theme, {
      x,
      y,
      radius: 10,
      color
    }));

    // Date
    items.push(T.ItemBuilders.text(theme, {
      text: entry.date,
      x,
      y: y - 30,
      fontSize: 18,
      fontFamily: theme.fontFamilyBase,
      textAlign: "center",
      anchor: { x: 0.5, y: 0.5 },
      color
    }));

    // Label
    items.push(T.ItemBuilders.text(theme, {
      text: entry.label,
      x,
      y: y + 30,
      fontSize: 20,
      fontFamily: theme.fontFamilyBase,
      textAlign: "center",
      anchor: { x: 0.5, y: 0.5 },
      color: theme.baseTextColor
    }));
  });

  return items;
}