import { fbise9physicsTcode as T } from "./chapters";

//////////////////////////////////////////////////////
// Questions for Chapter 1: Physical Quantities and Measurement
debugger;
T.getChExByFilename("ch1_physical_quantities", "ex1_intro").addQuestion({
  filename: "q001_define_physics",
  name: "What is Physics?",
  type: "md"
});

T.getChExByFilename("ch1_physical_quantities", "ex2_units").addQuestion({
  filename: "q002_si_units",
  name: "List the SI units of mass, length, and time.",
  type: "md"
});

T.getChExByFilename("ch1_physical_quantities", "ex3_instruments").addQuestion({
  filename: "q003_measuring_instruments",
  name: "Name three common measuring instruments used in Physics.",
  type: "md"
});

T.getChExByFilename("ch1_physical_quantities", "ex4_errors").addQuestion({
  filename: "q004_types_errors",
  name: "Describe the different types of errors in measurements.",
  type: "md"
});

T.getChExByFilename("ch1_physical_quantities", "ex5_scientific").addQuestion({
  filename: "q005_significant_figures",
  name: "Explain significant figures with examples.",
  type: "md"
});

//////////////////////////////////////////////////////
// Questions for Chapter 2: Kinematics

T.getChExByFilename("ch2_kinematics", "ex1_intro").addQuestion({
  filename: "q006_define_kinematics",
  name: "What is Kinematics?",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex2_distance").addQuestion({
  filename: "q007_diff_distance_displacement",
  name: "Differentiate between distance and displacement.",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex3_velocity").addQuestion({
  filename: "q008_avg_velocity",
  name: "Define average velocity and give an example.",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex4_acceleration").addQuestion({
  filename: "q009_acceleration_formula",
  name: "What is the formula for acceleration?",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex5_graphs").addQuestion({
  filename: "q010_dt_graph_meaning",
  name: "What does the slope of a distance-time graph represent?",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex6_equations").addQuestion({
  filename: "q011_equation1",
  name: "State and explain the equation: v = u + at",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex7_freefall").addQuestion({
  filename: "q012_gravity_value",
  name: "What is the value of acceleration due to gravity on Earth?",
  type: "md"
});

T.getChExByFilename("ch2_kinematics", "ex8_problems").addQuestion({
  filename: "q013_num_velocity",
  name: "A body accelerates uniformly from rest to 20 m/s in 5 s. Find the acceleration.",
  type: "md"
});

//////////////////////////////////////////////////////
export const fbise9physics = T.toJSON();
