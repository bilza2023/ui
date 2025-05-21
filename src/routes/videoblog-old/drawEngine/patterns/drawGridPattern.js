// renderer/patterns/drawGridPattern.js
import * as PIXI from 'pixi.js';

export default function drawGridPattern(app, pattern, width, height) {
  const {
    cellWidth,
    cellHeight,
    lineColor,
    lineWidth
  } = pattern;

  const grid = new PIXI.Graphics();
  const colorHex = PIXI.utils.string2hex(lineColor || "#cccccc");

  // ✅ Set line style once
  grid.lineStyle(lineWidth, colorHex);

  // Draw vertical lines
  for (let x = 0; x <= width; x += cellWidth) {
    grid.moveTo(x, 0);
    grid.lineTo(x, height);
  }

  // Draw horizontal lines
  for (let y = 0; y <= height; y += cellHeight) {
    grid.moveTo(0, y);
    grid.lineTo(width, y);
  }

  grid.zIndex = -1;
  app.stage.addChild(grid);
}
