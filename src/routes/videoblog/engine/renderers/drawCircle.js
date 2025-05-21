import * as PIXI from 'pixi.js';

export default function drawCircle(circleItem) {
  const {
    x = 0,
    y = 0,
    radius = 50,
    fill = 0xffffff,
    alpha = 1,
    lineColor = 0x000000,
    lineWidth = 0
  } = circleItem;

  const circle = new PIXI.Graphics();
  circle.lineStyle(lineWidth, lineColor, 1);
  circle.beginFill(fill, alpha);
  circle.drawCircle(0, 0, radius);
  circle.endFill();

  circle.x = x;
  circle.y = y;
  circle.zIndex = circleItem.zIndex || 0;

  return circle;
}
