// $lib/slideBuilder/templates/title-with-bullets.js

import { SlideBuilder } from '../SlideBuilder.js';

export function titleWithBulletsTemplate(data) {
  if (!data.title || !Array.isArray(data.bullets) || data.bullets.length < 1) {
    throw new Error('title-with-bullets template requires a title and at least 1 bullet');
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
  const bulletsTop = 210;
  const bulletSpacing = 120;

  builder.addItem('title', data.title, {
    x: centerX,
    y: headingTop,
    width: itemWidth,
    height: headingHeight
  });

  const bullets = data.bullets.slice(0, 3);

  if (bullets[0]) {
    builder.addItem('bullet', bullets[0], {
      x: centerX,
      y: bulletsTop,
      width: itemWidth,
      height: 60
    });
  }

  if (bullets[1]) {
    builder.addItem('bullet', bullets[1], {
      x: centerX,
      y: bulletsTop + bulletSpacing,
      width: itemWidth,
      height: 60
    });
  }

  if (bullets[2]) {
    builder.addItem('bullet', bullets[2], {
      x: centerX,
      y: bulletsTop + bulletSpacing * 2,
      width: itemWidth,
      height: 60
    });
  }

  return builder.build();
}
