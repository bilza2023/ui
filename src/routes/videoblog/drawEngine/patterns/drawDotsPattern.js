// renderer/patterns/drawDotsPattern.js
import * as PIXI from 'pixi.js';

export default function drawDotsPattern(app, pattern, width, height) {
  const {
    dotRadius,
    spacingX,
    spacingY,
    color
  } = pattern;

  const dots = new PIXI.Graphics();
  const fillHex = PIXI.utils.string2hex(color || "#999999");

  for (let x = 0; x <= width; x += spacingX) {
    for (let y = 0; y <= height; y += spacingY) {
      dots.beginFill(fillHex);
      dots.drawCircle(x, y, dotRadius);
      dots.endFill();
    }
  }

  dots.zIndex = -1;
  app.stage.addChild(dots);
}
