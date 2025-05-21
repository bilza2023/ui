

export class SlideTemplate {
    constructor(data, config, background, canvasDims) {
      this.data = data;
      this.config = config;
      this.backgroundColor= "0x042c7c";
      this.background = background;
      this.globalTheme = null; // must be added by deck builder
      this.canvasDims = canvasDims;
      this.items = [];
    }
  
    buildSlide() {
        // if (!this.globalTheme) throw new Error("global theme missing.");
        // if (!this.startTime) throw new Error("start time missing.");
        // if (!this.endTime) throw new Error("end time missing.");
        
      return {
        // startTime: this.startTime,
        startTime: 0,
        endTime: 5,
        // endTime: this.endTime,
        backgroundColor: this.backgroundColor,
        background: this.background || {},
        items: this.items
      };
    }
  
    setStartTime(startTime) {
        this.startTime = startTime;
    }
  
    setEndTime(endTime) {
      this.endTime = endTime;
    }
  
    getBackgroundColor() {
      return this.data.backgroundColor;
    }
    setBackgroundColor(color) {
      this.backgroundColor = color;
    }
  }
  