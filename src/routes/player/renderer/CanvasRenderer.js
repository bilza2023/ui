
// renderer/CanvasRenderer.js
import { drawMap } from './index.js';
import drawBackground from './drawBackground.js';
import * as PIXI from 'pixi.js';

import {
  getSlideMetrics,
  mapSlideItems
} from '../layoutConfig.js';

export default function renderCanvasItems(
  app,
  items,
  designWidth,
  designHeight,
  background = null,
  fallbackColor = "#000000"
) {
  const stage = app.stage;
  stage.removeChildren();

  const canvasW = app.view.width;
  const canvasH = app.view.height;

  const metrics = getSlideMetrics(canvasW, canvasH, designWidth, designHeight);
  const screenItems = mapSlideItems(items, metrics);

  // ✅ Decide whether to draw fallback color
  const shouldFallback = !background || (!background.backgroundImage && !background.pattern);

  if (!shouldFallback) {
    drawBackground(app, background, canvasW, canvasH);
  } else {
    const bg = new PIXI.Graphics();
    bg.beginFill(PIXI.utils.string2hex(fallbackColor));
    bg.drawRect(0, 0, canvasW, canvasH);
    bg.endFill();
    bg.zIndex = -1;
    stage.addChild(bg);
  }

  // Draw items
  for (const item of screenItems) {
    if (item.visible === false) continue;
    const drawFn = drawMap[item.type];
    if (drawFn) drawFn(app, item);
    else console.warn('Unknown item type:', item.type);
  }

  stage.sortChildren();
}
