export function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_5",
    description: "Slide series for Theorem 11.1.5 (dual-window demo)",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });

  /* ───────────────────────── Slide 1 (0 → 30 s) */
  b.s.svgPointer(50, [
    { type: "image",  content: "/images/theorems9old_11.1.5.svg" },

    { type: "circle", x: 180, y: 95, showAt: 1,  duration: 10, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 2,  duration: 10, label: "AD" },
    { type: "dot",    x: 100, y: 50, showAt: 3, duration: 10, label: "A" },


    { type: "circle", x: 10, y: 10, showAt:  15,   duration: 20, label: "DE" },
    { type: "circle", x: 120, y: 80, showAt: 15,   duration: 20, label: "AD" },
    { type: "dot",    x: 100, y: 50, showAt: 15,  duration:  20, label: "A" },

  ]);
  
  /* deck ends at 90 s */
}
