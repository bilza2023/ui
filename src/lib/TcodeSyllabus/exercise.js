import {Question} from "./question";

export class Exercise {
    constructor(exercise,tcodeName,chapter) {
      this.exercise = exercise;
      this.chapter = chapter;
      this.tcodeName = tcodeName;
      this.questions = [];
    }
  
    addQ(questionType,questionNo, questionPart = "") {
      const q = new Question(this.tcodeName,this.chapter,this.exercise,questionNo,questionType,questionPart);
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
  
  