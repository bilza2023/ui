
import * as PIXI from 'pixi.js';
import drawGridPattern from './patterns/drawGridPattern.js';
import drawDotsPattern from './patterns/drawDotsPattern.js';
import drawLinesPattern from './patterns/drawLinesPattern.js';

export default function drawBackground(app, background, width, height, backgroundColor = "#dcdcdc") {
  // 1. Base fill (theme backgroundColor)
  const fill = new PIXI.Graphics();
  fill.beginFill(PIXI.utils.string2hex(backgroundColor));
  fill.drawRect(0, 0, width, height);
  fill.endFill();
  fill.zIndex = -3;
  app.stage.addChild(fill);

  if (!background) return;

  // 2. Background image (with optional opacity)
  if (background.backgroundImage) {
    const img = "images/drops.png/";
    if (img) {
      const texture = PIXI.Texture.from(img);
      const sprite = new PIXI.Sprite(texture);
      sprite.width = width;
      sprite.height = height;
      sprite.alpha = background.backgroundImageOpacity ?? 1;
      sprite.zIndex = -2;
      app.stage.addChild(sprite);
    }
  }

  // 3. Pattern overlay
  if (background.pattern) {
    switch (background.pattern.type) {
      case "grid":
        drawGridPattern(app, background.pattern, width, height);
        break;
      case "dots":
        drawDotsPattern(app, background.pattern, width, height);
        break;
      case "lines":
        drawLinesPattern(app, background.pattern, width, height);
        break;
    }
  }
}
