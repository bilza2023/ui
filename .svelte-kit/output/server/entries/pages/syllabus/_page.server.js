import { g as getAllTcodes, b as getFullSyllabus } from "../../../chunks/syllabusService.js";
function load({ url }) {
  const tcodeName = url.searchParams.get("tcode") || "";
  return {
    // always return the list of available syllabi
    tcodes: getAllTcodes(),
    // if ?tcode=foo, return that syllabus; else null
    syllabus: tcodeName ? getFullSyllabus(tcodeName) : null
  };
}
export {
  load
};
