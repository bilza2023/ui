// /slidePresets/imageLeftBulletsRight.js
import { textPresets } from "../presets/text.js";
import { applyPos } from "../pos/applyPos.js";
import { ItemBuilders } from "taleem-video-deckbuilder";

const defaultConfig = {
  imageDx: 40,
  imageDy: 120,
  imageWidth: 360,
  imageHeight: 300,
  bulletBaseDy: 100,
  bulletSpacing: 90,
  bulletDx: 460
};

export function imageLeftBulletsRight(data, theme, deck, endTime, { showAt = [], config = {} } = {}) {
  const cfg = { ...defaultConfig, ...config };
  const slide = deck.addSlide(endTime);

  if (data.image?.src) {
    const imageItem = ItemBuilders.image(data.image.src);
    imageItem.x = cfg.imageDx;
    imageItem.y = cfg.imageDy;
    imageItem.width = cfg.imageWidth;
    imageItem.height = cfg.imageHeight;
    imageItem.showAt = showAt[0] ?? 0;
    slide.addItem(imageItem);
  }

  data.bullets.forEach((text, index) => {
    const bullet = textPresets.bulletLine({ text }, theme);
    const bulletDy = cfg.bulletBaseDy + index * cfg.bulletSpacing;
    applyPos.topLeft(bullet, { dy: bulletDy, dx: cfg.bulletDx });
    bullet.showAt = showAt[index + 1] ?? 0;
    slide.addItem(bullet);
  });

  return slide;
}
