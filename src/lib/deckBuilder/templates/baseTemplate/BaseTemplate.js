
import { itemsMap } from '../../itemsFolder/items/itemsMap';

class BaseTemplate {
  constructor(name) { // name is must since templates must have unique name they do not have id their name is id
    // this.id = null; // Will be assigned by DeckBuilder????? uuid?
    this.name = name;
    
//availableItems are all the items present in items folder and can be used to generate data for their counter parts in pixi.js -> availableItems.getText , availableItems.getCircle
// we use this in the this.getItems function to actually return items
    this.items = itemsMap;
    this.data = {}; // Template author sets
    this.theme = {}; // Optional overrides
    this.globalTheme = {}; // Injected by DeckBuilder (read-only, cloned)

    // Constants
    this.canvasWidth = 1020;
    this.itemWidth = 800;
  }


// THIS is the final output 
getItems () {
  // this is to be provided by child class
  // return this.itemsArray;
}
  // Safe theme/globalTheme fallback
  resolve(key, fallback) {
    return this.theme?.[key] ?? this.globalTheme?.[key] ?? fallback;
  }

  // Position helpers
  centerHorizontally(item) {
    item.x = (this.canvasWidth - this.itemWidth) / 2;
    item.width = this.itemWidth;
  }

  placeBelow(item, refItem, gap = 50) {
    item.y = (refItem.y + (refItem.height || 100) + gap);
  }

  // Optional background
  setBackground(bg) {
    if (
      typeof bg !== "object" ||
      !("backgroundImage" in bg) ||
      !("pattern" in bg)
    ) {
      throw new Error("Invalid background object. Must include backgroundImage and pattern keys.");
    }
    this._background = bg;
  }

  getBackground() {
    return this._background ?? null;
  }

  // Optional emoji layer--keep commented for now
  // setEmojiLayer(emojiLayer) {
  //   this._emojiLayer = emojiLayer;
  // }

  // getEmojiLayer() {
  //   return this._emojiLayer ?? null;
  // }
}
/////////////////////////////
// Static helpers for background
BaseTemplate.backgroundWithImage = function (name) {
  return {
    backgroundImage: name,
    pattern: null
  };
};

BaseTemplate.backgroundWithPattern = function (pattern) {
  return {
    backgroundImage: null,
    pattern
  };
};

BaseTemplate.createBackground = function ({ backgroundImage = null, pattern = null } = {}) {
  return {
    backgroundImage: pattern ? null : backgroundImage,
    pattern: pattern || null
  };
};

export { BaseTemplate };
