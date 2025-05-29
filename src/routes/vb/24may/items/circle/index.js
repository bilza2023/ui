export default function circle(globalTheme, data = {}) {
    const {
      x = 100,
      y = 100,
      radius = 50,
      color = globalTheme.primaryColor || "#ff6666",
      rotation = 0,
      visible = true,
      zIndex = 1
    } = data;
  
    return {
      type: "circle",
      x,
      y,
      radius,
      color,
      rotation,
      visible,
      zIndex
    };
  }
  