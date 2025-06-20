import { DeckBuilder } from "deckbuilderpivot";
const deckbuilder = new DeckBuilder();

deckbuilder.s.titleSlide([
  { name: "title", content: "Branches of Physics" }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "Classical Physics:\n• Mechanics\n• Thermodynamics\n• Electromagnetism\n• Optics" },
  { name: "right", content: "Modern Physics:\n• Quantum Physics\n• Nuclear Physics\n• Solid State Physics\n• Plasma Physics" },
  { name: "title", content: "Two Broad Categories" }
]);

deckbuilder.s.imageWithCaption([
  { name: "image", content: "/pivot/ch1_physical_quantities_ch1_physical_quantities_ex1_intro_q002_branches_physics1.webp" },
  { name: "caption", content: "Physics branches help explain the universe — from atoms to galaxies." }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "• Mechanics: Motion and forces\n• Thermodynamics: Heat and energy\n• Electromagnetism: Electricity & Magnetism\n• Optics: Light behavior" },
  { name: "right", content: "• Quantum Physics: Behavior of particles\n• Nuclear Physics: Atomic nuclei\n• Solid State Physics: Crystals & semiconductors\n• Plasma Physics: Ionized gases" },
  { name: "title", content: "Brief Descriptions" }
]);

deckbuilder.s.imageSlide([
  { name: "image", content: "/pivot/ch1_physical_quantities_ch1_physical_quantities_ex1_intro_q002_branches_physics2.webp" }
]);

deckbuilder.s.cornerWordsSlide([
  { name: "card", icon: "⚙️", label: "Engineering" },
  { name: "card", icon: "🛰️", label: "Space" },
  { name: "card", icon: "🧬", label: "Biology" },
  { name: "card", icon: "💡", label: "Innovation" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Physics is not just a subject," },
  { name: "quoteLine", content: "it's the language of the universe.", start: 2 },
  { name: "author", content: "— Unknown", start: 4 }
]);

export const deck = deckbuilder.build();
