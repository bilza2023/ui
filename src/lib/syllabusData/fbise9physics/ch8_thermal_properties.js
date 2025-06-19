import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch8_thermal_properties", "ch8_thermal_properties_ex1_intro");
const ex2 = T.getChExByFilename("ch8_thermal_properties", "ch8_thermal_properties_ex2_heat_capacity");
const ex3 = T.getChExByFilename("ch8_thermal_properties", "ch8_thermal_properties_ex3_latent_heat");
const ex4 = T.getChExByFilename("ch8_thermal_properties", "ch8_thermal_properties_ex4_thermal_expansion");
const ex5 = T.getChExByFilename("ch8_thermal_properties", "ch8_thermal_properties_ex5_real_life");
const ex6 = T.getChExByFilename("ch8_thermal_properties", "ch8_thermal_properties_ex6_numericals");

// ex1
ex1.addQuestion({ filename: "q801_temp_heat", name: "Differentiate between temperature and heat.", type: "slide" });

// ex2
ex2.addQuestion({ filename: "q802_specific_heat", name: "Define specific heat capacity with an example.", type: "slide" });

// ex3
ex3.addQuestion({ filename: "q803_latent_heat", name: "What is latent heat? Explain with examples.", type: "slide" });

// ex4
ex4.addQuestion({ filename: "q804_thermal_expansion", name: "Describe thermal expansion in solids, liquids, and gases.", type: "slide" });

// ex5
ex5.addQuestion({ filename: "q805_daily_use", name: "Give daily life applications of thermal properties.", type: "slide" });

// ex6
ex6.addQuestion({ filename: "q806_heat_calc", name: "Calculate heat required to raise temperature of 2kg water by 10°C. (c = 4200 J/kg°C)", type: "slide" });

export const fbise9physics = T.toJSON();
