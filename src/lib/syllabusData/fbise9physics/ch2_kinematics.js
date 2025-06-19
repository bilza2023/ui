import { fbise9physicsTcode as T } from "./chapters.js";

const ex1 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex1_intro");
const ex2 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex2_distance");
const ex3 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex3_velocity");
const ex4 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex4_acceleration");
const ex5 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex5_graphs");
const ex6 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex6_equations");
const ex7 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex7_freefall");
const ex8 = T.getChExByFilename("ch2_kinematics", "ch2_kinematics_ex8_problems");

// Questions for each exercise

// ex1
ex1.addQuestion({ filename: "q201_kinematics_scope", name: "What is the scope of kinematics in Physics?", type: "slide" });
ex1.addQuestion({ filename: "q202_distance_vs_displacement", name: "Differentiate between distance and displacement with examples.", type: "slide" });
ex1.addQuestion({ filename: "q203_scalar_vector", name: "Is displacement a scalar or vector quantity? Justify your answer.", type: "slide" });
ex1.addQuestion({ filename: "q204_define_velocity", name: "Define velocity and explain its types.", type: "slide" });
ex1.addQuestion({ filename: "q205_velocity_vs_speed", name: "How does velocity differ from speed?", type: "slide" });
ex1.addQuestion({ filename: "q206_define_acceleration", name: "What is acceleration? State its SI unit.", type: "slide" });
ex1.addQuestion({ filename: "q207_negative_acceleration", name: "What is meant by negative acceleration? Give an example.", type: "slide" });
ex1.addQuestion({ filename: "q208_dt_graph", name: "What does the slope of a distance-time graph represent?", type: "slide" });
ex1.addQuestion({ filename: "q209_vt_graph_area", name: "What information can be obtained from the area under a velocity-time graph?", type: "slide" });
ex1.addQuestion({ filename: "q210_equation1", name: "State and derive the first equation of motion.", type: "slide" });
ex1.addQuestion({ filename: "q211_equation2", name: "State the second and third equations of motion.", type: "slide" });
ex1.addQuestion({ filename: "q212_define_freefall", name: "What is free fall? What is the acceleration of free-falling objects?", type: "slide" });
ex1.addQuestion({ filename: "q213_vacuum_vs_air", name: "Why do objects fall at the same rate in vacuum?", type: "slide" });
ex1.addQuestion({ filename: "q214_numerical_acceleration", name: "A car speeds up from 0 to 25 m/s in 5 s. Find the acceleration.", type: "slide" });
ex1.addQuestion({ filename: "q215_numerical_equation2", name: "A body covers 20 m in 2 s starting from rest. Find its acceleration.", type: "slide" });

// ex2 to ex8 — continue from previously uploaded files
ex2.addQuestion({ filename: "q216_distance_def", name: "Define distance with an example.", type: "slide" });


ex3.addQuestion({ filename: "q221_define_speed", name: "Define speed and explain average speed.", type: "slide" });


ex4.addQuestion({ filename: "q226_acceleration_types", name: "What are different types of acceleration?", type: "slide" });


ex5.addQuestion({ filename: "q231_graphs_types", name: "Name different types of motion graphs.", type: "slide" });


ex6.addQuestion({ filename: "q236_eq1_derivation", name: "Derive the first equation of motion.", type: "slide" });


ex7.addQuestion({ filename: "q241_define_freefall", name: "Define free fall and give examples.", type: "slide" });

ex8.addQuestion({ filename: "q246_num_velocity", name: "A body moves 20 m in 4 s. Find velocity.", type: "slide" });

export const fbise9physics = T.toJSON();
