
export class SyllabusBase {
    constructor({ name = "", description = "", image = "", color = "", tag = "" } = {}) {
      this.name = name;
      this.description = description;
      this.image = image;
      this.color = color;
      this.tag = tag;
    }
  
    heroData() {
      return {
        name: this.name,
        description: this.description,
        image: this.image,
        color: this.color,
        tag: this.tag
      };
    }
  }
  