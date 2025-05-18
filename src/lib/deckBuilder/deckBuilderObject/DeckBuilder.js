// $lib/deckBuilderObject/DeckBuilder.js

import { SlidesDataSchema } from '../schemas/zod-items-schema-16may2025.js';
import { loadTemplate } from '../templates/loadTemplate.js';

let globalIdCounter = 0;

export class DeckBuilder {
  constructor({ designWidth = 1020, designHeight = 576, globalTheme = null } = {}) {
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.globalTheme = globalTheme;
    this.slides = [];
    this._queued = []; // for possible batch mode
    this._emojiLayer = null;
    this._globalBackground = null;
  }

  clear() {
    this.slides = [];
    globalIdCounter = 0;
  }

  setGlobalBackground(background) {
    this._globalBackground = background;
  }

  setEmojiLayer(emojiLayer) {
    this._emojiLayer = emojiLayer;
  }

  timeCheck(endAt) {
    if (typeof endAt !== 'number' || endAt <= 0) {
      throw new Error(`Invalid endAt: must be a positive number`);
    }
  }

  add(endAt, templateName, slideName = null) {
    this.timeCheck(endAt);

    const proxy = {
      data: (data = {}) => {
        const template = loadTemplate(templateName, data);
        template.id = slideName || `template_${globalIdCounter++}`;
        template.globalTheme = this.globalTheme;

        const { items, background } = template.getItems(template.data, this.globalTheme);

        const slide = {
          id: template.id,
          backgroundColor:
            template.theme?.backgroundColor ||
            this.globalTheme?.bgColor ||
            '#000',
          items,
          background: background || this._globalBackground || null,
          __endTime: endAt
        };

        this.slides.push(slide);
        return proxy;
      },

      theme: (theme = {}) => {
        proxy._theme = theme;
        return proxy;
      }
    };

    return proxy;
  }

  build() {
    let lastEnd = 0;

    const finalSlides = this.slides.map((slide, index) => {
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
      const finalized = { ...cleaned, startTime, endTime };

      if (this._emojiLayer) {
        finalized.emojiLayer = this._emojiLayer;
      }

      return finalized;
    });

    const slidesData = {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slides: finalSlides
    };

    const result = SlidesDataSchema.safeParse(slidesData);
    if (!result.success) {
      throw new Error("Validation failed:\n" + JSON.stringify(result.error.format(), null, 2));
    }

    return slidesData;
  }
} 
