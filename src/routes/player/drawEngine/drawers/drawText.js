import * as PIXI from 'pixi.js';

export default function drawText(app, item) {
  // 1. Ensure BitmapFont is available (runtime-generated for test)
  if (!PIXI.BitmapFont.available["TestFont"]) {
    PIXI.BitmapFont.from("TestFont", {
      fontFamily: item.fontFamily || 'Arial',
      fontSize: item.fontSize || 24,
      fill: item.color || '#ffffff'
    });
  }

  // 2. Create BitmapText
  const bt = new PIXI.BitmapText(item.text, {
    fontName: "TestFont",
    fontSize: item.fontSize || 24,
    tint: item.color || 0xffffff
  });

  const padding = item.padding || 0;

  // 3. Apply alignment and positioning
  if (item.textAlign === 'center') {
    bt.anchor = new PIXI.Point(0.5, 0); // anchor.y = 0 (top)
    bt.x = item.x + (item.width || 400) / 2;
  } else {
    bt.anchor = new PIXI.Point(0, 0);
    bt.x = item.x + padding;
  }

  bt.y = item.y + padding;
  bt.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) bt.zIndex = item.zIndex;

  // 4. Add to stage
  app.stage.addChild(bt);
}
