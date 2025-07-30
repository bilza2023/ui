
// File: syllabus.js   (ESM version)
// Main syllabus generator using modular t-code sources

import SyllabusBuilder from '../syllabusBuilder/SyllabusBuilder.js';
// import defineFbise9physics       from './fbise9physics.js';
import defineFbise9mathold       from './fbise9mathold.js';

const builder = new SyllabusBuilder();

// Register each syllabus module
// defineFbise9physics(builder);
defineFbise9mathold(builder);

// Export the aggregated syllabus map
export const syllabus = builder.build();
