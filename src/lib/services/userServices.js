
// src/lib/services/userServices.js
// ------------------------------------------------------------
// Public-facing service layer for learners / UI pages.
// Only exposes safe READ methods (no admin mutations).
// ------------------------------------------------------------

import { listTcodes, getNested } from './synopisisServices2.js';
import { listQuestionsByTcode } from './questionServices.js';

// Export a unified surface
export const userServices = {
  listTcodes,            // list all tcodes with metadata
  getNested,             // get one tcode with nested chapters/exercises
  listQuestionsByTcode   // flat list of questions by tcode (filterable)
};

// Named exports too, for flexibility
export { listTcodes, getNested, listQuestionsByTcode };
