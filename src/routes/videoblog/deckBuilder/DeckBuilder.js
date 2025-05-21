// $lib/deckBuilder/DeckBuilder.js
// import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';
import { darkTheme, lightTheme, educationSoft, coffeeNote } from "./theme/globalThemes.js";
import { Jumbotron } from "../pixiTemplates/registry/Jumbotron.js";

export class DeckBuilder {
  constructor({ globalTheme = coffeeNote, globalBackground = {} } = {}) {
    this.designWidth = 1020;
    this.designHeight = 576;
    this.globalTheme = globalTheme;
    this.globalBackground = globalBackground;
    this.templates = []; // hold raw templates
  }

  add(endAt, templateName) {
    // timeCheck(endAt);
    this.templates.push({ templateName, endAt });
  }

  build() {
 
    const slides = [];
  
    for (const { templateName, endAt } of this.templates) {
      timeCheck(endAt); //✅ Moved here
    
     
      // const data = template.data || {};
      // const config = template.config || {};
      // debugger; 
      const items = Jumbotron.getItems(
        {title : "Duck Tape"},
        {},
        this.globalTheme,
        this.globalBackground
      );
  
      const slide = {
        id: uuid(),
        // startTime: this.startTime,
        startTime: 0,
        endTime: 5,
        // endTime: this.endTime,
        items,
        backgroundColor: this.globalTheme.backgroundColor,
        background: this.background || {},
      };
      slides.push(slide);
    }
  ////////////////////////////////////////////////
    const slidesData = {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slides,
    };
  
    return slidesData;
  }
  
}

// ------------------------
// 🧩 Utility functions
// ------------------------

function timeCheck(endAt) {
  if (typeof endAt !== 'number' || endAt <= 0) {
    throw new Error(`Invalid endAt: must be a positive number`);
  }
}

function injectGlobalTheme(template, globalTheme) {
  if (globalTheme) {
    template.globalTheme = structuredClone(globalTheme);
  }
}

function injectGlobalBackground(template, globalBackground) {
  if ((template.getBackground?.() == null) && globalBackground) {
    template.setBackground(structuredClone(globalBackground));
  }
}

function finalizeSlides(slides) {
  let lastEnd = 0;

  return slides.map((slide, index) => {
    const endTime = slide.__endTime;

    if (typeof endTime !== 'number' || isNaN(endTime)) {
      throw new Error(`Slide ${index} is missing a valid endTime`);
    }

    if (endTime <= lastEnd) {
      throw new Error(`Slide ${index} has invalid endTime (${endTime} <= ${lastEnd})`);
    }

    const startTime = lastEnd;
    lastEnd = endTime;

    const { __endTime, ...cleaned } = slide;
    return { ...cleaned, startTime, endTime };
  });
}


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}