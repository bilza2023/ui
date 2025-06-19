import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch6_work_energy", "ch6_work_energy_ex1_intro");
const ex2 = T.getChExByFilename("ch6_work_energy", "ch6_work_energy_ex2_work");
const ex3 = T.getChExByFilename("ch6_work_energy", "ch6_work_energy_ex3_kinetic_potential");
const ex4 = T.getChExByFilename("ch6_work_energy", "ch6_work_energy_ex4_power");
const ex5 = T.getChExByFilename("ch6_work_energy", "ch6_work_energy_ex5_efficiency");
const ex6 = T.getChExByFilename("ch6_work_energy", "ch6_work_energy_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q601_intro_work_energy", name: "Define work and energy with examples.", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q602_work_calc", name: "How is work calculated in Physics?", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q603_kinetic_vs_potential", name: "Differentiate between kinetic and potential energy.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q604_power_definition", name: "What is power and how is it measured?", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q605_efficiency", name: "Define efficiency and explain how it is calculated.", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q606_work_numerical", name: "A machine does 200 J of work in 10 seconds. Find its power.", type: "slide" });

export const fbise9physics = T.toJSON();
