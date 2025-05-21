import * as PIXI from 'pixi.js';

export default function drawRect(rectItem) {
  const {
    x = 0,
    y = 0,
    width = 100,
    height = 50,
    fill = 0xffffff,
    alpha = 1,
    lineColor = 0x000000,
    lineWidth = 0
  } = rectItem;

  const rect = new PIXI.Graphics();
  rect.lineStyle(lineWidth, lineColor, 1);
  rect.beginFill(fill, alpha);
  rect.drawRect(0, 0, width, height);
  rect.endFill();

  rect.x = x;
  rect.y = y;
  rect.zIndex = rectItem.zIndex || 0;

  return rect;
}
