

export class SlideTemplate {
    constructor() {
      this.data = {};
      this.config = {};
      this.backgroundColor= "0x042c7c"; //user changes it 
      this.background = null; // must be added by deck builder
      this.globalTheme = null; // must be added by deck builder
      this.canvasDims = {};//i dont know about it
      this.items = [];
    }

    getItems(){
      /////
      return this.items;
    }
  
    buildSlide() {

        if (!this.globalTheme) throw new Error("global theme missing.");
        
        if (typeof this.startTime !== 'number' || isNaN(this.startTime))
          throw new Error("start time missing.");
        
        if (typeof this.endTime !== 'number' || isNaN(this.endTime))
          throw new Error("end time missing.");
        
      return {
        startTime: this.startTime,
        endTime: this.endTime,
        backgroundColor: this.backgroundColor,
        background: this.background || {},
        items: this.getItems()
      };
    }


  setData(newData) {
    this.data = { ...this.data, ...newData };
  }
  
  setTheme(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }
  
    setStartTime(startTime) {
        this.startTime = startTime;
    }
  
    setEndTime(endTime) {
      this.endTime = endTime;
    }
  
    getBackgroundColor() {
      return this.backgroundColor;
    }
    setBackgroundColor(color) {
      this.backgroundColor = color;
    }
  }
  