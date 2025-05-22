
//DeckBuilder.js
import { GlobalThemes } from './theme/index.js';

import {TemplatesMap} from "../pixiTemplates/registry";

export class DeckBuilder {
  constructor({ globalTheme = GlobalThemes.highContrast, globalBackground = {} } = {}) {
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
  
////////////////////////////////BUILD LOOP ///////////////////////////////////
for (let i = 0; i < this.templates.length; i++) {
  const userData = this.templates[i];

// timeCheck(endAt); //✅ Moved here
//--get template
const templateEntry = TemplatesMap[userData.templateName];
if (!templateEntry) throw new Error(`Template '${userData.templateName}' not found`);

///////////--add data and config into template--

const finalData = { ...templateEntry.data, ...userData.data };
const finalConfig = { ...templateEntry.config, ...userData.config };

const items = templateEntry.getItems(finalData, finalConfig, this.globalTheme, this.globalBackground);

//===now complete the slide
const slide = {
  id: uuid(),
  // startTime: this.startTime,
  startTime: 0,
  endTime: 5,
  // endTime: this.endTime,
  items,
  backgroundColor: this.globalTheme.backgroundColor,
  background: this.globalBackground || {},
  };
  //////////--slide
  slides.push(slide);

}//build loop ends
/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////
const slidesData = {
  designWidth: this.designWidth,
  designHeight: this.designHeight,
  slides,
  };
  // debugger;
  console.log("build-step - slidesData",slidesData);
  return slidesData;
}//build function

////////////////////////////////////////////////////////////////////  
////////////////////////////////////////////////////////////////////  
}//class ends

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