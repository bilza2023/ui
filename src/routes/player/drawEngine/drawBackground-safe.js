// renderer/drawBackground.js
import * as PIXI from 'pixi.js';
import Assets from './assets/Assets.js';
import drawGridPattern from './patterns/drawGridPattern.js';
import drawDotsPattern from './patterns/drawDotsPattern.js';
import drawLinesPattern from './patterns/drawLinesPattern.js';

export default function drawBackground(app, background, width, height, backgroundColor = "#dcdcdc") {
  // ✅ Step 1: Always draw base background color from slide
  const fill = new PIXI.Graphics();
  fill.beginFill(PIXI.utils.string2hex(backgroundColor));
  fill.drawRect(0, 0, width, height);
  fill.endFill();
  fill.zIndex = -3;
  app.stage.addChild(fill);

  // ✅ Step 2: Optional pattern/image overlays
  if (!background) return;
  if (background.backgroundImage) {
    // TODO: handle image background in future
  }

  if (background.pattern) {
    switch (background.pattern.type) {
      case "grid": drawGridPattern(app, background.pattern, width, height); break;
      case "dots": drawDotsPattern(app, background.pattern, width, height); break;
      case "lines": drawLinesPattern(app, background.pattern, width, height); break;
    }
  }
}
