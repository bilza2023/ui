
import * as PIXI from 'pixi.js';

export default function drawText(textItem) {
  const fontColor = textItem.color || '#ffffff';
  const tintColor = hexColorToNumber(fontColor);

  if (!PIXI.BitmapFont.available["TestFont"]) {
    PIXI.BitmapFont.from("TestFont", {
      fontFamily: textItem.fontFamily || 'Arial',
      fontSize: textItem.fontSize || 24,
      fill: fontColor
    });
  }

  const bt = new PIXI.BitmapText(textItem.text, {
    fontName: "TestFont",
    fontSize: textItem.fontSize || 24,
    tint: tintColor
  });

  const padding = textItem.padding || 0;

  if (textItem.textAlign === 'center') {
    bt.anchor = new PIXI.Point(0.5, 0);
    bt.x = textItem.x + (textItem.width || 400) / 2;
  } else {
    bt.anchor = new PIXI.Point(0, 0);
    bt.x = textItem.x + padding;
  }

  bt.y = textItem.y + padding;
  bt.rotation = textItem.rotation || 0;
  if (textItem.zIndex !== undefined) bt.zIndex = textItem.zIndex;

  return bt;
}

function hexColorToNumber(color) {
  if (typeof color === 'string') {
    if (color.startsWith('#')) {
      return parseInt(color.slice(1), 16);
    } else {
      console.warn(`Invalid color string: "${color}". Must start with \"#\"`);
      return 0xffffff;
    }
  }

  if (typeof color === 'number') {
    return color;
  }

  console.warn(`Invalid color type: ${typeof color}. Must be string or number`);
  return 0xffffff;
}
