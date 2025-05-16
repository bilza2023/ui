
// $lib/slideBuilder/DeckBuilder.js

import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';
import { titleSlideTemplate } from './templates/title-slide.js';


export class DeckBuilder {
  constructor({ designWidth = 1020, designHeight = 576, defaultDuration = 5 } = {}) {
    this.designWidth = designWidth;
    this.designHeight = designHeight;
    this.defaultDuration = defaultDuration;
    this.slides = [];
    this.currentTime = 0;
  }

  addTitle(data, duration = this.defaultDuration) {
    const slide = titleSlideTemplate({
      ...data,
      startTime: this.currentTime,
      endTime: this.currentTime + duration
    });
    this.slides.push(...slide.slides);
    this.currentTime += duration;
    return this;
  }

  addSlides(slideArray) {
    for (const slide of slideArray) {
      slide.startTime = this.currentTime;
      slide.endTime = this.currentTime + this.defaultDuration;
      this.slides.push(slide);
      this.currentTime += this.defaultDuration;
    }
    return this;
  }

  build() {
    const slidesData = {
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      slides: this.slides
    };

    const result = SlidesDataSchema.safeParse(slidesData);
    if (!result.success) {
      throw new Error(`Validation failed: ${JSON.stringify(result.error.format(), null, 2)}`);
    }

    return slidesData;
  }

  getSlides() {
    return this.slides;
  }
}
