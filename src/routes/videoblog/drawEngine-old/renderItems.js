

// renderer/renderItems.js
import { drawMap } from './drawMap.js';
import { getSlideMetrics, mapSlideItems } from './layoutConfig.js';

export default function renderItems(app, items, designWidth, designHeight) {
  const canvasW = app.view.width;
  const canvasH = app.view.height;

  const metrics = getSlideMetrics(canvasW, canvasH, designWidth, designHeight);
  const screenItems = mapSlideItems(items, metrics);

  for (const item of screenItems) {
    const drawFn = drawMap[item.type];
    if (drawFn) drawFn(app, item);
    else console.warn("Unknown item type:", item.type);
  }
}
