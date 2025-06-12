import { slideTypes, TcodeSyllabus } from "../TcodeSyllabus/index";

// ✅ Create syllabus programmatically
const testSyllabusObj = new TcodeSyllabus("testSyllabus");
testSyllabusObj.description = "Test syllabus based on Physics Grade 9-1";
testSyllabusObj.image = "/tcodes/fbise10physicsChapter1.webp";
testSyllabusObj.link = "/syllabus/testSyllabus";

const ch1 = testSyllabusObj.addChapter("Physical Quantities and Measurement");
ch1.image = "/tcodes/fbise10physicsChapter2.webp";

const ex1 = ch1.addEx("introduction_to_physics");
ex1.addQ(slideTypes.video, 1, "What is Physics?");
ex1.addQ(slideTypes.md, 2, "Importance of Measurement");
ex1.addQ(slideTypes.eq, 3, "SI Units Conversion");

const ex2 = ch1.addEx("measurement_tools");
ex2.addQ(slideTypes.video, 1, "Using Vernier Calipers");
ex2.addQ(slideTypes.md, 2, "Measurement Errors");
ex2.addQ(slideTypes.eq, 3, "Practice Problem: Measurement");

export const testSyllabus = testSyllabusObj.toJSON();
