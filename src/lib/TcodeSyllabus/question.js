

export class Question{

    constructor(tcodeName,chapter,exercise,questionNo,questionType, questionPart = "") {
        this.tcodeName = tcodeName;
        this.chapter = chapter;
        this.exercise = exercise;
        this.questionNo = questionNo;
        this.questionType = questionType;
        this.questionPart = questionPart 
      }
      tcodeUrl() {
        const chapterId = typeof this.chapter === "object" ? this.chapter.id : this.chapter;
        const safeExercise = this.exercise.replace(/\./g, "_"); // file-safe
        const suffix = this.questionPart ? `${this.questionNo}${this.questionPart}` : `${this.questionNo}`;
        return `filename=${this.tcodeName}-chapter-${chapterId}-ex${safeExercise}-q${suffix}`;
      }
      
      
}