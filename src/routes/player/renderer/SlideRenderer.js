// renderer/SlideRenderer.js
import * as PIXI from 'pixi.js';
import drawBackground from './drawBackground.js';
import { drawMap } from './index.js';
import { getSlideMetrics, mapSlideItems } from '../layoutConfig.js';

export default function renderSlide(app, designWidth, designHeight, slide) {
  const stage = app.stage;
  stage.removeChildren();

  const canvasW = app.view.width;
  const canvasH = app.view.height;

  // ✅ Step 1: Draw solid background and optional pattern/image
  drawBackground(app, slide.background, canvasW, canvasH, slide.backgroundColor || "#dcdcdc");

  // ✅ Step 2: Filter and map visible items
  const currentTime = app.ticker?.lastTime / 1000 || 0; // fallback to 0 if no ticker
  const visibleItems = slide.items.filter(item =>
    item.visible !== false &&
    (item.showAt === undefined || currentTime >= item.showAt)
  );

  const metrics = getSlideMetrics(canvasW, canvasH, designWidth, designHeight);
  const screenItems = mapSlideItems(visibleItems, metrics);

  // ✅ Step 3: Draw items
  for (const item of screenItems) {
    const drawFn = drawMap[item.type];
    if (drawFn) drawFn(app, item);
    else console.warn("Unknown item type:", item.type);
  }

  stage.sortChildren();
}
