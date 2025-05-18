

import { students } from "./spriteObjects/students.js";
import { figs } from "./spriteObjects/figs.js";
import { alphabets } from "./spriteObjects/alphabets.js";
import { people } from "./spriteObjects/people.js";

// Sprite object list
const spriteList = {
  students,
  figs,
  alphabets,
  people
};

// Load all sprites into a Map
export default function loadSprites() {
  try {
    return new Map(Object.entries(spriteList));
  } catch (error) {
    console.error("Error loading sprites:", error);
    throw error;
  }
}
