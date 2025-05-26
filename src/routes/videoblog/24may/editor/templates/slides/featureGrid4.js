
import { TemplateToolkit as T } from "../toolkit/Toolkit.js";

export default function featureGrid4(globalTheme, data = {}) {
  const features = data.features || [
    { icon: "BULB", label: "Fast" },
    { icon: "LOCK", label: "Secure" },
    { icon: "ROCKET", label: "Smooth" },
    { icon: "TOOLS", label: "Flexible" }
  ];

  const positions = [
    { x: 180, y: 160 },
    { x: 560, y: 160 },
    { x: 180, y: 360 },
    { x: 560, y: 360 }
  ];

  const items = features.map((f, i) => {
    const centerX = positions[i].x;
    const itemWidth = 200;
  
    const icon = T.ItemBuilders.icon(globalTheme, {
      iconName: f.icon,
      x: centerX + itemWidth / 2 - 40, // center the icon (40 = half icon width)
      y: positions[i].y,
      width: 80
    });
  
    const label = T.ItemBuilders.text(
      globalTheme,
      T.applyPreset(T.stylePresets.text.caption, {
        text: f.label,
        x: centerX,
        y: positions[i].y + 90,
        width: itemWidth,
        textAlign: "center",
        fontSize: 28
      })
    );
  
    return [icon[0], label[0]];
  });
  
  return items.flat();
}
