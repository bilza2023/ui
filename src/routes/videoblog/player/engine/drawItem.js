import {
  drawText,
  drawIcon,
  drawRect,
  drawCircle,
  drawImage,
  drawTriangle,
} from "./items.js"; // adjust path if needed


const drawMap = {
    text: drawText,
    icon: drawIcon,
    rect: drawRect,
    circle: drawCircle,
    image: drawImage,
    triangle: drawTriangle,
  };
  
  export function drawItem(data) {
    const fn = drawMap[data.type];
    if (!fn) throw new Error(`Unsupported item type: ${data.type}`);
    return fn(data);
  }
  