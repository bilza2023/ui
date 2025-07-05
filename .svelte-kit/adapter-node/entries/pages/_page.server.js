import { g as getAllTcodes } from "../../chunks/syllabusService.js";
function load() {
  return {
    tcodes: getAllTcodes()
  };
}
export {
  load
};
