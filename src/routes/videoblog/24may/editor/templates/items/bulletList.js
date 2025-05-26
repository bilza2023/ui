// templates/items/bulletList.js

export default function bulletList(globalTheme, data = {}) {
    const {
      items = ["First point", "Second point", "Third point"],
      x = 120,
      y = 250,
      width = 800,
      lineHeight = 60,
      fontSize = 32,
      textAlign = "left",
    } = data;
  
    return items.map((text, i) => ({
      type: "text",
      x,
      y: y + i * lineHeight,
      width,
      height: lineHeight,
      text: `${text}`,
      fontSize,
      fontFamily: globalTheme.fontFamily || "Arial",
      color: globalTheme.baseTextColor || "#dddddd",
      textAlign,
      padding: 5,
    }));
  }
  