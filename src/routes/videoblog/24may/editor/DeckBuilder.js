// lib/deckBuilder/DeckBuilder.js

/**
 * DeckBuilder – Coordinating builder for assembling a deck
 * Structure: Each slide is (items + metadata)
 * Timing is enforced strictly. Visual background is injected via slideSetter.
 */

export class DeckBuilder {
    constructor({
      globalTheme=defaultGlobalTheme,
      globalBackground = defaultGlobalBackground,
      designWidth = 1020,
      designHeight = 576,
      preprocess = null,
      postValidate = null,
      slideSetter = defaultSlideSetter,
    } = {}) {
      this.globalTheme = globalTheme;
      this.globalBackground = globalBackground;
      this.designWidth = designWidth;
      this.designHeight = designHeight;
      this.preprocess = typeof preprocess === "function" ? preprocess : (items => items);
      this.postValidate = typeof postValidate === "function" ? postValidate : (() => {});
      this.slideSetter = slideSetter;
  
      this.slides = [];
      this.currentStartTime = 0;
    }
  
    add(templateFn, endTime, data = {}, background = null) {
      validateTiming(this.currentStartTime, endTime);
  
      const startTime = this.currentStartTime;
      const rawItems = templateFn(this.globalTheme, data) || [];
      const items = this.preprocess(rawItems, data, { templateFn }) || [];
  
      const backgroundFinal = this.slideSetter(this.globalBackground, background);
  
      let slide = {
        background: backgroundFinal,
        items,
        startTime,
        endTime,
      };
  
      this.postValidate(slide, data, { templateFn });
      this.slides.push(slide);
      this.currentStartTime = endTime;
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
  
  // ------------------------
  // Supporting Functions
  // ------------------------
  
  function validateTiming(currentStart, endTime) {
    if (endTime <= currentStart) {
      throw new Error(`Slide endTime (${endTime}) must be after previous slide endTime (${currentStart})`);
    }
    if (endTime - currentStart < 2) {
      throw new Error(`Slide duration must be at least 2 seconds (got ${endTime - currentStart})`);
    }
  }
  
  export function defaultSlideSetter(globalBackground, overrideBackground) {
    return overrideBackground || globalBackground;
  }
  


const defaultGlobalBackground =   {
    backgroundColor: "#467ae2",
};
   
export const defaultGlobalTheme = {
    backgroundColor: "#f0f0f0",           // neutral light background
    baseTextColor: "#222222",             // readable dark gray
    headingColor: "#000000",              // solid black heading
    bulletColor: "#333333",               // slightly softer for bullets
    primaryColor: "#3366ff",              // blue accent
    secondaryColor: "#ff9900",            // orange accent
    borderColor: "#cccccc",               // light border
    shadowColor: "rgba(0, 0, 0, 0.2)",     // gentle shadow
    fontFamilyHeading: "Verdana",         // strong, wide headings
    fontFamilyBase: "Helvetica"           // neutral and modern body font
  };
  