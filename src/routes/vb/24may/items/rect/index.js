

export default function rect(globalTheme, data = {}) {
  const {
    x = 100,
    y = 100,
    width = 200,
    height = 100,
    color = globalTheme.primaryColor || "#00ccff",
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;

  return {
    type: "rect",
    x,
    y,
    width,
    height,
    color,
    rotation,
    visible,
    zIndex
  };
}
