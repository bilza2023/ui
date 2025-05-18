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

  if (item.textAlign === 'center') {
    textObj.anchor.x = 0.5;
    textObj.x = item.x + (item.width || 400) / 2;
  } else {
    textObj.anchor.x = 0;
    textObj.x = item.x + padding;
  }

  textObj.y = item.y + padding;
  textObj.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) textObj.zIndex = item.zIndex;

  app.stage.addChild(textObj);
}
