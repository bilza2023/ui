
import { SubjectBuilder } from "syllabusobject";

export const sb = new SubjectBuilder({
    tcodeName: "fbise9physics",
    filename: "fbise9physics",
    description: "Federal Board Grade 9 Physics",
    image: "/images/fbise9physics.png",
    chapters: [
      {
        filename: "ch1_physical_quantities",
        name: "Physical Quantities and Measurement",
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Physics" },
          { filename: "ex2_units", name: "International System of Units (SI)" },
          { filename: "ex3_instruments", name: "Measuring Instruments" },
          { filename: "ex4_errors", name: "Errors and Uncertainties" },
          { filename: "ex5_scientific", name: "Scientific Notation and Significant Figures" }
        ]
      },
      {
        filename: "ch2_kinematics",
        name: "Kinematics",
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Kinematics" },
          { filename: "ex2_distance", name: "Distance and Displacement" },
          { filename: "ex3_velocity", name: "Speed and Velocity" },
          { filename: "ex4_acceleration", name: "Acceleration" },
          { filename: "ex5_graphs", name: "Graphical Representation of Motion" },
          { filename: "ex6_equations", name: "Equations of Motion" },
          { filename: "ex7_freefall", name: "Free Fall and Uniform Acceleration" },
          { filename: "ex8_problems", name: "Problem Solving and Numericals" }
        ]
      },
      {
        filename: "ch3_dynamics",
        name: "Dynamics",
        exercises: []
      },
      {
        filename: "ch4_turning_effect",
        name: "Turning Effect of Forces",
        exercises: []
      },
      {
        filename: "ch5_gravitation",
        name: "Gravitation",
        exercises: []
      },
      {
        filename: "ch6_work_energy",
        name: "Work and Energy",
        exercises: []
      },
      {
        filename: "ch7_properties_matter",
        name: "Properties of Matter",
        exercises: []
      },
      {
        filename: "ch8_thermal_properties",
        name: "Thermal Properties of Matter",
        exercises: []
      },
      {
        filename: "ch9_transfer_heat",
        name: "Transfer of Heat",
        exercises: []
      }
    ]
  });
  

export const fbise9physicsTcode = sb;