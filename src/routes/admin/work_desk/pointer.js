// File: theorem_11_1_1_deck.js
export  function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_4",
    description: "Slide for Theorem 11.1.1",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });

  // Optional: set background if desired
  b.setBackgroundColor("#F5F5F5");
  b.setBackgroundOpacity(0.1);
// duration defaults to 5 s when omitted
b.s.svgPointer(90, [
    { type: "image",  content: "/images/theorems9old_11.1.5.svg" },
  
    { type: "arrow",  x: 120, y:  80, showAt: 15, duration: 5 },
    { type: "circle", x: 200, y: 100, showAt: 30               },
    { type: "cross",  x: 140, y: 140, showAt: 45, duration: 3 }
  ]);
  

}
