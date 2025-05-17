export function getRect({
    x = 0,
    y = 0,
    width = 100,
    height = 60,
    fill = "red",
    borderColor = null,
    borderWidth = 0,
    rotation = 0,
    zIndex = 0,
    visible = true
  } = {}) {
    return {
      type: "rect",
      x,
      y,
      width,
      height,
      fill,
      borderColor,
      borderWidth,
      rotation,
      zIndex,
      visible
    };
  }
  