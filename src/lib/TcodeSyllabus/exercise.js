import { Question } from "./question.js";
import { SyllabusBase } from "./SyllabusBase.js";

export class Exercise extends SyllabusBase {
  constructor(exercise, tcodeName, chapter) {
    super({
      name: `Exercise ${exercise}`,
      description: "",
      image: "/tcodes/exercise-banner.webp",
      color: "#4b2e83",
      tag: `Exercise ${exercise}`
    });

    this.exercise = exercise;
    this.chapterId = chapter.id;
    this.tcodeName = tcodeName;
    this.questions = [];
  }

  addQ(questionType, questionNo, questionPart = "") {
    const q = new Question(this.tcodeName, this.chapterId, this.exercise, questionNo, questionType, questionPart);
    this.questions.push(q);
    return this;
  }

  toJSON() {
    return {
      exercise: this.exercise,
      questions: this.questions.map(q => ({
        ...q,
        name: q.tcodeName + " " + q.chapterId + " " + q.exercise + " " + q.questionNo + " " + (q.questionPart || ""),
        tcodeUrl: (() => {
          const safeExercise = q.exercise.replace(/\./g, "_");
          const suffix = q.questionPart ? `${q.questionNo}${q.questionPart}` : `${q.questionNo}`;
          return `filename=${q.tcodeName}-chapter-${q.chapterId}-ex${safeExercise}-q${suffix}`;
        })()
      }))
    };
  }
  
}
