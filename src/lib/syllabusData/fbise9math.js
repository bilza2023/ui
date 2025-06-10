import { TcodeSyllabus, slideTypes } from "../TcodeSyllabus/index.js";

const syllabus = new TcodeSyllabus("fbise9math");

syllabus.description = "FBISE Class 9 Mathematics";
syllabus.image = "/tcodes/box.webp";
syllabus.link = "/syllabus/fbise9math";

// Chapters and sample exercises
const ch1 = syllabus.addChapter(1, "Matrices and Determinants");
const ex1_1 = ch1.addEx("1.1");
ex1_1.addQ(slideTypes.eq, 1);  // Example question 1
ex1_1.addQ(slideTypes.video, 2);         // Q2: a video explanation
ex1_1.addQ(slideTypes.eq, 3, "a");       // Q3a: an equation-based question
ex1_1.addQ(slideTypes.eq, 3, "b");       // Q3b: part of same question
ex1_1.addQ(slideTypes.quiz, 4);         // Q4: a quiz interaction
ex1_1.addQ(slideTypes.md, 5);           // Q5: maybe notes or theory in markdown

///////////////////////////////////////////////////
const ex1_2 = ch1.addEx("1.2");

const ch2 = syllabus.addChapter(2, "Real and Complex Numbers");
ch2.addEx("2.1");
ch2.addEx("2.2");

const ch3 = syllabus.addChapter(3, "Logarithms");
ch3.addEx("3.1");
ch3.addEx("3.2");

const ch4 = syllabus.addChapter(4, "Algebraic Expressions and Algebraic Formulas");
ch4.addEx("4.1");
ch4.addEx("4.2");

const ch5 = syllabus.addChapter(5, "Factorization");
ch5.addEx("5.1");
ch5.addEx("5.2");

const ch6 = syllabus.addChapter(6, "Algebraic Manipulations");
ch6.addEx("6.1");
ch6.addEx("6.2");

const ch7 = syllabus.addChapter(7, "Linear Equations and Inequalities");
ch7.addEx("7.1");
ch7.addEx("7.2");

const ch8 = syllabus.addChapter(8, "Linear Graphs and Their Applications");
ch8.addEx("8.1");
ch8.addEx("8.2");

const ch9 = syllabus.addChapter(9, "Introduction to Coordinate Geometry");
ch9.addEx("9.1");
ch9.addEx("9.2");

const ch10 = syllabus.addChapter(10, "Congruent Triangles");
ch10.addEx("10.1");
ch10.addEx("10.2");

const ch11 = syllabus.addChapter(11, "Parallelograms and Triangles");
ch11.addEx("11.1");
ch11.addEx("11.2");

const ch12 = syllabus.addChapter(12, "Line Bisectors and Angle Bisectors");
ch12.addEx("12.1");
ch12.addEx("12.2");

const ch13 = syllabus.addChapter(13, "Sides and Angles of a Triangle");
ch13.addEx("13.1");
ch13.addEx("13.2");

const ch14 = syllabus.addChapter(14, "Ratio and Proportion");
ch14.addEx("14.1");
ch14.addEx("14.2");

const ch15 = syllabus.addChapter(15, "Pythagoras Theorem");
ch15.addEx("15.1");
ch15.addEx("15.2");

const ch16 = syllabus.addChapter(16, "Theorems Related with Area");
ch16.addEx("16.1");
ch16.addEx("16.2");

const ch17 = syllabus.addChapter(17, "Practical Geometry-Triangles");
ch17.addEx("17.1");
ch17.addEx("17.2");

// 🧾 Export
export default syllabus;
