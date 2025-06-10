import { Chapter } from "./chapter.js";

export default class TcodeSyllabus  {
  constructor(tcodeName="defaultName") {
    this.tcodeName = tcodeName;//maynot be required--10jun
    this.description = "";
    this.image = "";
    this.color = "";
    this.link  = "" ;
    this.chaptersMap = new Map();

  }

//add image later--add chapter has nothing to do with image add that later
  addChapter(id, title = `Chapter ${id}`, description = "") {
    if (this.chaptersMap.has(id)) return this.chaptersMap.get(id);
 
    const chapter = new Chapter(id, title, description, this.tcodeName);
  
    this.chaptersMap.set(id, chapter);
    return chapter;
  }
  

  chapters(id) {
    if (!this.chaptersMap.has(id)) throw new Error(`Chapter ${id} not found`);
    return this.chaptersMap.get(id);
  }

  qsInChapter(chapterId) {
    const chapter = this.chapters(chapterId);
    const allQs = [];
    for (const ex of chapter.exercisesMap.values()) {
      allQs.push(...ex.questions);
    }
    return allQs;
  }

  qsInExercise(chapterId, exerciseId) {
    const chapter = this.chapters(chapterId);
    const ex = chapter.getEx(exerciseId);
    return ex.questions;
  }

  q(chapterId, exerciseId, questionNo, questionPart = "") {
    const questions = this.qsInExercise(chapterId, exerciseId);
    return questions.find(q =>
      q.questionNo === questionNo &&
      (q.questionPart || "") === questionPart
    );
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      chapters: Array.from(this.chaptersMap.values()).map(ch => ch.toJSON())
    };
  }
}
