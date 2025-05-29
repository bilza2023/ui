export default function text(globalTheme, data = {}) {
    const {
      text = "Default Text",
      x = 100,
      y = 100,
      width = 800,
      height = 100,
      fontSize = 48,
      fontFamily = globalTheme.fontFamilyBase || "Arial",
      color = globalTheme.baseTextColor || "#000000",
      textAlign = "left",
      padding = 10,
      rotation = 0,
      visible = true,
      zIndex = 1
    } = data;
  
    return {
        type: "text",
        text,
        x,
        y,
        width,
        height,
        fontSize,
        fontFamily,
        color,
        textAlign,
        padding,
        rotation,
        visible,
        zIndex
      };
    
  }
  