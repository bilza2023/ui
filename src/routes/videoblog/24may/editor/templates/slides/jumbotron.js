import { TemplateToolkit as T } from "../../toolkit/Toolkit.js";

export default function jumbotron(globalTheme, data = {}) {
  // === Jumbo Text ===
  const style = T.applyPreset(T.stylePresets.text.banner, {
    text: data.text || "Bold Statement"
  });

  const jumbo = T.ItemBuilders.text(globalTheme, style);
  T.layout(jumbo[0], "center", 0.4); // vertically centered-ish

  return [jumbo[0]];
}
