
// $lib/slideBuilder/templates/title-with-bullets.js

import { SlideBuilder } from '../SlideBuilder.js';
import { items } from '../items/index.js';
import { centerHorizontally, placeBelow } from './layoutUtils.js';

export function titleWithBullets(data) {
  if (!data.title) {
    throw new Error('title-with-bullets template requires a title');
  }

  const builder = new SlideBuilder({
    id: data.id || 'title-with-bullets',
    startTime: data.startTime || 0,
    endTime: data.endTime || 5,
    backgroundColor: data.bg || '#223344'
  });

  const canvasWidth = 1020;
  const itemWidth = 800;

  // Add heading
  const headingItem = items.heading(data.title, "white", 70);
  headingItem.y = 40;
  headingItem.height = 80;
  centerHorizontally(headingItem, canvasWidth, itemWidth);
  builder.add(headingItem);

  // Bullet 1
  const bullet1 = items.bulletPoint("• " + (data.bullets?.[0] || ""), "white", 40);
  bullet1.height = 50;
  placeBelow(bullet1, headingItem, 40);
  centerHorizontally(bullet1, canvasWidth, itemWidth);
  builder.add(bullet1);

  // Bullet 2
  const bullet2 = items.bulletPoint("• " + (data.bullets?.[1] || ""), "white", 40);
  bullet2.height = 50;
  placeBelow(bullet2, bullet1, 20);
  centerHorizontally(bullet2, canvasWidth, itemWidth);
  builder.add(bullet2);

  // Bullet 3
  const bullet3 = items.bulletPoint("• " + (data.bullets?.[2] || ""), "white", 40);
  bullet3.height = 50;
  placeBelow(bullet3, bullet2, 20);
  centerHorizontally(bullet3, canvasWidth, itemWidth);
  builder.add(bullet3);

  return builder.build();
}
