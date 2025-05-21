import * as PIXI from 'pixi.js';

export default function drawImage(app, item) {
  const texture = PIXI.utils.TextureCache[item.src];
  if (!texture) {
    console.warn("Missing preloaded image:", item.src);
    return;
  }

  const sprite = new PIXI.Sprite(texture);

  sprite.x = item.x;
  sprite.y = item.y;
  sprite.width = item.width;
  sprite.height = item.height;
  sprite.rotation = item.rotation || 0;

  if (item.zIndex !== undefined) sprite.zIndex = item.zIndex;

  app.stage.addChild(sprite);
}
