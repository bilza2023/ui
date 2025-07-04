// src/routes/syllabus/+page.server.js
import { getFullSyllabus, getAllTcodes } from '$lib/services/syllabusService.js';

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
  const tcodeName = url.searchParams.get('tcode') || '';
  return {
    // always return the list of available syllabi
    tcodes: getAllTcodes(),

    // if ?tcode=foo, return that syllabus; else null
    syllabus: tcodeName ? getFullSyllabus(tcodeName) : null
  };
}
