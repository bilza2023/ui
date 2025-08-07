// src/syllabus/SyllabusBuilderExtended.js
import Exercise from './Exercise.js';

export default class SyllabusBuilder {
  constructor() {
    this.tcodes = [];
  }

  /**
   * Add a new top-level syllabus code (course).
   */
  addTcode(code, options) {
    const tcode = new Tcode(code, options);
    this.tcodes.push(tcode);
    return tcode;
  }

  /**
   * Build final JSON output for all tcodes.
   */
  build() {
    return this.tcodes.map(tc => tc.toJSON());
  }
}

class Tcode {
  constructor(code, { description, image = null }) {
    this.code = code;
    this.description = description;
    this.image = image;
    this.chapters = [];
  }

  addChapter(name, filename) {
    const chapter = new Chapter(name, filename);
    this.chapters.push(chapter);
    return chapter;
  }

  toJSON() {
    return {
      tcodeName: this.code,            // renamed to match consumer lookup
      description: this.description,
      image: this.image,
      chapters: this.chapters.map(ch => ch.toJSON())
    };
  }
}

class Chapter {
  constructor(name, filename) {
    this.name = name;
    this.filename = filename;
    this.exercises = [];
  }

  addExercise(name, filename) {
    const exercise = new Exercise(name, filename);
    this.exercises.push(exercise);
    return exercise;
  }

  toJSON() {
    return {
      name: this.name,
      filename: this.filename,
      exercises: this.exercises.map(ex => ex.toJSON())
    };
  }
}