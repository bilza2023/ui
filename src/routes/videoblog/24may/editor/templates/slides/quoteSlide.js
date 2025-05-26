import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function quoteSlide(globalTheme, data = {}) {
  const lines = data.text || [
    "“The ink of the scholar",
    "is more sacred",
    "than the blood of the martyr.”"
  ];

  const fontSize = data.fontSize || 48;
  const spacing = data.lineHeight ? fontSize * data.lineHeight : fontSize * 1.4;
  const startY = 140;

  const quoteItems = lines.map((line, i) => {
    const item = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.quote, {
        text: line,
        x: 100,
        y: startY + i * spacing,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    return item[0];
  });

  // === Author (optional) ===
  const authorY = startY + lines.length * spacing + 30;

  const author = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.caption, {
      text: data.author || "",
      x: 100,
      y: authorY,
      width: 820,
      textAlign: "left",
      fontSize: 28
    })
  );

  return [...quoteItems, author[0]];
}
