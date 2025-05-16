
// $lib/slideBuilder/templates/title-with-bullets.js

import { SlideBuilder } from '../SlideBuilder.js';
import { items } from '../items/index.js';

export function titleWithBullets(data) {
  // debugger;
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
  const canvasHeight = 576;
  const itemWidth = 800;
  const centerX = (canvasWidth - itemWidth) / 2;

  // Fixed layout constants
  const headingTop = 40;
  const headingHeight = 80;

  // Add heading using functional item
  const headingItem = items.heading(data.title, "white", 70);
  headingItem.x = centerX;
  headingItem.y = headingTop;
  headingItem.width = itemWidth;
  headingItem.height = headingHeight;
  builder.add(headingItem);

  return builder.build();
}
