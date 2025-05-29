

export default function triangle(globalTheme, data = {}) {
    const {
      x = 100,
      y = 100,
      size = 100,
      color = globalTheme.primaryColor || "#66ff66",
      rotation = 0,
      visible = true,
      zIndex = 1
    } = data;
  
    return {
      type: "triangle",
      x,
      y,
      size,
      color,
      rotation,
      visible,
      zIndex
    };
  }
  