
import loadBackgroundImages from "./loadBackgroundImages.js";
import loadSprites from "./loadSprites.js";
import Icons from "./Icons.js";

export default class Assets {
  constructor(images = new Map()) {
    this.backgroundImages = new Map(loadBackgroundImages());
    this.sprites = loadSprites();
    this.images = images;
    this.icons = Icons;
  }

  // Get background image by name
  getBackgroundImage(name) {
    return this.backgroundImages.get(name) || null;
  }

  // Get sprite by name
  getSprite(name) {
    return this.sprites.get(name) || null;
  }

  // Get only the sprite image
  getSpriteImage(name) {
    const sprite = this.getSprite(name);
    return sprite ? sprite.img : null;
  }

  // Lists for convenience
  get backgroundImagesList() {
    return Array.from(this.backgroundImages.keys());
  }

  get iconsList() {
    return Object.keys(this.icons);
  }

  get spritesList() {
    return Array.from(this.sprites.keys());
  }
}
