import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function imageWithCaption(globalTheme, data = {}) {
  // === Image ===
  const image = T.ItemBuilders.image(globalTheme, {
    src: data.src || "book",
    x: 160,
    y: 80,
    width: 700,
    height: 400
  });

  // === Caption ===
  const caption = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.caption, {
      text: data.caption || "This is a caption for the image above.",
      x: 160,
      y: 500,
      width: 700,
      textAlign: "center",
      fontSize: 28
    })
  );

  return [image[0], caption[0]];
}
