
import {Exercise } from "./exercise";

export class Chapter {
    constructor(id, title, description,tcodeName) {
      this.id = id;
      this.tcodeName = tcodeName;
      this.title = title;
      this.description = description;
      this.exercisesMap = new Map();
    }
  
    addEx(name) {
      if (this.exercisesMap.has(name)) return this.exercisesMap.get(name);
      const ex = new Exercise(name,this.tcodeName,this.id);
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
  