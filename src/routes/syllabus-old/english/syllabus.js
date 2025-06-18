import { slideTypes, TcodeSyllabus } from "../TcodeSyllabus/index";

const syllabus = new TcodeSyllabus("english_test");
syllabus.description = "Test syllabus for English subject";
syllabus.image = "/tcodes/fbise9math.webp";
syllabus.link = "/syllabus/english";

const chapter = syllabus.addChapter("Introduction to Literature");

const exercise = chapter.addEx("basic_literary_terms");

exercise
  .addQ(slideTypes.video, 1, "What is a metaphor?")
  .addQ(slideTypes.md, 2, "Difference between simile and metaphor");

export const englishTest = syllabus.toJSON();
