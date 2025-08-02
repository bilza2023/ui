

export default class Exercise {
    constructor(name, filename) {
      this.name = name;
      this.filename = filename;
      this.questions = [];
    }
  
    /**
     * Add a question-type entry (default)
     * @param {string} name      – Display label
     * @param {string} filename  – Identity anchor (deck filename)
     */
    addQuestion(name, filename) {
      this._addEntry(name, filename, "slide");
    }
  
    /**
     * Add a note-type entry
     * @param {string} name
     * @param {string} filename
     */
    addNote(name, filename) {
      this._addEntry(name, filename, "note");
    }
  
    /**
     * Private helper for all entry types
     * @param {string} name
     * @param {string} filename
     * @param {string} type
     */
    _addEntry(name, filename, type) {
      this.questions.push({ name, filename, type });
    }
  
    /**
     * Return a shallow copy of the questions array
     * @returns {Array<{name: string, filename: string, type: string}>}
     */
    getAllQuestions() {
      return [...this.questions];
    }
  
    /**
     * Serialize to plain JSON
     * @returns {object}
     */
    toJSON() {
      const json = {
        name: this.name,
        filename: this.filename
      };
      if (this.questions.length) {
        json.questions = this.questions;
      }
      return json;
    }
  }