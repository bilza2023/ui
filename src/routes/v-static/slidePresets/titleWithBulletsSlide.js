// /slidePresets/titleWithBulletsSlide.js
// Builds a title + bullet list slide using center heading and top-left aligned bullets

import { textPresets } from "../presets/text.js";
import { applyPos } from "../pos/applyPos.js";

export function titleWithBulletsSlide(data, theme, deck) {
  const slide = deck.addSlide(10);

  const title = textPresets.centerHeading({ text: data.title }, theme);
  applyPos.topCenter(title, { dy: 40 });
  slide.addItem(title);

  data.bullets.forEach((text, index) => {
    const bullet = textPresets.bulletLine({ text: `• ${text}` }, theme);
    applyPos.topLeft(bullet, { dy: 150 + index * 100,dx: 60  });
    console.log("bullet",bullet);
    slide.addItem(bullet);
  });

  return slide;
}
