
import * as PIXI from 'pixi.js';

export default function drawText(app, item) {
  const style = new PIXI.TextStyle({
    fontFamily: item.fontFamily || 'Arial',
    fontSize: item.fontSize || 24,
    fill: item.color || '#ffffff',
    wordWrap: true,
    wordWrapWidth: item.width || 400,
    align: item.textAlign || 'left',
    lineHeight: item.lineHeight || 1.2,
  });

  const textObj = new PIXI.Text(item.text, style);

  const padding = item.padding || 0;
  const bounds = textObj.getLocalBounds();
  const bgWidth = bounds.width + 2 * padding;
  const bgHeight = bounds.height + 2 * padding;

  if (item.backgroundColor) {
    const bg = new PIXI.Graphics();
    bg.beginFill(PIXI.utils.string2hex(item.backgroundColor));
    bg.drawRect(0, 0, bgWidth, bgHeight);
    bg.endFill();
    bg.x = item.x;
    bg.y = item.y;
    bg.rotation = item.rotation || 0;
    if (item.zIndex !== undefined) bg.zIndex = item.zIndex;
    app.stage.addChild(bg);
  }

  textObj.x = item.x + padding;
  textObj.y = item.y + padding;
  textObj.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) textObj.zIndex = item.zIndex;

  app.stage.addChild(textObj);
}
