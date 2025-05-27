import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

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

    T.addAnimation(item, "text", "slideInFromBottom", i + 1);
    const anim = item.animations.at(-1);
    anim.props.from = item.y + 300; // Start below the screen
    anim.props.to = item.y;         // End at intended position

    return item;
  });

  const authorY = startY + lines.length * spacing + 30;

  const author = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.caption, {
      text: data.author || "",
      x: 100,
      y: authorY,
      width: 820,
      textAlign: "right",
      fontSize: 28
    })
  );

  T.addAnimation(author, "text", "slideInFromBottom", 4.5);
  const anim = author.animations.at(-1);
  anim.props.from = author.y + 300;
  anim.props.to = author.y;

  return [...quoteItems, author];
}
