// renderer/patterns/drawLinesPattern.js
import * as PIXI from 'pixi.js';

export default function drawLinesPattern(app, pattern, width, height) {
  const {
    direction,
    spacing,
    lineColor,
    lineWidth
  } = pattern;

  const lines = new PIXI.Graphics();
  const colorHex = PIXI.utils.string2hex(lineColor || "#cccccc");

  lines.lineStyle(lineWidth, colorHex);

  if (direction === "horizontal") {
    for (let y = 0; y <= height; y += spacing) {
      lines.moveTo(0, y);
      lines.lineTo(width, y);
    }
  } else {
    for (let x = 0; x <= width; x += spacing) {
      lines.moveTo(x, 0);
      lines.lineTo(x, height);
    }
  }

  lines.zIndex = -1;
  app.stage.addChild(lines);
}
