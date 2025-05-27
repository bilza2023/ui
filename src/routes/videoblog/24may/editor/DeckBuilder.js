

export class DeckBuilder {
  constructor({
    preprocess = null,
    postValidate = null,
  } = {}) {

    this.globalTheme = null;
    this.globalBackground = null;

    this.designWidth = 1020;
    this.designHeight = 576

    this.preprocess = typeof preprocess === "function" ? preprocess : (items => items);
    this.postValidate = typeof postValidate === "function" ? postValidate : (() => {});

    this.slides = [];
    this.currentStartTime = 0;
  }

  setDesignWidth(w) { this.designWidth = w; }
  setDesignHeight(h) { this.designHeight = h; }
  setGlobalTheme(theme) {this.globalTheme = theme;}
  setGlobalBackground(backgroundObj) {this.globalBackground = backgroundObj;}
  
  /**
   * @param {Function} templateFn – templateFn(globalTheme, data) => items[]
   * @param {number}   endTime    – absolute end time in seconds
   * @param {object}   data       – optional data object passed to the template
   */
  add(templateFn, endTime, data = {}) {
    // debugger;
    ////////////////////////////////////////////////
    if (this.globalTheme == null || this.globalBackground == null) throw new Error("please add globalTheme and globalBackground");
    ////////////////////////////////////////////////
    
    const startTime = this.currentStartTime;
    const duration = endTime - startTime;

    if (endTime <= startTime) {
      throw new Error(`Slide endTime (${endTime}) must be after previous slide endTime (${startTime})`);
    }
    if (duration < 2) {
      throw new Error(`Slide duration must be at least 2 seconds (got ${duration})`);
    }

    let items = templateFn(this.globalTheme, data) || [];
    items = this.preprocess(items, data, { templateFn }) || [];

    // Here it gets this.globalBackground
    const background = structuredClone(this.globalBackground) || {};

    const slide = {
      background,
      items,
      startTime,
      endTime,
    };

    this.postValidate(slide, data, { templateFn });

    this.slides.push(slide);
    this.currentStartTime = endTime;
  }
  overrideLastSlideBackground({
    backgroundColor = null,
    backgroundImage = null,
    backgroundImageOpacity = null,
    pattern = null
  } = {}) {
    if (!this.slides.length) {
      throw new Error("No slide exists to override background");
    }
  
    const bg = this.slides[this.slides.length - 1].background;
  
    if (backgroundColor !== null) {
      bg.backgroundColor = backgroundColor;
    }
  
    if (backgroundImage !== null) {
      bg.backgroundImage = backgroundImage;
    }
  
    if (backgroundImageOpacity !== null) {
      bg.backgroundImageOpacity = backgroundImageOpacity;
    }
  
    if (pattern !== null) {
      if (typeof pattern !== "object" || typeof pattern.type !== "string") {
        throw new Error("Invalid pattern: must be an object with at least a `type` field");
      }
      bg.pattern = {
        type: pattern.type,
        props: pattern.props ?? {}
      };
    }
  }
  
    
  build() {
    const totalDuration = this.slides.length
      ? Math.max(...this.slides.map(s => s.endTime))
      : 0;

    return {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      totalDuration,
      slidesData: this.slides,
    };
  }
}
