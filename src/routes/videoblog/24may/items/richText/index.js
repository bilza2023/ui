export default function richText(globalTheme, data = {}) {
    const {
      text = "Multi-line rich text",
      x = 100,
      y = 100,
      width = 800,
      height = 200,
      fontSize = 48,
      fontFamily = globalTheme.fontFamilyBase || "Georgia",
      color = globalTheme.baseTextColor || "#000000",
      textAlign = "left",
      lineHeight = 1.4,
      rotation = 0,
      visible = true,
      zIndex = 1
    } = data;
  
    return [
      {
        type: "richText",
        text,
        x,
        y,
        width,
        height,
        fontSize,
        fontFamily,
        color,
        textAlign,
        lineHeight,
        rotation,
        visible,
        zIndex
      }
    ];
  }
  