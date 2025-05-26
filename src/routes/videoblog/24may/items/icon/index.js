export default function icon(globalTheme, data = {}) {
  const {
    iconName = "STAR",
    x = 100,
    y = 100,
    width = 100,
    color = globalTheme.primaryColor || "#ffaa00",
    fontFamily = globalTheme.fontFamilyBase || "Arial",
    rotation = 0,
    visible = true,
    zIndex = 1
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
      rotation,
      visible,
      zIndex
    }
  ];
}
