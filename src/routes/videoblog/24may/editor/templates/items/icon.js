// templates/items/icon.js

export default function icon(globalTheme, data = {}) {
    const {
      iconName = "STAR",
      x = 100,
      y = 100,
      width = 100,
      color = globalTheme.accentColor || "#ffaa00",
      fontFamily = globalTheme.fontFamily || "Arial",
    } = data;
  
    return [
      {
        type: "icon",
        iconName,
        x,
        y,
        width,
        color,
        fontFamily,
      },
    ];
  }
  