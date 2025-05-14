import { drawMap } from './index.js';
import {
  getSlideMetrics,
  mapSlideItems
} from '../layoutConfig.js';

export default function renderCanvasItems(
  app,
  items,
  designWidth,
  designHeight
) {
  const stage = app.stage;
  stage.removeChildren();

  // Canvas dimensions (after +page.svelte has resized it)
  const canvasW = app.view.width;
  const canvasH = app.view.height;

  // --- new uniform‑scale + centring metrics ---
  const metrics = getSlideMetrics(canvasW, canvasH, designWidth, designHeight);

  // --- map every design‑space item → screen‑space ---
  const screenItems = mapSlideItems(items, metrics);

  // Draw
  for (const item of screenItems) {
    if (item.visible === false) continue;
    const drawFn = drawMap[item.type];
    if (drawFn) drawFn(app, item);
    else console.warn('Unknown item type:', item.type);
  }

  stage.sortChildren();
}
