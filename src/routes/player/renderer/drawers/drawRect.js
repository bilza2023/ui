
import * as PIXI from 'pixi.js';

export default function drawRect(app, item) {
  const rect = new PIXI.Graphics();
  rect.beginFill(PIXI.utils.string2hex(item.fillColor || "#ffffff"));
  rect.lineStyle(item.borderWidth || 0, PIXI.utils.string2hex(item.borderColor || "#000000"));
  rect.drawRect(0, 0, item.width, item.height);
  rect.endFill();

  rect.x = item.x;
  rect.y = item.y;
  rect.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) rect.zIndex = item.zIndex;

  app.stage.addChild(rect);
}
