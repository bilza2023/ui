// newDeckBuilder.js

import { cloneBackground } from './backgroundUtils.js';
import { applyTheme }    from './themeUtils.js';
import {fullComponents} from "./fullComponents.js"


  export class DeckBuilder {
    constructor() {
      this.slides = [];
      this.currentStart = 0;
      this.globalTheme = null;
      this.globalBackground = null;
      this.minDuration = 2;
    }
  
    setGlobalTheme(theme) {
      this.globalTheme = theme;
    }
  
    setGlobalBackground(bg) {
      this.globalBackground = bg;
    }
    overrideLastBg(override = {}) {
      if (this.slides.length === 0) {
        throw new Error('DeckBuilder: no slides to override');
      }
      const last = this.slides[this.slides.length - 1];
      last.background = cloneBackground(this.globalBackground, override);
    }
  //////////////////////////
  full(endTime, templateKey, data = [], config = {}) {
    if (!this.globalTheme || !this.globalBackground) {
      throw new Error('DeckBuilder: theme or background not set');
    }

    const compFn = fullComponents[templateKey];
    if (typeof compFn !== 'function') {
      throw new Error(`Unknown template: ${templateKey}`);
    }

    // Generate and theme items
    const themed = compFn(this.globalTheme, data, config) || [];

    // Allocate timing
    const startTime = this.currentStart;
    const duration  = endTime - startTime;
    if (duration < this.minDuration) {
      throw new Error(`Minimum slide duration is ${this.minDuration}s`);
    }
    this.currentStart = endTime;

    // Always use the global background here
    const background = cloneBackground(this.globalBackground);

    // Store slide
    this.slides.push({ background, items: themed, startTime, endTime });
  }
  
    /**
     * Build final presentation object
     */
    build() {
      const totalDuration = this.slides.length
        ? Math.max(...this.slides.map(s => s.endTime))
        : 0;
      return {
        designWidth: 1020,
        designHeight: 576,
        totalDuration,
        slidesData: this.slides,
      };
    }
  }