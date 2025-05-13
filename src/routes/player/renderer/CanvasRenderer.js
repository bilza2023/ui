import { drawMap } from './index.js';
import { scaleItem } from './scaleItem.js';

export default function renderCanvasItems(app, items, designWidth, designHeight) {
  const stage = app.stage;
  stage.removeChildren();

  const canvasWidth = app.view.width;
  const canvasHeight = app.view.height;

  const scaleX = canvasWidth / designWidth;
  const scaleY = canvasHeight / designHeight;
const scale = Math.min(scaleX, scaleY);
  for (const item of items) {
    if (item.visible === false) continue;

    const scaledItem = scaleItem(item, scale, scale);
    const drawFn = drawMap[item.type];
    if (drawFn) {
      drawFn(app, scaledItem);
    } else {
      console.warn("Unknown item type:", item.type);
    }
  }

  stage.sortChildren();
}
