
import * as PIXI from 'pixi.js';

function colorToHexString(value) {
  if (typeof value !== 'number') {
    throw new Error(`Invalid color: expected number, got ${typeof value}`);
  }
  return `#${value.toString(16).padStart(6, '0')}`;
}

export default function drawText(textItem) {
  if (typeof textItem.color !== 'number') {
    throw new Error(`Invalid item color type, expected number, got ${typeof textItem.color}`);
  }

  const fontFamily = textItem.fontFamily || 'Arial';
  const fontSize = textItem.fontSize || 24;
  const fontKey = `Font_${fontFamily}_${fontSize}`;

  if (!PIXI.BitmapFont.available[fontKey]) {
    PIXI.BitmapFont.from(fontKey, {
      fontFamily,
      fontSize,
      fill: tintColor
    });
  }

  const bt = new PIXI.BitmapText(textItem.text, {
    fontName: fontKey,
    fontSize,
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
