import * as PIXI from 'pixi.js';

export default function drawText(app, item) {
  const fontColor = item.color || '#ffffff';
  const tintColor = hexColorToNumber(fontColor);

  if (!PIXI.BitmapFont.available["TestFont"]) {
    PIXI.BitmapFont.from("TestFont", {
      fontFamily: item.fontFamily || 'Arial',
      fontSize: item.fontSize || 24,
      fill: fontColor
    });
  }

  const bt = new PIXI.BitmapText(item.text, {
    fontName: "TestFont",
    fontSize: item.fontSize || 24,
    tint: tintColor
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


 function hexColorToNumber(color) {
  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      return parseInt(color.slice(1), 16);
    } else {
      console.warn(`Invalid color string: "${color}". Must start with "#"`);
      return 0xffffff;
    }
  }

  if (typeof color === 'number') {
    return color;
  }

  console.warn(`Invalid color type: ${typeof color}. Must be string or number`);
  return 0xffffff;
}

