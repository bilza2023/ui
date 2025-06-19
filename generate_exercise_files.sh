#!/bin/bash

TARGET_DIR="/home/bilal-tariq/00TALEEM==components/ui/src/lib/syllabusData/fbise9physics"
CHAPTERS_FILE="chapters.js"  # This file must exist and export the syllabus object

mkdir -p "$TARGET_DIR"

# Chapter and exercise map
declare -A exercises_by_chapter=(
  ["ch1_physical_quantities"]="ex1_intro ex2_units ex3_instruments ex4_errors ex5_scientific"
  ["ch2_kinematics"]="ex1_intro ex2_distance ex3_velocity ex4_acceleration ex5_graphs ex6_equations ex7_freefall ex8_problems"
  ["ch3_dynamics"]="ex1_intro ex2_newton_laws ex3_inertia_mass_weight ex4_action_reaction ex5_friction ex6_numericals"
  ["ch4_turning_effect"]="ex1_intro ex2_moment_principle ex3_center_mass ex4_equilibrium ex5_applications ex6_numericals"
  ["ch5_gravitation"]="ex1_intro ex2_mass_weight ex3_newton_gravity ex4_gravitational_field ex5_orbits ex6_numericals"
  ["ch6_work_energy"]="ex1_intro ex2_work ex3_kinetic_potential ex4_power ex5_efficiency ex6_numericals"
  ["ch7_properties_matter"]="ex1_intro ex2_density ex3_pressure ex4_elasticity ex5_applications ex6_numericals"
  ["ch8_thermal_properties"]="ex1_intro ex2_heat_capacity ex3_latent_heat ex4_thermal_expansion ex5_real_life ex6_numericals"
  ["ch9_transfer_heat"]="ex1_intro ex2_conduction ex3_convection ex4_radiation ex5_household ex6_numericals"
)

for chapter in "${!exercises_by_chapter[@]}"; do
  for exercise in ${exercises_by_chapter[$chapter]}; do
    fname="${chapter}__${exercise}.js"
    fpath="${TARGET_DIR}/${fname}"

    cat > "$fpath" <<EOF
import { fbise9physicsTcode as T } from "../chapters.js";

T.getChExByFilename("${chapter}", "${exercise}").addQuestion({
  filename: "q___",
  name: "TODO: Add question",
  type: "md"
});

export const fbise9physics = T.toJSON();
EOF

    echo "Generated: $fpath"
  done
done
