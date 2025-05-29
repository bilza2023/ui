import { c as create_ssr_component, d as add_attribute } from './ssr-BVZaZd41.js';
import 'pixi.js';
import 'howler';

function cloneBackground(baseBackground, override = {}) {
  const cloned = typeof structuredClone === "function" ? structuredClone(baseBackground) : JSON.parse(JSON.stringify(baseBackground));
  return { ...cloned, ...override };
}
function fadeIn$1(delay = 0, dur = 1) {
  return {
    field: "alpha",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: { from: 0, to: 1, primitive: "easeOut" }
  };
}
function fadeOut$1(delay = 0, dur = 1) {
  return {
    field: "alpha",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: { from: 1, to: 0, primitive: "easeIn" }
  };
}
function slideUp(delay = 0, dur = 1, fromY = null, toY = null, easing = "easeOut") {
  return {
    field: "y",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: {
      from: fromY,
      to: toY,
      primitive: easing
    }
  };
}
function scaleUp(delay = 0, dur = 1, from = 0.5, to = 1, easing = "easeOut") {
  return {
    field: "scale",
    fn: "tween",
    start: delay,
    end: delay + dur,
    props: { from, to, primitive: easing }
  };
}
const Anim = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fadeIn: fadeIn$1,
  fadeOut: fadeOut$1,
  scaleUp,
  slideUp
}, Symbol.toStringTag, { value: "Module" }));
const AnimApi = {
  /**
   * Queue a generic tween on the item.
   * @param {object} item      - The item to animate (will get an `animations` array)
   * @param {string} field     - The numeric field name to tween (e.g., "x", "alpha")
   * @param {number} from      - Starting value
   * @param {number} to        - Ending value
   * @param {number} start     - Time (s) to begin
   * @param {number} end       - Time (s) to end
   * @param {string} easing    - Easing name or enum (e.g., "linear", "easeOut")
   */
  animate(item, field, from, to, start, end, easing = "linear") {
    item.animations = item.animations || [];
    item.animations.push({
      type: "tween",
      field,
      from,
      to,
      start,
      end,
      easing
    });
  },
  /**
   * Queue an instantaneous set at a specific time.
   * @param {object} item      - The item to modify
   * @param {string} field     - The field to set
   * @param {number} value     - Value to assign
   * @param {number} at        - Time (s) when to apply
   */
  set(item, field, value, at) {
    item.animations = item.animations || [];
    item.animations.push({
      type: "set",
      field,
      value,
      time: at
    });
  }
};
function text(globalTheme, data = {}) {
  const {
    text: text2 = "Default Text",
    x = 100,
    y = 100,
    width = 800,
    height = 100,
    fontSize = 48,
    fontFamily = globalTheme.fontFamilyBase || "Arial",
    color = globalTheme.baseTextColor || "#000000",
    textAlign = "left",
    padding = 10,
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "text",
    text: text2,
    x,
    y,
    width,
    height,
    fontSize,
    fontFamily,
    color,
    textAlign,
    padding,
    rotation,
    visible,
    zIndex
  };
}
function icon(globalTheme, data = {}) {
  const {
    iconName = "STAR",
    x = 100,
    y = 100,
    width = 100,
    color = globalTheme.primaryColor || "#ffaa00",
    fontFamily = globalTheme.fontFamilyBase || "Arial",
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "icon",
    iconName,
    x,
    y,
    width,
    color,
    fontFamily,
    rotation,
    visible,
    zIndex
  };
}
function image(globalTheme, data = {}) {
  const {
    src = "book",
    x = 100,
    y = 100,
    width = 400,
    height = 300,
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "image",
    src,
    x,
    y,
    width,
    height,
    rotation,
    visible,
    zIndex
  };
}
function richText(globalTheme, data = {}) {
  const {
    text: text2 = "Multi-line rich text",
    x = 100,
    y = 100,
    width = 800,
    height = 200,
    fontSize = 48,
    fontFamily = globalTheme.fontFamilyBase || "Georgia",
    color = globalTheme.baseTextColor || "#000000",
    textAlign = "left",
    lineHeight = 1.4,
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "richText",
    text: text2,
    x,
    y,
    width,
    height,
    fontSize,
    fontFamily,
    color,
    textAlign,
    lineHeight,
    rotation,
    visible,
    zIndex
  };
}
function circle(globalTheme, data = {}) {
  const {
    x = 100,
    y = 100,
    radius = 50,
    color = globalTheme.primaryColor || "#ff6666",
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "circle",
    x,
    y,
    radius,
    color,
    rotation,
    visible,
    zIndex
  };
}
function rect(globalTheme, data = {}) {
  const {
    x = 100,
    y = 100,
    width = 200,
    height = 100,
    color = globalTheme.primaryColor || "#00ccff",
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "rect",
    x,
    y,
    width,
    height,
    color,
    rotation,
    visible,
    zIndex
  };
}
function triangle(globalTheme, data = {}) {
  const {
    x = 100,
    y = 100,
    size = 100,
    color = globalTheme.primaryColor || "#66ff66",
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "triangle",
    x,
    y,
    size,
    color,
    rotation,
    visible,
    zIndex
  };
}
function fadeIn(item, start = 0, duration = 1) {
  AnimApi.set(item, "alpha", 0, start);
  AnimApi.animate(item, "alpha", 0, 1, start, start + duration, "linear");
}
function fadeOut(item, start = 0, duration = 1) {
  const initial = item.alpha ?? 1;
  AnimApi.animate(item, "alpha", initial, 0, start, start + duration, "linear");
}
function focus(items, focusItem, dimAlpha = 0.3, start = 0, duration = 1, restoreStart = start + duration + 0.5, restoreDuration = 1) {
  items.forEach((item) => {
    const initial = item.alpha ?? 1;
    const targetAlpha = item === focusItem ? 1 : dimAlpha;
    AnimApi.animate(item, "alpha", initial, targetAlpha, start, start + duration, "linear");
    AnimApi.animate(item, "alpha", targetAlpha, 1, restoreStart, restoreStart + restoreDuration, "linear");
  });
}
function shake(item, start = 0, duration = 0.5, magnitude = 10, freq = 20) {
  const steps = Math.ceil(duration * freq);
  const stepDuration = duration / steps;
  const originalX = item.x;
  for (let i = 0; i <= steps; i++) {
    const t0 = start + i * stepDuration;
    const t1 = t0 + stepDuration;
    const dir = i % 2 === 0 ? 1 : -1;
    AnimApi.animate(item, "x", originalX, originalX + dir * magnitude, t0, t1, "linear");
  }
}
const AniHelpers = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  fadeIn,
  fadeOut,
  focus,
  shake
}, Symbol.toStringTag, { value: "Module" }));
function toPixiColor(input = "#000000") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.startsWith("#")) {
      return parseInt(input.replace("#", ""), 16);
    }
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = input;
    return parseInt(ctx.fillStyle.slice(1), 16);
  }
  return 0;
}
const textPresets = {
  heading: {
    fontSize: 64,
    fontFamily: "Georgia",
    textAlign: "center",
    padding: 20
  },
  bullet: {
    fontSize: 15,
    fontFamily: "Arial",
    textAlign: "left",
    padding: 10
  },
  quote: {
    fontSize: 48,
    fontFamily: "Times",
    textAlign: "center",
    padding: 30
  },
  caption: {
    fontSize: 32,
    fontFamily: "Verdana",
    textAlign: "right",
    padding: 8
  },
  banner: {
    fontSize: 72,
    fontFamily: "Impact",
    textAlign: "center",
    padding: 25
  }
};
const iconPresets = {
  bigCenter: {
    x: 510,
    // center of 1020 width
    y: 200,
    width: 300,
    color: "#ffaa00"
  },
  cornerStamp: {
    x: 900,
    y: 500,
    width: 100,
    color: "#ff33aa"
  },
  softBgAura: {
    x: 400,
    y: 300,
    width: 600,
    color: "#ffffff",
    alpha: 0.1,
    zIndex: 0
  },
  emojiBadge: {
    x: 60,
    y: 60,
    width: 80,
    color: "#faff00"
  }
};
const imagePresets = {
  fullWidth: {
    x: 0,
    y: 100,
    width: 1020,
    height: 400
  },
  floatLeft: {
    x: 50,
    y: 200,
    width: 300,
    height: 250
  },
  floatRight: {
    x: 670,
    y: 200,
    width: 300,
    height: 250
  },
  posterFrame: {
    x: 160,
    y: 60,
    width: 700,
    height: 500,
    rotation: 0.01
  },
  smallIcon: {
    x: 900,
    y: 50,
    width: 100,
    height: 100
  },
  withTopAndSideMargin: {
    x: 40,
    // leave 40px left margin
    y: 120,
    // leave 120px top space (e.g. for heading)
    width: 940,
    // 1020 - 2*40 side borders
    height: 400
    // leaves ~56px at bottom (576 - 120 - 400)
  }
};
const richTextPresets = {
  paragraph: {
    fontSize: 36,
    fontFamily: "Georgia",
    textAlign: "left",
    lineHeight: 1.6,
    width: 820,
    x: 100,
    y: 160
  },
  centeredBlock: {
    fontSize: 40,
    fontFamily: "Times",
    textAlign: "center",
    lineHeight: 1.5,
    width: 800,
    x: 110,
    y: 180
  },
  smallNote: {
    fontSize: 28,
    fontFamily: "Verdana",
    textAlign: "left",
    lineHeight: 1.3,
    width: 820,
    x: 100,
    y: 480
  }
};
const layout = {
  // Header occupies top of slide
  headerZone: { y: 0, height: 120 },
  // Body zone starts just below header
  bodyZone: {
    y: 120,
    height: 576 - 120
    // designHeight(576) minus header height
  },
  /**
   * Computes the y-coordinate within bodyZone for given alignment.
   * @param {'top'|'center'|'bottom'} alignment
   * @param {number} contentHeight
   * @returns {number} y position
   */
  getBodyY(alignment, contentHeight) {
    const { y, height } = this.bodyZone;
    switch (alignment) {
      case "center":
        return y + (height - contentHeight) / 2;
      case "bottom":
        return y + height - contentHeight;
      default:
        return y;
    }
  }
};
const designWidth = 1020;
const designHeight = 576;
const stylePresets = {
  text: textPresets,
  icon: iconPresets,
  image: imagePresets,
  richText: richTextPresets
};
function applyPreset(preset, data = {}) {
  return { ...preset, ...data };
}
const TemplateToolkit = {
  Anim,
  // optional, low-level tween helpers
  layout,
  designWidth,
  designHeight,
  ItemBuilders: {
    text,
    icon,
    image,
    richText,
    circle,
    rect,
    triangle
  },
  stylePresets,
  AnimApi,
  applyPreset,
  AniHelpers,
  toPixiColor
};
function quoteComponent(globalTheme, data = [], config = {}) {
  const {
    author,
    fontSize = 48,
    lineHeight: lineMul = 1.4,
    startY = 140,
    xOffset = 0,
    yOffset = 0
  } = config;
  const items = [];
  const lineHeight = fontSize * lineMul;
  data.forEach((entry, i) => {
    const { text: text2, showAt } = entry;
    const lineItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.quote, {
        text: text2,
        x: xOffset + 100,
        y: yOffset + startY + i * lineHeight,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(lineItem, showAt, 0.5);
    items.push(lineItem);
  });
  if (author?.text) {
    const { text: text2, showAt } = author;
    const authorItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.caption, {
        text: text2,
        x: xOffset + 100,
        y: yOffset + startY + data.length * lineHeight + 30,
        width: 820,
        textAlign: "right",
        fontSize: 28
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(authorItem, showAt, 0.5);
    items.push(authorItem);
  }
  return items;
}
function bullets$1(theme2, data = [], config = {}) {
  const {
    fontSize = 32,
    lineGap = fontSize * 1.4,
    fontFamily = "Arial",
    color = "#000",
    containerWidth = 820,
    textAlign = "center",
    alignment = "top",
    gapFromTop = 40,
    xOffset = 0,
    yOffset = 0,
    padding = 10
  } = config;
  const contentHeight = data.length * lineGap;
  let baseY = TemplateToolkit.layout.getBodyY(alignment, contentHeight);
  if (alignment === "top")
    baseY += gapFromTop;
  const slideWidth = TemplateToolkit.designWidth;
  const baseX = xOffset + (slideWidth - containerWidth) / 2 + padding;
  const items = [];
  data.forEach((entry, i) => {
    const { text: text2, showAt } = entry;
    const yPos = baseY + i * lineGap + yOffset;
    const bulletItem = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: baseX,
      y: yPos,
      fontSize,
      fontFamily,
      lineHeight: lineGap,
      textAlign
    });
    TemplateToolkit.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });
  return items;
}
function imageComponent(theme2, data = [], config = {}) {
  const {
    src,
    showAt = 0,
    xOffset = 0,
    yOffset = 0
  } = config;
  const asset = theme2.assets?.[src] || {};
  const finalH = asset.height;
  const yPos = TemplateToolkit.layout.getBodyY("top", finalH);
  const imageItem = TemplateToolkit.ItemBuilders.image(theme2, {
    src,
    width: TemplateToolkit.designWidth - 20,
    height: 400,
    x: 0 + 10,
    // 10 is padding
    y: yPos,
    showAt
  });
  TemplateToolkit.AniHelpers.fadeIn(imageItem, showAt, 1);
  return [imageItem];
}
function leftHeaderRich(theme2, data = [], config = {}) {
  const {
    text: text2 = data[0]?.text || "Header",
    showAt = data[0]?.showAt || 0,
    x = 60,
    y = 40,
    width = 700,
    fontSize = 36,
    color = theme2.baseTextColor || "#333",
    fontFamily = theme2.fontFamilyBase || "Georgia",
    lineHeight = 1.2,
    rotation = 0
  } = { ...config, ...data[0] };
  const item = richText(theme2, {
    text: text2,
    x,
    y,
    width,
    height: null,
    // allow auto height
    fontSize,
    fontFamily,
    color,
    textAlign: "left",
    lineHeight,
    rotation,
    visible: true,
    zIndex: 1
  });
  TemplateToolkit.AniHelpers.fadeIn(item, showAt, 0.5);
  return [item];
}
function bullets(theme2, data = [], config = {}) {
  const {
    fontSize = 32,
    lineGap = fontSize * 1.4,
    fontFamily = "Arial",
    color = "#000",
    containerWidth = 820,
    textAlign = "center",
    alignment = "top",
    gapFromTop = 40,
    xOffset = 0,
    yOffset = 0,
    padding = 10
  } = config;
  const contentHeight = data.length * lineGap;
  let baseY = TemplateToolkit.layout.getBodyY(alignment, contentHeight);
  if (alignment === "top")
    baseY += gapFromTop;
  const slideWidth = TemplateToolkit.designWidth;
  const baseX = xOffset + (slideWidth - containerWidth) / 2 + padding;
  const items = [];
  data.forEach((entry, i) => {
    const { text: text2, showAt, color: entryColor } = entry;
    const yPos = baseY + i * lineGap + yOffset;
    const bulletItem = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: baseX,
      y: yPos,
      fontSize,
      fontFamily,
      lineHeight: lineGap,
      textAlign,
      color: TemplateToolkit.toPixiColor(entryColor || color)
    });
    TemplateToolkit.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });
  return items;
}
const fullComponents = {
  quote: quoteComponent,
  bullets: bullets$1,
  image: imageComponent,
  leftHeaderRich,
  barchart: bullets
};
function header(theme2, data = [], config = {}) {
  const {
    fontSize = 64,
    y = 40,
    stylePresetKey = "text.heading"
  } = config;
  const items = [];
  if (data[0]?.text) {
    const { text: text2, showAt = 0 } = data[0];
    const item = TemplateToolkit.ItemBuilders.text(
      theme2,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets[stylePresetKey], {
        text: text2,
        x: 100,
        y,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(item, showAt, 0.5);
    items.push(item);
  }
  return items;
}
const headerComponents = {
  header,
  leftHeaderRich
};
function halfImage(theme2, data = {}, config = {}) {
  const {
    src,
    showAt = 0,
    // optional explicit width/height
    width: cfgWidth,
    height: cfgHeight,
    // offsets from DeckBuilder.half()
    xOffset = 0,
    yOffset = 0,
    // spacing inside the half-pane
    margin = 20,
    // any per-slide tweaks
    x = 0,
    y = 0
  } = config;
  const halfCanvas = TemplateToolkit.designWidth / 2;
  const finalWidth = cfgWidth != null ? cfgWidth : halfCanvas - margin * 2;
  const finalHeight = cfgHeight != null ? cfgHeight : void 0;
  const centerX = xOffset + (halfCanvas - finalWidth) / 2 + x;
  const finalY = TemplateToolkit.layout.getBodyY("top", y);
  const imageItem = TemplateToolkit.ItemBuilders.image(theme2, {
    src,
    width: finalWidth,
    height: finalHeight,
    x: centerX,
    y: finalY,
    showAt
  });
  TemplateToolkit.AniHelpers.fadeIn(imageItem, showAt, 1);
  return [imageItem];
}
function halfBullets(theme2, data = [], config = {}) {
  const {
    // horizontal & vertical offsets from DeckBuilder.half()
    xOffset = 0,
    yOffset = 0,
    // style choices
    stylePresetKey = "bullet",
    fontSize = 32,
    lineGap = 80,
    leftMargin = 40,
    gapFromTop = 60
  } = config;
  const baseX = xOffset + (config.x != null ? config.x : leftMargin);
  const contentHeight = data.length * lineGap;
  let baseY = TemplateToolkit.layout.getBodyY("top", contentHeight);
  baseY += gapFromTop;
  baseY += yOffset;
  return data.map(({ text: text2, showAt }, i) => {
    const preset = TemplateToolkit.stylePresets.text[stylePresetKey] || TemplateToolkit.stylePresets.text.bullet;
    const bulletItem = TemplateToolkit.ItemBuilders.text(
      theme2,
      TemplateToolkit.applyPreset(preset, {
        text: text2,
        x: baseX,
        y: baseY + i * lineGap,
        fontSize
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    return bulletItem;
  });
}
const halfComponents = {
  bullets: halfBullets,
  image: halfImage
};
class DeckBuilder {
  constructor() {
    this.slides = [];
    this.currentStart = 0;
    this.designWidth = 1020;
    this.designHeight = 576;
    this.globalTheme = null;
    this.globalBackground = null;
    this.minDuration = 2;
    this.currentHeader = null;
    this.currentHeaderOffset = 0;
  }
  setDesignWidth(w) {
    this.designWidth = w;
  }
  setDesignHeight(h) {
    this.designHeight = h;
  }
  setGlobalTheme(theme2) {
    this.globalTheme = theme2;
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
    this.currentHeader = { templateKey, data, config };
    this.currentHeaderOffset = config.headerHeight || 0;
  }
  /**
   * Remove any queued header so future slides have none.
   */
  clearHeader() {
    this.currentHeader = null;
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
      throw new Error("DeckBuilder: theme or background not set");
    }
    const compFn = fullComponents[templateKey];
    if (typeof compFn !== "function") {
      throw new Error(`Unknown template: ${templateKey}`);
    }
    let allItems = [];
    if (this.currentHeader) {
      const { templateKey: hKey, data: hData, config: hCfg } = this.currentHeader;
      allItems.push(...headerComponents[hKey](this.globalTheme, hData, hCfg));
    }
    const bodyConfig = {
      xOffset: 0,
      yOffset: this.getHeaderHeight(),
      ...config
      // user-supplied props (e.g. src, text, showAt)
    };
    allItems.push(...compFn(this.globalTheme, data, bodyConfig));
    const startTime = this.currentStart;
    const duration = endTime - startTime;
    if (duration < this.minDuration) {
      throw new Error(`Minimum slide duration is ${this.minDuration}s`);
    }
    this.currentStart = endTime;
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
  half(endTime, leftKey, leftData = [], leftConfig = {}, rightKey, rightData = [], rightConfig = {}) {
    if (!this.globalTheme || !this.globalBackground) {
      throw new Error("DeckBuilder: theme or background not set");
    }
    let allItems = [];
    if (this.currentHeader) {
      const { templateKey: hKey, data: hData, config: hCfg } = this.currentHeader;
      allItems.push(...headerComponents[hKey](this.globalTheme, hData, hCfg));
    }
    const halfWidth = this.designWidth / 2;
    const yOffset = this.getHeaderHeight();
    const leftCfg = {
      xOffset: 0,
      yOffset,
      ...leftConfig
    };
    const leftFn = halfComponents[leftKey];
    if (typeof leftFn !== "function") {
      throw new Error(`Unknown half template: ${leftKey}`);
    }
    allItems.push(...leftFn(this.globalTheme, leftData, leftCfg));
    const rightCfg = {
      xOffset: halfWidth,
      yOffset,
      ...rightConfig
    };
    const rightFn = halfComponents[rightKey];
    if (typeof rightFn !== "function") {
      throw new Error(`Unknown half template: ${rightKey}`);
    }
    allItems.push(...rightFn(this.globalTheme, rightData, rightCfg));
    const startTime = this.currentStart;
    const duration = endTime - startTime;
    if (duration < this.minDuration) {
      throw new Error(`Minimum slide duration is ${this.minDuration}s`);
    }
    this.currentStart = endTime;
    const background = cloneBackground(this.globalBackground);
    this.slides.push({ background, items: allItems, startTime, endTime });
  }
  /**
   * Build the final presentation object.
   */
  build() {
    const totalDuration = this.slides.length ? Math.max(...this.slides.map((s) => s.endTime)) : 0;
    return {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      totalDuration,
      slidesData: this.slides
    };
  }
}
const darkTheme = {
  "backgroundColor": "#1a1a1a",
  "baseTextColor": "#eeeeee",
  "headingColor": "#ffffff",
  "bulletColor": "#bbbbbb",
  "primaryColor": "#00ffaa",
  "secondaryColor": "#ffaa00",
  "borderColor": "#444444",
  "shadowColor": "rgba(0, 0, 0, 0.4)",
  "fontFamilyHeading": "Georgia",
  "fontFamilyBase": "Arial"
};
const highContrast = {
  "backgroundColor": "#ffffff",
  "baseTextColor": "#000000",
  "headingColor": "#000000",
  "bulletColor": "#222222",
  "primaryColor": "#ff0000",
  "secondaryColor": "#0000ff",
  "borderColor": "#000000",
  "shadowColor": "rgba(0, 0, 0, 0.1)",
  "fontFamilyHeading": "Arial Black",
  "fontFamilyBase": "Tahoma"
};
const pastel = {
  backgroundColor: "#fdf6f0",
  baseTextColor: "#3d3d3d",
  headingColor: "#d67291",
  bulletColor: "#7f8c8d",
  primaryColor: "#a29bfe",
  secondaryColor: "#fab1a0",
  borderColor: "#dcdde1",
  shadowColor: "rgba(100, 100, 100, 0.1)",
  fontFamilyHeading: "Comic Sans MS",
  fontFamilyBase: "Verdana"
};
const royalBlue = {
  backgroundColor: "#001f3f",
  baseTextColor: "#dfe6e9",
  headingColor: "#74b9ff",
  bulletColor: "#81ecec",
  primaryColor: "#00cec9",
  secondaryColor: "#0984e3",
  borderColor: "#003366",
  shadowColor: "rgba(0, 0, 50, 0.3)",
  fontFamilyHeading: "Palatino Linotype",
  fontFamilyBase: "Helvetica"
};
const neonDark = {
  backgroundColor: "#0a0a0a",
  baseTextColor: "#39ff14",
  headingColor: "#f81ce5",
  bulletColor: "#00ffff",
  primaryColor: "#ff0090",
  secondaryColor: "#00ffcc",
  borderColor: "#222222",
  shadowColor: "rgba(255, 255, 255, 0.1)",
  fontFamilyHeading: "Courier New",
  fontFamilyBase: "Lucida Console"
};
const GlobalThemes = {
  darkTheme,
  highContrast,
  pastel,
  royalBlue,
  neonDark
};
function getDefaultBackground(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor || "#000000",
    // fallback just in case
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: null
  };
}
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(getDefaultBackground(theme));
deck.full(5, "bullets", [
  { text: "Pakistan's education crisis is deep and persistent", showAt: 1 },
  { text: "A complex mix of funding, access, and policy failures", showAt: 3 }
], {
  x: 100,
  y: 120,
  lineGap: 80,
  stylePresetKey: "text.bulletLarge"
});
deck.addHeader("header", [{ text: "Chronic Underfunding" }]);
deck.full(10, "bullets", [
  { text: "Less than 2.5% of GDP spent on education", showAt: 6 },
  { text: "Poor infrastructure and resources", showAt: 7 },
  { text: "Limited teacher training and salaries", showAt: 8 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});
deck.addHeader("header", [{ text: "Access Disparity" }]);
deck.full(15, "bullets", [
  { text: "Urban vs Rural education gap", showAt: 11 },
  { text: "Gender-based access issues", showAt: 12 },
  { text: "Public, private, and madrassah divide", showAt: 13 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});
deck.addHeader("header", [{ text: "Outdated Curriculum" }]);
deck.half(
  22,
  "image",
  [],
  {
    src: "class",
    showAt: 16,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets",
  [
    { text: "Rote learning dominates", showAt: 17 },
    { text: "Outdated subject matter", showAt: 18 },
    { text: "No STEM or soft skills", showAt: 19 }
  ],
  { lineGap: 50, fontSize: 26 }
);
deck.addHeader("header", [{ text: "Governance Challenges" }]);
deck.full(27, "bullets", [
  { text: "Frequent policy changes", showAt: 23 },
  { text: "Curriculum politicization", showAt: 24 },
  { text: "Corruption and inefficiency", showAt: 25 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});
deck.addHeader("header", [{ text: "The Dropout Problem" }]);
deck.half(
  32,
  "image",
  [],
  {
    src: "drops",
    showAt: 28,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets",
  [
    { text: "Kids leave school early", showAt: 29 },
    { text: "Driven by poverty, poor quality", showAt: 30 },
    { text: "Girls in villages worst hit", showAt: 31 }
  ],
  { lineGap: 50, fontSize: 26 }
);
deck.addHeader("header", [{ text: "The Way Forward" }]);
deck.full(37, "bullets", [
  { text: "Increase education budget", showAt: 33 },
  { text: "Support teacher development", showAt: 34 },
  { text: "Modernize curriculum", showAt: 35 },
  { text: "Ensure equity across regions and genders", showAt: 36 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});
deck.addHeader("header", [{ text: "Final Thoughts" }]);
deck.full(42, "quote", [
  { text: "A nation is not built by bricks,", showAt: 38 },
  { text: "but by the education of its youth.", showAt: 39 },
  { text: "Let us invest in minds,", showAt: 40 },
  { text: "to secure a brighter future.", showAt: 41 }
]);
deck.build();
const css = {
  code: ".stage.svelte-5sxdsi{display:flex;justify-content:center;align-items:start;height:100vh;background-color:#3b3a3a}body{margin:0}.stage.svelte-5sxdsi{margin-top:0;padding-top:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const prerender = true;
  let container;
  if ($$props.prerender === void 0 && $$bindings.prerender && prerender !== void 0)
    $$bindings.prerender(prerender);
  $$result.css.add(css);
  return `${``} <div class="stage svelte-5sxdsi"${add_attribute("this", container, 0)}></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CKlyisaK.js.map
