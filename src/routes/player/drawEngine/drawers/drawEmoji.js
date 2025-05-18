import * as PIXI from 'pixi.js';
// import { hexColorToNumber } from './utils.js';

export default function drawEmoji(app, item) {
  const text = new PIXI.Text(item.text || "", {
    fontFamily: item.fontFamily || "Segoe UI Emoji",
    fontSize: item.fontSize || 48,
    fill: item.color || "#000000"
  });

  text.x = item.x;
  text.y = item.y;
  text.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) text.zIndex = item.zIndex;
  text.visible = item.visible !== false;

  app.stage.addChild(text);
}
