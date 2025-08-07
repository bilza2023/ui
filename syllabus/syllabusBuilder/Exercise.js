// src/syllabus/ExerciseExtended.js

export default class Exercise {
  constructor(name, filename) {
    this.name = name;
    this.filename = filename;
    this.questions = [];
  }

  /**
   * Add a sound-enabled slide entry.
   */
  addQuestion(name, filename, thumbnail = null, tags = []) {
    this._addEntry(name, filename, 'slide', thumbnail, tags);
    return this;
  }

  /**
   * Add a note entry.
   */
  addNote(name, filename, thumbnail = null, tags = ['note']) {
    this._addEntry(name, filename, 'note', thumbnail, tags);
    return this;
  }

  /**
   * Add a deck-only entry (no sound).
   */
  addDeck(name, filename, thumbnail = null, tags = ['deck']) {
    this._addEntry(name, filename, 'deck', thumbnail, tags);
    return this;
  }

  /**
   * Return a shallow copy of all questions.
   */
  getAllQuestions() {
    return [...this.questions];
  }

  /**
   * Serialize exercise to a JSON-ready object.
   */
  toJSON() {
    return {
      name: this.name,
      filename: this.filename,
      questions: this.questions.map(q => ({
        name: q.name,
        filename: q.filename,
        type: q.type,
        thumbnail: q.thumbnail,
        tags: q.tags
      }))
    };
  }

  /**
   * Internal helper to push an entry.
   * @private
   */
  _addEntry(name, filename, type, thumbnail, tags) {
    this.questions.push({ name, filename, type, thumbnail, tags });
  }
}

