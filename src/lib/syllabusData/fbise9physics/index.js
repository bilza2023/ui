import { questionTypes, Tcode } from "syllabusobject";


export const fbise9physics = new Tcode("fbise9physics");

fbise9physics.name = "Physics 9";
fbise9physics.image = "pivot/box.webp";
fbise9physics.description = "FBISE Grade 9 Physics";
fbise9physics.link = "/syllabus/fbise9physics";

// Add Chapter
const ch1 = fbise9physics.addChapter({ name: "Kinematics" });

ch1.image = "/pivot/box.webp";

const ex1 = ch1.addExercise({ name: "Introduction" });

ex1.addQuestion("md", "Define velocity", 1);
ex1.addQuestion("md", "Give examples of uniform motion", 2, "a");

const ch2 = fbise9physics.addChapter({ name: "Dynamics" });
ch2.image = "/pivot/banner_brand.png";

const ex2 = ch2.addExercise({ name: "Newton's Laws" });

ex2.addQuestion("slide", "State Newton's Second Law", 1);
