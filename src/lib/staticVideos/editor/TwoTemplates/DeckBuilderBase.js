
import { cloneBackground } from './backgroundUtils.js';
import { fullComponents }  from './components/fullComponents/index.js';
import { headerComponents }  from './components/headerComponents/index.js';
import { halfComponents }  from './components/halfComponents/index.js';

export class DeckBuilderBase {
  constructor() {
    this.slides               = [];
    this.currentStart         = 0;
    this.designWidth          = 1020;
    this.designHeight         = 576;
    this.globalTheme          = null;
    this.globalBackground     = null;
    this.minDuration          = 2;
    this.currentHeader        = null;    // active header config
    this.currentHeaderOffset  = 0;       // vertical space reserved for header
  }

  setGlobalBackgroundImage(backgroundImage,backgroundImageOpacity=1.0){
    this.globalBackground.backgroundImage = backgroundImage;
    this.globalBackground.backgroundImageOpacity = backgroundImageOpacity;
  }
  setDesignWidth(w) {
    this.designWidth = w;
  }

  setDesignHeight(h) {
    this.designHeight = h;
  }

  setGlobalTheme(theme) {
    this.globalTheme = theme;
  }

  setGlobalBackground(bg) {
    this.globalBackground = bg;
  }

  /**
   * Queue a header component for all subsequent slides.
   *
   * @param {string} templateKey
   * @param {any[]}  data
   * @param {object} config        – may include headerHeight
   */
  addHeader(templateKey, data = [], config = {}) {
    this.currentHeader       = { templateKey, data, config };
    // reserve vertical space according to config.headerHeight (default 0)
    this.currentHeaderOffset = config.headerHeight || 0;
  }

  /**
   * Remove any queued header so future slides have none.
   */
  clearHeader() {
    this.currentHeader       = null;
    this.currentHeaderOffset = 0;
  }

  /**
   * Internal: returns the current reserved header height.
   */
  getHeaderHeight() {
    return this.currentHeaderOffset;
  }

 /**
   * Add a full-width slide.
   *
   * @param {number} endTime
   * @param {string} templateKey
   * @param {any[]}  data
   * @param {object} config – only xOffset & yOffset will be passed on
   */
 full(endTime, templateKey, data = [], config = {}) {
  if (!this.globalTheme || !this.globalBackground) {
    throw new Error('DeckBuilder: theme or background not set');
  }

  const compFn = fullComponents[templateKey];
  if (typeof compFn !== 'function') {
    throw new Error(`Unknown template: ${templateKey}`);
  }

  // 1) Header items (if any)
  let allItems = [];
  if (this.currentHeader) {
    const { templateKey: hKey, data: hData, config: hCfg } = this.currentHeader;
    allItems.push(...headerComponents[hKey](this.globalTheme, hData, hCfg));
  }

  // 2) Body items – pass only offsets plus whatever "data" the user wants
  const bodyConfig = {
    xOffset: 0,
    yOffset: this.getHeaderHeight(),
    ...config         // user-supplied props (e.g. src, text, showAt)
  };
  allItems.push(...compFn(this.globalTheme, data, bodyConfig));

  // 3) Timing
  const startTime = this.currentStart;
  const duration  = endTime - startTime;
  if (duration < this.minDuration) {
    throw new Error(`Minimum slide duration is ${this.minDuration}s`);
  }
  this.currentStart = endTime;

  // 4) Finalize slide
  const background = cloneBackground(this.globalBackground);
  this.slides.push({ background, items: allItems, startTime, endTime });
}


/**
 * Add a side-by-side (half/half) slide.
 *
 * @param {number} endTime
 * @param {string} leftKey
 * @param {any[]}  leftData
 * @param {object} leftConfig
 * @param {string} rightKey
 * @param {any[]}  rightData
 * @param {object} rightConfig
 */
 half(
  endTime,
  leftKey,   leftData   = [], leftConfig   = {},
  rightKey,  rightData  = [], rightConfig  = {}
 ) {
  if (!this.globalTheme || !this.globalBackground) {
    throw new Error('DeckBuilder: theme or background not set');
  }

  // 1) Header items (if any)
  let allItems = [];
  if (this.currentHeader) {
    const { templateKey: hKey, data: hData, config: hCfg } = this.currentHeader;
    allItems.push(...headerComponents[hKey](this.globalTheme, hData, hCfg));
  }

  // 2) Compute half-width and header offset
  const halfWidth = this.designWidth / 2;
  const yOffset   = this.getHeaderHeight();

  // 3) Left pane (no presets here, just offsets + user data)
  const leftCfg = {
    xOffset: 0,
    yOffset,
    ...leftConfig
  };
  const leftFn = halfComponents[leftKey];
  if (typeof leftFn !== 'function') {
    throw new Error(`Unknown half template: ${leftKey}`);
  }
  allItems.push(...leftFn(this.globalTheme, leftData, leftCfg));

  // 4) Right pane
  const rightCfg = {
    xOffset: halfWidth,
    yOffset,
    ...rightConfig
  };
  const rightFn = halfComponents[rightKey];
  if (typeof rightFn !== 'function') {
    throw new Error(`Unknown half template: ${rightKey}`);
  }
  allItems.push(...rightFn(this.globalTheme, rightData, rightCfg));

  // 5) Timing
  const startTime = this.currentStart;
  const duration  = endTime - startTime;
  if (duration < this.minDuration) {
    throw new Error(`Minimum slide duration is ${this.minDuration}s`);
  }
  this.currentStart = endTime;

  // 6) Finalize slide
  const background = cloneBackground(this.globalBackground);
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
      designWidth:  this.designWidth,
      designHeight: this.designHeight,
      totalDuration,
      slidesData:   this.slides
    };
  }
}
