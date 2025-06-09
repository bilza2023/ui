import { Exercise } from "./exercise.js";
import { SyllabusBase } from "./SyllabusBase.js";

export class Chapter extends SyllabusBase {
  constructor(id, title, description, tcodeName) {
    super({
      name: title,
      description,
      image: "/images/chapter-banner.webp",
      color: "#2c3e50",
      tag: `Chapter ${id}`
    });

    this.id = id;
    this.tcodeName = tcodeName;
    this.exercisesMap = new Map();
  }

  addEx(name) {
    if (this.exercisesMap.has(name)) return this.exercisesMap.get(name);
    // const ex = new Exercise(name, this.tcodeName, this.id);
    const ex = new Exercise(name, this.tcodeName, this);
    this.exercisesMap.set(name, ex);
    return ex;
  }

  getEx(name) {
    if (!this.exercisesMap.has(name)) throw new Error(`Exercise ${name} not found`);
    return this.exercisesMap.get(name);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.name,
      description: this.description,
      exercises: Array.from(this.exercisesMap.values()).map(ex => ex.toJSON())
    };
  }
}
