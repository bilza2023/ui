

export  function hexColorToNumber(color) {
    if (typeof color === 'string') {
      if (color.startsWith('#')) {
        return parseInt(color.slice(1), 16);
      } else {
        console.warn(`Invalid color string: "${color}". Must start with "#"`);
        return 0xffffff;
      }
    }
  
    if (typeof color === 'number') {
      return color;
    }
  
    console.warn(`Invalid color type: ${typeof color}. Must be string or number`);
    return 0xffffff;
  }