
import * as PIXI from 'pixi.js';
import {darkTheme} from "../themes/globalThemes";


export default function drawText(app,textItem,globalTheme=darkTheme) {
  debugger;
  let tintColor = textItem.color;
  if (typeof textItem.color !== 'number') {
    tintColor = parseInt(textItem.color.replace("#", ""), 16);
  }

  // const tintColor = textItem.color || 'green';
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
