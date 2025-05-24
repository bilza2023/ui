import * as PIXI from "pixi.js";
import { pixiApp } from "../pixiApp.js";
import DrawEngine from "../engine/DrawEngine.js";
import {
  drawTextItem,
  drawRectItem,
  drawCircleItem,
  drawTriangleItem
} from "../threeAndHalf/now.js";

// 🟦 Loads textures
function loadTextures(callback) {
    const loader = PIXI.Loader.shared;
  
    if (!loader.resources.bunny) {
      loader.add('bunny', 'https://pixijs.io/examples/examples/assets/bunny.png');
    }
  
    loader.load((_, resources) => {
      const textures = {
        bunny: resources.bunny.texture
      };
      callback(textures);
    });
  }
  

// 🟩 Creates an image sprite from texture
export function drawImage(texture) {
  const sprite = new PIXI.Sprite(texture);
  sprite.x = 500;
  sprite.y = 300;
  sprite.width = 100;
  sprite.height = 100;
  return sprite;
}

// 🟨 Builds a slide object using textures
function createSlide(textures) {
  return {
    backgroundColor: '0x1b0b93',
    items: [
      drawTextItem(),
      drawRectItem(),
      drawCircleItem(),
      drawTriangleItem(),
      drawImage(textures.bunny)
    ]
  };
}

// 🟥 Main runner
export function loadImagesAndRun(container, DESIGN) {
  loadTextures((textures) => {
    const app = pixiApp(0x1b0b93, DESIGN.width, DESIGN.height);
    container.appendChild(app.view);

    const slide = createSlide(textures);

    const engine = new DrawEngine(app);
    engine.draw(slide, 0);
  });
}
