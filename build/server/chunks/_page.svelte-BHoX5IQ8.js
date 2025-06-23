import { c as create_ssr_component, v as validate_component, d as add_attribute, e as each, b as escape } from './ssr-DxeigfMQ.js';
import { N as Nav } from './Nav-CHLJryKr.js';
import './client-CjdeEz1m.js';
import './exports-DuWZopOC.js';

const css = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = ["Home", "AI Track", "IT Track", "Contact"];
  $$result.css.add(css);
  return `<footer class="footer svelte-1w1amng"><div class="footer-top svelte-1w1amng"><div class="brand svelte-1w1amng" data-svelte-h="svelte-cspdkz">Taleem.Help</div> <nav class="nav-links svelte-1w1amng">${each(links, (link) => {
    return `<a href="https://taleem.help" class="footer-link svelte-1w1amng">${escape(link)}</a>`;
  })}</nav></div> <div class="footer-bottom svelte-1w1amng" data-svelte-h="svelte-1999gmq"><p>© 2025 Taleem.Help — Education for Every Pakistani</p> <p class="credits svelte-1w1amng">Built with ❤️ in Islamabad</p></div> </footer>`;
});
const SidebarCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "" } = $$props;
  let { title = "" } = $$props;
  let { details = "" } = $$props;
  let { url = "#" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<a${add_attribute("href", url, 0)} class="block no-underline"><div class="bg-[#fef6ec] border border-[#c4a77f] rounded-lg p-4 text-sm shadow-sm hover:shadow-md transition cursor-pointer"><h4 class="font-semibold text-[#3d2e1e] mb-1">${escape(icon)} ${escape(title)}</h4> <p class="text-gray-700">${escape(details)}</p></div></a>`;
});
const TcodeCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { tcodes = [] } = $$props;
  if ($$props.tcodes === void 0 && $$bindings.tcodes && tcodes !== void 0)
    $$bindings.tcodes(tcodes);
  return `<div class="flex flex-wrap gap-10 justify-center ">${each(tcodes, (t) => {
    return `<a${add_attribute("href", `/syllabus/${t.tcodeName}`, 0)}><div class="block max-w-sm mx-auto rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all"><div class="block bg-white rounded-xl shadow-lg overflow-hidden hover:ring-2 ring-yellow-600 transition-all"><img${add_attribute("src", t.image, 0)}${add_attribute("alt", t.tcodeName, 0)} class="w-full h-48 object-cover"> <div class="p-4"><h2 class="text-lg font-bold text-gray-800">${escape(t.tcodeName)}</h2> <p class="text-sm text-gray-600 mt-1">${escape(t.tcodeName)}</p></div> </div></div> </a>`;
  })}</div>`;
});
const syllabusMap = {
  "fbise9physics": {
    "tcodeName": "fbise9physics",
    "filename": "fbise9physics",
    "description": "Federal Board Grade 9 Physics",
    "image": "/pivot/fbise9physics.webp",
    "chapters": [
      {
        "filename": "ch1_physical_quantities",
        "name": "Physical Quantities and Measurement",
        "exercises": [
          {
            "filename": "ch1_physical_quantities_ex1_intro",
            "name": "Introduction to Physics"
          },
          {
            "filename": "ch1_physical_quantities_ex2_units",
            "name": "International System of Units (SI)"
          },
          {
            "filename": "ch1_physical_quantities_ex3_instruments",
            "name": "Measuring Instruments"
          },
          {
            "filename": "ch1_physical_quantities_ex4_notations",
            "name": "Scientific Notation"
          },
          {
            "filename": "ch1_physical_quantities_ex5_sigfigs",
            "name": "Significant Figures"
          }
        ]
      },
      {
        "filename": "ch2_kinematics",
        "name": "Kinematics",
        "exercises": [
          {
            "filename": "ch2_kinematics_ex1_intro",
            "name": "Introduction to Kinematics"
          },
          {
            "filename": "ch2_kinematics_ex2_distance",
            "name": "Distance and Displacement"
          },
          {
            "filename": "ch2_kinematics_ex3_velocity",
            "name": "Speed and Velocity"
          },
          {
            "filename": "ch2_kinematics_ex4_acceleration",
            "name": "Acceleration"
          },
          {
            "filename": "ch2_kinematics_ex5_graphs",
            "name": "Graphical Representation of Motion"
          },
          {
            "filename": "ch2_kinematics_ex6_equations",
            "name": "Equations of Motion"
          },
          {
            "filename": "ch2_kinematics_ex7_freefall",
            "name": "Free Fall and Uniform Acceleration"
          },
          {
            "filename": "ch2_kinematics_ex8_problems",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch3_dynamics",
        "name": "Dynamics",
        "exercises": [
          {
            "filename": "ch3_dynamics_ex1_intro",
            "name": "Introduction to Dynamics and Force"
          },
          {
            "filename": "ch3_dynamics_ex2_newton_laws",
            "name": "Newton’s Laws of Motion"
          },
          {
            "filename": "ch3_dynamics_ex3_inertia_mass_weight",
            "name": "Inertia, Mass & Weight"
          },
          {
            "filename": "ch3_dynamics_ex4_action_reaction",
            "name": "Action-Reaction Principle"
          },
          {
            "filename": "ch3_dynamics_ex5_friction",
            "name": "Friction: Causes and Effects"
          },
          {
            "filename": "ch3_dynamics_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch4_turning_effect",
        "name": "Turning Effect of Forces",
        "exercises": [
          {
            "filename": "ch4_turning_effect_ex1_intro",
            "name": "Introduction to Moments"
          },
          {
            "filename": "ch4_turning_effect_ex2_moment_principle",
            "name": "Principle of Moments"
          },
          {
            "filename": "ch4_turning_effect_ex3_center_mass",
            "name": "Centre of Mass and Stability"
          },
          {
            "filename": "ch4_turning_effect_ex4_equilibrium",
            "name": "Conditions of Equilibrium"
          },
          {
            "filename": "ch4_turning_effect_ex5_applications",
            "name": "Applications in Real Life"
          },
          {
            "filename": "ch4_turning_effect_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch5_gravitation",
        "name": "Gravitation",
        "exercises": [
          {
            "filename": "ch5_gravitation_ex1_intro",
            "name": "Introduction to Gravitation"
          },
          {
            "filename": "ch5_gravitation_ex2_mass_weight",
            "name": "Mass and Weight"
          },
          {
            "filename": "ch5_gravitation_ex3_newton_gravity",
            "name": "Newton’s Law of Gravitation"
          },
          {
            "filename": "ch5_gravitation_ex4_gravitational_field",
            "name": "Gravitational Field Strength"
          },
          {
            "filename": "ch5_gravitation_ex5_orbits",
            "name": "Satellites and Circular Orbits"
          },
          {
            "filename": "ch5_gravitation_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch6_work_energy",
        "name": "Work and Energy",
        "exercises": [
          {
            "filename": "ch6_work_energy_ex1_intro",
            "name": "Introduction to Work and Energy"
          },
          {
            "filename": "ch6_work_energy_ex2_work",
            "name": "Work Done and Its Calculation"
          },
          {
            "filename": "ch6_work_energy_ex3_kinetic_potential",
            "name": "Kinetic and Potential Energy"
          },
          {
            "filename": "ch6_work_energy_ex4_power",
            "name": "Power and Its Measurement"
          },
          {
            "filename": "ch6_work_energy_ex5_efficiency",
            "name": "Efficiency and Energy Conservation"
          },
          {
            "filename": "ch6_work_energy_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch7_properties_matter",
        "name": "Properties of Matter",
        "exercises": [
          {
            "filename": "ch7_properties_matter_ex1_intro",
            "name": "Introduction to Matter and Its States"
          },
          {
            "filename": "ch7_properties_matter_ex2_density",
            "name": "Density and Its Determination"
          },
          {
            "filename": "ch7_properties_matter_ex3_pressure",
            "name": "Pressure in Solids, Liquids, and Gases"
          },
          {
            "filename": "ch7_properties_matter_ex4_elasticity",
            "name": "Elasticity and Hooke’s Law"
          },
          {
            "filename": "ch7_properties_matter_ex5_applications",
            "name": "Applications of Pressure"
          },
          {
            "filename": "ch7_properties_matter_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch8_thermal_properties",
        "name": "Thermal Properties of Matter",
        "exercises": [
          {
            "filename": "ch8_thermal_properties_ex1_intro",
            "name": "Temperature and Heat"
          },
          {
            "filename": "ch8_thermal_properties_ex2_heat_capacity",
            "name": "Heat Capacity and Specific Heat"
          },
          {
            "filename": "ch8_thermal_properties_ex3_latent_heat",
            "name": "Latent Heat and Change of State"
          },
          {
            "filename": "ch8_thermal_properties_ex4_thermal_expansion",
            "name": "Thermal Expansion of Solids, Liquids, Gases"
          },
          {
            "filename": "ch8_thermal_properties_ex5_real_life",
            "name": "Applications in Daily Life"
          },
          {
            "filename": "ch8_thermal_properties_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      },
      {
        "filename": "ch9_transfer_heat",
        "name": "Transfer of Heat",
        "exercises": [
          {
            "filename": "ch9_transfer_heat_ex1_intro",
            "name": "Modes of Heat Transfer"
          },
          {
            "filename": "ch9_transfer_heat_ex2_conduction",
            "name": "Conduction and Thermal Conductors"
          },
          {
            "filename": "ch9_transfer_heat_ex3_convection",
            "name": "Convection in Fluids"
          },
          {
            "filename": "ch9_transfer_heat_ex4_radiation",
            "name": "Radiation and Absorbers/Emitters"
          },
          {
            "filename": "ch9_transfer_heat_ex5_household",
            "name": "Everyday Applications of Heat Transfer"
          },
          {
            "filename": "ch9_transfer_heat_ex6_numericals",
            "name": "Problem Solving and Numericals"
          }
        ]
      }
    ],
    "questions": [
      {
        "filename": "q001_what_is_physics",
        "name": "Define Physics. What is its scope in everyday life?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q002_branches_physics",
        "name": "List and briefly describe the main branches of Physics.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q003_need_for_measurement",
        "name": "Why is measurement important in Physics?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q004_physical_quantity",
        "name": "What is meant by a physical quantity? Give examples.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q005_base_derived_quantities",
        "name": "Differentiate between base and derived physical quantities.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q006_define_unit",
        "name": "What is a unit? Why is it important in measurements?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex2_units",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q007_standard_units",
        "name": "What are standard units? Give examples.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex2_units",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q008_si_units_intro",
        "name": "What are SI units? Why are they preferred worldwide?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex2_units",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q009_base_units_list",
        "name": "List the seven base quantities and their SI units.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex2_units",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q010_convenient_units",
        "name": "Why do we use convenient units like millimeter or kilometer?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex2_units",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q011_measuring_tape",
        "name": "What is a measuring tape used for in physics?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex3_instruments",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q012_vernier_calipers",
        "name": "Describe the working principle of vernier calipers.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex3_instruments",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q013_micrometer_screw",
        "name": "What is a micrometer screw gauge used for?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex3_instruments",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q014_stopwatch_use",
        "name": "How is time measured using a stopwatch?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex3_instruments",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q015_precaution_measurement",
        "name": "List precautions to take while using measuring instruments.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex3_instruments",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q016_define_scientific_notation",
        "name": "What is scientific notation? Why is it used?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex4_notations",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q017_example_large_number",
        "name": "Write 3,000,000 in scientific notation.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex4_notations",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q018_example_small_number",
        "name": "Express 0.00042 in scientific notation.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex4_notations",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q019_rules_notation",
        "name": "State the rules for writing numbers in scientific notation.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex4_notations",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q020_convert_notation",
        "name": "Convert 6.02 × 10²³ into decimal notation.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex4_notations",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q021_define_sigfigs",
        "name": "What are significant figures? Why are they important in measurements?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex5_sigfigs",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q022_identify_sigfigs",
        "name": "How many significant figures are there in 0.00456 and 5200?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex5_sigfigs",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q023_rules_sigfigs",
        "name": "State the rules for identifying significant figures.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex5_sigfigs",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q024_rounding_sigfigs",
        "name": "Round 12.34567 to three significant figures.",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex5_sigfigs",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q025_use_sigfigs_calculations",
        "name": "How are significant figures used in calculations?",
        "type": "slide",
        "chapterFilename": "ch1_physical_quantities",
        "exerciseFilename": "ch1_physical_quantities_ex5_sigfigs",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q201_kinematics_scope",
        "name": "What is the scope of kinematics in Physics?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q202_distance_vs_displacement",
        "name": "Differentiate between distance and displacement with examples.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q203_scalar_vector",
        "name": "Is displacement a scalar or vector quantity? Justify your answer.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q204_define_velocity",
        "name": "Define velocity and explain its types.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q205_velocity_vs_speed",
        "name": "How does velocity differ from speed?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q206_define_acceleration",
        "name": "What is acceleration? State its SI unit.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q207_negative_acceleration",
        "name": "What is meant by negative acceleration? Give an example.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q208_dt_graph",
        "name": "What does the slope of a distance-time graph represent?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q209_vt_graph_area",
        "name": "What information can be obtained from the area under a velocity-time graph?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q210_equation1",
        "name": "State and derive the first equation of motion.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q211_equation2",
        "name": "State the second and third equations of motion.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q212_define_freefall",
        "name": "What is free fall? What is the acceleration of free-falling objects?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q213_vacuum_vs_air",
        "name": "Why do objects fall at the same rate in vacuum?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q214_numerical_acceleration",
        "name": "A car speeds up from 0 to 25 m/s in 5 s. Find the acceleration.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q215_numerical_equation2",
        "name": "A body covers 20 m in 2 s starting from rest. Find its acceleration.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q216_distance_def",
        "name": "Define distance with an example.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex2_distance",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q221_define_speed",
        "name": "Define speed and explain average speed.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex3_velocity",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q226_acceleration_types",
        "name": "What are different types of acceleration?",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex4_acceleration",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q231_graphs_types",
        "name": "Name different types of motion graphs.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex5_graphs",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q236_eq1_derivation",
        "name": "Derive the first equation of motion.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex6_equations",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q241_define_freefall",
        "name": "Define free fall and give examples.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex7_freefall",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q246_num_velocity",
        "name": "A body moves 20 m in 4 s. Find velocity.",
        "type": "slide",
        "chapterFilename": "ch2_kinematics",
        "exerciseFilename": "ch2_kinematics_ex8_problems",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q301_define_force",
        "name": "Define force and its effects.",
        "type": "slide",
        "chapterFilename": "ch3_dynamics",
        "exerciseFilename": "ch3_dynamics_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q302_newton_laws",
        "name": "State and explain Newton’s three laws of motion.",
        "type": "slide",
        "chapterFilename": "ch3_dynamics",
        "exerciseFilename": "ch3_dynamics_ex2_newton_laws",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q303_mass_weight",
        "name": "Differentiate between mass and weight.",
        "type": "slide",
        "chapterFilename": "ch3_dynamics",
        "exerciseFilename": "ch3_dynamics_ex3_inertia_mass_weight",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q304_action_reaction",
        "name": "Explain the action-reaction principle with an example.",
        "type": "slide",
        "chapterFilename": "ch3_dynamics",
        "exerciseFilename": "ch3_dynamics_ex4_action_reaction",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q305_define_friction",
        "name": "What is friction? Mention its advantages and disadvantages.",
        "type": "slide",
        "chapterFilename": "ch3_dynamics",
        "exerciseFilename": "ch3_dynamics_ex5_friction",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q306_force_numerical",
        "name": "A 5 kg mass is accelerated at 2 m/s². Find the force applied.",
        "type": "slide",
        "chapterFilename": "ch3_dynamics",
        "exerciseFilename": "ch3_dynamics_ex6_numericals",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q401_define_moment",
        "name": "Define moment of a force and give its SI unit.",
        "type": "slide",
        "chapterFilename": "ch4_turning_effect",
        "exerciseFilename": "ch4_turning_effect_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q402_principle_moments",
        "name": "State and explain the principle of moments.",
        "type": "slide",
        "chapterFilename": "ch4_turning_effect",
        "exerciseFilename": "ch4_turning_effect_ex2_moment_principle",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q403_center_mass",
        "name": "What is center of mass? Explain with an example.",
        "type": "slide",
        "chapterFilename": "ch4_turning_effect",
        "exerciseFilename": "ch4_turning_effect_ex3_center_mass",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q404_equilibrium",
        "name": "Explain the two conditions for equilibrium.",
        "type": "slide",
        "chapterFilename": "ch4_turning_effect",
        "exerciseFilename": "ch4_turning_effect_ex4_equilibrium",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q405_moment_applications",
        "name": "Describe a real-life application of turning effect of force.",
        "type": "slide",
        "chapterFilename": "ch4_turning_effect",
        "exerciseFilename": "ch4_turning_effect_ex5_applications",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q406_moment_numerical",
        "name": "Calculate the moment produced by a 10 N force at 0.5 m from the pivot.",
        "type": "slide",
        "chapterFilename": "ch4_turning_effect",
        "exerciseFilename": "ch4_turning_effect_ex6_numericals",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q501_intro_gravity",
        "name": "What is gravitation? Describe its importance.",
        "type": "slide",
        "chapterFilename": "ch5_gravitation",
        "exerciseFilename": "ch5_gravitation_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q502_mass_vs_weight",
        "name": "Differentiate between mass and weight.",
        "type": "slide",
        "chapterFilename": "ch5_gravitation",
        "exerciseFilename": "ch5_gravitation_ex2_mass_weight",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q503_newton_law_gravity",
        "name": "State Newton’s law of universal gravitation.",
        "type": "slide",
        "chapterFilename": "ch5_gravitation",
        "exerciseFilename": "ch5_gravitation_ex3_newton_gravity",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q504_gravitational_field",
        "name": "Define gravitational field strength and write its unit.",
        "type": "slide",
        "chapterFilename": "ch5_gravitation",
        "exerciseFilename": "ch5_gravitation_ex4_gravitational_field",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q505_satellites_orbits",
        "name": "How do satellites stay in orbit around Earth?",
        "type": "slide",
        "chapterFilename": "ch5_gravitation",
        "exerciseFilename": "ch5_gravitation_ex5_orbits",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q506_gravity_numerical",
        "name": "Find the force between two masses of 5 kg and 10 kg placed 2 m apart.",
        "type": "slide",
        "chapterFilename": "ch5_gravitation",
        "exerciseFilename": "ch5_gravitation_ex6_numericals",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q601_intro_work_energy",
        "name": "Define work and energy with examples.",
        "type": "slide",
        "chapterFilename": "ch6_work_energy",
        "exerciseFilename": "ch6_work_energy_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q602_work_calc",
        "name": "How is work calculated in Physics?",
        "type": "slide",
        "chapterFilename": "ch6_work_energy",
        "exerciseFilename": "ch6_work_energy_ex2_work",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q603_kinetic_vs_potential",
        "name": "Differentiate between kinetic and potential energy.",
        "type": "slide",
        "chapterFilename": "ch6_work_energy",
        "exerciseFilename": "ch6_work_energy_ex3_kinetic_potential",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q604_power_definition",
        "name": "What is power and how is it measured?",
        "type": "slide",
        "chapterFilename": "ch6_work_energy",
        "exerciseFilename": "ch6_work_energy_ex4_power",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q605_efficiency",
        "name": "Define efficiency and explain how it is calculated.",
        "type": "slide",
        "chapterFilename": "ch6_work_energy",
        "exerciseFilename": "ch6_work_energy_ex5_efficiency",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q606_work_numerical",
        "name": "A machine does 200 J of work in 10 seconds. Find its power.",
        "type": "slide",
        "chapterFilename": "ch6_work_energy",
        "exerciseFilename": "ch6_work_energy_ex6_numericals",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q701_matter_states",
        "name": "What are the three states of matter? Explain briefly.",
        "type": "slide",
        "chapterFilename": "ch7_properties_matter",
        "exerciseFilename": "ch7_properties_matter_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q702_density_definition",
        "name": "Define density and describe how it is measured.",
        "type": "slide",
        "chapterFilename": "ch7_properties_matter",
        "exerciseFilename": "ch7_properties_matter_ex2_density",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q703_pressure_types",
        "name": "Explain pressure in solids, liquids, and gases.",
        "type": "slide",
        "chapterFilename": "ch7_properties_matter",
        "exerciseFilename": "ch7_properties_matter_ex3_pressure",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q704_elasticity_hooke",
        "name": "Define elasticity and state Hooke’s Law.",
        "type": "slide",
        "chapterFilename": "ch7_properties_matter",
        "exerciseFilename": "ch7_properties_matter_ex4_elasticity",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q705_pressure_apps",
        "name": "List some real-life applications of pressure.",
        "type": "slide",
        "chapterFilename": "ch7_properties_matter",
        "exerciseFilename": "ch7_properties_matter_ex5_applications",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q706_density_problem",
        "name": "Calculate the density of an object with mass 300g and volume 100cm³.",
        "type": "slide",
        "chapterFilename": "ch7_properties_matter",
        "exerciseFilename": "ch7_properties_matter_ex6_numericals",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q801_temp_heat",
        "name": "Differentiate between temperature and heat.",
        "type": "slide",
        "chapterFilename": "ch8_thermal_properties",
        "exerciseFilename": "ch8_thermal_properties_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q802_specific_heat",
        "name": "Define specific heat capacity with an example.",
        "type": "slide",
        "chapterFilename": "ch8_thermal_properties",
        "exerciseFilename": "ch8_thermal_properties_ex2_heat_capacity",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q803_latent_heat",
        "name": "What is latent heat? Explain with examples.",
        "type": "slide",
        "chapterFilename": "ch8_thermal_properties",
        "exerciseFilename": "ch8_thermal_properties_ex3_latent_heat",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q804_thermal_expansion",
        "name": "Describe thermal expansion in solids, liquids, and gases.",
        "type": "slide",
        "chapterFilename": "ch8_thermal_properties",
        "exerciseFilename": "ch8_thermal_properties_ex4_thermal_expansion",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q805_daily_use",
        "name": "Give daily life applications of thermal properties.",
        "type": "slide",
        "chapterFilename": "ch8_thermal_properties",
        "exerciseFilename": "ch8_thermal_properties_ex5_real_life",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q806_heat_calc",
        "name": "Calculate heat required to raise temperature of 2kg water by 10°C. (c = 4200 J/kg°C)",
        "type": "slide",
        "chapterFilename": "ch8_thermal_properties",
        "exerciseFilename": "ch8_thermal_properties_ex6_numericals",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q901_heat_transfer_modes",
        "name": "What are the three modes of heat transfer?",
        "type": "slide",
        "chapterFilename": "ch9_transfer_heat",
        "exerciseFilename": "ch9_transfer_heat_ex1_intro",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q902_conduction",
        "name": "Explain conduction with an example.",
        "type": "slide",
        "chapterFilename": "ch9_transfer_heat",
        "exerciseFilename": "ch9_transfer_heat_ex2_conduction",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q903_convection",
        "name": "Describe convection and its role in fluids.",
        "type": "slide",
        "chapterFilename": "ch9_transfer_heat",
        "exerciseFilename": "ch9_transfer_heat_ex3_convection",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q904_radiation",
        "name": "Define radiation and give examples.",
        "type": "slide",
        "chapterFilename": "ch9_transfer_heat",
        "exerciseFilename": "ch9_transfer_heat_ex4_radiation",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q905_household_heat",
        "name": "List common household applications of heat transfer.",
        "type": "slide",
        "chapterFilename": "ch9_transfer_heat",
        "exerciseFilename": "ch9_transfer_heat_ex5_household",
        "tcodeName": "fbise9physics"
      },
      {
        "filename": "q906_numerical",
        "name": "A 2kg metal is heated from 20°C to 70°C. Find heat if c = 500 J/kg°C.",
        "type": "slide",
        "chapterFilename": "ch9_transfer_heat",
        "exerciseFilename": "ch9_transfer_heat_ex6_numericals",
        "tcodeName": "fbise9physics"
      }
    ]
  }
};
function getAllTcodes() {
  return Object.values(syllabusMap);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen flex flex-col justify-start bg-[#160c00]">${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} <div class="bg-yellow-500 border-l-4 border-yellow-500 text-yellow-800 p-3 mx-4 my-2 text-center rounded shadow-md text-sm font-semibold" data-svelte-h="svelte-11bznqu">🛠️ This App is in Beta Testing Mode.</div> <section class="w-full px-12 py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-12 min-h-screen"> <div${add_attribute("class", ` p-6 rounded-xl shadow-inner flex flex-col space-y-6 border-2 border-[#93754b]  `, 0)}>${validate_component(TcodeCard, "TcodeCard").$$render($$result, { tcodes: getAllTcodes() }, {}, {})}</div>  <div${add_attribute("class", ` p-4 rounded-xl shadow flex flex-col space-y-4 min-h-screen border-2  border-[#93754b] text-white`, 0)}><h4 class="text-lg font-bold mb-2 text-white" data-svelte-h="svelte-1yw9ttk">📢 Updates &amp; Insights</h4> ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🚀",
      title: "Be Part of AI Revolution",
      details: "World is entering into a new era. This is a time to act for Pakistani Students. AI bring new oppertunities.",
      url: "/blog/be-part-of-ai-revolution.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "📜",
      title: "AI Foundation Track",
      details: "Introducing AI Foundation Track - Taleem.Help. In the current economic conditions AI is a new form of business and earning.",
      url: "/blog/ai-foundation-track-brochure.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "👨‍🎓",
      title: "Future in AI Era for Pakistani Students",
      details: "A brief blog post about some of the steps suggested for Pakistani Students",
      ".": true,
      url: "/blog/future-in-the-ai-era-for--pakistani-students.html"
    },
    {},
    {}
  )} ${validate_component(SidebarCard, "SidebarCard").$$render(
    $$result,
    {
      icon: "🌳",
      title: "Brief: Pakistani IT Industry 2025",
      details: "A snap shot of Pakistani IT industray in 2025. Some of the Top Earners and the Industrial sectors they target",
      ".": true,
      url: "blog/backend-servies-presentation/pakistani-it-industry-overview.html"
    },
    {},
    {}
  )}</div></section> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BHoX5IQ8.js.map
