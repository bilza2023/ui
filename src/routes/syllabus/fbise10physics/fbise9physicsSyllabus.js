

  import { slideTypes, TcodeSyllabus } from "../TcodeSyllabus/index";

  // ✅ Create syllabus programmatically
  const syllabusBuilder = new TcodeSyllabus("fbise10physics");
  syllabusBuilder.description = "Grade 10 Physics";
  syllabusBuilder.image = "/tcodes/fbise10physicsChapter2.webp";
  syllabusBuilder.link = "/syllabus/fbise10physics";

  const ch1 = syllabusBuilder.addChapter("Physical Quantities and Measurement");
  ch1.image = "/tcodes/fbise10physicsChapter1.webp";
  const ex1 = ch1.addEx("introduction_to_physics");
  ex1.addQ(slideTypes.video, 1,"some name for question");
  
  ex1.addQ(slideTypes.md, 2);
  ex1.addQ(slideTypes.eq, 3);
  //  console.log("syllabusBuilder.toJSON()" ,syllabusBuilder.toJSON());
  export const fbise10physics =  syllabusBuilder.toJSON(); //✅ export in Gold Standard JSON

  