
// templates/items/image.js

export default function image(globalTheme, data = {}) {
    const {
      src = "book",
      x = 100,
      y = 100,
      width = 400,
      height = 300,
    } = data;
  
    return [
      {
        type: "image",
        x,
        y,
        width,
        height,
        src,
      },
    ];
  }
  