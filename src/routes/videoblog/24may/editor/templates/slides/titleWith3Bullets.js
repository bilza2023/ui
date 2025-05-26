// templates/slide/titleWith3Bullets.js

import { TemplateToolkit as T } from "../toolkit/Toolkit";

export default function titleWith3Bullets(globalTheme, data = {}) {
  // === Heading ===
  const headingItem = T.ItemBuilders.heading(globalTheme, {
    text: data.title,
  });
  T.layout(headingItem[0], "center",0.1);

  // === Bullets ===
  const bullets = T.ItemBuilders.bulletList(globalTheme, {
    items: data.bullets || ["First point", "Second point", "Third point"],
  });

  T.layout(bullets[0], "center",0.4);
  T.layout(bullets[1], "center",0.6);
  T.layout(bullets[2], "center",0.8);

  bullets[0].animate = [ T.Anim.enterFromLeft(2, 0.5, bullets[0]) ];
  bullets[1].animate = [ T.Anim.enterFromLeft(4, 0.5, bullets[1]) ];
  bullets[2].animate = [ T.Anim.enterFromLeft(6, 0.5, bullets[2]) ];

  // bullets[0].animate = [{
  //   fn: "tween",
  //   start: 1.5,
  //   end:   2.3,
  //   props: { from:  -(bullets[0].width + 100) , to: bullets[0].x }   // animates x
  // }];
  

  return [...headingItem, ...bullets];
}
