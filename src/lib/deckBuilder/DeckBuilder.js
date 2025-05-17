// $lib/deckBuilder/DeckBuilder.js
import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';

export class DeckBuilder {
  constructor({ designWidth = 1020, designHeight = 576, theme = null } = {}) {
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.theme = theme;
    this.slides = [];
  }

  timeCheck(endAt) {
    if (typeof endAt !== 'number' || endAt <= 0) {
      throw new Error(`Invalid endAt: must be a positive number`);
    }
  }

  add(endAt, template) {
  
    this.timeCheck(endAt);

    // Apply global theme if available
    if (this.theme && typeof template.mapTheme === 'function') {
      template.theme = template.mapTheme(this.theme);
    }

    const items = template.getItems(template.data, template.theme);

    const slide = {
      id: template.id,
      backgroundColor: template.theme.backgroundColor ?? "#000",
      items,
      __endTime: endAt
    };

    this.slides.push(slide);
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
      return { ...cleaned, startTime, endTime };
    });

    const slidesData = {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slides: finalSlides
    };

    const result = SlidesDataSchema.safeParse(slidesData);
    if (!result.success) {
      // throw new Error(`Validation failed: ${JSON.stringify(result.error.format(), null, 2)}`);
    }

    return slidesData;
  }
}

