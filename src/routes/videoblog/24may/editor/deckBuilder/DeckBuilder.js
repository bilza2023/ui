
import {templates} from "../templates";

export class DeckBuilder {
    constructor({ globalTheme, globalBackground = {}, designWidth = 1020, designHeight = 576 } = {}) {
      this.globalTheme = globalTheme;
      this.globalBackground = globalBackground;
      this.designWidth = designWidth;
      this.designHeight = designHeight;
      this.slides = [];
      this.currentStartTime = 0;
    }
  
    add(templateFn, data = {}, duration = 5) {
      const { startTime, endTime } = this._getNextTiming(duration);
  
      const slide = templateFn(this.globalTheme, data);
      slide.startTime = startTime;
      slide.endTime = endTime;
  
      this.slides.push(slide);
    }
  
    _getNextTiming(duration) {
      const startTime = this.currentStartTime;
      const endTime = startTime + duration;
      this.currentStartTime = endTime;
      return { startTime, endTime };
    }
  
    build() {
      const totalDuration = Math.max(...this.slides.map(s => s.endTime));
      return {
        designWidth: this.designWidth,
        designHeight: this.designHeight,
        totalDuration,
        slidesData: this.slides,
      };
    }
  }
  