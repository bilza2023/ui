// fakeSyllabus.js

import { TcodeSyllabus, slideTypes } from "../TcodeSyllabus/index";


const fbise10physics = new TcodeSyllabus("fbise10physics");

fbise10physics.description = "Grade 10 Physics",
fbise10physics.image = "/tcodes/fbise10math.webp",
fbise10physics.link =  "/syllabus/fbise10physics"

// ---- Chapter 1 ----
const chapter1 = fbise10physics.addChapter(1, "Basics Physics", "Physics...");
const ex1_1 = chapter1.addEx("1.1");
ex1_1.addQ(slideTypes.video, 1);

const ex1_2 = chapter1.addEx("1.2");
ex1_2.addQ(slideTypes.eq, 1);

// ---- Chapter 2 ----
// const chapter2 = fbise9physics.addChapter(2, "Kinematics", "The motion of objects without looking at the forces that cause the motion.");
// const ex2_1 = chapter2.addEx("2.1");
// ex2_1.addQ(slideTypes.eq, 1);
// ex2_1.addQ(slideTypes.eq, 2);
// ex2_1.addQ(slideTypes.eq, 4);

// const ex2_2 = chapter2.addEx("2.2");
// ex2_2.addQ(slideTypes.eq, 1);
// ex2_2.addQ(slideTypes.eq, 2);

// // ---- Chapter 3 ----
// const chapter3 = fbise9physics.addChapter(3, "Dynamics", "Understanding motion and forces via Newton’s laws.");
// const ex3_1 = chapter3.addEx("3.1");
// ex3_1.addQ(slideTypes.eq, 1);
// ex3_1.addQ(slideTypes.eq, 3);
// ex3_1.addQ(slideTypes.eq, 5);

// // ---- Chapter 4 ----
// const chapter4 = fbise9physics.addChapter(4, "Turning Effect of Forces", "Torque and equilibrium in levers and tools.");
// const ex4_1 = chapter4.addEx("4.1");
// ex4_1.addQ(slideTypes.eq, 1);
// ex4_1.addQ(slideTypes.eq, 2);

// // ---- Chapter 5 ----
// const chapter5 = fbise9physics.addChapter(5, "Gravitation", "Gravity, orbits, weight, and mass in space and Earth.");
// const ex5_1 = chapter5.addEx("5.1");
// ex5_1.addQ(slideTypes.eq, 1);
// ex5_1.addQ(slideTypes.eq, 2);
// ex5_1.addQ(slideTypes.eq, 3);

// ✅ Done
export default fbise10physics;
