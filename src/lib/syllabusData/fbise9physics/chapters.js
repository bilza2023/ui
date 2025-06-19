
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
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Dynamics and Force" },
          { filename: "ex2_newton_laws", name: "Newton’s Laws of Motion" },
          { filename: "ex3_inertia_mass_weight", name: "Inertia, Mass & Weight" },
          { filename: "ex4_action_reaction", name: "Action-Reaction Principle" },
          { filename: "ex5_friction", name: "Friction: Causes and Effects" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      },
      {
        filename: "ch4_turning_effect",
        name: "Turning Effect of Forces",
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Moments" },
          { filename: "ex2_moment_principle", name: "Principle of Moments" },
          { filename: "ex3_center_mass", name: "Centre of Mass and Stability" },
          { filename: "ex4_equilibrium", name: "Conditions of Equilibrium" },
          { filename: "ex5_applications", name: "Applications in Real Life" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      },
      
      {
        filename: "ch5_gravitation",
        name: "Gravitation",
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Gravitation" },
          { filename: "ex2_mass_weight", name: "Mass and Weight" },
          { filename: "ex3_newton_gravity", name: "Newton’s Law of Gravitation" },
          { filename: "ex4_gravitational_field", name: "Gravitational Field Strength" },
          { filename: "ex5_orbits", name: "Satellites and Circular Orbits" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      },
      {
        filename: "ch6_work_energy",
        name: "Work and Energy",
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Work and Energy" },
          { filename: "ex2_work", name: "Work Done and Its Calculation" },
          { filename: "ex3_kinetic_potential", name: "Kinetic and Potential Energy" },
          { filename: "ex4_power", name: "Power and Its Measurement" },
          { filename: "ex5_efficiency", name: "Efficiency and Energy Conservation" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      },
      {
        filename: "ch7_properties_matter",
        name: "Properties of Matter",
        exercises: [
          { filename: "ex1_intro", name: "Introduction to Matter and Its States" },
          { filename: "ex2_density", name: "Density and Its Determination" },
          { filename: "ex3_pressure", name: "Pressure in Solids, Liquids, and Gases" },
          { filename: "ex4_elasticity", name: "Elasticity and Hooke’s Law" },
          { filename: "ex5_applications", name: "Applications of Pressure" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      },
      {
        filename: "ch8_thermal_properties",
        name: "Thermal Properties of Matter",
        exercises: [
          { filename: "ex1_intro", name: "Temperature and Heat" },
          { filename: "ex2_heat_capacity", name: "Heat Capacity and Specific Heat" },
          { filename: "ex3_latent_heat", name: "Latent Heat and Change of State" },
          { filename: "ex4_thermal_expansion", name: "Thermal Expansion of Solids, Liquids, Gases" },
          { filename: "ex5_real_life", name: "Applications in Daily Life" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      },
      {
        filename: "ch9_transfer_heat",
        name: "Transfer of Heat",
        exercises: [
          { filename: "ex1_intro", name: "Modes of Heat Transfer" },
          { filename: "ex2_conduction", name: "Conduction and Thermal Conductors" },
          { filename: "ex3_convection", name: "Convection in Fluids" },
          { filename: "ex4_radiation", name: "Radiation and Absorbers/Emitters" },
          { filename: "ex5_household", name: "Everyday Applications of Heat Transfer" },
          { filename: "ex6_numericals", name: "Problem Solving and Numericals" }
        ]
      }
      
    ]
  });
  

export const fbise9physicsTcode = sb;