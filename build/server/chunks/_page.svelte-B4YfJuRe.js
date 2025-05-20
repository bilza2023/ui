import { c as create_ssr_component, o as onDestroy, v as validate_component, b as escape, d as add_attribute } from './ssr-BVZaZd41.js';
import 'pixi.js';
import 'howler';
import { z } from 'zod';

const css$1 = {
  code: 'input[type="range"].svelte-1kushob{accent-color:#FF9800}input[type="range"].svelte-1kushob::-webkit-slider-runnable-track{background:#e3d6c2;height:6px;border-radius:4px}input[type="range"].svelte-1kushob::-webkit-slider-thumb{background:#e3d6c2;border:none;height:14px;width:14px;margin-top:-4px;border-radius:50%;cursor:pointer;-webkit-appearance:none}input[type="range"].svelte-1kushob::-moz-range-track{background:#e3d6c2;height:6px;border-radius:4px}input[type="range"].svelte-1kushob::-moz-range-thumb{background:#e3d6c2;border:none;height:14px;width:14px;border-radius:50%;cursor:pointer}',
  map: null
};
const SlideNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { update = (t) => {
  } } = $$props;
  let { src: src2 } = $$props;
  let { maxEndTime = 100 } = $$props;
  let currentTime = 0;
  let raf;
  onDestroy(() => {
    cancelAnimationFrame(raf);
  });
  if ($$props.update === void 0 && $$bindings.update && update !== void 0)
    $$bindings.update(update);
  if ($$props.src === void 0 && $$bindings.src && src2 !== void 0)
    $$bindings.src(src2);
  if ($$props.maxEndTime === void 0 && $$bindings.maxEndTime && maxEndTime !== void 0)
    $$bindings.maxEndTime(maxEndTime);
  $$result.css.add(css$1);
  return `<div class="text-white p-2 bg-[#111827] flex items-center gap-4"> <button data-svelte-h="svelte-1k96oh6">▶ Play</button> <button data-svelte-h="svelte-a71um">⏸ Pause</button> <button data-svelte-h="svelte-1e53sck">⏹ Reset</button>  <span class="text-sm font-mono text-yellow-500 ">${escape(currentTime.toFixed(1))}/${escape(Math.floor(maxEndTime))} s</span> <div class="flex items-center gap-2 w-full"><div class="flex-1 flex items-center gap-2"><span class="text-sm" data-svelte-h="svelte-1mezu83">⏱️</span> <input type="range" min="0"${add_attribute("max", maxEndTime, 0)} step="0.1" class="w-full svelte-1kushob"${add_attribute("value", currentTime, 0)}></div> <div class="w-32 flex items-center gap-2"><span class="text-sm" data-svelte-h="svelte-1fcg00k">📢</span> <input type="range" min="0" max="1" step="0.01" class="w-full svelte-1kushob"></div></div> </div>`;
});
const text = {
  type: "text",
  text: "",
  x: 0,
  y: 0,
  width: 200,
  height: 50,
  fontSize: 24,
  fontFamily: "Arial",
  color: "#ffffff",
  textAlign: "left",
  lineHeight: 1.2,
  showAt: 0,
  backgroundColor: null,
  padding: 0,
  borderColor: null,
  borderWidth: 0,
  rotation: 0,
  zIndex: 0,
  visible: true
};
const rect = {
  type: "rect",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  showAt: 0,
  fill: "#cccccc",
  borderColor: null,
  borderWidth: 0,
  rotation: 0,
  zIndex: 0,
  visible: true
};
const circle = {
  type: "circle",
  x: 0,
  y: 0,
  radius: 50,
  showAt: 0,
  fill: "#999999",
  borderColor: null,
  borderWidth: 0,
  rotation: 0,
  zIndex: 0,
  visible: true
};
const TextItemSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number().optional(),
  fontSize: z.number().default(text.fontSize),
  fontFamily: z.string().default(text.fontFamily),
  color: z.string().default(text.color),
  textAlign: z.enum(["left", "center", "right"]).default(text.textAlign),
  lineHeight: z.number().default(text.lineHeight),
  backgroundColor: z.string().nullable().default(text.backgroundColor),
  padding: z.number().default(text.padding),
  borderColor: z.string().nullable().default(text.borderColor),
  borderWidth: z.number().default(text.borderWidth),
  rotation: z.number().default(text.rotation),
  zIndex: z.number().default(text.zIndex),
  visible: z.boolean().default(text.visible)
});
const RectItemSchema = z.object({
  type: z.literal("rect"),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  fill: z.string().default(rect.fill),
  borderColor: z.string().nullable().default(rect.borderColor),
  borderWidth: z.number().default(rect.borderWidth),
  rotation: z.number().default(rect.rotation),
  zIndex: z.number().default(rect.zIndex),
  visible: z.boolean().default(rect.visible)
});
const CircleItemSchema = z.object({
  type: z.literal("circle"),
  x: z.number(),
  y: z.number(),
  radius: z.number(),
  fill: z.string().default(circle.fill),
  borderColor: z.string().nullable().default(circle.borderColor),
  borderWidth: z.number().default(circle.borderWidth),
  rotation: z.number().default(circle.rotation),
  zIndex: z.number().default(circle.zIndex),
  visible: z.boolean().default(circle.visible)
});
const ImageItemSchema = z.object({
  type: z.literal("image"),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  src: z.string(),
  // must match one of the values from your imagesList enum
  rotation: z.number().default(0),
  zIndex: z.number().default(0),
  visible: z.boolean().default(true)
});
const EmojiItemSchema = z.object({
  type: z.literal("emoji"),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  text: z.string(),
  fontSize: z.number().default(48),
  fontFamily: z.string().default("Segoe UI Emoji"),
  color: z.string().default("#000000"),
  rotation: z.number().default(0),
  zIndex: z.number().default(1),
  visible: z.boolean().default(true)
});
const ItemSchema = z.discriminatedUnion("type", [
  TextItemSchema,
  RectItemSchema,
  CircleItemSchema,
  ImageItemSchema,
  EmojiItemSchema
  // ← Add this
]);
const GridPattern = z.object({
  type: z.literal("grid"),
  cellWidth: z.number(),
  cellHeight: z.number(),
  lineColor: z.string(),
  lineWidth: z.number()
});
const DotsPattern = z.object({
  type: z.literal("dots"),
  dotRadius: z.number(),
  spacingX: z.number(),
  spacingY: z.number(),
  color: z.string()
});
const LinesPattern = z.object({
  type: z.literal("lines"),
  direction: z.enum(["horizontal", "vertical"]),
  spacing: z.number(),
  lineColor: z.string(),
  lineWidth: z.number()
});
const PatternSchema = z.discriminatedUnion("type", [
  GridPattern,
  DotsPattern,
  LinesPattern
]);
const BackgroundSchema = z.object({
  backgroundImage: z.string().nullable(),
  backgroundImageOpacity: z.number().min(0).max(1).default(1),
  // ✅ new
  pattern: PatternSchema.nullable()
});
const SlideSchema = z.object({
  id: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  background: BackgroundSchema.optional(),
  // ✅ new
  items: z.array(ItemSchema)
});
const SlidesDataSchema = z.object({
  designWidth: z.number(),
  designHeight: z.number(),
  slides: z.array(SlideSchema)
});
class DeckBuilder {
  constructor({ designWidth = 1020, designHeight = 576, globalTheme = null, globalBackground = null } = {}) {
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.globalTheme = globalTheme;
    this.globalBackground = globalBackground;
    this.slides = [];
  }
  add(endAt, template) {
    timeCheck(endAt);
    injectGlobalTheme(template, this.globalTheme);
    injectGlobalBackground(template, this.globalBackground);
    const { items, background } = template.getItems();
    const slide = {
      id: uuid(),
      backgroundColor: template.theme?.backgroundColor ?? this.globalTheme?.bgColor ?? "#000",
      items,
      background,
      __endTime: endAt
    };
    this.slides.push(slide);
  }
  build() {
    const finalSlides = finalizeSlides(this.slides);
    const slidesData2 = {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slides: finalSlides
    };
    const result = SlidesDataSchema.safeParse(slidesData2);
    if (!result.success) {
      const formatted = formatZodError(result.error.format());
      console.error("🔴 Zod Validation Failed:\n" + formatted);
      throw new Error(`Validation failed:
${formatted}`);
    }
    return slidesData2;
  }
}
function timeCheck(endAt) {
  if (typeof endAt !== "number" || endAt <= 0) {
    throw new Error(`Invalid endAt: must be a positive number`);
  }
}
function injectGlobalTheme(template, globalTheme) {
  if (globalTheme) {
    template.globalTheme = structuredClone(globalTheme);
  }
}
function injectGlobalBackground(template, globalBackground) {
  if (template.getBackground?.() == null && globalBackground) {
    template.setBackground(structuredClone(globalBackground));
  }
}
function finalizeSlides(slides) {
  let lastEnd = 0;
  return slides.map((slide, index) => {
    const endTime = slide.__endTime;
    if (typeof endTime !== "number" || isNaN(endTime)) {
      throw new Error(`Slide ${index} is missing a valid endTime`);
    }
    if (endTime <= lastEnd) {
      throw new Error(`Slide ${index} has invalid endTime (${endTime} <= ${lastEnd})`);
    }
    const startTime = lastEnd;
    lastEnd = endTime;
    const { __endTime, ...cleaned } = slide;
    return { ...cleaned, startTime, endTime };
  });
}
function formatZodError(errorFormat, path = []) {
  const lines = [];
  for (const key in errorFormat) {
    if (key === "_errors") {
      const errs = errorFormat[key];
      if (errs?.length) {
        lines.push(`• ${path.join(".") || "root"}: ${errs.join(", ")}`);
      }
    } else {
      const nested = errorFormat[key];
      if (typeof nested === "object") {
        lines.push(...formatZodError(nested, [...path, key]));
      }
    }
  }
  return lines;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function createGlobalTheme(overrides = {}) {
  const defaults = {
    // Background and Foreground Colors
    bgColor: "#ffffff",
    baseTextColor: "#333333",
    headingColor: "#111111",
    bulletColor: "#555555",
    // Accent Colors
    primaryColor: "#00bcd4",
    secondaryColor: "#ff9800",
    // Shadow / Border Colors
    shadowColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "#dddddd",
    // Fonts (names only, not sizes)
    fontFamilyBase: "Arial",
    fontFamilyHeading: "Georgia"
  };
  return { ...defaults, ...overrides };
}
createGlobalTheme({
  bgColor: "#1a1a1a",
  baseTextColor: "#eeeeee",
  headingColor: "#ffffff",
  bulletColor: "#bbbbbb",
  primaryColor: "#00ffaa",
  secondaryColor: "#ffaa00",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial"
});
createGlobalTheme({
  bgColor: "#ffffff",
  baseTextColor: "#333333",
  headingColor: "#111111",
  bulletColor: "#555555",
  primaryColor: "#222222",
  secondaryColor: "#999999",
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Arial"
});
createGlobalTheme({
  bgColor: "#ff00ff",
  // shocking magenta
  headingColor: "#00ffff",
  // neon cyan
  bulletColor: "#ffff00",
  // yellow
  baseTextColor: "#000000",
  primaryColor: "#ff0000",
  secondaryColor: "#0000ff",
  fontFamilyHeading: "Comic Sans MS",
  fontFamilyBase: "Impact"
});
createGlobalTheme({
  bgColor: "#fdf6e3",
  baseTextColor: "#333333",
  headingColor: "#2c3e50",
  bulletColor: "#5d6d7e",
  primaryColor: "#3498db",
  // soft blue
  secondaryColor: "#2ecc71",
  // green
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Segoe UI"
});
createGlobalTheme({
  bgColor: "#eaf4fc",
  // very light blue
  baseTextColor: "#1f2d3d",
  headingColor: "#0a2f5c",
  bulletColor: "#34495e",
  primaryColor: "#3498db",
  // soft blue
  secondaryColor: "#2980b9",
  // deeper blue
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Verdana"
});
createGlobalTheme({
  bgColor: "#ff0000",
  // red background
  baseTextColor: "#00ff00",
  // bright green
  headingColor: "#0000ff",
  // blue
  bulletColor: "#ffff00",
  // yellow
  primaryColor: "#00ffff",
  // cyan
  secondaryColor: "#ff00ff",
  // magenta
  fontFamilyHeading: "Courier New",
  fontFamilyBase: "Comic Sans MS"
});
createGlobalTheme({
  bgColor: "#f0f6fb",
  baseTextColor: "#2c3e50",
  headingColor: "#1b2631",
  bulletColor: "#5d6d7e",
  primaryColor: "#154360",
  // navy blue
  secondaryColor: "#1f618d",
  // steel blue
  fontFamilyHeading: "Helvetica Neue",
  fontFamilyBase: "Arial"
});
createGlobalTheme({
  bgColor: "#ffffff",
  baseTextColor: "#222222",
  headingColor: "#0d1a26",
  bulletColor: "#4a6fa5",
  primaryColor: "#2e86de",
  // vivid tech blue
  secondaryColor: "#74b9ff",
  // sky blue
  fontFamilyHeading: "Roboto",
  fontFamilyBase: "Open Sans"
});
createGlobalTheme({
  bgColor: "#f5f0e1",
  // aged paper / light cream
  baseTextColor: "#3e2f1c",
  headingColor: "#2d1f0f",
  bulletColor: "#5a4632",
  primaryColor: "#8b5e3c",
  // earthy brown
  secondaryColor: "#c49e78",
  // soft tan
  fontFamilyHeading: "Georgia",
  fontFamilyBase: "Palatino Linotype"
});
const coffeeNote = createGlobalTheme({
  bgColor: "#f3e7d3",
  // latte cream
  baseTextColor: "#3b2e25",
  headingColor: "#2c1e13",
  bulletColor: "#5e4b3c",
  primaryColor: "#a9745a",
  // light mocha
  secondaryColor: "#d6bda7",
  // soft beige
  fontFamilyHeading: "Merriweather",
  fontFamilyBase: "Serif"
});
createGlobalTheme({
  bgColor: "#f8f1e5",
  // sand parchment
  baseTextColor: "#4a3f35",
  headingColor: "#2e261f",
  bulletColor: "#7b6b5d",
  primaryColor: "#b77b57",
  // terracotta
  secondaryColor: "#d2a679",
  // camel tan
  fontFamilyHeading: "Garamond",
  fontFamilyBase: "Book Antiqua"
});
function getText(content = "Normal Text") {
  return {
    type: "text",
    text: content,
    x: 0,
    y: 0,
    width: 200,
    height: 50,
    fontSize: 35,
    fontFamily: "Georgia",
    color: "black",
    textAlign: "center",
    lineHeight: 1.2,
    padding: 20,
    backgroundColor: null,
    borderColor: null,
    borderWidth: 0,
    showAt: 0,
    rotation: 0,
    zIndex: 0,
    visible: true
  };
}
function getImage({
  x = 500,
  y = 100,
  width = 200,
  height = 150,
  src: src2 = "images/atom.png",
  rotation = 0,
  zIndex = 0,
  visible = true
} = {}) {
  return {
    type: "image",
    x,
    y,
    width,
    height,
    src: src2,
    rotation,
    zIndex,
    visible
  };
}
function getCircle({
  x = 100,
  y = 100,
  radius = 30,
  fill = "blue",
  borderColor = null,
  borderWidth = 0,
  rotation = 0,
  zIndex = 0,
  visible = true
} = {}) {
  return {
    type: "circle",
    x,
    y,
    radius,
    fill,
    borderColor,
    borderWidth,
    rotation,
    zIndex,
    visible
  };
}
function getRect({
  x = 0,
  y = 0,
  width = 100,
  height = 60,
  fill = "red",
  borderColor = null,
  borderWidth = 0,
  rotation = 0,
  zIndex = 0,
  visible = true
} = {}) {
  return {
    type: "rect",
    x,
    y,
    width,
    height,
    fill,
    borderColor,
    borderWidth,
    rotation,
    zIndex,
    visible
  };
}
function getEmoji(text2 = "🎉💯🔥") {
  return {
    type: "emoji",
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    text: text2,
    fontSize: 48,
    fontFamily: "Segoe UI Emoji",
    // Windows
    color: "#000000",
    rotation: 0,
    zIndex: 1,
    visible: true
  };
}
const itemsMap = Object.freeze({
  text: getText,
  circle: getCircle,
  rect: getRect,
  image: getImage,
  emoji: getEmoji
});
class BaseTemplate {
  constructor(name) {
    this.name = name;
    this.items = itemsMap;
    this.data = {};
    this.theme = {};
    this.globalTheme = {};
    this.canvasWidth = 1020;
    this.itemWidth = 800;
  }
  // THIS is the final output 
  getItems() {
  }
  // Position helpers
  centerHorizontally(item) {
    item.x = (this.canvasWidth - this.itemWidth) / 2;
    item.width = this.itemWidth;
  }
  placeBelow(item, refItem, gap = 50) {
    item.y = refItem.y + (refItem.height || 100) + gap;
  }
  // Optional background
  setBackground(bg) {
    if (typeof bg !== "object" || bg === null) {
      throw new Error("Invalid background: must be a non-null object.");
    }
    if (!("backgroundImage" in bg) && !("pattern" in bg)) {
      throw new Error("Background must include at least one of: backgroundImage or pattern.");
    }
    this._background = bg;
  }
  setData(newData) {
    this.data = { ...this.data, ...newData };
  }
  setTheme(newTheme) {
    this.theme = { ...this.theme, ...newTheme };
  }
}
BaseTemplate.backgroundWithImage = function(name, opacity = 1) {
  return {
    backgroundImage: name,
    backgroundImageOpacity: opacity,
    pattern: null
  };
};
BaseTemplate.backgroundWithPattern = function(pattern) {
  return {
    backgroundImage: null,
    backgroundImageOpacity: 1,
    pattern
  };
};
BaseTemplate.createBackground = function({ backgroundImage = null, pattern = null, backgroundImageOpacity = 1 } = {}) {
  return {
    backgroundImage: pattern ? null : backgroundImage,
    backgroundImageOpacity,
    pattern: pattern || null
  };
};
function createJumboTron() {
  const tmpl = new BaseTemplate("jumbotron");
  tmpl.data = {
    title: "Title Goes Here..."
  };
  tmpl.theme = {
    fontSize: 70,
    topGap: 200
  };
  tmpl.getItems = function() {
    const items = [];
    const jumbo = this.items.text(this.data.title);
    jumbo.fontSize = this.theme.fontSize ?? 80;
    jumbo.y = this.theme.topGap ?? 250;
    jumbo.fontFamily = this.globalTheme.fontFamilyHeading;
    jumbo.color = this.globalTheme.primaryColor;
    this.centerHorizontally(jumbo);
    items.push(jumbo);
    return {
      items,
      background: this._background
    };
  };
  return tmpl;
}
function createTitleWithBullets() {
  const tmpl = new BaseTemplate("titleWithBullets");
  tmpl.data = {
    title: "Welcome to SlideBuilder",
    bullet1: "Composable templates",
    bullet2: "Scriptable slides",
    bullet3: "Production-ready output",
    showAt1: 0,
    showAt2: 0,
    showAt3: 0,
    titleFontSize: 70,
    titleTopGap: 40,
    bulletsTopGap: 110,
    bulletGap: 50,
    bulletFontSize: 80
  };
  tmpl.theme = {};
  tmpl.getItems = function() {
    const items = [];
    const title = this.items.text(this.data.title);
    title.color = this.globalTheme.primaryColor;
    title.fontSize = this.data.titleFontSize ?? 100;
    title.y = this.data.titleTopGap ?? 40;
    title.textAlign = "center";
    this.centerHorizontally(title);
    items.push(title);
    const bullet1 = this.createBullet(this.data.bullet1, title, this.data.showAt1, true);
    const bullet2 = this.createBullet(this.data.bullet2, bullet1, this.data.showAt2);
    const bullet3 = this.createBullet(this.data.bullet3, bullet2, this.data.showAt3);
    items.push(bullet1, bullet2, bullet3);
    return {
      items,
      background: this._background
    };
  };
  tmpl.createBullet = function(text2, refItem, showAt, isFirst = false) {
    const bullet = this.items.text(text2 || "");
    bullet.color = this.globalTheme.secondaryColor;
    bullet.fontSize = this.data.bulletFontSize ?? 80;
    bullet.textAlign = "center";
    bullet.showAt = showAt;
    const gap = isFirst ? this.data.bulletsTopGap ?? 110 : this.data.bulletGap ?? 50;
    this.placeBelow(bullet, refItem, gap);
    this.centerHorizontally(bullet);
    return bullet;
  };
  return tmpl;
}
function createTitleWithImage() {
  const tmpl = new BaseTemplate("titleWithImage");
  tmpl.data = {
    title: "Slide Title",
    imageSrc: "images/placeholder.png",
    showAtTitle: 0,
    showAtImage: 5
  };
  tmpl.theme = {
    titleFontSize: 80,
    imageTopGap: 60
  };
  tmpl.getItems = function() {
    const items = [];
    const title = this.items.text(this.data.title);
    title.fontSize = this.theme.titleFontSize ?? 80;
    title.color = this.globalTheme.primaryColor;
    title.fontFamily = this.globalTheme.fontFamilyHeading;
    title.textAlign = "center";
    title.showAt = this.data.showAtTitle ?? 0;
    this.centerHorizontally(title);
    items.push(title);
    const image = this.items.image({
      x: 0,
      y: 0,
      width: 400,
      height: 400,
      src: this.data.imageSrc
    });
    image.showAt = this.data.showAtImage ?? 5;
    const gap = this.theme.imageTopGap ?? 60;
    this.placeBelow(image, title, gap);
    this.centerHorizontally(image);
    items.push(image);
    return {
      items,
      background: this._background
    };
  };
  return tmpl;
}
function createImageWithCaption() {
  const tmpl = new BaseTemplate("imageWithCaption");
  tmpl.data = {
    imageSrc: "plant_cell",
    caption: "Plant cell structure",
    showAtImage: 0,
    showAtCaption: 5
  };
  tmpl.theme = {
    imageWidth: 600,
    imageHeight: 400,
    captionFontSize: 48,
    captionGap: 30
  };
  tmpl.getItems = function() {
    const items = [];
    const image = this.items.image({
      x: 0,
      y: 15,
      width: this.theme.imageWidth,
      height: this.theme.imageHeight,
      // src: this.data.imageSrc
      src: "images/mad_scientist.jpg"
    });
    image.showAt = this.data.showAtImage ?? 0;
    this.centerHorizontally(image);
    items.push(image);
    const caption = this.items.text(this.data.caption);
    caption.fontSize = this.theme.captionFontSize;
    caption.color = this.globalTheme.secondaryColor;
    caption.textAlign = "center";
    caption.showAt = this.data.showAtCaption ?? 5;
    this.placeBelow(caption, image, this.theme.captionGap);
    this.centerHorizontally(caption);
    items.push(caption);
    return {
      items,
      background: this._background
    };
  };
  return tmpl;
}
function createImageLeftTextRight() {
  const tmpl = new BaseTemplate("imageLeftTextRight");
  tmpl.data = {
    imageSrc: "microscope",
    text: "Microscopic organisms.",
    showAtImage: 0,
    showAtText: 5
  };
  tmpl.theme = {
    imageWidth: 400,
    imageHeight: 300,
    textFontSize: 48,
    gapX: 60,
    topY: 100
  };
  tmpl.getItems = function() {
    const items = [];
    const image = this.items.image({
      x: 100,
      y: this.theme.topY,
      width: this.theme.imageWidth,
      height: this.theme.imageHeight,
      src: this.data.imageSrc
    });
    image.showAt = this.data.showAtImage ?? 0;
    items.push(image);
    const text2 = this.items.text(this.data.text);
    text2.fontSize = this.theme.textFontSize;
    text2.color = this.globalTheme.primaryColor;
    text2.x = image.x + this.theme.imageWidth + this.theme.gapX;
    text2.y = image.y;
    text2.width = 400;
    text2.showAt = this.data.showAtText ?? 5;
    items.push(text2);
    return {
      items,
      background: this._background
    };
  };
  return tmpl;
}
const Templates = {
  JumboTron: createJumboTron,
  TitleWithBullets: createTitleWithBullets,
  TitleWithImage: createTitleWithImage,
  ImageWithCaption: createImageWithCaption,
  ImageLeftTextRight: createImageLeftTextRight
};
const deck = new DeckBuilder({
  globalTheme: coffeeNote,
  globalBackground: null
});
const introSlide = Templates.JumboTron();
introSlide.setData({ title: "Welcome To Taleem Help" });
deck.add(3, introSlide);
const slide3 = Templates.TitleWithBullets();
slide3.setData({
  title: "Taleem Help",
  bullet1: "Mission Objectives",
  bullet2: "Products",
  bullet3: "Up Comming..",
  showAt1: 4,
  showAt2: 6,
  showAt3: 8
});
deck.add(10, slide3);
const slidesData = deck.build();
const css = {
  code: "#pixi-container.svelte-8pzqfr{display:flex;align-items:center;justify-content:center;width:100vw;height:calc(100vh - 60px);background-color:rgb(45, 45, 48);overflow:hidden}",
  map: null
};
let src = "/sounds/music.opus";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const maxEndTime = slidesData.slides[slidesData.slides.length - 1].endTime;
  let engine;
  function update(t) {
    engine.draw(t);
  }
  onDestroy(() => {
    return;
  });
  $$result.css.add(css);
  return `<div class="bg-gray-400 min-h-screen flex flex-col"><div class="">${maxEndTime ? `${validate_component(SlideNav, "SlideNav").$$render($$result, { update, src, maxEndTime }, {}, {})}` : ``}</div> <div id="pixi-container" class="flex-1 svelte-8pzqfr"></div> <div class="bg-gray-900 text-white h-10 flex items-center justify-center" data-svelte-h="svelte-1etzrii"><a href="https://taleem.help">taleem.help</a></div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-B4YfJuRe.js.map
