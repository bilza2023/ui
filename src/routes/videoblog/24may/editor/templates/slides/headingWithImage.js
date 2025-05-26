import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function headingWithImage(globalTheme, data = {}) {
  // === Heading ===
  const title = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.heading, {
      text: data.title || "Visual Concept"
    })
  );
  T.layout(title[0], "center", 0.1);

  // === Image ===
  const imageItem = T.ItemBuilders.image(globalTheme, {
    src: data.src || "book",
    width: 500,
    height: 350
  });
  T.layout(imageItem[0], "center", 0.4);

  return [title[0], imageItem[0]];
}
