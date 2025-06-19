import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch9_transfer_heat", "ch9_transfer_heat_ex1_intro");
const ex2 = T.getChExByFilename("ch9_transfer_heat", "ch9_transfer_heat_ex2_conduction");
const ex3 = T.getChExByFilename("ch9_transfer_heat", "ch9_transfer_heat_ex3_convection");
const ex4 = T.getChExByFilename("ch9_transfer_heat", "ch9_transfer_heat_ex4_radiation");
const ex5 = T.getChExByFilename("ch9_transfer_heat", "ch9_transfer_heat_ex5_household");
const ex6 = T.getChExByFilename("ch9_transfer_heat", "ch9_transfer_heat_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q901_heat_transfer_modes", name: "What are the three modes of heat transfer?", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q902_conduction", name: "Explain conduction with an example.", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q903_convection", name: "Describe convection and its role in fluids.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q904_radiation", name: "Define radiation and give examples.", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q905_household_heat", name: "List common household applications of heat transfer.", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q906_numerical", name: "A 2kg metal is heated from 20°C to 70°C. Find heat if c = 500 J/kg°C.", type: "slide" });

export const fbise9physics = T.toJSON();
