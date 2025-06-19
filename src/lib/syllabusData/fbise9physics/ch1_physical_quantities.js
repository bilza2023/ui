import { fbise9physicsTcode as T } from "./chapters.js";

// Intro
const ex1 = T.getChExByFilename("ch1_physical_quantities", "ch1_physical_quantities_ex1_intro");
ex1.addQuestion({ filename: "q001_what_is_physics", name: "Define Physics. What is its scope in everyday life?", type: "slide" });
ex1.addQuestion({ filename: "q002_branches_physics", name: "List and briefly describe the main branches of Physics.", type: "slide" });
ex1.addQuestion({ filename: "q003_need_for_measurement", name: "Why is measurement important in Physics?", type: "slide" });
ex1.addQuestion({ filename: "q004_physical_quantity", name: "What is meant by a physical quantity? Give examples.", type: "slide" });
ex1.addQuestion({ filename: "q005_base_derived_quantities", name: "Differentiate between base and derived physical quantities.", type: "slide" });

// Units
const ex2 = T.getChExByFilename("ch1_physical_quantities", "ch1_physical_quantities_ex2_units");
ex2.addQuestion({ filename: "q006_define_unit", name: "What is a unit? Why is it important in measurements?", type: "slide" });
ex2.addQuestion({ filename: "q007_standard_units", name: "What are standard units? Give examples.", type: "slide" });
ex2.addQuestion({ filename: "q008_si_units_intro", name: "What are SI units? Why are they preferred worldwide?", type: "slide" });
ex2.addQuestion({ filename: "q009_base_units_list", name: "List the seven base quantities and their SI units.", type: "slide" });
ex2.addQuestion({ filename: "q010_convenient_units", name: "Why do we use convenient units like millimeter or kilometer?", type: "slide" });

// Instruments
const ex3 = T.getChExByFilename("ch1_physical_quantities", "ch1_physical_quantities_ex3_instruments");
ex3.addQuestion({ filename: "q011_measuring_tape", name: "What is a measuring tape used for in physics?", type: "slide" });
ex3.addQuestion({ filename: "q012_vernier_calipers", name: "Describe the working principle of vernier calipers.", type: "slide" });
ex3.addQuestion({ filename: "q013_micrometer_screw", name: "What is a micrometer screw gauge used for?", type: "slide" });
ex3.addQuestion({ filename: "q014_stopwatch_use", name: "How is time measured using a stopwatch?", type: "slide" });
ex3.addQuestion({ filename: "q015_precaution_measurement", name: "List precautions to take while using measuring instruments.", type: "slide" });

// Notation
const ex4 = T.getChExByFilename("ch1_physical_quantities", "ch1_physical_quantities_ex4_notations");
ex4.addQuestion({ filename: "q016_define_scientific_notation", name: "What is scientific notation? Why is it used?", type: "slide" });
ex4.addQuestion({ filename: "q017_example_large_number", name: "Write 3,000,000 in scientific notation.", type: "slide" });
ex4.addQuestion({ filename: "q018_example_small_number", name: "Express 0.00042 in scientific notation.", type: "slide" });
ex4.addQuestion({ filename: "q019_rules_notation", name: "State the rules for writing numbers in scientific notation.", type: "slide" });
ex4.addQuestion({ filename: "q020_convert_notation", name: "Convert 6.02 × 10²³ into decimal notation.", type: "slide" });

// Significant Figures
const ex5 = T.getChExByFilename("ch1_physical_quantities", "ch1_physical_quantities_ex5_sigfigs");
ex5.addQuestion({ filename: "q021_define_sigfigs", name: "What are significant figures? Why are they important in measurements?", type: "slide" });
ex5.addQuestion({ filename: "q022_identify_sigfigs", name: "How many significant figures are there in 0.00456 and 5200?", type: "slide" });
ex5.addQuestion({ filename: "q023_rules_sigfigs", name: "State the rules for identifying significant figures.", type: "slide" });
ex5.addQuestion({ filename: "q024_rounding_sigfigs", name: "Round 12.34567 to three significant figures.", type: "slide" });
ex5.addQuestion({ filename: "q025_use_sigfigs_calculations", name: "How are significant figures used in calculations?", type: "slide" });

// Final export
export const fbise9physics = T.toJSON();
