// mockSyllabus.js

import { TcodeSyllabus, slideTypes } from "../TcodeSyllabus/index.js";

const mockSyllabus = new TcodeSyllabus("mockSyllabus");

mockSyllabus.description = "Mock Giant Syllabus";
mockSyllabus.image = "/tcodes/fbise10math.webp";
mockSyllabus.link = "/syllabus/mockSyllabus";


// Slide types to rotate through
const types = [slideTypes.eq, slideTypes.video, slideTypes.quiz, slideTypes.md];
const parts = ["", "a", "b", "c"];

for (let ch = 1; ch <= 5; ch++) {
  const chapter = mockSyllabus.addChapter(ch, `Chapter ${ch}`, `Description for Chapter ${ch}`);

  const numExercises = Math.floor(Math.random() * 5) + 1; // 1 to 5 exercises
  for (let ex = 1; ex <= numExercises; ex++) {
    const exLabel = `${ch}.${ex}`;
    const exercise = chapter.addEx(exLabel);

    const numQs = Math.floor(Math.random() * 10) + 1; // 1 to 10 questions
    for (let qNo = 1; qNo <= numQs; qNo++) {
      const type = types[(qNo - 1) % types.length];
      const part = parts[qNo % parts.length];
      exercise.addQ(type, qNo, part);
    }
  }
}

export default mockSyllabus;
