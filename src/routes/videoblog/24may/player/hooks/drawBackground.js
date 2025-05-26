

// hooks/drawBackground.js
import * as PIXI from "pixi.js";
import getBackgroundColor from "../core/engine/getBackgroundColor";

export function drawBackground(background, container, width, height) {
  container.removeChildren();

  // Layer 1: backgroundColor
  const bgColor = getBackgroundColor({ background });
  const bg = new PIXI.Graphics();
  bg.beginFill(bgColor);
  bg.drawRect(0, 0, width, height);
  bg.endFill();
  container.addChild(bg);

  // Layer 2: Pattern (dots)
  if (background.pattern === "dots") {
    const dotLayer = new PIXI.Graphics();
    dotLayer.beginFill(0xffffff, 0.2); // white, low opacity
    const spacing = 30;

    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dotLayer.drawCircle(x, y, 2); // radius = 2px
      }
    }

    dotLayer.endFill();
    container.addChild(dotLayer);
  }

  // TODO: add image layer if backgroundImage exists
}
