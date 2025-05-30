import { c as create_ssr_component, d as add_attribute } from "../../../chunks/ssr.js";
import "pixi.js";
import "howler";
function cloneBackground(baseBackground, override = {}) {
  const cloned = typeof structuredClone === "function" ? structuredClone(baseBackground) : JSON.parse(JSON.stringify(baseBackground));
  return { ...cloned, ...override };
}
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
function arc(theme2, {
  x,
  y,
  radius,
  innerRadius = 0,
  startAngle,
  endAngle,
  color = theme2.primaryColor
}) {
  return {
    type: "arc",
    x,
    y,
    radius,
    innerRadius,
    startAngle,
    endAngle,
    color
  };
}
const ItemBuilders = {
  text,
  icon,
  image,
  richText,
  circle,
  rect,
  triangle,
  table: table$1,
  arc
};
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
const TemplateToolkit = {
  layout,
  designWidth,
  designHeight,
  ItemBuilders,
  AnimApi,
  toPixiColor
};
function quoteComponent(theme2, data = [], config = {}) {
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
    const y = yOffset + startY + i * lineHeight;
    const lineItem = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: xOffset + 100,
      y,
      width: 820,
      textAlign: "center",
      fontSize,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.baseTextColor
    });
    TemplateToolkit.AnimApi.animate(lineItem, "alpha", 0, 1, showAt, showAt + 0.5);
    items.push(lineItem);
  });
  if (author?.text) {
    const { text: text2, showAt } = author;
    const y = yOffset + startY + data.length * lineHeight + 30;
    const authorItem = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: xOffset + 100,
      y,
      width: 820,
      textAlign: "right",
      fontSize: 28,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.secondaryColor
    });
    TemplateToolkit.AnimApi.animate(authorItem, "alpha", 0, 1, showAt, showAt + 0.5);
    items.push(authorItem);
  }
  return items;
}
function bullets(theme2, data = [], config = {}) {
  const {
    fontSize = 32,
    lineGap = fontSize * 1.4,
    fontFamily = theme2.fontFamilyBase,
    color = theme2.baseTextColor,
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
  const baseX = xOffset + (TemplateToolkit.designWidth - containerWidth) / 2 + padding;
  return data.map((entry, i) => {
    const { text: text2, showAt } = entry;
    const y = baseY + i * lineGap + yOffset;
    const bulletItem = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: baseX,
      y,
      fontSize,
      fontFamily,
      lineHeight: lineGap,
      textAlign,
      color
    });
    TemplateToolkit.AnimApi.animate(bulletItem, "alpha", 0, 1, showAt, showAt + 0.5, "easeOut");
    return bulletItem;
  });
}
function imageComponent(theme2, data = [], config = {}) {
  const {
    src,
    showAt = 0,
    xOffset = 0,
    yOffset = 0
  } = config;
  const asset = theme2.assets?.[src] || {};
  const finalH = asset.height || 400;
  const yPos = TemplateToolkit.layout.getBodyY("top", finalH) + yOffset;
  const xPos = xOffset + 10;
  const width = TemplateToolkit.designWidth - 20;
  const imageItem = TemplateToolkit.ItemBuilders.image(theme2, {
    src,
    width,
    height: finalH,
    x: xPos,
    y: yPos
  });
  TemplateToolkit.AnimApi.animate(imageItem, "alpha", 0, 1, showAt, showAt + 1, "easeOut");
  return [imageItem];
}
function table(theme2, rows = [], config = {}) {
  const {
    fontSize = 28,
    fontFamily = "Arial",
    textAlign = "center",
    bgColor = theme2.secondaryColor,
    bgOpacity = 0.3,
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
    row.showAt;
    row.cells.forEach((cellText, colIndex) => {
      const xPos = x + colIndex * cellWidth;
      if (drawBorders) {
        const rect2 = TemplateToolkit.ItemBuilders.rect(theme2, {
          x: xPos,
          y: yPos,
          width: cellWidth,
          height: rowHeight,
          color: bgColor,
          borderWidth
        });
        rect2.alpha = bgOpacity;
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
      items.push(cell);
    });
  });
  return items;
}
function barchart(theme2, data = [], config = {}) {
  const {
    maxValue = Math.max(...data.map((d) => d.value), 1),
    height = 240,
    barPadding = 16,
    barColor = theme2.primaryColor || "#00ffaa",
    fontSize = 22,
    maxBarWidth = 28,
    labelFontSize = 20
  } = config;
  const numBars = data.length;
  const barWidth = Math.min(maxBarWidth, (TemplateToolkit.designWidth - (numBars + 1) * barPadding) / numBars);
  const totalWidth = numBars * barWidth + (numBars + 1) * barPadding;
  const xStart = (TemplateToolkit.designWidth - totalWidth) / 2;
  const yStart = TemplateToolkit.layout.getBodyY("center", height + fontSize + labelFontSize + 12);
  const items = [];
  data.forEach((entry, index) => {
    const { value, color, label = "", showAt = 0 } = entry;
    const barHeight = value / maxValue * height;
    const x = xStart + barPadding + index * (barWidth + barPadding);
    const barBottom = yStart + height;
    items.push(TemplateToolkit.ItemBuilders.rect(theme2, {
      x,
      y: barBottom - barHeight,
      width: barWidth,
      height: barHeight,
      color: TemplateToolkit.toPixiColor(color || barColor)
    }));
    items.push(TemplateToolkit.ItemBuilders.text(theme2, {
      text: `${entry.label}`,
      x,
      y: barBottom + labelFontSize + 6,
      width: barWidth,
      textAlign: "center",
      fontSize,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.baseTextColor
    }));
  });
  return items;
}
function pieChart(theme2, data = [], config = {}) {
  const left = [];
  const right = [];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = TemplateToolkit.designWidth / 4;
  const centerY = TemplateToolkit.layout.getBodyY("center", config.radius || 120);
  const radius = config.radius || 100;
  let startAngle = 0;
  data.forEach((entry) => {
    const { value, color } = entry;
    const sliceAngle = value / total * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;
    left.push(TemplateToolkit.ItemBuilders.arc(theme2, {
      x: centerX,
      y: centerY,
      radius,
      startAngle,
      endAngle,
      color: TemplateToolkit.toPixiColor(color || theme2.primaryColor)
    }));
    startAngle = endAngle;
  });
  const itemHeight = 36;
  const startY = centerY - data.length * itemHeight / 2;
  const legendX = TemplateToolkit.designWidth * 0.55;
  data.forEach((entry, i) => {
    const y = startY + i * itemHeight;
    const pct = (entry.value / total * 100).toFixed(1) + "%";
    right.push(TemplateToolkit.ItemBuilders.rect(theme2, {
      x: legendX,
      y,
      width: 24,
      height: 24,
      color: TemplateToolkit.toPixiColor(entry.color || theme2.primaryColor)
    }));
    right.push(TemplateToolkit.ItemBuilders.text(theme2, {
      text: entry.label || "Item",
      x: legendX + 34,
      y,
      fontSize: 22,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.baseTextColor
    }));
    right.push(TemplateToolkit.ItemBuilders.text(theme2, {
      text: pct,
      x: legendX + 180,
      y,
      width: 60,
      fontSize: 20,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.baseTextColor,
      textAlign: "right"
    }));
  });
  return [...left, ...right];
}
function donutChart(theme2, data = [], config = {}) {
  const left = [];
  const right = [];
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = TemplateToolkit.designWidth / 4;
  const centerY = TemplateToolkit.layout.getBodyY("center", config.outerRadius || 120);
  const outerRadius = config.outerRadius || 100;
  const innerRadius = config.innerRadius || 60;
  let startAngle = 0;
  data.forEach((entry) => {
    const { value, color } = entry;
    const sliceAngle = value / total * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;
    left.push(TemplateToolkit.ItemBuilders.arc(theme2, {
      x: centerX,
      y: centerY,
      radius: outerRadius,
      innerRadius,
      startAngle,
      endAngle,
      color: TemplateToolkit.toPixiColor(color || theme2.primaryColor)
    }));
    startAngle = endAngle;
  });
  const itemHeight = 36;
  const startY = centerY - data.length * itemHeight / 2;
  const legendX = TemplateToolkit.designWidth * 0.55;
  data.forEach((entry, i) => {
    const y = startY + i * itemHeight;
    const pct = (entry.value / total * 100).toFixed(1) + "%";
    right.push(TemplateToolkit.ItemBuilders.rect(theme2, {
      x: legendX,
      y,
      width: 24,
      height: 24,
      color: TemplateToolkit.toPixiColor(entry.color || theme2.primaryColor)
    }));
    right.push(TemplateToolkit.ItemBuilders.text(theme2, {
      text: entry.label || "Item",
      x: legendX + 34,
      y,
      fontSize: 22,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.baseTextColor
    }));
    right.push(TemplateToolkit.ItemBuilders.text(theme2, {
      text: pct,
      x: legendX + 180,
      y,
      width: 60,
      fontSize: 20,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.baseTextColor,
      textAlign: "right"
    }));
  });
  return [...left, ...right];
}
const fullComponents = {
  quote: quoteComponent,
  bullets,
  image: imageComponent,
  table,
  barchart,
  pieChart,
  donutChart
};
function header(theme2, data = [], config = {}) {
  const {
    fontSize = 64,
    y = 40
  } = config;
  const items = [];
  if (data[0]?.text) {
    const { text: text2, showAt = 0 } = data[0];
    const item = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: 100,
      y,
      width: 820,
      textAlign: "center",
      fontSize,
      fontFamily: theme2.fontFamilyHeading,
      color: theme2.headingColor
    });
    item.animations = [{
      type: "tween",
      field: "alpha",
      from: 0,
      to: 1,
      start: showAt,
      end: showAt + 0.5,
      easing: "easeOut"
    }];
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
    width: cfgWidth,
    height: cfgHeight,
    xOffset = 0,
    yOffset = 0,
    margin = 20,
    x = 0,
    y = 0
  } = config;
  const halfCanvas = TemplateToolkit.designWidth / 2;
  const finalWidth = cfgWidth != null ? cfgWidth : halfCanvas - margin * 2;
  const finalHeight = cfgHeight != null ? cfgHeight : void 0;
  const centerX = xOffset + (halfCanvas - finalWidth) / 2 + x;
  const finalY = TemplateToolkit.layout.getBodyY("top", y) + yOffset;
  const imageItem = TemplateToolkit.ItemBuilders.image(theme2, {
    src,
    width: finalWidth,
    height: finalHeight,
    x: centerX,
    y: finalY
  });
  TemplateToolkit.AnimApi.animate(imageItem, "alpha", 0, 1, showAt, showAt + 1);
  return [imageItem];
}
function halfBullets(theme2, data = [], config = {}) {
  const {
    xOffset = 0,
    yOffset = 0,
    fontSize = 32,
    lineGap = 80,
    leftMargin = 40,
    gapFromTop = 60
  } = config;
  const baseX = xOffset + (config.x != null ? config.x : leftMargin);
  const contentHeight = data.length * lineGap;
  let baseY = TemplateToolkit.layout.getBodyY("top", contentHeight) + gapFromTop + yOffset;
  return data.map(({ text: text2, showAt }, i) => {
    const bulletItem = TemplateToolkit.ItemBuilders.text(theme2, {
      text: text2,
      x: baseX,
      y: baseY + i * lineGap,
      fontSize,
      fontFamily: theme2.fontFamilyBase,
      color: theme2.bulletColor,
      textAlign: "left"
    });
    TemplateToolkit.AnimApi.animate(bulletItem, "alpha", 0, 1, showAt, showAt + 0.5);
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
const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground({
  // backgroundColor: "#000000", // fallback background color
  backgroundImage: "physicsClass",
  // name of the image key
  backgroundImageOpacity: 0.1,
  // controls transparency (0 = invisible, 1 = full)
  pattern: null
  // ensure no pattern overrides the image
});
deck.addHeader("header", [{ text: "Bar Chart Component" }]);
deck.full(5, "barchart", [
  { label: "Alpha", value: 45, color: "#e74c3c", showAt: 1 },
  { label: "Beta", value: 60, color: "#2ecc71", showAt: 2 },
  { label: "Gamma", value: 30, color: "#3498db", showAt: 3 }
]);
deck.addHeader("header", [{ text: "Quote Component" }]);
deck.full(10, "quote", [
  { text: "In every walk with nature", showAt: 6 },
  { text: "one receives far more", showAt: 7 },
  { text: "than he seeks.", showAt: 8 },
  { text: "— John Muir", showAt: 9 }
]);
deck.addHeader("header", [{ text: "Bullets Component" }]);
deck.full(15, "bullets", [
  { text: "This component animates each bullet", showAt: 11 },
  { text: "Bullets appear one at a time", showAt: 12 },
  { text: "Good for listing ideas", showAt: 13 },
  { text: "Avoid overflow by keeping it short", showAt: 14 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});
deck.addHeader("header", [{ text: "Image Component" }]);
deck.full(20, "image", [], {
  src: "physicsClass",
  showAt: 16,
  stylePresetKey: "fullWidth",
  layoutMode: "center"
});
deck.addHeader("header", [{ text: "Half Slide: Image + Bullets" }]);
deck.half(
  27,
  "image",
  [],
  {
    src: "class",
    showAt: 21,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets",
  [
    { text: "Use half layout for comparisons", showAt: 22 },
    { text: "Balance text and visuals", showAt: 23 },
    { text: "Ensure clarity in both panes", showAt: 24 },
    { text: "Font must be smaller", showAt: 25 }
  ],
  { lineGap: 60, fontSize: 32 }
);
deck.addHeader("header", [{ text: "Conclusion" }]);
deck.full(33, "quote", [
  { text: "Design is not just what it looks like", showAt: 29 },
  { text: "and feels like.", showAt: 30 },
  { text: "Design is how it works.", showAt: 31 },
  { text: "— Steve Jobs", showAt: 32 }
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
