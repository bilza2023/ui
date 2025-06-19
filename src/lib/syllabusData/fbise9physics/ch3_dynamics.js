import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch3_dynamics", "ch3_dynamics_ex1_intro");
const ex2 = T.getChExByFilename("ch3_dynamics", "ch3_dynamics_ex2_newton_laws");
const ex3 = T.getChExByFilename("ch3_dynamics", "ch3_dynamics_ex3_inertia_mass_weight");
const ex4 = T.getChExByFilename("ch3_dynamics", "ch3_dynamics_ex4_action_reaction");
const ex5 = T.getChExByFilename("ch3_dynamics", "ch3_dynamics_ex5_friction");
const ex6 = T.getChExByFilename("ch3_dynamics", "ch3_dynamics_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q301_define_force", name: "Define force and its effects.", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q302_newton_laws", name: "State and explain Newton’s three laws of motion.", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q303_mass_weight", name: "Differentiate between mass and weight.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q304_action_reaction", name: "Explain the action-reaction principle with an example.", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q305_define_friction", name: "What is friction? Mention its advantages and disadvantages.", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q306_force_numerical", name: "A 5 kg mass is accelerated at 2 m/s². Find the force applied.", type: "slide" });

export const fbise9physics = T.toJSON();
