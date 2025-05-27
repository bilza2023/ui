import { c as create_ssr_component, d as add_attribute } from "../../../chunks/ssr.js";
import "pixi.js";
import "howler";
class DeckBuilder {
  constructor({
    preprocess = null,
    postValidate = null
  } = {}) {
    this.globalTheme = null;
    this.globalBackground = null;
    this.designWidth = 1020;
    this.designHeight = 576;
    this.preprocess = typeof preprocess === "function" ? preprocess : (items) => items;
    this.postValidate = typeof postValidate === "function" ? postValidate : () => {
    };
    this.slides = [];
    this.currentStartTime = 0;
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
  setGlobalBackground(backgroundObj) {
    this.globalBackground = backgroundObj;
  }
  /**
   * @param {Function} templateFn – templateFn(globalTheme, data) => items[]
   * @param {number}   endTime    – absolute end time in seconds
   * @param {object}   data       – optional data object passed to the template
   */
  add(templateFn, endTime, data = {}) {
    if (this.globalTheme == null || this.globalBackground == null)
      throw new Error("please add globalTheme and globalBackground");
    const startTime = this.currentStartTime;
    const duration = endTime - startTime;
    if (endTime <= startTime) {
      throw new Error(`Slide endTime (${endTime}) must be after previous slide endTime (${startTime})`);
    }
    if (duration < 2) {
      throw new Error(`Slide duration must be at least 2 seconds (got ${duration})`);
    }
    let items = templateFn(this.globalTheme, data) || [];
    items = this.preprocess(items, data, { templateFn }) || [];
    const background = structuredClone(this.globalBackground) || {};
    const slide = {
      background,
      items,
      startTime,
      endTime
    };
    this.postValidate(slide, data, { templateFn });
    this.slides.push(slide);
    this.currentStartTime = endTime;
  }
  overrideLastSlideBackground({
    backgroundColor = null,
    backgroundImage = null,
    backgroundImageOpacity = null,
    pattern = null
  } = {}) {
    if (!this.slides.length) {
      throw new Error("No slide exists to override background");
    }
    const bg = this.slides[this.slides.length - 1].background;
    if (backgroundColor !== null) {
      bg.backgroundColor = backgroundColor;
    }
    if (backgroundImage !== null) {
      bg.backgroundImage = backgroundImage;
    }
    if (backgroundImageOpacity !== null) {
      bg.backgroundImageOpacity = backgroundImageOpacity;
    }
    if (pattern !== null) {
      if (typeof pattern !== "object" || typeof pattern.type !== "string") {
        throw new Error("Invalid pattern: must be an object with at least a `type` field");
      }
      bg.pattern = {
        type: pattern.type,
        props: pattern.props ?? {}
      };
    }
  }
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
const textPresets = {
  heading: {
    fontSize: 64,
    fontFamily: "Georgia",
    textAlign: "center",
    padding: 20
  },
  bullet: {
    fontSize: 42,
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
const designWidth$1 = 1020;
const designHeight$1 = 576;
function layout(item, align = "left", yPercent = 0.2, xOffset = 0) {
  item.y = Math.round(designHeight$1 * yPercent);
  if (align === "center") {
    item.textAlign = "center";
    item.x = 0 + xOffset;
    item.width = designWidth$1;
  } else if (align === "right") {
    item.textAlign = "right";
    item.x = 80 + xOffset;
    item.width = designWidth$1 - 160;
  } else {
    item.textAlign = "left";
    item.x = 80 + xOffset;
    item.width = designWidth$1 - 160;
  }
}
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
    richText
  },
  stylePresets,
  AnimApi,
  applyPreset,
  AniHelpers
};
function titleWith3Bullets(theme, data = {}) {
  const items = [];
  const titleItem = TemplateToolkit.ItemBuilders.text(
    theme,
    TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.heading, {
      text: data.title || "Your Title",
      x: 100,
      y: 60
    })
  );
  TemplateToolkit.AniHelpers.fadeIn(titleItem, data.titleShowAt ?? 0, 1);
  items.push(titleItem);
  const lineGap = data.lineGap ?? 100;
  const gapBelowHeading = data.gapBelowHeading ?? 130;
  const baseY = 60 + gapBelowHeading;
  (data.bullets || []).forEach((b, i) => {
    const showAt = b.showAt;
    const bulletItem = TemplateToolkit.ItemBuilders.text(
      theme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.bullet, {
        text: b.text,
        x: 100,
        y: baseY + i * lineGap
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });
  return items;
}
function headingWithImage(globalTheme, data = {}) {
  const items = [];
  const titleShowAt = data.titleShowAt ?? 0;
  const titleItem = TemplateToolkit.ItemBuilders.text(
    globalTheme,
    TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.heading, { text: data.title || "Visual Concept" })
  );
  TemplateToolkit.layout(titleItem, "center", 0.05);
  TemplateToolkit.AniHelpers.fadeIn(titleItem, titleShowAt, 1);
  items.push(titleItem);
  const imageShowAt = data.imageShowAt ?? titleShowAt;
  const imageItem = TemplateToolkit.ItemBuilders.image(
    globalTheme,
    TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.image.withTopAndSideMargin, { src: data.src || data.imageSrc || "book" })
  );
  TemplateToolkit.AniHelpers.fadeIn(imageItem, imageShowAt, 1);
  items.push(imageItem);
  return items;
}
function headingWith2Bullets(globalTheme, data = {}) {
  const items = [];
  const titleShowAt = data.titleShowAt ?? 0;
  const titleItem = TemplateToolkit.ItemBuilders.text(
    globalTheme,
    TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.heading, {
      text: data.title || "Key Takeaways"
    })
  );
  TemplateToolkit.layout(titleItem, "center", 0.1);
  TemplateToolkit.AniHelpers.fadeIn(titleItem, titleShowAt, 1);
  items.push(titleItem);
  (data.bullets || []).forEach((entry, i) => {
    const text2 = entry.text;
    const showAt = entry.showAt;
    const bulletItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.bullet, { text: text2 })
    );
    TemplateToolkit.layout(bulletItem, "center", 0.4 + i * 0.25);
    TemplateToolkit.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });
  return items;
}
function imageLeftWithBullets(globalTheme, data = {}) {
  const items = [];
  const imageShowAt = data.imageShowAt ?? 0;
  const imageItem = TemplateToolkit.ItemBuilders.image(globalTheme, {
    src: data.src || "drops",
    x: 60,
    y: 100,
    width: 400,
    height: 350
  });
  TemplateToolkit.AniHelpers.fadeIn(imageItem, imageShowAt, 1);
  items.push(imageItem);
  const lineGap = data.lineGap ?? 100;
  (data.bullets || []).forEach((entry, i) => {
    const text2 = entry.text;
    const showAt = entry.showAt;
    const bulletItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.bullet, {
        text: text2,
        x: 500,
        y: 120 + i * lineGap,
        width: 480,
        textAlign: "left"
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(bulletItem, showAt, 0.5);
    items.push(bulletItem);
  });
  return items;
}
function quoteSlide(globalTheme, data = {}) {
  const items = [];
  const linesData = data.lines || [];
  const fontSize = data.fontSize || 48;
  const lineHeight = data.lineHeight ? fontSize * data.lineHeight : fontSize * 1.4;
  const startY = data.startY ?? 140;
  linesData.forEach((entry, i) => {
    const showAt = entry.showAt;
    const text2 = entry.text;
    const lineItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.quote, {
        text: text2,
        x: 100,
        y: startY + i * lineHeight,
        width: 820,
        textAlign: "center",
        fontSize
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(lineItem, showAt, 0.5);
    items.push(lineItem);
  });
  if (data.author && data.author.text) {
    const authorShowAt = data.author.showAt;
    const authorItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.caption, {
        text: data.author.text,
        x: 100,
        y: startY + linesData.length * lineHeight + 30,
        width: 820,
        textAlign: "right",
        fontSize: 28
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(authorItem, authorShowAt, 0.5);
    items.push(authorItem);
  }
  return items;
}
function featureGrid4(globalTheme, data = {}) {
  const features = data.features || [
    { icon: "BULB", label: "Fast", showAt: 0 },
    { icon: "LOCK", label: "Secure", showAt: 1 },
    { icon: "ROCKET", label: "Smooth", showAt: 2 },
    { icon: "TOOLS", label: "Flexible", showAt: 3 }
  ];
  const positions = [
    { x: 180, y: 160 },
    { x: 560, y: 160 },
    { x: 180, y: 360 },
    { x: 560, y: 360 }
  ];
  const items = [];
  features.forEach((f, i) => {
    const centerX = positions[i].x;
    const itemWidth = 200;
    const showAt = f.showAt ?? 0;
    const iconItem = TemplateToolkit.ItemBuilders.icon(globalTheme, {
      iconName: f.icon,
      x: centerX + itemWidth / 2 - 40,
      y: positions[i].y,
      width: 80
    });
    const labelItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.caption, {
        text: f.label,
        x: centerX,
        y: positions[i].y + 90,
        width: itemWidth,
        textAlign: "center",
        fontSize: 28
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(iconItem, showAt, 0.5);
    TemplateToolkit.AniHelpers.fadeIn(labelItem, showAt, 0.5);
    items.push(iconItem, labelItem);
  });
  return items;
}
function imageWithCaption(globalTheme, data = {}) {
  const items = [];
  const imageShowAt = data.showAt ?? 0;
  const imageItem = TemplateToolkit.ItemBuilders.image(globalTheme, {
    src: data.src || "book",
    x: 160,
    y: 80,
    width: 700,
    height: 400
  });
  TemplateToolkit.AniHelpers.fadeIn(imageItem, imageShowAt, 1);
  items.push(imageItem);
  const captionShowAt = data.captionShowAt ?? imageShowAt;
  const captionItem = TemplateToolkit.ItemBuilders.text(
    globalTheme,
    TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.caption, {
      text: data.caption || "This is a caption for the image above.",
      x: 160,
      y: 500,
      width: 700,
      textAlign: "center",
      fontSize: 28
    })
  );
  TemplateToolkit.AniHelpers.fadeIn(captionItem, captionShowAt, 1);
  items.push(captionItem);
  return items;
}
function centeredHeading(globalTheme, data = {}) {
  const showAt = data.showAt ?? 0;
  const duration = data.duration ?? 1;
  const titleData = TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.heading, {
    text: data.text || "Section Title",
    x: 100,
    y: 220,
    width: 820,
    textAlign: "center",
    fontSize: 64
  });
  const titleItem = TemplateToolkit.ItemBuilders.text(globalTheme, titleData);
  TemplateToolkit.AniHelpers.fadeIn(titleItem, showAt, duration);
  return [titleItem];
}
function iconList(globalTheme, data = {}) {
  const items = [];
  (data.items || []).forEach((entry) => {
    const size = entry.size ?? 60;
    const labelOffset = entry.labelOffset ?? 10;
    const iconItem = TemplateToolkit.ItemBuilders.icon(globalTheme, {
      iconName: entry.icon,
      x: entry.x,
      y: entry.y,
      width: size,
      height: size
    });
    TemplateToolkit.AniHelpers.fadeIn(iconItem, entry.showAt, 0.5);
    const labelItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.caption, {
        text: entry.title,
        x: entry.x,
        y: entry.y + size + labelOffset,
        width: size * 2,
        textAlign: "center"
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(labelItem, entry.showAt, 0.5);
    items.push(iconItem, labelItem);
  });
  return items;
}
function iconsGrid(globalTheme, data = {}) {
  const items = [];
  const headingText = data.heading || "Features";
  const headingShowAt = data.headingShowAt ?? 0;
  const columns = data.columns ?? 4;
  const itemSize = data.itemSize ?? 80;
  const gutterX = data.gutterX ?? 40;
  const gutterY = data.gutterY ?? 60;
  const startY = data.startY ?? 200;
  const totalWidth = columns * itemSize + (columns - 1) * gutterX;
  const startX = (TemplateToolkit.designWidth - totalWidth) / 2;
  const headingItem = TemplateToolkit.ItemBuilders.richText(
    globalTheme,
    TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.richText.title, {
      text: headingText,
      x: startX,
      y: startY - 120,
      width: totalWidth,
      textAlign: "center"
    })
  );
  TemplateToolkit.AniHelpers.fadeIn(headingItem, headingShowAt, 1);
  items.push(headingItem);
  (data.items || []).forEach((entry, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const x = startX + col * (itemSize + gutterX);
    const y = startY + row * (itemSize + gutterY);
    const iconItem = TemplateToolkit.ItemBuilders.icon(globalTheme, {
      iconName: entry.icon,
      x,
      y,
      width: itemSize,
      height: itemSize
    });
    TemplateToolkit.AniHelpers.fadeIn(iconItem, entry.showAt, 0.5);
    items.push(iconItem);
    const labelItem = TemplateToolkit.ItemBuilders.text(
      globalTheme,
      TemplateToolkit.applyPreset(TemplateToolkit.stylePresets.text.small, {
        text: entry.title,
        x,
        y: y + itemSize + 10,
        width: itemSize,
        textAlign: "center",
        fontSize: data.labelFontSize ?? 24
      })
    );
    TemplateToolkit.AniHelpers.fadeIn(labelItem, entry.showAt, 0.5);
    items.push(labelItem);
  });
  return items;
}
const templates = {
  iconList,
  iconsGrid,
  titleWith3Bullets,
  headingWithImage,
  headingWith2Bullets,
  imageLeftWithBullets,
  quoteSlide,
  featureGrid4,
  imageWithCaption,
  centeredHeading
};
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
const deck = new DeckBuilder();
const themeUsed = GlobalThemes.pastel;
deck.setGlobalTheme(themeUsed);
deck.setGlobalBackground(getDefaultBackground(themeUsed));
let t = 0;
t += 10;
deck.add(templates.titleWith3Bullets, t, {
  title: "Taleem Help Demo",
  bullets: [
    { text: "An AI First Institute", showAt: t - 8 },
    { text: "State of Art Education", showAt: t - 5 },
    { text: "Cutting Edge Technologies", showAt: t - 3 }
  ]
});
deck.overrideLastSlideBackground({
  pattern: { type: "dots", props: { color: themeUsed.primaryColor } }
});
const slide2Start = t;
t += 5;
deck.add(templates.centeredHeading, t, {
  text: "Taleem Help Vision",
  showAt: slide2Start + 1
  // fade at 11 s
});
const slide3Start = t;
t += 10;
deck.add(templates.iconsGrid, t, {
  heading: "Our Capabilities",
  headingShowAt: slide3Start,
  columns: 4,
  items: [
    { icon: "BULB", title: "Innovation", showAt: slide3Start + 1 },
    { icon: "LOCK", title: "Security", showAt: slide3Start + 2 },
    { icon: "ROCKET", title: "Performance", showAt: slide3Start + 3 },
    { icon: "TOOLS", title: "Tools", showAt: slide3Start + 4 },
    { icon: "CIRCLE", title: "Precision", showAt: slide3Start + 5 }
  ]
});
const slide4Start = t;
t += 10;
deck.add(templates.iconList, t, {
  items: [
    { icon: "BULB", x: 120, y: 220, title: "Idea", showAt: slide4Start + 1 },
    { icon: "LOCK", x: 120, y: 400, title: "Security", showAt: slide4Start + 2 },
    { icon: "DEL", x: 120, y: 620, title: "Security", showAt: slide4Start + 3 },
    { icon: "ROCKET", x: 420, y: 220, title: "Speed", showAt: slide4Start + 4 },
    { icon: "EXPLOSION", x: 420, y: 400, title: "Tools", showAt: slide4Start + 5 },
    { icon: "ELLIPSE", x: 420, y: 620, title: "Tools", showAt: slide4Start + 6 }
  ]
});
const slide5Start = t;
t += 10;
deck.add(templates.quoteSlide, t, {
  lines: [
    { text: "“The ink of the scholar", showAt: slide5Start + 1 },
    { text: "is more sacred", showAt: slide5Start + 2 },
    { text: "than the blood of the martyr.”", showAt: slide5Start + 3 }
  ],
  author: { text: "— Prophetic Tradition", showAt: slide5Start + 4 }
});
const slide6Start = t;
t += 10;
deck.add(templates.imageLeftWithBullets, t, {
  src: "drops",
  imageShowAt: slide6Start,
  bullets: [
    { text: "Future Proof Yourself", showAt: slide6Start + 2 },
    { text: "Updated Education", showAt: slide6Start + 3 },
    { text: "Systems Mindset", showAt: slide6Start + 4 }
  ]
});
const slide7Start = t;
t += 8;
deck.add(templates.imageWithCaption, t, {
  src: "drops",
  showAt: slide7Start,
  caption: "The beauty of Complete Understanding",
  captionShowAt: slide7Start + 1
});
const slide8Start = t;
t += 10;
deck.add(templates.headingWithImage, t, {
  title: "Our Story",
  titleShowAt: slide8Start,
  imageSrc: "chalkboard",
  imageShowAt: slide8Start + 1
});
const slide9Start = t;
t += 8;
deck.add(templates.headingWith2Bullets, t, {
  title: "Why Taleem Help",
  titleShowAt: slide9Start,
  bullets: [
    { text: "Eucation to Business", showAt: slide9Start + 2 },
    { text: "Cutting Edge Technologies", showAt: slide9Start + 5 }
  ]
});
const slide10Start = t;
t += 10;
deck.add(templates.featureGrid4, t, {
  features: [
    { icon: "BULB", label: "Future Vision", showAt: slide10Start },
    { icon: "LOCK", label: "Secure Future", showAt: slide10Start + 1 },
    { icon: "ROCKET", label: "Technical Dev", showAt: slide10Start + 2 },
    { icon: "TOOLS", label: "Skills", showAt: slide10Start + 3 }
  ]
});
deck.build();
const css = {
  code: ".stage.svelte-5sxdsi{display:flex;justify-content:center;align-items:start;height:100vh;background-color:#3b3a3a}body{margin:0}.stage.svelte-5sxdsi{margin-top:0;padding-top:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let container;
  $$result.css.add(css);
  return `${``} <div class="stage svelte-5sxdsi"${add_attribute("this", container, 0)}></div>`;
});
export {
  Page as default
};
