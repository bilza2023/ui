
import { SlidesDataSchema } from '../schemas/zod-items-schema-16may2025.js';

let globalIdCounter = 0;

export class BaseTemplate {
  constructor(startTime=0,endTime=5, globalTheme = null) {

    this._id = `template_${globalIdCounter++}`;
    this.data = {};
    this.theme = {};

    this.canvasWidth = 1020;
    this.itemWidth = 800; // this is only place to edit

    this.slide = {
      id: this._id,
      backgroundColor: "#000000",
      startTime:0,
      endTime:5,
      items: []
    };

    if (globalTheme) this.applyTheme(globalTheme);
  }

  mapTheme(globalTheme) {
    return {};
  }

  applyTheme(globalTheme) {
    const mapped = this.mapTheme(globalTheme);
    this.theme = {
      ...mapped,
      ...this.theme
    };
  }

  add(item) {
    this.slide.items.push(item);
    return this;
  }

  build() {
    this.slide.backgroundColor = this.theme.backgroundColor ?? "#000";
    
    const result = SlidesDataSchema.shape.slides.element.safeParse(this.slide);
    if (!result.success) {
      throw new Error(`Validation failed: ${JSON.stringify(result.error.format(), null, 2)}`);
    }

    return this.slide;
  }
}
