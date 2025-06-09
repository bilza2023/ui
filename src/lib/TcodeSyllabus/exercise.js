import { Question } from "./question.js";
import { SyllabusBase } from "./SyllabusBase.js";

export class Exercise extends SyllabusBase {
  constructor(exercise, tcodeName, chapter) {
    super({
      name: `Exercise ${exercise}`,
      description: "",
      image: "/images/exercise-banner.webp",
      color: "#4b2e83",
      tag: `Exercise ${exercise}`
    });

    this.exercise = exercise;
    this.chapter = chapter;
    this.tcodeName = tcodeName;
    this.questions = [];
  }

  addQ(questionType, questionNo, questionPart = "") {
    const q = new Question(this.tcodeName, this.chapter, this.exercise, questionNo, questionType, questionPart);
    this.questions.push(q);
    return this;
  }

  toJSON() {
    return {
      exercise: this.exercise,
      questions: this.questions
    };
  }
}
