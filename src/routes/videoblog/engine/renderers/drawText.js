
// drawText.js
import * as PIXI from 'pixi.js';
import { darkTheme } from "../themes/globalThemes.js";
import decideTheColour from "./decide-the-colour.js";

export default function drawText(app, textItem, globalTheme = darkTheme) {
  // === 1. Resolve tint color based on themeRole and overrides
  const tintColor = decideTheColour(textItem, globalTheme);

  // === 2. Prepare font
  const fontFamily = textItem.fontFamily || 'Arial';
  const fontSize = textItem.fontSize || 24;
  const fontKey = `Font_${fontFamily}_${fontSize}`;

  if (!PIXI.BitmapFont.available[fontKey]) {
    PIXI.BitmapFont.from(fontKey, {
      fontFamily,
      fontSize,
      fill: tintColor   // color used for generating glyph atlas
    });
  }

  // === 3. Create BitmapText instance
  const bt = new PIXI.BitmapText(textItem.text, {
    fontName: fontKey,
    fontSize,
    tint: tintColor     // final runtime tint
  });

  // === 4. Positioning logic
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
