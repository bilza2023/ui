
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
    if (typeof bg !== "object" || bg === null) {
      throw new Error("Invalid background: must be a non-null object.");
    }
  
    if (!("backgroundImage" in bg) && !("pattern" in bg)) {
      throw new Error("Background must include at least one of: backgroundImage or pattern.");
    }
  
    this._background = bg;
  }

  setData(newData) {
    this.data = { ...this.data, ...newData };
  }
  
  setTheme(newTheme) {
    this.theme = { ...this.theme, ...newTheme };
  }
  
}
/////////////////////////////
// Static helpers for background
BaseTemplate.backgroundWithImage = function (name, opacity = 1) {
  return {
    backgroundImage: name,
    backgroundImageOpacity: opacity,
    pattern: null
  };
};

BaseTemplate.backgroundWithPattern = function (pattern) {
  return {
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern
  };
};

BaseTemplate.createBackground = function ({ backgroundImage = null, pattern = null, backgroundImageOpacity = 1 } = {}) {
  return {
    backgroundImage: pattern ? null : backgroundImage,
    backgroundImageOpacity,
    pattern: pattern || null
  };
};


export { BaseTemplate };
