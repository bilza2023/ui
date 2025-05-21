export function getImage({
    x = 500,
    y = 100,
    width = 200,
    height = 150,
    src = "images/atom.png", 
    rotation = 0,
    zIndex = 0,
    visible = true
  } = {}) {
    return {
      type: "image",
      x,
      y,
      width,
      height,
      src,
      rotation,
      zIndex,
      visible
    };
  }
  