// syllabus.js
// Main syllabus generator using modular tcode sources

import SyllabusBuilder from "../syllabusBuilder/SyllabusBuilder.js";
import defineFbise9physics from "./fbise9physics.js";
import defineFbise9matholdSyllabus from "./fbise9mathold.js";

const builder = new SyllabusBuilder();

// Register each tcode syllabus here
defineFbise9physics(builder);
defineFbise9matholdSyllabus(builder);
// Export full syllabus map
export const syllabus = builder.build();
