
export default function math(globalTheme, data = {}) {
    const {
      latex = "x^2 + y^2 = z^2",
      x = 100,
      y = 100,
      width = 800,
      height = 100,
      fontSize = 48,
      color = globalTheme.baseTextColor || "#000000",
      padding = 10,
      rotation = 0,
      visible = true,
      zIndex = 1
    } = data;
  
    return {
      type: "math",
      latex,
      x,
      y,
      width,
      height,
      fontSize,
      color,
      padding,
      rotation,
      visible,
      zIndex
    };
  }
  