export function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_5",
    description: "Parallel Line Segment in Triangle – DE ∥ BC",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });

  // 🔹 Slide 1 — SVG Pointer
  b.s.svgPointer(20, [
    { type: "image", content: "/images/theorems9old_11.1.5.svg" },

    { type: "arrow", x: 160, y: 110, showAt: 2, duration: 10, label: "DE" },
    { type: "arrow", x: 190, y: 140, showAt: 7, duration: 10, label: "BC" },
    { type: "arrow", x: 150, y: 130, showAt: 12, duration: 10, label: "AD" }
  ]);
}
