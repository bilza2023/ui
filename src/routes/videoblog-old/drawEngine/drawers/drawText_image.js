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

  // 1. Create the PIXI.Text object
  const textObj = new PIXI.Text(item.text, style);
  textObj.updateText(); // ensure dimensions are correct

  // 2. Render text to texture
  const renderTexture = PIXI.RenderTexture.create({
    width: textObj.width,
    height: textObj.height,
  });

  app.renderer.render(textObj, { renderTexture });

  // 3. Create sprite from texture
  const sprite = new PIXI.Sprite(renderTexture);
  sprite.tint = 0xff00ff; // bright purple
  const padding = item.padding || 0;

  if (item.textAlign === 'center') {
    sprite.anchor.x = 0.5;
    sprite.x = item.x + (item.width || 400) / 2;
  } else {
    sprite.anchor.x = 0;
    sprite.x = item.x + padding;
  }

  sprite.y = item.y + padding;
  sprite.rotation = item.rotation || 0;
  if (item.zIndex !== undefined) sprite.zIndex = item.zIndex;

  app.stage.addChild(sprite);
}
