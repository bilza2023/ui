import { c as create_ssr_component, e as escape, v as validate_component, d as each } from "../../../chunks/ssr.js";
import "../../../chunks/client.js";
import { N as Nav } from "../../../chunks/Nav.js";
import { B as BetaWarning } from "../../../chunks/BetaWarning.js";
const css$1 = {
  code: ".card.svelte-g5urb7{width:240px;min-height:180px;background-color:#ffffff;border:2px solid var(--card-color);border-top:8px solid var(--card-color);padding:1.2rem 1rem;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.06);cursor:pointer;transition:transform 0.15s ease, box-shadow 0.15s ease;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:sans-serif;text-align:center}.card.svelte-g5urb7:hover{transform:translateY(-4px);box-shadow:0 6px 16px rgba(0,0,0,0.12);background-color:#fdfdfd}.card-icon.svelte-g5urb7{font-size:3rem;margin-bottom:0.75rem;color:var(--card-color)}.card-title.svelte-g5urb7{font-size:1.2rem;font-weight:600;margin-bottom:0.5rem}.card-desc.svelte-g5urb7{font-size:0.9rem;color:#555;opacity:0.85;margin-top:auto}",
  map: null
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "📘" } = $$props;
  let { title = "Untitled" } = $$props;
  let { description = "" } = $$props;
  let { color = "#007BFF" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  $$result.css.add(css$1);
  return `  <div class="card svelte-g5urb7" style="${"--card-color: " + escape(color, true)}"><div class="card-icon svelte-g5urb7">${escape(icon)}</div> <div class="card-title svelte-g5urb7">${title ? `${escape(title.slice(0, 20))}${escape(title.length > 20 ? "…" : "")}` : ``}</div> ${description ? `<div class="card-desc svelte-g5urb7">${escape(description)}</div>` : ``} </div>`;
});
class SyllabusBuilder {
  constructor() {
    this.tcodeMap = /* @__PURE__ */ new Map();
  }
  /**
   * Add a new tcode (top-level syllabus)
   * @param {string} tcodeName - unique identifier for the syllabus
   * @param {object} meta - metadata for the tcode
   * @param {string} meta.description
   * @param {string} meta.image
   * @returns {Tcode}
   */
  addTcode(tcodeName, { description = "", image = "" } = {}) {
    if (this.tcodeMap.has(tcodeName)) {
      throw new Error(`Tcode '${tcodeName}' already exists.`);
    }
    const tcode = new Tcode(tcodeName, { description, image });
    this.tcodeMap.set(tcodeName, tcode);
    return tcode;
  }
  /**
   * Retrieve an existing tcode by name
   * @param {string} tcodeName
   * @returns {Tcode}
   */
  getTcode(tcodeName) {
    const tcode = this.tcodeMap.get(tcodeName);
    if (!tcode) {
      throw new Error(`Tcode '${tcodeName}' not found.`);
    }
    return tcode;
  }
  /**
   * Build and return the final nested JSON object of all tcodes
   * @returns {object}
   */
  build() {
    const result = {};
    for (const [tcodeName, tcode] of this.tcodeMap.entries()) {
      result[tcodeName] = tcode.toJSON();
    }
    return result;
  }
}
class Tcode {
  constructor(tcodeName, { description = "", image = "" } = {}) {
    this.tcodeName = tcodeName;
    this.filename = tcodeName;
    this.description = description;
    this.image = image;
    this.chapters = [];
    this.chapterMap = /* @__PURE__ */ new Map();
  }
  /**
   * Add a chapter under this tcode
   * @param {string} name
   * @param {string} filename
   * @returns {Chapter}
   */
  addChapter(name, filename) {
    if (this.chapterMap.has(filename)) {
      throw new Error(`Chapter '${filename}' already exists.`);
    }
    const chapter = new Chapter(name, filename);
    this.chapters.push(chapter);
    this.chapterMap.set(filename, chapter);
    return chapter;
  }
  /**
   * Get a chapter by filename
   * @param {string} filename
   * @returns {Chapter}
   */
  getChapter(filename) {
    const chapter = this.chapterMap.get(filename);
    if (!chapter) {
      throw new Error(`Chapter '${filename}' not found.`);
    }
    return chapter;
  }
  /**
   * Convert to plain JSON structure
   * @returns {object}
   */
  toJSON() {
    return {
      tcodeName: this.tcodeName,
      filename: this.filename,
      description: this.description,
      image: this.image,
      chapters: this.chapters.map((c) => c.toJSON())
    };
  }
}
class Chapter {
  constructor(name, filename) {
    this.name = name;
    this.filename = filename;
    this.exercises = [];
    this.exerciseMap = /* @__PURE__ */ new Map();
  }
  /**
   * Add an exercise under this chapter
   * @param {string} name
   * @param {string} filename
   * @returns {Exercise}
   */
  addExercise(name, filename) {
    if (this.exerciseMap.has(filename)) {
      throw new Error(`Exercise '${filename}' already exists.`);
    }
    const exercise = new Exercise(name, filename);
    this.exercises.push(exercise);
    this.exerciseMap.set(filename, exercise);
    return exercise;
  }
  /**
   * Get an exercise by filename
   * @param {string} filename
   * @returns {Exercise}
   */
  getExercise(filename) {
    const exercise = this.exerciseMap.get(filename);
    if (!exercise) {
      throw new Error(`Exercise '${filename}' not found.`);
    }
    return exercise;
  }
  /**
   * Convert to plain JSON structure
   * @returns {object}
   */
  toJSON() {
    return {
      name: this.name,
      filename: this.filename,
      exercises: this.exercises.map((e) => e.toJSON())
    };
  }
}
class Exercise {
  constructor(name, filename) {
    this.name = name;
    this.filename = filename;
    this.questions = [];
  }
  /**
   * Add a question to this exercise
   * @param {string} name
   * @param {string} filename
   */
  addQuestion(name, filename) {
    this.questions.push({ name, filename });
  }
  /**
   * Get all questions array
   * @returns {Array<{name: string, filename: string}>}
   */
  getAllQuestions() {
    return [...this.questions];
  }
  /**
   * Convert to plain JSON structure
   * @returns {object}
   */
  toJSON() {
    const json = {
      name: this.name,
      filename: this.filename
    };
    if (this.questions.length > 0) {
      json.questions = this.questions;
    }
    return json;
  }
}
function defineFbise9physics(builder2) {
  const fbise9physics = builder2.addTcode("fbise9physics", {
    description: "Federal Board Grade 9 Physics",
    image: "/pivot/fbise9physics.webp"
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
function defineTestSyllabus(builder2) {
  const test = builder2.addTcode("test", {
    description: "Test Syllabus for Demo Purposes",
    image: "/images/box.webp"
  });
  const ch1 = test.addChapter("Test Chapter", "test_ch1");
  const ex1 = ch1.addExercise("Test Exercise", "test_ch1_ex1");
  ex1.addQuestion("Sample Question", "test__test_ch1__test_ex1__q1");
  return test;
}
const builder = new SyllabusBuilder();
defineFbise9physics(builder);
defineTestSyllabus(builder);
builder.build();
const css = {
  code: ".view-container.svelte-124hnu0{text-align:center;margin-top:2rem}button.svelte-124hnu0{margin:0.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let chapters;
  $$result.css.add(css);
  chapters = [];
  return `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(BetaWarning, "BetaWarning").$$render($$result, {}, {}, {})} ${``} <div class="view-container svelte-124hnu0">${`${each(chapters, (ch) => {
    return `<button class="svelte-124hnu0">${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: ch.name,
        description: "",
        icon: "📁"
      },
      {},
      {}
    )} </button>`;
  })}`} </div>`;
});
export {
  Page as default
};
