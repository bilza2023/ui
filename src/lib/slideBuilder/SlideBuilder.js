
// editor/api/SlideBuilder.js

import { SlidesDataSchema } from './schemas/zod-items-schema-16may2025.js';
import { styleMap } from './styles/index.js';


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

  addItem(alias, text, layout = {}) {
    const style = styleMap[alias];
    if (!style) throw new Error(`Unknown style alias: ${alias}`);

    const item = {
      ...style,
      type: 'text',
      text,
      x: layout.x ?? 100,
      y: layout.y ?? 100,
      width: layout.width ?? 800,
      height: layout.height ?? 60
    };

    this.slide.items.push(item);
    return this;
  }

  build() {
    const slidesData = {
      designWidth: 1020,
      designHeight: 576,
      slides: [this.slide]
    };

    const result = SlidesDataSchema.safeParse(slidesData);
    if (!result.success) {
      throw new Error(`Validation failed: ${JSON.stringify(result.error.format(), null, 2)}`);
    }

    return slidesData;
  }
}
