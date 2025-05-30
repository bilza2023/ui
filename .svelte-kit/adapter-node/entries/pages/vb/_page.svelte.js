import { c as create_ssr_component, d as add_attribute } from "../../../chunks/ssr.js";
import "pixi.js";
import "howler";
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
function table$1(data = {}) {
  const {
    x = 100,
    y = 100,
    width = 800,
    height = 300,
    rows = [],
    // Array of { cells: [..], showAt: number }
    fontSize = 28,
    fontFamily = "Arial",
    cellPadding = 12,
    borderColor = "#000000",
    borderWidth = 2,
    textAlign = "center",
    rotation = 0,
    visible = true,
    zIndex = 1
  } = data;
  return {
    type: "table",
    x,
    y,
    width,
    height,
    rows,
    fontSize,
    fontFamily,
    cellPadding,
    borderColor,
    borderWidth,
    textAlign,
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
    triangle,
    table: table$1
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
function table(theme2, rows = [], config = {}) {
  const {
    fontSize = 28,
    fontFamily = "Arial",
    textAlign = "center",
    borderColor = "#000000",
    borderWidth = 2,
    cellPadding = 12,
    x = (TemplateToolkit.designWidth - 820) / 2,
    y = 100,
    width = 820,
    rowHeight = fontSize * 2.2,
    textColor = theme2.baseTextColor,
    drawBorders = false
  } = config;
  const normalized = rows.map((r) => Array.isArray(r) ? { cells: r, showAt: void 0 } : r);
  const items = [];
  const numCols = normalized[0]?.cells.length || 1;
  const cellWidth = width / numCols;
  normalized.forEach((row, rowIndex) => {
    const yPos = y + rowIndex * rowHeight;
    const showAt = row.showAt;
    row.cells.forEach((cellText, colIndex) => {
      const xPos = x + colIndex * cellWidth;
      if (drawBorders) {
        const rect2 = TemplateToolkit.ItemBuilders.rect(theme2, {
          x: xPos,
          y: yPos,
          width: cellWidth,
          height: rowHeight,
          color: borderColor,
          borderWidth
        });
        rect2.alpha = 1;
        items.push(rect2);
      }
      const cell = TemplateToolkit.ItemBuilders.text(theme2, {
        text: cellText,
        x: xPos + cellPadding,
        y: yPos + cellPadding,
        width: cellWidth - 2 * cellPadding,
        height: rowHeight - 2 * cellPadding,
        fontSize,
        fontFamily,
        textAlign,
        color: textColor.startsWith("#") ? textColor : `#${textColor}`
      });
      cell.alpha = 1;
      if (showAt !== void 0) {
        TemplateToolkit.AniHelpers.showAndStay(cell, showAt);
      }
      items.push(cell);
    });
  });
  return items;
}
const fullComponents = {
  quote: quoteComponent,
  bullets: bullets$1,
  image: imageComponent,
  barchart: bullets,
  table
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
function dotsBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    // or any hex
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "dots",
      props: {
        color: "#ffffff",
        // white dots
        opacity: 0.2,
        // subtle
        spacing: 30,
        // pixels between dots
        radius: 2
        // small circle
      }
    }
  };
}
function defaultBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor || "#000000",
    // fallback just in case
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: null
  };
}
function gridBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "grid",
      props: {
        color: "#ffffff",
        // line color
        opacity: 0.15,
        // subtle overlay
        spacing: 40,
        // distance between grid lines
        lineWidth: 1
        // thin lines
      }
    }
  };
}
function stripesBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "stripes",
      props: {
        color: "#ffffff",
        // stripe color
        opacity: 0.05,
        // very subtle
        thickness: 10,
        // height of stripe
        gap: 20
        // vertical gap between stripes
      }
    }
  };
}
function wavesBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "waves",
      props: {
        color: "#ffffff",
        // wave color
        opacity: 0.08,
        // soft appearance
        amplitude: 10,
        // wave height
        frequency: 0.05,
        // wave tightness
        thickness: 2,
        // line thickness
        gap: 50
        // vertical distance between waves
      }
    }
  };
}
function crosshatchBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "crosshatch",
      props: {
        color: "#ffffff",
        opacity: 0.1,
        spacing: 25,
        lineWidth: 1
      }
    }
  };
}
function bricksBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "bricks",
      props: {
        color: "#ffffff",
        opacity: 0.07,
        brickWidth: 60,
        brickHeight: 30,
        gap: 4
      }
    }
  };
}
function mosaicBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "mosaic",
      props: {
        color: "#ffffff",
        opacity: 0.06,
        minSize: 20,
        maxSize: 60,
        count: 100
      }
    }
  };
}
function hexagonsBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "hexagons",
      props: {
        color: "#ffffff",
        opacity: 0.07,
        radius: 30,
        gap: 4
      }
    }
  };
}
function tilesBg(globalTheme) {
  return {
    backgroundColor: globalTheme.backgroundColor,
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern: {
      type: "tiles",
      props: {
        color: "#ffffff",
        opacity: 0.05,
        size: 50,
        gap: 5,
        rotate: false
      }
    }
  };
}
const GlobalBackgrounds = {
  defaultBg,
  dotsBg,
  gridBg,
  stripesBg,
  wavesBg,
  crosshatchBg,
  bricksBg,
  tilesBg,
  hexagonsBg,
  mosaicBg
};
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.gridBg(theme));
deck.addHeader("header", [{ text: "Physics Concepts Intro" }]);
deck.full(6, "image", [], {
  src: "physicsClass",
  showAt: 0,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});
deck.addHeader("header", [{ text: "What is Force?" }]);
deck.full(14, "bullets", [
  { text: "A push or pull on an object", showAt: 7 },
  { text: "Can cause a change in motion", showAt: 8 },
  { text: "Measured in Newtons (N)", showAt: 9 },
  { text: "Vector quantity – has direction", showAt: 10 },
  { text: "F = m × a (Newton's Second Law)", showAt: 11 }
], {
  x: 120,
  y: 90,
  lineGap: 65,
  stylePresetKey: "text.bulletSmall"
});
deck.addHeader("header", [{ text: "What is Force" }]);
deck.full(20, "image", [], {
  src: "whatisforce",
  showAt: 15,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});
deck.addHeader("header", [{ text: "Examples of Forces" }]);
deck.half(
  30,
  "image",
  [],
  {
    src: "typesOfForce",
    showAt: 21,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets",
  [
    { text: "Friction opposes motion", showAt: 22 },
    { text: "Tension in ropes and cables", showAt: 23 },
    { text: "Gravity pulls objects down", showAt: 24 },
    { text: "Applied force by hand or tool", showAt: 25 }
  ],
  { lineGap: 58, fontSize: 30 }
);
deck.addHeader("header", [{ text: "Final Thoughts" }]);
deck.full(38, "quote", [
  { text: "The most incomprehensible thing", showAt: 32 },
  { text: "about the world", showAt: 33 },
  { text: "is that it is comprehensible.", showAt: 34 },
  { text: "— Albert Einstein", showAt: 35 }
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
export {
  Page as default
};
