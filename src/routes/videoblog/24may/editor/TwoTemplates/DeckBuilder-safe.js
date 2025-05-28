// newDeckBuilder.js

import { cloneBackground } from './backgroundUtils.js';
import {fullComponents} from "./fullComponents.js"
import half from "./half.js"

export class DeckBuilder {
  constructor() {
    this.slides               = [];
    this.currentStart         = 0;
    this.designWidth = 1020;
    this.designHeight = 576
    this.globalTheme          = null;
    this.globalBackground     = null;
    this.minDuration          = 2;
    this.currentHeader        = null;    // active header config
    this.currentHeaderOffset  = 0;       // pixels to shift body down
  }
  setDesignWidth(w) { this.designWidth = w; }
  setDesignHeight(h) { this.designHeight = h; }
  
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
   * Two‐column half‐width slide.
   *
   * @param {number}   endTime
   * @param {string}   leftKey
   * @param {any[]}    leftData
   * @param {object}   leftConfig
   * @param {string}   rightKey
   * @param {any[]}    rightData
   * @param {object}   rightConfig
   */
  half(
    endTime,
    leftKey,   leftData = [],  leftConfig = {},
    rightKey,  rightData = [], rightConfig = {}
  ) {
    if (!this.globalTheme || !this.globalBackground) {
      throw new Error('DeckBuilder: theme or background not set');
    }

    // 1) Header items, if any
    let allItems = [];
    if (this.currentHeader) {
      const { templateKey: hKey, data: hData, config: hCfg } = this.currentHeader;
      allItems.push(...fullComponents[hKey](this.globalTheme, hData, hCfg));
    }

    // 2) Compute half‐width & yOffset
    const halfWidth = this.globalTheme.designWidth / 2;
    const yOffset   = this.getHeaderHeight();

    // 3) Left column
    const leftCfg = { ...leftConfig,  xOffset: 0,          yOffset };
    allItems.push(...fullComponents[leftKey](this.globalTheme, leftData, leftCfg));

    // 4) Right column
    const rightCfg = { ...rightConfig, xOffset: halfWidth, yOffset };
    allItems.push(...fullComponents[rightKey](this.globalTheme, rightData, rightCfg));

    // 5) Timing & background
    const startTime = this.currentStart;
    const duration  = endTime - startTime;
    if (duration < this.minDuration) {
      throw new Error(`Minimum slide duration is ${this.minDuration}s`);
    }
    this.currentStart = endTime;

    const background = cloneBackground(this.globalBackground);
    this.slides.push({ background, items: allItems, startTime, endTime });
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
