
import drawText from './engine/renderers/drawText.js';
import drawCircle from './engine/renderers/drawCircle.js';
import drawRect from './engine/renderers/drawRect.js';
import drawImage from './engine/renderers/drawImage.js';

export function attachDisplayObjects(slide, app) {
  for (const item of slide.items) {
    const type = item.data.type;

    switch (type) {
      case "text":
        item.displayObject = drawText(app, item.data);
        break;
      case "circle":
        item.displayObject = drawCircle(app, item.data);
        break;
      case "rect":
        item.displayObject = drawRect(app, item.data);
        break;
      case "image":
        item.displayObject = drawImage(app, item.data);
        break;
      default:
        console.warn("Unknown item type:", type);
    }
  }
}
