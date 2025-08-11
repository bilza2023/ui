// syllabus/fbise9physics.js — EXPANDED
// Physics Class 9 — Notes-first syllabus using object-only API (addItem)
// Mirrors fbise9mathold.js structure: addChapter → addExercise → addItem (type: 'note')
// All thumbnails use a single constant so you can swap once for the whole file.

export default function defineFbise9physicsSyllabus(builder) {
    // ─────────────────────────────────────────────────────────────────────────────
    // GLOBAL THUMBNAIL (swap this path once if you change the default)
    // ─────────────────────────────────────────────────────────────────────────────
    const THUMB = '/images/taleem.svg';
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-01 — Physical Quantities and Measurement                              ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch1 = builder.addChapter({ name: 'Ch-01', filename: 'Ch-01 Physical Quantities and Measurement' });
  
    // ── §1: Introduction to Physics ─────────────────────────────────────────────
    const ch1_ex1 = ch1.addExercise({ name: 'Introduction to Physics', filename: 'ch1_physical_quantities_ex1_intro' });
    ch1_ex1.addItem({
      name: 'What is Physics?',
      filename: 'fbise9physics__ch1__what_is_physics',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex1.addItem({
      name: 'Physical Quantities & SI Units',
      filename: 'fbise9physics__ch1__physical_quantities_and_si_units',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex1.addItem({
      name: 'Base Quantities & Base Units (7 Foundation Units)',
      filename: 'fbise9physics__ch1__base_quantities_and_units',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex1.addItem({
      name: 'Derived Quantities & Derived Units',
      filename: 'fbise9physics__ch1__derived_quantities_and_units',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §2: International System of Units (SI) ──────────────────────────────────
    const ch1_ex2 = ch1.addExercise({ name: 'International System of Units (SI)', filename: 'ch1_physical_quantities_ex2_units' });
    ch1_ex2.addItem({
      name: 'SI Prefixes (milli to giga) & Symbols',
      filename: 'fbise9physics__ch1__si_prefixes_and_symbols',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    
    ch1_ex2.addItem({
      name: 'Converting Units with Prefixes',
      filename: 'fbise9physics__ch1__unit_conversions_with_prefixes',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex2.addItem({
      name: 'Derived Unit Examples (N, J, Pa, W)',
      filename: 'fbise9physics__ch1__derived_unit_examples',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Measuring Instruments ───────────────────────────────────────────────
    const ch1_ex3 = ch1.addExercise({ name: 'Measuring Instruments', filename: 'ch1_physical_quantities_ex3_instruments' });
    ch1_ex3.addItem({
      name: 'Vernier Caliper: Least Count & Zero Error',
      filename: 'fbise9physics__ch1__vernier_caliper_lc_ze',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex3.addItem({
      name: 'Micrometer Screw Gauge: Least Count & Zero Error',
      filename: 'fbise9physics__ch1__micrometer_lc_ze',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex3.addItem({
      name: 'Measuring Time: Stopwatch, Pendulum (Idea)',
      filename: 'fbise9physics__ch1__measuring_time_stopwatch_pendulum',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex3.addItem({
      name: 'Accuracy, Precision & Least Count',
      filename: 'fbise9physics__ch1__accuracy_precision_least_count',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Scientific Notation ─────────────────────────────────────────────────
    const ch1_ex4 = ch1.addExercise({ name: 'Scientific Notation', filename: 'ch1_physical_quantities_ex4_notations' });
    ch1_ex4.addItem({
      name: 'Rules of Scientific Notation (A × 10^n)',
      filename: 'fbise9physics__ch1__scientific_notation_rules',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex4.addItem({
      name: 'Converting Standard ↔ Scientific Form',
      filename: 'fbise9physics__ch1__convert_standard_scientific_form',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Significant Figures ─────────────────────────────────────────────────
    const ch1_ex5 = ch1.addExercise({ name: 'Significant Figures', filename: 'ch1_physical_quantities_ex5_sigfigs' });
    ch1_ex5.addItem({
      name: 'Counting Significant Figures (Rules & Examples)',
      filename: 'fbise9physics__ch1__sigfigs_counting_rules',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch1_ex5.addItem({
      name: 'Calculations with Significant Figures (×, ÷, +, −)',
      filename: 'fbise9physics__ch1__sigfigs_operations',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-02 — Kinematics                                                       ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch2 = builder.addChapter({ name: 'Ch-02', filename: 'Ch-02 Kinematics' });
  
    // ── §1: Intro (Distance/Displacement, Speed/Velocity) ───────────────────────
    const ch2_ex1 = ch2.addExercise({ name: 'Introduction to Kinematics', filename: 'ch2_kinematics_ex1_intro' });
    ch2_ex1.addItem({
      name: 'Distance vs Displacement',
      filename: 'fbise9physics__ch2__distance_vs_displacement',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex1.addItem({
      name: 'Speed vs Velocity',
      filename: 'fbise9physics__ch2__speed_vs_velocity',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex1.addItem({
      name: 'Average vs Instantaneous Speed/Velocity',
      filename: 'fbise9physics__ch2__average_vs_instantaneous',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex1.addItem({
      name: 'Uniform vs Non-uniform Motion',
      filename: 'fbise9physics__ch2__uniform_vs_nonuniform_motion',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §2: Acceleration ────────────────────────────────────────────────────────
    const ch2_ex4 = ch2.addExercise({ name: 'Acceleration', filename: 'ch2_kinematics_ex4_acceleration' });
    ch2_ex4.addItem({
      name: 'Acceleration: Definition & Units (m/s²)',
      filename: 'fbise9physics__ch2__acceleration_definition_units',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex4.addItem({
      name: 'Average vs Instantaneous Acceleration',
      filename: 'fbise9physics__ch2__avg_vs_inst_acceleration',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Graphical Representation of Motion ──────────────────────────────────
    const ch2_ex5 = ch2.addExercise({ name: 'Graphical Representation of Motion', filename: 'ch2_kinematics_ex5_graphs' });
    ch2_ex5.addItem({
      name: 'Distance–Time Graphs: Slope = Speed',
      filename: 'fbise9physics__ch2__distance_time_graphs_slope',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex5.addItem({
      name: 'Velocity–Time Graphs: Slope & Area',
      filename: 'fbise9physics__ch2__velocity_time_graphs_slope_area',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Equations of Motion ─────────────────────────────────────────────────
    const ch2_ex6 = ch2.addExercise({ name: 'Equations of Motion', filename: 'ch2_kinematics_ex6_equations' });
    ch2_ex6.addItem({
      name: 'v = u + a t (Interpretation & Use)',
      filename: 'fbise9physics__ch2__equation_v_equal_u_plus_at',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex6.addItem({
      name: 's = u t + 1/2 a t² (Derivation Idea)',
      filename: 'fbise9physics__ch2__equation_s_equal_ut_plus_half_at2',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex6.addItem({
      name: 'v² = u² + 2 a s (No Time Equation)',
      filename: 'fbise9physics__ch2__equation_v2_equal_u2_plus_2as',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Free Fall and Uniform Acceleration ──────────────────────────────────
    const ch2_ex7 = ch2.addExercise({ name: 'Free Fall and Uniform Acceleration', filename: 'ch2_kinematics_ex7_freefall' });
    ch2_ex7.addItem({
      name: 'Free Fall: g ≈ 9.8 m/s² (Near Earth)',
      filename: 'fbise9physics__ch2__free_fall_g_value',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex7.addItem({
      name: 'Motion Under Gravity (Vertical Throw Up/Down)',
      filename: 'fbise9physics__ch2__vertical_motion_under_gravity',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch2_ex8 = ch2.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch2_kinematics_ex8_problems' });
    ch2_ex8.addItem({
      name: 'Numericals Using v = u + a t',
      filename: 'fbise9physics__ch2__numericals_v_equal_u_plus_at',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch2_ex8.addItem({
      name: 'Graph-based Numericals (Area Under v–t Graph)',
      filename: 'fbise9physics__ch2__numericals_graph_area',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-03 — Dynamics                                                         ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch3 = builder.addChapter({ name: 'Ch-03', filename: 'Ch-03 Dynamics' });
  
    // ── §1: Intro to Dynamics & Force ───────────────────────────────────────────
    const ch3_ex1 = ch3.addExercise({ name: 'Introduction to Dynamics and Force', filename: 'ch3_dynamics_ex1_intro' });
    ch3_ex1.addItem({
      name: "Newton's First Law (Inertia)",
      filename: 'fbise9physics__ch3__newtons_first_law_inertia',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch3_ex1.addItem({
      name: "Newton's Second Law (F = m a)",
      filename: 'fbise9physics__ch3__newtons_second_law_fma',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch3_ex1.addItem({
      name: "Newton's Third Law (Action–Reaction)",
      filename: 'fbise9physics__ch3__newtons_third_law_action_reaction',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §2: Newton’s Laws of Motion ─────────────────────────────────────────────
    const ch3_ex2 = ch3.addExercise({ name: "Newton’s Laws of Motion", filename: 'ch3_dynamics_ex2_newton_laws' });
    ch3_ex2.addItem({
      name: 'Resultant Force & Acceleration (∑F = m a)',
      filename: 'fbise9physics__ch3__resultant_force_and_acceleration',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch3_ex2.addItem({
      name: 'Free-Body Diagrams (Basics)',
      filename: 'fbise9physics__ch3__free_body_diagrams_basics',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Inertia, Mass & Weight ──────────────────────────────────────────────
    const ch3_ex3 = ch3.addExercise({ name: 'Inertia, Mass & Weight', filename: 'ch3_dynamics_ex3_inertia_mass_weight' });
    ch3_ex3.addItem({
      name: 'Inertia & Mass (Qualitative)',
      filename: 'fbise9physics__ch3__inertia_and_mass',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch3_ex3.addItem({
      name: 'Weight (W = m g) & g Near Earth',
      filename: 'fbise9physics__ch3__weight_mg_and_g',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Action-Reaction Principle ───────────────────────────────────────────
    const ch3_ex4 = ch3.addExercise({ name: 'Action-Reaction Principle', filename: 'ch3_dynamics_ex4_action_reaction' });
    ch3_ex4.addItem({
      name: 'Pairs of Forces: Examples & Misconceptions',
      filename: 'fbise9physics__ch3__action_reaction_examples',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Friction ────────────────────────────────────────────────────────────
    const ch3_ex5 = ch3.addExercise({ name: 'Friction: Causes and Effects', filename: 'ch3_dynamics_ex5_friction' });
    ch3_ex5.addItem({
      name: 'Types of Friction (Static, Kinetic, Rolling)',
      filename: 'fbise9physics__ch3__types_of_friction',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch3_ex5.addItem({
      name: 'Advantages & Disadvantages of Friction',
      filename: 'fbise9physics__ch3__friction_advantages_disadvantages',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch3_ex5.addItem({
      name: 'Reducing vs Increasing Friction (Real Life)',
      filename: 'fbise9physics__ch3__reducing_increasing_friction',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch3_ex6 = ch3.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch3_dynamics_ex6_numericals' });
    ch3_ex6.addItem({
      name: 'Numericals on F = m a & Weight W = m g',
      filename: 'fbise9physics__ch3__numericals_fma_weight',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-04 — Turning Effect of Forces                                         ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch4 = builder.addChapter({ name: 'Ch-04', filename: 'Ch-04 Turning Effect of Forces' });
  
    // ── §1: Moments (core anchors) ──────────────────────────────────────────────
    const ch4_ex1 = ch4.addExercise({ name: 'Introduction to Moments', filename: 'ch4_turning_effect_ex1_intro' });
    ch4_ex1.addItem({
      name: 'Moment of a Force',
      filename: 'fbise9physics__ch4__moment_of_a_force',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch4_ex1.addItem({
      name: 'Principle of Moments',
      filename: 'fbise9physics__ch4__principle_of_moments',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch4_ex1.addItem({
      name: 'Clockwise vs Anticlockwise Moments (Sign Convention)',
      filename: 'fbise9physics__ch4__clockwise_vs_anticlockwise_moments',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Centre of Mass and Stability ────────────────────────────────────────
    const ch4_ex3 = ch4.addExercise({ name: 'Centre of Mass and Stability', filename: 'ch4_turning_effect_ex3_center_mass' });
    ch4_ex3.addItem({
      name: 'Centre of Gravity vs Centre of Mass',
      filename: 'fbise9physics__ch4__cog_vs_com',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch4_ex3.addItem({
      name: 'Stability: Base of Support & Height of COM',
      filename: 'fbise9physics__ch4__stability_base_support_com',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Conditions of Equilibrium ───────────────────────────────────────────
    const ch4_ex4 = ch4.addExercise({ name: 'Conditions of Equilibrium', filename: 'ch4_turning_effect_ex4_equilibrium' });
    ch4_ex4.addItem({
      name: 'Equilibrium: ∑F = 0 and ∑M = 0',
      filename: 'fbise9physics__ch4__equilibrium_force_and_moment_conditions',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Applications in Real Life ───────────────────────────────────────────
    const ch4_ex5 = ch4.addExercise({ name: 'Applications in Real Life', filename: 'ch4_turning_effect_ex5_applications' });
    ch4_ex5.addItem({
      name: 'Levers (Class I, II, III) & Everyday Tools',
      filename: 'fbise9physics__ch4__levers_classes_applications',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch4_ex5.addItem({
      name: 'Couple & Torque in Steering/Doors',
      filename: 'fbise9physics__ch4__couple_and_torque_applications',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch4_ex6 = ch4.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch4_turning_effect_ex6_numericals' });
    ch4_ex6.addItem({
      name: 'Moment & Lever Problems (Balancing Beams)',
      filename: 'fbise9physics__ch4__numericals_moments_levers',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-05 — Gravitation                                                      ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch5 = builder.addChapter({ name: 'Ch-05', filename: 'Ch-05 Gravitation' });
  
    // ── §1: Intro (Mass/Weight, Law of Gravitation) ─────────────────────────────
    const ch5_ex1 = ch5.addExercise({ name: 'Introduction to Gravitation', filename: 'ch5_gravitation_ex1_intro' });
    ch5_ex1.addItem({
      name: 'Mass vs Weight',
      filename: 'fbise9physics__ch5__mass_vs_weight',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch5_ex1.addItem({
      name: 'Newton’s Law of Gravitation',
      filename: 'fbise9physics__ch5__newtons_law_of_gravitation',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch5_ex1.addItem({
      name: 'Universal Gravitational Constant (G) & Units',
      filename: 'fbise9physics__ch5__gravitational_constant_G_units',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Gravitational Field Strength ────────────────────────────────────────
    const ch5_ex4 = ch5.addExercise({ name: 'Gravitational Field Strength', filename: 'ch5_gravitation_ex4_gravitational_field' });
    ch5_ex4.addItem({
      name: 'g as Field Strength (N/kg) & Acceleration (m/s²)',
      filename: 'fbise9physics__ch5__g_field_strength_and_acceleration',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch5_ex4.addItem({
      name: 'Variation of g with Altitude (Qualitative)',
      filename: 'fbise9physics__ch5__variation_of_g_with_altitude',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Satellites and Circular Orbits ──────────────────────────────────────
    const ch5_ex5 = ch5.addExercise({ name: 'Satellites and Circular Orbits', filename: 'ch5_gravitation_ex5_orbits' });
    ch5_ex5.addItem({
      name: 'Orbital Speed & Period (Concepts)',
      filename: 'fbise9physics__ch5__orbital_speed_and_period_concepts',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch5_ex5.addItem({
      name: 'Geostationary Satellite (Conditions)',
      filename: 'fbise9physics__ch5__geostationary_satellite_conditions',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch5_ex6 = ch5.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch5_gravitation_ex6_numericals' });
    ch5_ex6.addItem({
      name: 'Numericals on Weight, g & Gravitation',
      filename: 'fbise9physics__ch5__numericals_weight_g_gravitation',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-06 — Work and Energy                                                  ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch6 = builder.addChapter({ name: 'Ch-06', filename: 'Ch-06 Work and Energy' });
  
    // ── §1: Introduction to Work and Energy ─────────────────────────────────────
    const ch6_ex1 = ch6.addExercise({ name: 'Introduction to Work and Energy', filename: 'ch6_work_energy_ex1_intro' });
    ch6_ex1.addItem({
      name: 'Work (W = F · s)',
      filename: 'fbise9physics__ch6__work_basic_definition',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch6_ex1.addItem({
      name: 'Kinetic & Potential Energy',
      filename: 'fbise9physics__ch6__kinetic_and_potential_energy',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch6_ex1.addItem({
      name: 'Energy Forms & Transformations',
      filename: 'fbise9physics__ch6__energy_forms_and_transformations',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §2: Work Done and Its Calculation ───────────────────────────────────────
    const ch6_ex2 = ch6.addExercise({ name: 'Work Done and Its Calculation', filename: 'ch6_work_energy_ex2_work' });
    ch6_ex2.addItem({
      name: 'Units & Sign of Work; Angle Between F and s',
      filename: 'fbise9physics__ch6__units_sign_of_work_angle',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch6_ex2.addItem({
      name: 'Work–Energy Theorem (Idea)',
      filename: 'fbise9physics__ch6__work_energy_theorem_idea',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Power and Its Measurement ───────────────────────────────────────────
    const ch6_ex4 = ch6.addExercise({ name: 'Power and Its Measurement', filename: 'ch6_work_energy_ex4_power' });
    ch6_ex4.addItem({
      name: 'Power (P = W/t) & Units (Watt, kW)',
      filename: 'fbise9physics__ch6__power_definition_units',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch6_ex4.addItem({
      name: 'Commercial Unit: kWh (Kilowatt-hour)',
      filename: 'fbise9physics__ch6__commercial_unit_kwh',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Efficiency and Energy Conservation ──────────────────────────────────
    const ch6_ex5 = ch6.addExercise({ name: 'Efficiency and Energy Conservation', filename: 'ch6_work_energy_ex5_efficiency' });
    ch6_ex5.addItem({
      name: 'Efficiency (%) = Useful / Input × 100',
      filename: 'fbise9physics__ch6__efficiency_percentage_formula',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch6_ex5.addItem({
      name: 'Law of Conservation of Energy (Everyday Examples)',
      filename: 'fbise9physics__ch6__conservation_of_energy_examples',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch6_ex6 = ch6.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch6_work_energy_ex6_numericals' });
    ch6_ex6.addItem({
      name: 'Numericals on Work, Energy & Power',
      filename: 'fbise9physics__ch6__numericals_work_energy_power',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-07 — Properties of Matter                                             ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch7 = builder.addChapter({ name: 'Ch-07', filename: 'Ch-07 Properties of Matter' });
  
    // ── §1: Intro (Density, Pressure in fluids) ─────────────────────────────────
    const ch7_ex1 = ch7.addExercise({ name: 'Introduction to Matter and Its States', filename: 'ch7_properties_matter_ex1_intro' });
    ch7_ex1.addItem({
      name: 'Density and Its Determination',
      filename: 'fbise9physics__ch7__density_and_determination',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch7_ex1.addItem({
      name: 'Pressure in Fluids',
      filename: 'fbise9physics__ch7__pressure_in_fluids',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch7_ex1.addItem({
      name: 'States of Matter: Solid, Liquid, Gas (Brief)',
      filename: 'fbise9physics__ch7__states_of_matter_brief',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Pressure in Solids, Liquids, and Gases ─────────────────────────────
    const ch7_ex3 = ch7.addExercise({ name: 'Pressure in Solids, Liquids, and Gases', filename: 'ch7_properties_matter_ex3_pressure' });
    ch7_ex3.addItem({
      name: 'Pressure = Force/Area (Solids) & Applications',
      filename: 'fbise9physics__ch7__pressure_in_solids_and_apps',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch7_ex3.addItem({
      name: 'Liquid Pressure with Depth: p = ρ g h',
      filename: 'fbise9physics__ch7__liquid_pressure_rho_g_h',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch7_ex3.addItem({
      name: 'Gas Pressure (Qualitative Ideas)',
      filename: 'fbise9physics__ch7__gas_pressure_qualitative',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Elasticity and Hooke’s Law ──────────────────────────────────────────
    const ch7_ex4 = ch7.addExercise({ name: 'Elasticity and Hooke’s Law', filename: 'ch7_properties_matter_ex4_elasticity' });
    ch7_ex4.addItem({
      name: 'Hooke’s Law: F = k x & Limit of Proportionality',
      filename: 'fbise9physics__ch7__hookes_law_fx_and_limit',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch7_ex4.addItem({
      name: 'Elastic vs Plastic Deformation',
      filename: 'fbise9physics__ch7__elastic_vs_plastic_deformation',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Applications of Pressure ────────────────────────────────────────────
    const ch7_ex5 = ch7.addExercise({ name: 'Applications of Pressure', filename: 'ch7_properties_matter_ex5_applications' });
    ch7_ex5.addItem({
      name: 'Hydraulic Press (Pascal’s Principle)',
      filename: 'fbise9physics__ch7__hydraulic_press_pascals_principle',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch7_ex5.addItem({
      name: 'Floating & Sinking (Density Reasoning)',
      filename: 'fbise9physics__ch7__floating_and_sinking_density',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch7_ex6 = ch7.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch7_properties_matter_ex6_numericals' });
    ch7_ex6.addItem({
      name: 'Numericals on Density & Pressure',
      filename: 'fbise9physics__ch7__numericals_density_pressure',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-08 — Thermal Properties of Matter                                     ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch8 = builder.addChapter({ name: 'Ch-08', filename: 'Ch-08 Thermal Properties of Matter' });
  
    // ── §1: Temperature and Heat ────────────────────────────────────────────────
    const ch8_ex1 = ch8.addExercise({ name: 'Temperature and Heat', filename: 'ch8_thermal_properties_ex1_intro' });
    ch8_ex1.addItem({
      name: 'Temperature vs Heat',
      filename: 'fbise9physics__ch8__temperature_vs_heat',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch8_ex1.addItem({
      name: 'Specific Heat Capacity',
      filename: 'fbise9physics__ch8__specific_heat_capacity',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch8_ex1.addItem({
      name: 'Temperature Scales: Celsius & Kelvin',
      filename: 'fbise9physics__ch8__temperature_scales_celsius_kelvin',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §2: Heat Capacity and Specific Heat ─────────────────────────────────────
    const ch8_ex2 = ch8.addExercise({ name: 'Heat Capacity and Specific Heat', filename: 'ch8_thermal_properties_ex2_heat_capacity' });
    ch8_ex2.addItem({
      name: 'Heat Capacity (C) vs Specific Heat (c)',
      filename: 'fbise9physics__ch8__heat_capacity_vs_specific_heat',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Latent Heat and Change of State ─────────────────────────────────────
    const ch8_ex3 = ch8.addExercise({ name: 'Latent Heat and Change of State', filename: 'ch8_thermal_properties_ex3_latent_heat' });
    ch8_ex3.addItem({
      name: 'Latent Heat of Fusion & Vaporization',
      filename: 'fbise9physics__ch8__latent_heat_fusion_vaporization',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch8_ex3.addItem({
      name: 'Heating/Cooling Curves (Plateaus)',
      filename: 'fbise9physics__ch8__heating_cooling_curves_plateaus',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Thermal Expansion of Solids, Liquids, Gases ────────────────────────
    const ch8_ex4 = ch8.addExercise({ name: 'Thermal Expansion of Solids, Liquids, Gases', filename: 'ch8_thermal_properties_ex4_thermal_expansion' });
    ch8_ex4.addItem({
      name: 'Linear Expansion in Solids (α)',
      filename: 'fbise9physics__ch8__linear_expansion_in_solids',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch8_ex4.addItem({
      name: 'Expansion of Liquids & Gases (Qualitative)',
      filename: 'fbise9physics__ch8__expansion_of_liquids_gases',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Applications in Daily Life ─────────────────────────────────────────
    const ch8_ex5 = ch8.addExercise({ name: 'Applications in Daily Life', filename: 'ch8_thermal_properties_ex5_real_life' });
    ch8_ex5.addItem({
      name: 'Bimetallic Strip & Thermostat',
      filename: 'fbise9physics__ch8__bimetallic_strip_thermostat',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch8_ex6 = ch8.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch8_thermal_properties_ex6_numericals' });
    ch8_ex6.addItem({
      name: 'Numericals on c, L & Expansion',
      filename: 'fbise9physics__ch8__numericals_specific_latent_heat_expansion',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ╔══════════════════════════════════════════════════════════════════════════╗
    // ║ Ch-09 — Transfer of Heat                                                 ║
    // ╚══════════════════════════════════════════════════════════════════════════╝
    const ch9 = builder.addChapter({ name: 'Ch-09', filename: 'Ch-09 Transfer of Heat' });
  
    // ── §1: Modes of Heat Transfer (anchors) ────────────────────────────────────
    const ch9_ex1 = ch9.addExercise({ name: 'Modes of Heat Transfer', filename: 'ch9_transfer_heat_ex1_intro' });
    ch9_ex1.addItem({
      name: 'Conduction',
      filename: 'fbise9physics__ch9__conduction',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch9_ex1.addItem({
      name: 'Convection vs Radiation',
      filename: 'fbise9physics__ch9__convection_vs_radiation',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch9_ex1.addItem({
      name: 'Good vs Bad Conductors (Insulators)',
      filename: 'fbise9physics__ch9__good_vs_bad_conductors',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §2: Conduction and Thermal Conductors ───────────────────────────────────
    const ch9_ex2 = ch9.addExercise({ name: 'Conduction and Thermal Conductors', filename: 'ch9_transfer_heat_ex2_conduction' });
    ch9_ex2.addItem({
      name: 'Conduction in Solids (Particle Model)',
      filename: 'fbise9physics__ch9__conduction_in_solids_particle_model',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §3: Convection in Fluids ────────────────────────────────────────────────
    const ch9_ex3 = ch9.addExercise({ name: 'Convection in Fluids', filename: 'ch9_transfer_heat_ex3_convection' });
    ch9_ex3.addItem({
      name: 'Convection Currents & Applications (Sea/Land Breeze)',
      filename: 'fbise9physics__ch9__convection_currents_breezes',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §4: Radiation and Absorbers/Emitters ────────────────────────────────────
    const ch9_ex4 = ch9.addExercise({ name: 'Radiation and Absorbers/Emitters', filename: 'ch9_transfer_heat_ex4_radiation' });
    ch9_ex4.addItem({
      name: 'Radiation in Vacuum; Black vs Shiny Surfaces',
      filename: 'fbise9physics__ch9__radiation_black_vs_shiny',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch9_ex4.addItem({
      name: 'Greenhouse Effect (Physics of Trapping Heat)',
      filename: 'fbise9physics__ch9__greenhouse_effect_physics',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §5: Everyday Applications of Heat Transfer ──────────────────────────────
    const ch9_ex5 = ch9.addExercise({ name: 'Everyday Applications of Heat Transfer', filename: 'ch9_transfer_heat_ex5_household' });
    ch9_ex5.addItem({
      name: 'Thermos (Vacuum Flask): Design & Reasoning',
      filename: 'fbise9physics__ch9__thermos_vacuum_flask_design',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
    ch9_ex5.addItem({
      name: 'Home Insulation & Clothing (Winter/Summer)',
      filename: 'fbise9physics__ch9__home_insulation_clothing',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ── §6: Problem Solving and Numericals ──────────────────────────────────────
    const ch9_ex6 = ch9.addExercise({ name: 'Problem Solving and Numericals', filename: 'ch9_transfer_heat_ex6_numericals' });
    ch9_ex6.addItem({
      name: 'Numericals on Conduction, Convection & Radiation',
      filename: 'fbise9physics__ch9__numericals_heat_transfer_modes',
      type: 'note', thumbnail: THUMB, tags: ['note']
    });
  
    // ─────────────────────────────────────────────────────────────────────────────
    // RETURN (for symmetry with math file; builder.build() happens in syllabus.js)
    // ─────────────────────────────────────────────────────────────────────────────
    return builder;
  }
  