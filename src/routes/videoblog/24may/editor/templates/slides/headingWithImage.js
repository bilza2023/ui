import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function headingWithImage(globalTheme, data = {}) {
  // === Heading ===
  const headingStyle = T.applyPreset(T.stylePresets.text.heading, {
    text: data.title || "Visual Concept"
  });
  const title = T.ItemBuilders.text(globalTheme, headingStyle);
  T.layout(title[0], "center", 0.05);

  // === Image ===
  const imageStyle = T.applyPreset(T.stylePresets.image.withTopAndSideMargin, {
    src: data.src || "book"
  });
  const imageItem = T.ItemBuilders.image(globalTheme, imageStyle);

  return [title[0], imageItem[0]];
}
