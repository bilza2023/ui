import DeckBuilder from "./DeckBuilder.js";

const b = new DeckBuilder();
b.addDetails({ name: "parallelograms_and_triangles_v2" });

b.s.titleSlide(5,  [{ name: "title", content: "Parallelograms & Triangles", showAt: 0 }]);

b.s.eq(30, [
  { type: "heading",  content: "What is a Parallelogram?", showAt: 5 },
  { type: "spHeading", content: "Key properties" },
  { type: "spImage",   content: "/images/parallelogram_properties_labeled.webp" },
  { type: "text",     content: "1. Opposite sides are parallel and equal", showAt: 9 },
  { sp: {} },                                           // ← clear sidebar
  { type: "text",     content: "2. Opposite angles are equal", showAt: 12 }
]);

const deck = b.build();    // fully normalised, ready for Player / upload
