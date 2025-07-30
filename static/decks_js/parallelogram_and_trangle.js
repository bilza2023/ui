// parallelograms_and_triangles_v2.js

export function defineDeck(deckbuilder) {
    deckbuilder.addDetails({
      name: "parallelograms_and_triangles_v2",
      description: "Key properties of parallelograms and their deep connection to triangles",
      tags: ["geometry", "parallelogram", "triangle", "class9"],
      status: "ready"
    });
  
    deckbuilder.setBackgroundImage("/images/taleem.webp");
    deckbuilder.setBackgroundColor("#F3E5AB");
    deckbuilder.setBackgroundOpacity(0.1);
  
    // Slide 1 — Title
    deckbuilder.s.titleSlide(5, [
      { name: "title", content: "Parallelograms and Triangles", showAt: 0 }
    ]);
  
    // Slide 2 — EQ Slide: Parallelogram Properties
    deckbuilder.s.eq(30, [
      { type: "heading", content: "What is a Parallelogram?", showAt: 5 },
   
      { type: "spHeading", content: "Key properties of parallelograms" },
      { type: "spImage", content: "/images/parallelogram_properties_labeled.webp" },
   
      { type: "text", content: "A parallelogram is a 4-sided figure with both pairs of opposite sides parallel.", showAt: 7 },
      { type: "text", content: "1. Opposite sides are parallel and equal", showAt: 9 },
      { type: "text", content: "2. Opposite angles are equal", showAt: 11 },
      { type: "text", content: "3. Adjacent angles are supplementary", showAt: 13 },
      { type: "text", content: "4. If one angle is 90°, all are 90°", showAt: 15 },
      { type: "text", content: "5. Diagonals bisect each other", showAt: 17 },
      { type: "text", content: "6. Each diagonal forms two triangles", showAt: 19 },
      { type: "math", content: "7. AB² + BC² + CD² + DA² = AC² + BD²", showAt: 22 }
    ]);
  
    // Slide 3 — Title Slide for Triangle Relationship
    deckbuilder.s.titleSlide(35, [
      { name: "title", content: "Triangle and Parallelogram Connection", showAt: 0 }
    ]);
  
    // Slide 4 — EQ Slide: Triangle Relationship
    deckbuilder.s.eq(60, [
      { type: "heading", content: "Why Parallelograms Help with Triangles", showAt: 35 },

      { type: "spHeading", content: "Key properties of parallelograms" },
      { type: "spImage", content: "/images/theorems9old_11.1.3.svg" },

      { type: "text", content: "Diagonal splits parallelogram into two congruent triangles", showAt: 37 },
      { type: "text", content: "Triangle area = ½ × base × height — comes from parallelogram", showAt: 40 },
      { type: "text", content: "Many triangle proofs use parallelogram symmetry", showAt: 44 },
      { type: "text", content: "Used in midpoint theorems, SAS/ASA rules, and vector geometry", showAt: 48 },
      { type: "text", content: "Summary: Parallelogram is the triangle’s best friend", showAt: 52 }
    ]);
  }
  