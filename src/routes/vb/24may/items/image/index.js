export default function image(globalTheme, data = {}) {
  const {
    src = "book",
    x = 100,
    y = 100,
    width = 400,
    height = 300,
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;

  return {
      type: "image",
      src,
      x,
      y,
      width,
      height,
      rotation,
      visible,
      zIndex
    };
}
