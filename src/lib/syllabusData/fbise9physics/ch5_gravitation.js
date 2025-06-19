import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch5_gravitation", "ch5_gravitation_ex1_intro");
const ex2 = T.getChExByFilename("ch5_gravitation", "ch5_gravitation_ex2_mass_weight");
const ex3 = T.getChExByFilename("ch5_gravitation", "ch5_gravitation_ex3_newton_gravity");
const ex4 = T.getChExByFilename("ch5_gravitation", "ch5_gravitation_ex4_gravitational_field");
const ex5 = T.getChExByFilename("ch5_gravitation", "ch5_gravitation_ex5_orbits");
const ex6 = T.getChExByFilename("ch5_gravitation", "ch5_gravitation_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q501_intro_gravity", name: "What is gravitation? Describe its importance.", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q502_mass_vs_weight", name: "Differentiate between mass and weight.", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q503_newton_law_gravity", name: "State Newton’s law of universal gravitation.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q504_gravitational_field", name: "Define gravitational field strength and write its unit.", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q505_satellites_orbits", name: "How do satellites stay in orbit around Earth?", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q506_gravity_numerical", name: "Find the force between two masses of 5 kg and 10 kg placed 2 m apart.", type: "slide" });

export const fbise9physics = T.toJSON();
