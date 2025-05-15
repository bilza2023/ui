import { drawMap } from './index.js';
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
  backgroundColor = "#000000"
) {
  const stage = app.stage;
  stage.removeChildren();

  const canvasW = app.view.width;
  const canvasH = app.view.height;

  const metrics = getSlideMetrics(canvasW, canvasH, designWidth, designHeight);
  const screenItems = mapSlideItems(items, metrics);

  // Draw background rect
  const bg = new PIXI.Graphics();
  bg.beginFill(PIXI.utils.string2hex(backgroundColor));
  bg.drawRect(0, 0, canvasW, canvasH);
  bg.endFill();
  bg.zIndex = -1; // ensure it stays behind everything
  stage.addChild(bg);

  // Draw items
  for (const item of screenItems) {
    if (item.visible === false) continue;
    const drawFn = drawMap[item.type];
    if (drawFn) drawFn(app, item);
    else console.warn('Unknown item type:', item.type);
  }

  stage.sortChildren();
}
