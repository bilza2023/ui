// $lib/deckBuilder/DeckBuilder.js
import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';

export class DeckBuilder {
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
      id: template.id,
      backgroundColor:
        template.theme?.backgroundColor ??
        this.globalTheme?.bgColor ??
        "#000",
      items,
      background,
      __endTime: endAt
    };

    this.slides.push(slide);
  }

build() {
  const finalSlides = finalizeSlides(this.slides);

  const slidesData = {
    designWidth: this.designWidth,
    designHeight: this.designHeight,
    slides: finalSlides
  };

  const result = SlidesDataSchema.safeParse(slidesData);
  if (!result.success) {
    const formatted = formatZodError(result.error.format());
    throw new Error(`Validation failed:\n${formatted}`);
  }
  

  return slidesData;
}

}

// ------------------------
// 🧩 Utility functions
// ------------------------

function timeCheck(endAt) {
  if (typeof endAt !== 'number' || endAt <= 0) {
    throw new Error(`Invalid endAt: must be a positive number`);
  }
}

function injectGlobalTheme(template, globalTheme) {
  if (globalTheme) {
    template.globalTheme = structuredClone(globalTheme);
  }
}

function injectGlobalBackground(template, globalBackground) {
  if (template.getBackground?.() === null && globalBackground) {
    template.setBackground(structuredClone(globalBackground));
  }
}

function finalizeSlides(slides) {
  let lastEnd = 0;

  return slides.map((slide, index) => {
    const endTime = slide.__endTime;

    if (typeof endTime !== 'number' || isNaN(endTime)) {
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

function formatZodError(errorFormat) {
  const lines = [];

  for (const key in errorFormat) {
    if (key === "_errors") continue;

    const field = errorFormat[key];
    if (field && Array.isArray(field._errors) && field._errors.length > 0) {
      lines.push(`• ${key}: ${field._errors.join(", ")}`);
    }
  }

  return lines.join("\n");
}
