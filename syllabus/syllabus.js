// syllabus/syllabus.js
import { SyllabusBuilder } from 'taleem-syllabusbuilder';
import defineFbise9mathold from './fbise9mathold.js';
// import defineFbise9physics from './fbise9physics.js';

function buildTcode(defineFn, code, meta) {
  const builder = new SyllabusBuilder(code, meta);
  defineFn(builder);
  return builder.build();
}

// Array of all tcodes (each is a full syllabus object)
export const syllabus = [
  buildTcode(defineFbise9mathold, 'fbise9mathold', {
    description: 'Math Class 9 Old Course',
    image: '/bookcovers/math_9thFBSIE.png'
  })
  // , buildTcode(defineFbise9physics, 'fbise9physics', { ... })
];
