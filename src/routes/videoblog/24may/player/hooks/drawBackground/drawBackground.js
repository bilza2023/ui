
// hooks/drawBackground.js
import * as PIXI from "pixi.js";
import getBackgroundColor from "../../core/engine/getBackgroundColor.js";
import toPixiColor from "./toPixiColor.js";

// === MAIN DRAW CONTROLLER ===
export function drawBackground(background, container, width, height, assets = {}) {
  container.removeChildren();

  drawBackgroundColor(background, container, width, height);
  drawBackgroundImage(background, container, width, height, assets);
  drawBackgroundPattern(background.pattern, container, width, height);
}

// === LAYER 1: Background Color ===
function drawBackgroundColor(background, container, width, height) {
  const bgColor = getBackgroundColor({ background });
  const bg = new PIXI.Graphics();
  bg.beginFill(bgColor);
  bg.drawRect(0, 0, width, height);
  bg.endFill();
  container.addChild(bg);
}

// === LAYER 2: Background Image (placeholder for now) ===
function drawBackgroundImage(background, container, width, height, assets) {
  const { backgroundImage, backgroundImageOpacity = 1.0 } = background;

  // console.log("backgroundImage",backgroundImage);
  // console.log("assets[backgroundImage]",assets[backgroundImage]);

  if (!backgroundImage || !assets[backgroundImage]) return;

  const sprite = new PIXI.Sprite(assets[backgroundImage]);
  sprite.width = width;
  sprite.height = height;
  sprite.alpha = backgroundImageOpacity;

  container.addChild(sprite);
}


// === LAYER 3: Pattern Drawing ===
function drawBackgroundPattern(pattern, container, width, height) {
  if (!pattern || pattern.type !== "dots") return;

  const {
    color = "#ffffff",
    opacity = 0.2,
    spacing = 30,
    radius = 2
  } = pattern.props ?? {};

  const dotColor = toPixiColor(color);
  const dotLayer = new PIXI.Graphics();
  dotLayer.beginFill(dotColor, opacity);

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dotLayer.drawCircle(x, y, radius);
    }
  }

  dotLayer.endFill();
  container.addChild(dotLayer);
}
