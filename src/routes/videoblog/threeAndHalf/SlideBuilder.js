import toPixiColor from "./slideTemplates/util/toPixiColor.js";

export default class SlideBuilder {
  constructor(globalTheme) {
    this.template = null;
    this.data = {};
    this.config = {};
    this.globalTheme = globalTheme;
    this.background = {};
    this.backgroundColor = null;
    this.startTime = 0;
    this.endTime = 5;
  }

  setTemplate(templateFn) {
    this.template = templateFn;
    return this;
  }

  setData(data = {}) {
    this.data = data;
    return this;
  }

  setConfig(config = {}) {
    this.config = config;
    return this;
  }

  setBackground(background = {}) {
    this.background = background;
    return this;
  }

  setBackgroundColor(color) {
    if (typeof color === "string" && color.startsWith("#")) {
      this.backgroundColor = parseInt(color.slice(1), 16);
    } else if (typeof color === "number") {
      this.backgroundColor = color;
    } else {
      throw new Error("Invalid backgroundColor. Use hex number or '#rrggbb' string.");
    }
    return this;
  }

  setStartTime(t) {
    this.startTime = t;
    return this;
  }

  setEndTime(t) {
    this.endTime = t;
    return this;
  }

  build() {
    if (!this.template) {
      throw new Error("No template set. Use .setTemplate() before build().");
    }

    const slide = this.template(this.globalTheme, this.data, this.config, this.background);
    slide.startTime = this.startTime;
    slide.endTime = this.endTime;
    // debugger;
    slide.background = this.prepareBackground();

    return slide;
  }

  prepareBackground() {
    const bg = { ...this.background };

    if (bg.backgroundColor === undefined || bg.backgroundColor === null) {
      bg.backgroundColor =
        this.backgroundColor !== null
          ? this.backgroundColor
          : toPixiColor(this.globalTheme.backgroundColor);
    }

    return bg;
  }
}
