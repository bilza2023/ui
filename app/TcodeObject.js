
// fbise9math.js

export default class TcodeObject {
    constructor(name) {
      this.name = name;
      this.descriptionText = "";
      this.chaptersMap = new Map();
    }
  
    description(text) {
      this.descriptionText = text;
    }
  
    addChapter(id, title = `Chapter ${id}`, description = "") {
      if (this.chaptersMap.has(id)) return this.chaptersMap.get(id);
      const chapter = new Chapter(id, title, description);
      this.chaptersMap.set(id, chapter);
      return chapter;
    }
  
    chapters(id) {
      if (!this.chaptersMap.has(id)) throw new Error(`Chapter ${id} not found`);
      return this.chaptersMap.get(id);
    }
  
    toJSON() {
      return {
        name: this.name,
        description: this.descriptionText,
        chapters: Array.from(this.chaptersMap.values()).map(ch => ch.toJSON())
      };
    }
  }
  
  class Chapter {
    constructor(id, title, description) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.exercisesMap = new Map();
    }
  
    addEx(name) {
      if (this.exercisesMap.has(name)) return this.exercisesMap.get(name);
      const ex = new Exercise(name);
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
        title: this.title,
        description: this.description,
        exercises: Array.from(this.exercisesMap.values()).map(ex => ex.toJSON())
      };
    }
  }
  
  class Exercise {
    constructor(name) {
      this.name = name;
      this.questions = [];
    }
  
    addQ(data) {
      this.questions.push(data);
    }
  
    toJSON() {
      return {
        name: this.name,
        questions: this.questions
      };
    }
  }
  
  