import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch7_properties_matter", "ch7_properties_matter_ex1_intro");
const ex2 = T.getChExByFilename("ch7_properties_matter", "ch7_properties_matter_ex2_density");
const ex3 = T.getChExByFilename("ch7_properties_matter", "ch7_properties_matter_ex3_pressure");
const ex4 = T.getChExByFilename("ch7_properties_matter", "ch7_properties_matter_ex4_elasticity");
const ex5 = T.getChExByFilename("ch7_properties_matter", "ch7_properties_matter_ex5_applications");
const ex6 = T.getChExByFilename("ch7_properties_matter", "ch7_properties_matter_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q701_matter_states", name: "What are the three states of matter? Explain briefly.", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q702_density_definition", name: "Define density and describe how it is measured.", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q703_pressure_types", name: "Explain pressure in solids, liquids, and gases.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q704_elasticity_hooke", name: "Define elasticity and state Hooke’s Law.", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q705_pressure_apps", name: "List some real-life applications of pressure.", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q706_density_problem", name: "Calculate the density of an object with mass 300g and volume 100cm³.", type: "slide" });

export const fbise9physics = T.toJSON();
