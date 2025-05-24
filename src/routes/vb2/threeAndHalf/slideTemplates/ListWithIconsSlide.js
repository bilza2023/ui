// ListWithIconsSlide.js
import toPixiColor from "./util/toPixiColor.js";

export function ListWithIconsSlide(globalTheme, data = {}, config = {}, background = {}) {
  const startTime = 0;
  const endTime = 5;

  const items = [];

  const fontSize = config.fontSize || 42;
  const iconSize = config.iconSize || 30;
  const spacing = config.spacing || 80;

  const textColor = toPixiColor(globalTheme.baseTextColor);
  const iconColor = toPixiColor(globalTheme.bulletColor);

  const content = Object.entries(data)
    .filter(([key, val]) => key.startsWith("item") && val)
    .map(([_, val]) => {
      if (typeof val === "string") {
        return { text: val, icon: config.icon || "DOT" };
      }
      return val;
    });

  const totalHeight = content.length * spacing;
  const startY = (576 - totalHeight) / 2;

  content.forEach((entry, i) => {
    const y = startY + i * spacing;

    items.push({
      data: {
        type: "icon",
        iconName: entry.icon || "DOT",
        x: 200,
        y,
        width: iconSize,
        color: iconColor,
        fontFamily: globalTheme.fontFamilyBase,
      },
    });

    items.push({
      data: {
        type: "text",
        text: entry.text,
        x: 250,
        y,
        fontSize,
        fontFamily: globalTheme.fontFamilyBase,
        color: textColor,
      },
    });
  });

  return {
    startTime,
    endTime,
    background: {
      backgroundColor: background.backgroundColor || globalTheme.backgroundColor || "#000000",
    },
    items,
  };
}