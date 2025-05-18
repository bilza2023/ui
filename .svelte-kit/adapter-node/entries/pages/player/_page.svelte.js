import { c as create_ssr_component, o as onDestroy, d as add_attribute, f as escape } from "../../../chunks/ssr.js";
import "pixi.js";
import "howler";
import { z } from "zod";
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
const ItemSchema = z.discriminatedUnion("type", [
  TextItemSchema,
  RectItemSchema,
  CircleItemSchema,
  ImageItemSchema
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
  pattern: PatternSchema.nullable()
});
const SlideSchema = z.object({
  id: z.string(),
  startTime: z.number(),
  endTime: z.number(),
  backgroundColor: z.string().optional(),
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
  constructor({ designWidth = 1020, designHeight = 576, globalTheme = null } = {}) {
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.globalTheme = globalTheme;
    this.slides = [];
  }
  timeCheck(endAt) {
    if (typeof endAt !== "number" || endAt <= 0) {
      throw new Error(`Invalid endAt: must be a positive number`);
    }
  }
  add(endAt, template) {
    this.timeCheck(endAt);
    if (this.globalTheme) {
      template.globalTheme = JSON.parse(JSON.stringify(this.globalTheme));
    }
    const { items, background } = template.getItems();
    const slide = {
      id: template.id,
      backgroundColor: template.theme?.backgroundColor || this.globalTheme?.bgColor || "#000",
      items,
      background,
      // ✅ new
      __endTime: endAt
    };
    this.slides.push(slide);
  }
  build() {
    let lastEnd = 0;
    const finalSlides = this.slides.map((slide, index) => {
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
    const slidesData2 = {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slides: finalSlides
    };
    const result = SlidesDataSchema.safeParse(slidesData2);
    if (!result.success)
      ;
    return slidesData2;
  }
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
const blueEducation = createGlobalTheme({
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
createGlobalTheme({
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
  src = "images/atom.png",
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
    src,
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
const itemsMap = Object.freeze({
  text: getText,
  circle: getCircle,
  rect: getRect,
  image: getImage
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
  // Safe theme/globalTheme fallback
  resolve(key, fallback) {
    return this.theme?.[key] ?? this.globalTheme?.[key] ?? fallback;
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
    if (typeof bg !== "object" || !("backgroundImage" in bg) || !("pattern" in bg)) {
      throw new Error("Invalid background object. Must include backgroundImage and pattern keys.");
    }
    this._background = bg;
  }
  getBackground() {
    return this._background ?? null;
  }
  // Optional emoji layer--keep commented for now
  // setEmojiLayer(emojiLayer) {
  //   this._emojiLayer = emojiLayer;
  // }
  // getEmojiLayer() {
  //   return this._emojiLayer ?? null;
  // }
}
const JumboTron = new BaseTemplate("jumbotron");
JumboTron.data = {
  text: "🚀 Taleem.help Presentation 📘"
};
JumboTron.theme = {
  fontSize: 80,
  topGap: 200
};
JumboTron.getItems = function() {
  const jumbo = this.items.text(this.data.text);
  jumbo.color = this.resolve("color", this.globalTheme.primaryColor);
  jumbo.fontSize = this.resolve("fontSize", 80);
  jumbo.fontFamily = this.resolve("fontFamily", this.globalTheme.fontFamilyHeading);
  jumbo.y = this.resolve("topGap", 250);
  this.centerHorizontally(jumbo);
  return {
    items: [jumbo],
    background: this.getBackground()
  };
};
const TitleWithBullets = new BaseTemplate("titleWithBullets");
TitleWithBullets.data = {
  title: "Welcome to SlideBuilder",
  bullet1: "Composable templates",
  bullet2: "Scriptable slides",
  bullet3: "Production-ready output",
  showAt1: 0,
  showAt2: 0,
  showAt3: 0
};
TitleWithBullets.theme = {
  titleFontSize: 100,
  titleTopGap: 40,
  bulletsTopGap: 110,
  bulletGap: 50,
  bulletFontSize: 80
};
TitleWithBullets.getItems = function() {
  const result = [];
  const title = this.items.text(this.data.title);
  title.color = this.resolve("titleColor", this.globalTheme.primaryColor);
  title.fontSize = this.resolve("titleFontSize", 100);
  title.y = this.resolve("titleTopGap", 40);
  this.centerHorizontally(title);
  result.push(title);
  const bullet1 = this.items.text(this.data.bullet1 || "");
  bullet1.color = this.globalTheme.bulletColor;
  bullet1.fontSize = this.resolve("bulletFontSize", 80);
  this.placeBelow(bullet1, title, this.resolve("bulletsTopGap", 110));
  this.centerHorizontally(bullet1);
  bullet1.textAlign = "center";
  bullet1.showAt = this.data.showAt1;
  result.push(bullet1);
  const bullet2 = this.items.text(this.data.bullet2 || "");
  bullet2.color = this.globalTheme.bulletColor;
  bullet2.fontSize = bullet1.fontSize;
  this.placeBelow(bullet2, bullet1, this.resolve("bulletGap", 50));
  this.centerHorizontally(bullet2);
  bullet2.textAlign = "center";
  bullet2.showAt = this.data.showAt2;
  result.push(bullet2);
  const bullet3 = this.items.text(this.data.bullet3 || "");
  bullet3.color = this.globalTheme.bulletColor;
  bullet3.fontSize = bullet1.fontSize;
  this.placeBelow(bullet3, bullet2, this.resolve("bulletGap", 50));
  this.centerHorizontally(bullet3);
  bullet3.textAlign = "center";
  bullet3.showAt = this.data.showAt3;
  result.push(bullet3);
  return {
    items: result,
    background: this.getBackground()
  };
};
function getBarGraph({
  x = 0,
  y = 0,
  width = 400,
  height = 200,
  values = [],
  labels = [],
  barColor = "#3399ff",
  barSpacing = 20,
  fontSize = 20,
  maxValue = Math.max(...values)
}) {
  const items = [];
  const barCount = values.length;
  if (barCount === 0)
    return items;
  const barWidth = (width - barSpacing * (barCount - 1)) / barCount;
  for (let i = 0; i < barCount; i++) {
    const value = values[i];
    const label = labels[i] || "";
    const barHeight = value / maxValue * height;
    const barX = x + i * (barWidth + barSpacing);
    const barY = y + (height - barHeight);
    const rect2 = getRect({
      x: barX,
      y: barY,
      width: barWidth,
      height: barHeight,
      fill: barColor
    });
    const text2 = getText(label);
    text2.x = barX + barWidth / 2 - (text2.width || 100) / 2;
    text2.y = y + height + 10;
    text2.fontSize = fontSize;
    text2.color = "#333";
    text2.padding = 0;
    text2.backgroundColor = null;
    items.push(rect2, text2);
  }
  return items;
}
const testVisuals = new BaseTemplate("testVisuals");
testVisuals.data = {};
testVisuals.theme = {};
testVisuals.getItems = function() {
  const items = [];
  const text2 = this.items.text("Visual Test Slide");
  text2.x = 100;
  text2.y = 40;
  text2.fontSize = 40;
  text2.color = "#1a1a1a";
  text2.backgroundColor = "#f0f0f0";
  text2.padding = 10;
  const rect2 = this.items.rect({
    x: 100,
    y: 120,
    width: 250,
    height: 120,
    fill: "#ffe4b5",
    borderColor: "#cc7722",
    borderWidth: 4
  });
  const circle2 = this.items.circle({
    x: 450,
    y: 180,
    radius: 60,
    fill: "#add8e6",
    borderColor: "#00008b",
    borderWidth: 3
  });
  const image = this.items.image({
    x: 650,
    y: 100,
    width: 200,
    height: 150,
    src: "images/atom.png"
  });
  const barItems = getBarGraph({
    x: 100,
    y: 320,
    width: 600,
    height: 200,
    values: [30, 50, 70, 90, 60],
    labels: ["A", "B", "C", "D", "E"],
    barColor: "green"
  });
  items.push(text2, rect2, circle2, image, ...barItems);
  testVisuals.setBackground({
    backgroundImage: null,
    pattern: {
      type: "grid",
      cellWidth: 50,
      cellHeight: 50,
      lineColor: "#cccccc",
      lineWidth: 1
    }
  });
  return {
    items,
    background: this.getBackground()
  };
};
const Templates = {
  JumboTron,
  TitleWithBullets,
  TestVisuals: testVisuals
};
const deck = new DeckBuilder({ globalTheme: blueEducation });
deck.add(10, Templates.JumboTron);
const slide2 = Templates.TitleWithBullets;
slide2.data = {
  title: "Welcome To Presentation",
  bullet1: "What is taleem.help",
  bullet2: "Vision",
  bullet3: "Products",
  showAt1: 15,
  showAt2: 20,
  showAt3: 25
};
deck.add(30, slide2);
deck.add(40, Templates.TestVisuals);
const slidesData = deck.build();
const css = {
  code: "body{background:#2e2e30}",
  map: null
};
const FOOT_H = 60;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canvasEl;
  slidesData.slides.at(-1).endTime;
  onDestroy(() => {
    return;
  });
  $$result.css.add(css);
  return ` <div class="mb-8">${`<div class="text-sm text-yellow-400 px-4 py-1 font-mono" data-svelte-h="svelte-yuaaw1">Loading audio...</div>`}</div> <canvas style="display:block;margin:0 auto;"${add_attribute("this", canvasEl, 0)}></canvas> <div style="${"height:" + escape(FOOT_H, true) + "px"}"></div>`;
});
export {
  Page as default
};
