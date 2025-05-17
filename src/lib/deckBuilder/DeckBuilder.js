// $lib/deckBuilder/DeckBuilder.js
import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';

export class DeckBuilder {
  constructor({ designWidth = 1020, designHeight = 576, globalTheme = null } = {}) {
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.globalTheme = globalTheme; // ✅ renamed for clarity
    this.slides = [];
  }

  timeCheck(endAt) {
    if (typeof endAt !== 'number' || endAt <= 0) {
      throw new Error(`Invalid endAt: must be a positive number`);
    }
  }

  add(endAt, template) {
    this.timeCheck(endAt);

    // ✅ Inject global theme only
    if (this.globalTheme) {
      template.globalTheme = this.globalTheme;
    }

    const items = template.getItems();

    const slide = {
      id: template.id,
      backgroundColor:
        template.theme?.backgroundColor ||
        this.globalTheme?.bgColor ||
        "#000",
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
