import * as PIXI from 'pixi.js';
import Icons from '../../icons.js'; // assuming UTF-8 icon map here

export const IconsLayer = {
  name: "IconsLayer",
  start: 0,
  end: 5,
  renderFn(app, currentTime) {
    const container = new PIXI.Container();

    const iconList = [
      { x: 100, y: 100, icon: "🔥", size: 60, color: 0xff5500 },
      { x: 300, y: 150, icon: "🌟", size: 50, color: 0xffff00 },
      // ...more
    ];

    for (const { x, y, icon, size, color } of iconList) {
      const text = new PIXI.Text(icon, {
        fontSize: size,
        fill: color,
      });
      text.x = x;
      text.y = y;
      container.addChild(text);
    }

    return container;
  }
};
