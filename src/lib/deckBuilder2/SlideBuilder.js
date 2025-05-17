// editor/api/SlideBuilder.js

import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';

export class SlideBuilder {
  constructor({ id, startTime, endTime, backgroundColor = '#000000' }) {
    this.slide = {
      id,
      startTime,
      endTime,
      backgroundColor,
      items: []
    };
  }

  // Clean method to push full item objects
  add(item) {
    this.slide.items.push(item);
    return this;
  }

  // build() {
  //   const result = SlidesDataSchema.shape.slides.element.safeParse(this.slide);
  //   if (!result.success) {
  //     throw new Error(`Validation failed: ${JSON.stringify(result.error.format(), null, 2)}`);
  //   }

  //   return this.slide;
  // }
}
