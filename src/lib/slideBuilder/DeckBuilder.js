
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


  add(slide) {
    if (!slide.startTime) slide.startTime = this.currentTime;
    if (!slide.endTime) slide.endTime = slide.startTime + this.defaultDuration;
  
    this.currentTime = slide.endTime;
    this.slides.push(slide);
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

 
}
