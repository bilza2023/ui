// newDeckBuilder.js

import { cloneBackground } from './backgroundUtils.js';
import {fullComponents} from "./fullComponents.js"


export class DeckBuilder {
  constructor() {
    this.slides               = [];
    this.currentStart         = 0;
    this.globalTheme          = null;
    this.globalBackground     = null;
    this.minDuration          = 2;
    this.currentHeader        = null;    // active header config
    this.currentHeaderOffset  = 0;       // pixels to shift body down
  }

  setGlobalTheme(theme) {
    this.globalTheme = theme;
  }

  setGlobalBackground(bg) {
    this.globalBackground = bg;
  }

  /**
   * Queue a header component for all subsequent slides.
   */
  addHeader(templateKey, data = [], config = {}) {
    this.currentHeader       = { templateKey, data, config };
    this.currentHeaderOffset = this.globalTheme.headerHeight || 0;
  }

  /**
   * Remove any queued header so future slides have none.
   */
  clearHeader() {
    this.currentHeader       = null;
    this.currentHeaderOffset = 0;
  }

  /**
   * Internal use only: returns the vertical offset due to header.
   */
  getHeaderHeight() {
    return this.currentHeaderOffset;
  }

  /**
   * Add a full-slide: (header items if any) + body + (footer items if any).
   *
   * @param {number}   endTime       – global timeline end time
   * @param {string}   templateKey   – key into fullComponents
   * @param {any[]}    data          – loopData for the body factory
   * @param {object}   config        – config (will receive xOffset & yOffset)
   */
  full(endTime, templateKey, data = [], config = {}) {
    if (!this.globalTheme || !this.globalBackground) {
      throw new Error('DeckBuilder: theme or background not set');
    }

    const compFn = fullComponents[templateKey];
    if (typeof compFn !== 'function') {
      throw new Error(`Unknown template: ${templateKey}`);
    }

    // 1) Header items, if any
    let allItems = [];
    if (this.currentHeader) {
      const { templateKey: hKey, data: hData, config: hCfg } = this.currentHeader;
      allItems.push(...fullComponents[hKey](this.globalTheme, hData, hCfg));
    }

    // 2) Body items, with injected offsets
    const bodyConfig = {
      ...config,
      xOffset: 0,
      yOffset: this.getHeaderHeight()
    };
    allItems.push(...compFn(this.globalTheme, data, bodyConfig));

    // 3) (footer items would go here, same pattern)

    // Allocate timing
    const startTime = this.currentStart;
    const duration  = endTime - startTime;
    if (duration < this.minDuration) {
      throw new Error(`Minimum slide duration is ${this.minDuration}s`);
    }
    this.currentStart = endTime;

    // Prepare background
    const background = cloneBackground(this.globalBackground);

    // Store slide
    this.slides.push({ background, items: allItems, startTime, endTime });
  }

  /**
   * Build the final presentation object.
   */
  build() {
    const totalDuration = this.slides.length
      ? Math.max(...this.slides.map(s => s.endTime))
      : 0;
    return {
      designWidth:  1020,
      designHeight: 576,
      totalDuration,
      slidesData:   this.slides
    };
  }
}
