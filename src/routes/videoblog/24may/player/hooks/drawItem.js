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
  
  
  export function drawItem(item, assets = {}) {
    switch (item.type) {
      case "triangle": return drawTriangle(item);
      case "circle": return drawCircle(item);
      case "rect": return drawRect(item);
      case "text": return drawText(item);
      case "icon": return drawIcon(item);
      case "image": return drawImage(item, assets); // ✅ Fix here
      // add others...
      default:
        console.warn("Unknown item type:", item.type);
        return null;
    }
  }
  