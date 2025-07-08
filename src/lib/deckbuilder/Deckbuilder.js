// Unified DeckBuilder.js

export default class DeckBuilder {
    constructor() {
      this.slidesArray = [];
      this.currentTime = 0;
  
      // Declarative slide registry
      this.s = Object.fromEntries(
        [
          "titleSlide",
          "titleAndSubtitle",
          "bulletList",
          "twoColumnText",
          "imageSlide",
          "imageWithTitle",
          "imageWithCaption",
          "imageLeftBulletsRight",
          "imageRightBulletsLeft",
          "table",
          "statistic",
          "donutChart",
          "bigNumber",
          "barChart",
          "quoteSlide",
          "quoteWithImage",
          "cornerWordsSlide",
          "contactSlide",
          "fillImage"
        ].map((type) => [
          type,
          (end, data) => this._add(type, end, data)
        ])
      );
    }
  

  setTheme(themeName) {
    this.theme = themeName;
  }

  setBackground(background) {
    this.background = background;
  }

  eq(end) {
    const start = this.currentTime;
    if (end <= start) {
      throw new Error(`Invalid slide timing: end (${end}) must be greater than start (${start})`);
    }
    this.currentTime = end;

    const slide = {
      type: "eq",
      start,
      end,
      data: []
    };
    this.slidesArray.push(slide);

    return {
      addLine({ type, content, showAt }) {
        slide.data.push({
          name: "line",
          type,
          content,
          showAt,
          spItems: []
        });
      },
      addSp({ type, content }) {
        if (slide.data.length === 0) {
          throw new Error("Call addLine() before addSp()");
        }
        slide.data[slide.data.length - 1].spItems.push({ type, content });
      }
    };
  }
  
    _add(type, end, data) {
      const start = this.currentTime;
      if (end <= start) {
        throw new Error(`Invalid slide timing: end (${end}) must be greater than start (${start})`);
      }
      this.currentTime = end;
  
      const patchedData = data.map((item) =>
        item.showAt === undefined ? { ...item, showAt: 0 } : item
      );
  
      this.slidesArray.push({ type, start, end, data: patchedData });
    }
  
    build() {
      return {
        version: "deck-v1",
        slides: this.slidesArray
      };
    }
  }
  