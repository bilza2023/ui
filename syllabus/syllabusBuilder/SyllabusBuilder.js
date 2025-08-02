
// SyllabusBuilder.js
// Helper to programmatically build syllabus JSON in nested format
import Exercise from "./Exercise.js";

 class SyllabusBuilder {
    constructor() {
      this.tcodeMap = new Map();
    }
  
    /**
     * Add a new tcode (top-level syllabus)
     * @param {string} tcodeName - unique identifier for the syllabus
     * @param {object} meta - metadata for the tcode
     * @param {string} meta.description
     * @param {string} meta.image
     * @returns {Tcode}
     */
    addTcode(tcodeName, { description = "", image = "" } = {}) {
      if (this.tcodeMap.has(tcodeName)) {
        throw new Error(`Tcode '${tcodeName}' already exists.`);
      }
      const tcode = new Tcode(tcodeName, { description, image });
      this.tcodeMap.set(tcodeName, tcode);
      return tcode;
    }
  
    /**
     * Retrieve an existing tcode by name
     * @param {string} tcodeName
     * @returns {Tcode}
     */
    getTcode(tcodeName) {
      const tcode = this.tcodeMap.get(tcodeName);
      if (!tcode) {
        throw new Error(`Tcode '${tcodeName}' not found.`);
      }
      return tcode;
    }
 
      /**
   * Build and return the final nested JSON *array* of all tcodes
   * @returns {Array<object>}
   */
  build() {
    // take each Tcode instance, call toJSON(), collect into an array
    return Array.from(this.tcodeMap.values())
                .map(tcode => tcode.toJSON());
  }

  }
/////////////////////////////////////////////////////  
  class Tcode {
    constructor(tcodeName, { description = "", image = "" } = {}) {
      this.tcodeName = tcodeName;
      this.filename = tcodeName;
      this.description = description;
      this.image = image;
      this.chapters = [];
      this.chapterMap = new Map();
    }
  
    /**
     * Add a chapter under this tcode
     * @param {string} name
     * @param {string} filename
     * @returns {Chapter}
     */
    addChapter(name, filename) {
      if (this.chapterMap.has(filename)) {
        throw new Error(`Chapter '${filename}' already exists.`);
      }
      const chapter = new Chapter(name, filename);
      this.chapters.push(chapter);
      this.chapterMap.set(filename, chapter);
      return chapter;
    }
  
    /**
     * Get a chapter by filename
     * @param {string} filename
     * @returns {Chapter}
     */
    getChapter(filename) {
      const chapter = this.chapterMap.get(filename);
      if (!chapter) {
        throw new Error(`Chapter '${filename}' not found.`);
      }
      return chapter;
    }
  
    /**
     * Convert to plain JSON structure
     * @returns {object}
     */
    toJSON() {
      return {
        tcodeName: this.tcodeName,
        filename: this.filename,
        description: this.description,
        image: this.image,
        chapters: this.chapters.map((c) => c.toJSON())
      };
    }
  }
  
  class Chapter {
    constructor(name, filename) {
      this.name = name;
      this.filename = filename;
      this.exercises = [];
      this.exerciseMap = new Map();
    }
  
    /**
     * Add an exercise under this chapter
     * @param {string} name
     * @param {string} filename
     * @returns {Exercise}
     */
    addExercise(name, filename) {
      if (this.exerciseMap.has(filename)) {
        throw new Error(`Exercise '${filename}' already exists.`);
      }
      const exercise = new Exercise(name, filename);
      this.exercises.push(exercise);
      this.exerciseMap.set(filename, exercise);
      return exercise;
    }
  
    /**
     * Get an exercise by filename
     * @param {string} filename
     * @returns {Exercise}
     */
    getExercise(filename) {
      const exercise = this.exerciseMap.get(filename);
      if (!exercise) {
        throw new Error(`Exercise '${filename}' not found.`);
      }
      return exercise;
    }
  
    /**
     * Convert to plain JSON structure
     * @returns {object}
     */
    toJSON() {
      return {
        name: this.name,
        filename: this.filename,
        exercises: this.exercises.map((e) => e.toJSON())
      };
    }
  }

  
  export default SyllabusBuilder;
  
  // module.exports = SyllabusBuilder