
import * as PIXI from 'pixi.js';

export default function drawCircle(app, item) {
  const circle = new PIXI.Graphics();
  circle.beginFill(PIXI.utils.string2hex(item.fillColor || "#00ccff"));
  circle.lineStyle(item.borderWidth || 0, PIXI.utils.string2hex(item.borderColor || "#000000"));
  circle.drawCircle(0, 0, item.radius || 30);
  circle.endFill();

  circle.x = item.x;
  circle.y = item.y;
  circle.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) circle.zIndex = item.zIndex;

  app.stage.addChild(circle);
}
