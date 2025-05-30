// templates/items/emojiGrid.js

export default function emojiGrid(globalTheme, data = {}) {
    const {
      emojis = ["😀", "🎓", "📚", "🚀"],
      x = 100,
      y = 100,
      columns = 4,
      size = 64,
      gap = 20,
      color = globalTheme.textColor || "#ffffff",
      fontFamily = globalTheme.fontFamily || "Arial",
    } = data;
  
    return emojis.map((emoji, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);
      return {
        type: "text",
        text: emoji,
        x: x + col * (size + gap),
        y: y + row * (size + gap),
        width: size,
        height: size,
        fontSize: size,
        color,
        fontFamily,
        textAlign: "center",
        padding: 0,
      };
    });
  }
  