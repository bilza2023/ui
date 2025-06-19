import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch4_turning_effect", "ch4_turning_effect_ex1_intro");
const ex2 = T.getChExByFilename("ch4_turning_effect", "ch4_turning_effect_ex2_moment_principle");
const ex3 = T.getChExByFilename("ch4_turning_effect", "ch4_turning_effect_ex3_center_mass");
const ex4 = T.getChExByFilename("ch4_turning_effect", "ch4_turning_effect_ex4_equilibrium");
const ex5 = T.getChExByFilename("ch4_turning_effect", "ch4_turning_effect_ex5_applications");
const ex6 = T.getChExByFilename("ch4_turning_effect", "ch4_turning_effect_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q401_define_moment", name: "Define moment of a force and give its SI unit.", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q402_principle_moments", name: "State and explain the principle of moments.", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q403_center_mass", name: "What is center of mass? Explain with an example.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q404_equilibrium", name: "Explain the two conditions for equilibrium.", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q405_moment_applications", name: "Describe a real-life application of turning effect of force.", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q406_moment_numerical", name: "Calculate the moment produced by a 10 N force at 0.5 m from the pivot.", type: "slide" });

export const fbise9physics = T.toJSON();
