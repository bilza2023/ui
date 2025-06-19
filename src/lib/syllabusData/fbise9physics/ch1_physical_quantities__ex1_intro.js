import { fbise9physicsTcode as T } from "./chapters.js";

const ex1_intro = T.getChExByFilename("ch1_physical_quantities", "ex1_intro");

ex1_intro.addQuestion({
  filename: "q001_what_is_physics",
  name: "Define Physics. What is its scope in everyday life?",
  type: "md"
});

ex1_intro.addQuestion({
  filename: "q002_branches_physics",
  name: "List and briefly describe the main branches of Physics.",
  type: "md"
});

ex1_intro.addQuestion({
  filename: "q003_need_for_measurement",
  name: "Why is measurement important in Physics?",
  type: "md"
});

ex1_intro.addQuestion({
  filename: "q004_physical_quantity",
  name: "What is meant by a physical quantity? Give examples.",
  type: "md"
});

ex1_intro.addQuestion({
  filename: "q005_base_derived_quantities",
  name: "Differentiate between base and derived physical quantities.",
  type: "md"
});

export const fbise9physics = T.toJSON();