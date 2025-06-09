// fakeSyllabus.js

import {TcodeSyllabus,slideTypes} from "../TcodeSyllabus/index";

// ✅ Create syllabus for fbise9math

const fbise9physics = new TcodeSyllabus("fbise9physics");
fbise9physics.description("Grade 9 Mathematics (FBISE)");

const chapter1 = fbise9physics.addChapter(1, "Physical Quantities");

// Exercise 1.1 → Questions 1, 2
const ex1_1 = chapter1.addEx("1.1");
ex1_1.addQ(slideTypes.eq ,1);
ex1_1.addQ(slideTypes.eq ,2);

// Exercise 1.2 → Questions 1, 3 (Q2 is skipped)
const ex1_2 = chapter1.addEx("1.2");
ex1_2.addQ(slideTypes.eq,1);
ex1_2.addQ(slideTypes.eq,3);

// ✅ Output syllabus structure
// console.log(JSON.stringify(fbise9physics.toJSON(), null, 2));

export default fbise9physics;
