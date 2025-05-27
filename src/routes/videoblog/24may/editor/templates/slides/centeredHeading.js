
import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function centeredHeading(globalTheme, data = {}) {
  const title = T.ItemBuilders.text(
    globalTheme,
    T.applyPreset(T.stylePresets.text.heading, {
      text: data.text || "Section Title",
      x: 100,
      y: 220,
      width: 820,
      textAlign: "center",
      fontSize: 64
    })
  );

  return [title[0]];
}
