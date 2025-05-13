import { drawMap } from './index.js';

export default function renderCanvasItems(app, items) {
  const stage = app.stage;
  stage.removeChildren(); // Clear previous frame

  for (const item of items) {
    if (item.visible === false) continue;

    const drawFn = drawMap[item.type];
    if (drawFn) {
      drawFn(app, item);
    } else {
      console.warn("Unknown item type:", item.type);
    }
  }

  stage.sortChildren();
}
