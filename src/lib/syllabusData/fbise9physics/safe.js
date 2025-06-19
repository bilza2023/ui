import { SubjectBuilder } from "syllabusobject";

const sb = new SubjectBuilder({
  tcodeName: "fbise9physics",
  filename: "fbise9physics",
  description: "Federal Board Grade 9 Physics",
  image: "/images/fbise9physics.png",
  chapters: [
    {
      filename: "ch1_motion",
      name: "Motion",
      exercises: [
        { filename: "ex1_intro", name: "Introduction" },
        { filename: "ex2_numericals", name: "Numericals" }
      ]
    }
  ]
});

// Add a few questions
sb.getChExByFilename("ch1_motion", "ex1_intro").addQuestion({
  filename: "q001_velocity",
  name: "Define velocity",
  type: "md"
});

sb.getChExByFilename("ch1_motion", "ex1_intro").addQuestion({
  filename: "q002_acceleration",
  name: "Define acceleration",
  type: "md"
});

sb.bulkAddQuestions([
  {
    chapter: "ch1_motion",
    exercise: "ex2_numericals",
    question: {
      filename: "q003_num1",
      name: "A car moves with constant speed...",
      type: "md"
    }
  }
]);

// Export the final syllabus
export const fbise9physics = sb.toJSON();
