// syllabus.js
// Main syllabus generator using modular tcode sources

import SyllabusBuilder from "../syllabusBuilder/SyllabusBuilder.js";
import defineFbise9physics from "./fbise9physics.js";
import defineTestSyllabus from "./testsyllabus.js";

const builder = new SyllabusBuilder();

// Register each tcode syllabus here
defineFbise9physics(builder);
defineTestSyllabus(builder);
// Export full syllabus map
export const syllabusMap = builder.build();
