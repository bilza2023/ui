export function getCircle({
    x = 100,
    y = 100,
    radius = 30,
    fill = "blue",
    borderColor = null,
    borderWidth = 0,
    rotation = 0,
    zIndex = 0,
    visible = true
  } = {}) {
    return {
      type: "circle",
      x,
      y,
      radius,
      fill,
      borderColor,
      borderWidth,
      rotation,
      zIndex,
      visible
    };
  }
  