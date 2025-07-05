
//GPT- attention EXAMPLE format for syllaus 
//fbise9physics.js

import { TcodeSyllabus, slideTypes } from "../TcodeSyllabus/index";

const fbise9physics = new TcodeSyllabus("fbise9physics");

fbise9physics.description = "Grade 9 Physics (FBISE)",
fbise9physics.image = "/tcodes/box.webp",
fbise9physics.link =  "/syllabus/fbise9physics"

// ---- Chapter 1 ----
const chapter1 = fbise9physics.addChapter(
  1,
  "Physical Quantities and Measurement",
  "How we measure the world using physical quantities."
);

// 🔹 Section 1.1: Introduction to Physics
const ex1_1 = chapter1.addEx("Introduction to Physics");
ex1_1.addQ(slideTypes.video, 1); // What is Physics?
ex1_1.addQ(slideTypes.md, 2);    // Branches of Physics
ex1_1.addQ(slideTypes.md, 3);    // Importance of Physics in Daily Life

// 🔹 Section 1.2: Physical Quantities
const ex1_2 = chapter1.addEx("Physical Quantities");
ex1_2.addQ(slideTypes.eq, 1);    // Physical Quantities – Definition
ex1_2.addQ(slideTypes.eq, 2);    // Base and Derived Quantities
ex1_2.addQ(slideTypes.eq, 3);    // Units and SI System
ex1_2.addQ(slideTypes.eq, 4);    // Scientific Notation
ex1_2.addQ(slideTypes.eq, 5);    // Prefixes (micro, milli, kilo, etc.)

// 🔹 Section 1.3: Measurement Tools
const ex1_3 = chapter1.addEx("Measurement Tools");
ex1_3.addQ(slideTypes.video, 1); // Introduction to Measuring Instruments
ex1_3.addQ(slideTypes.eq, 2);    // Vernier Calipers – Use & Accuracy
ex1_3.addQ(slideTypes.eq, 3);    // Screw Gauge – Function & Precision

// 🔹 Section 1.4: Errors and Accuracy
const ex1_4 = chapter1.addEx("Errors and Accuracy");
ex1_4.addQ(slideTypes.eq, 1);    // Types of Errors (Systematic, Random)
ex1_4.addQ(slideTypes.eq, 2);    // Accuracy and Precision
ex1_4.addQ(slideTypes.eq, 3);    // Significant Figures

// 🔹 Section 1.5: Density
const ex1_5 = chapter1.addEx("Density");
ex1_5.addQ(slideTypes.eq, 1);    // Density – Formula & Unit
ex1_5.addQ(slideTypes.video, 2); // Measuring Density of Regular Objects
ex1_5.addQ(slideTypes.video, 3); // Measuring Density of Irregular Solids
ex1_5.addQ(slideTypes.video, 4); // Measuring Density of Liquids


// ✅ Done
export default fbise9physics;
