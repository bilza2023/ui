// fbise9physics.js
// Define and populate fbise9physics syllabus

export default function defineFbise9physics(builder) {
    const fbise9physics = builder.addTcode("fbise9physics", {
      description: "Federal Board Grade 9 Physics",
      image: "/bookcovers/physics_10thFBSIE.png"
    });
  
    const ch1 = fbise9physics.addChapter("Physical Quantities and Measurement", "ch1_physical_quantities");
    const ch1ex1 = ch1.addExercise("Introduction to Physics", "ch1_physical_quantities_ex1_intro");
    ch1ex1.addQuestion("What is Albegra", "fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra");
    ch1ex1.addQuestion("Test 1!!", "test__test_chapter__test_ex__test_question");
    ch1ex1.addQuestion("Test 2", "test__test_chapter__test_ex__test_question2");
    ch1.addExercise("International System of Units (SI)", "ch1_physical_quantities_ex2_units");
    ch1.addExercise("Measuring Instruments", "ch1_physical_quantities_ex3_instruments");
    ch1.addExercise("Scientific Notation", "ch1_physical_quantities_ex4_notations");
    ch1.addExercise("Significant Figures", "ch1_physical_quantities_ex5_sigfigs");
  
    const ch2 = fbise9physics.addChapter("Kinematics", "ch2_kinematics");
    ch2.addExercise("Introduction to Kinematics", "ch2_kinematics_ex1_intro");
    ch2.addExercise("Distance and Displacement", "ch2_kinematics_ex2_distance");
    ch2.addExercise("Speed and Velocity", "ch2_kinematics_ex3_velocity");
    ch2.addExercise("Acceleration", "ch2_kinematics_ex4_acceleration");
    ch2.addExercise("Graphical Representation of Motion", "ch2_kinematics_ex5_graphs");
    ch2.addExercise("Equations of Motion", "ch2_kinematics_ex6_equations");
    ch2.addExercise("Free Fall and Uniform Acceleration", "ch2_kinematics_ex7_freefall");
    ch2.addExercise("Problem Solving and Numericals", "ch2_kinematics_ex8_problems");
  
    const ch3 = fbise9physics.addChapter("Dynamics", "ch3_dynamics");
    ch3.addExercise("Introduction to Dynamics and Force", "ch3_dynamics_ex1_intro");
    ch3.addExercise("Newton’s Laws of Motion", "ch3_dynamics_ex2_newton_laws");
    ch3.addExercise("Inertia, Mass & Weight", "ch3_dynamics_ex3_inertia_mass_weight");
    ch3.addExercise("Action-Reaction Principle", "ch3_dynamics_ex4_action_reaction");
    ch3.addExercise("Friction: Causes and Effects", "ch3_dynamics_ex5_friction");
    ch3.addExercise("Problem Solving and Numericals", "ch3_dynamics_ex6_numericals");
  
    const ch4 = fbise9physics.addChapter("Turning Effect of Forces", "ch4_turning_effect");
    ch4.addExercise("Introduction to Moments", "ch4_turning_effect_ex1_intro");
    ch4.addExercise("Principle of Moments", "ch4_turning_effect_ex2_moment_principle");
    ch4.addExercise("Centre of Mass and Stability", "ch4_turning_effect_ex3_center_mass");
    ch4.addExercise("Conditions of Equilibrium", "ch4_turning_effect_ex4_equilibrium");
    ch4.addExercise("Applications in Real Life", "ch4_turning_effect_ex5_applications");
    ch4.addExercise("Problem Solving and Numericals", "ch4_turning_effect_ex6_numericals");
  
    const ch5 = fbise9physics.addChapter("Gravitation", "ch5_gravitation");
    ch5.addExercise("Introduction to Gravitation", "ch5_gravitation_ex1_intro");
    ch5.addExercise("Mass and Weight", "ch5_gravitation_ex2_mass_weight");
    ch5.addExercise("Newton’s Law of Gravitation", "ch5_gravitation_ex3_newton_gravity");
    ch5.addExercise("Gravitational Field Strength", "ch5_gravitation_ex4_gravitational_field");
    ch5.addExercise("Satellites and Circular Orbits", "ch5_gravitation_ex5_orbits");
    ch5.addExercise("Problem Solving and Numericals", "ch5_gravitation_ex6_numericals");
  
    const ch6 = fbise9physics.addChapter("Work and Energy", "ch6_work_energy");
    ch6.addExercise("Introduction to Work and Energy", "ch6_work_energy_ex1_intro");
    ch6.addExercise("Work Done and Its Calculation", "ch6_work_energy_ex2_work");
    ch6.addExercise("Kinetic and Potential Energy", "ch6_work_energy_ex3_kinetic_potential");
    ch6.addExercise("Power and Its Measurement", "ch6_work_energy_ex4_power");
    ch6.addExercise("Efficiency and Energy Conservation", "ch6_work_energy_ex5_efficiency");
    ch6.addExercise("Problem Solving and Numericals", "ch6_work_energy_ex6_numericals");
  
    const ch7 = fbise9physics.addChapter("Properties of Matter", "ch7_properties_matter");
    ch7.addExercise("Introduction to Matter and Its States", "ch7_properties_matter_ex1_intro");
    ch7.addExercise("Density and Its Determination", "ch7_properties_matter_ex2_density");
    ch7.addExercise("Pressure in Solids, Liquids, and Gases", "ch7_properties_matter_ex3_pressure");
    ch7.addExercise("Elasticity and Hooke’s Law", "ch7_properties_matter_ex4_elasticity");
    ch7.addExercise("Applications of Pressure", "ch7_properties_matter_ex5_applications");
    ch7.addExercise("Problem Solving and Numericals", "ch7_properties_matter_ex6_numericals");
  
    const ch8 = fbise9physics.addChapter("Thermal Properties of Matter", "ch8_thermal_properties");
    ch8.addExercise("Temperature and Heat", "ch8_thermal_properties_ex1_intro");
    ch8.addExercise("Heat Capacity and Specific Heat", "ch8_thermal_properties_ex2_heat_capacity");
    ch8.addExercise("Latent Heat and Change of State", "ch8_thermal_properties_ex3_latent_heat");
    ch8.addExercise("Thermal Expansion of Solids, Liquids, Gases", "ch8_thermal_properties_ex4_thermal_expansion");
    ch8.addExercise("Applications in Daily Life", "ch8_thermal_properties_ex5_real_life");
    ch8.addExercise("Problem Solving and Numericals", "ch8_thermal_properties_ex6_numericals");
  
    const ch9 = fbise9physics.addChapter("Transfer of Heat", "ch9_transfer_heat");
    ch9.addExercise("Modes of Heat Transfer", "ch9_transfer_heat_ex1_intro");
    ch9.addExercise("Conduction and Thermal Conductors", "ch9_transfer_heat_ex2_conduction");
    ch9.addExercise("Convection in Fluids", "ch9_transfer_heat_ex3_convection");
    ch9.addExercise("Radiation and Absorbers/Emitters", "ch9_transfer_heat_ex4_radiation");
    ch9.addExercise("Everyday Applications of Heat Transfer", "ch9_transfer_heat_ex5_household");
    ch9.addExercise("Problem Solving and Numericals", "ch9_transfer_heat_ex6_numericals");
  
    return fbise9physics;
  }
  