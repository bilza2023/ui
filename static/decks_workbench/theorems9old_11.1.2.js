// File: theorem_11_1_1_deck.js
export  function defineDeck(b) {
  b.addDetails({
    name: "theorem_11_1_2",
    description: "Slide for Theorem 11.1.1",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });

  // Optional: set background if desired
  b.setBackgroundColor("#F5F5F5");
  b.setBackgroundOpacity(0.1);

  // Slide 1: Title Slide with image
  b.s.imageWithTitle(3, [
    { name: "image", content: "/images/theorems9old_11.1.2.svg", showAt: 0 },
    { name: "title", content: "Theorem 11.1.2", showAt: 1 }
  ]);

  // Slide 2: EQ slide with image and title only
  b.s.eq(20, [
    { type: "spImage", content: "/images/theorems9old_11.1.2.svg" },
    { type: "heading", content: "Theorem 11.1.2 — 2 Sides of a Parallelogram" , showAt: 3 },
    { type: "text", content: "Given less than last Theorem" , showAt: 5 },
    { type: "text", content: "Top and bottom sides are Equal and Parallel" , showAt: 7 },
    { type: "text", content: "Prove left and right sides are also Equal and Parallel" , showAt: 8 },
    { type: "heading", content: "Step 1 : Tri ABD = Tri CDB" , showAt: 10 },
    { type: "text", content: "Use SAS: <2 & <1 are alt and 2 sides " , showAt: 12 },
    { type: "text", content: "1st Proof : AD = BC .. cong Tri sides" , showAt: 13 },

    { type: "heading", content: "Step 2 : AD PArallel TO BC" , showAt: 14 },
    { type: "text", content: "2nd Proof : AD Parallel BC .. <4 = <3 " , showAt: 16 },
    { type: "heading", content: "Hence Proved This is a Parallelogram " , showAt: 18 },
  ]);
}
