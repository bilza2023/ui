// lib/deckBuilder/DeckBuilder.js
import SlideBuilder from "../threeAndHalf/SlideBuilder";
 
export class DeckBuilder {
  constructor({ globalTheme, globalBackground = {}, designWidth = 1020, designHeight = 576 } = {}) {
    this.globalTheme = globalTheme;
    this.globalBackground = globalBackground;
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.slides = [];
    this.currentStartTime = 0;
  }



  addSlide(templateFn, { data = {}, config = {}, duration = 5, background = {}, backgroundColor = null }) {
    const startTime = this.currentStartTime;
    const endTime = startTime + duration;
    this.currentStartTime = endTime;
  
    const builder = new SlideBuilder(this.globalTheme);
    builder.setTemplate(templateFn);
    builder.setData(data);
    builder.setConfig(config);
    builder.setBackground(background);
    if (backgroundColor !== null) {
      builder.setBackgroundColor(backgroundColor);
    }
    builder.setStartTime(startTime);
    builder.setEndTime(endTime);
  
    const slide = builder.build(); // now uses full logic including background fallback
  
    this.slides.push(slide);
  }
  
  build() {
    return {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slidesData: this.slides,
    };
  }
}


//////////////////////////////////

//////////////////////////////////////////////////////
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
