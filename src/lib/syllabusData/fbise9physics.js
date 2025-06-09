// fakeSyllabus.js

import { TcodeSyllabus, slideTypes } from "../TcodeSyllabus/index";

// ✅ Create syllabus for fbise9physics

const fbise9physics = new TcodeSyllabus("fbise9physics");

// 🛠️ FIXED: assign description as a property (not a method)
fbise9physics.description = "Grade 9 Physics (FBISE)";

const chapter1 = fbise9physics.addChapter(1, "Physical Quantities","Chapter Description");

// Exercise 1.1 → Questions 1, 2
const ex1_1 = chapter1.addEx("1.1");
ex1_1.addQ(slideTypes.eq, 1);
ex1_1.addQ(slideTypes.eq, 2);

// Exercise 1.2 → Questions 1, 3 (Q2 is skipped)
const ex1_2 = chapter1.addEx("1.2");
ex1_2.addQ(slideTypes.eq, 1);
ex1_2.addQ(slideTypes.eq, 3);

// ✅ Output syllabus structure
console.log((fbise9physics.toJSON(), null, 2));

export default fbise9physics;
