import * as PIXI from 'pixi.js';

export default function drawImage(imageItem) {
  const {
    src,
    x = 0,
    y = 0,
    width,
    height,
    anchorX = 0,
    anchorY = 0,
    rotation = 0,
    zIndex = 0
  } = imageItem;

  const texture = PIXI.Texture.from(src);
  const sprite = new PIXI.Sprite(texture);

  sprite.x = x;
  sprite.y = y;
  sprite.anchor.set(anchorX, anchorY);
  if (width) sprite.width = width;
  if (height) sprite.height = height;
  sprite.rotation = rotation;
  sprite.zIndex = zIndex;

  return sprite;
}
