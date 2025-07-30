// File: theorem_11_1_1_deck.js
export function defineDeck(deckbuilder) {
  deckbuilder.addDetails({
    name: "theorem_11_1_1",
    description: "Slide for Theorem 11.1.1",
    tags: ["theorem", "geometry", "class9"],
    status: "draft"
  });

  // Optional: set background if desired
  deckbuilder.setBackgroundColor("#F5F5F5");
  deckbuilder.setBackgroundOpacity(0.1);

  // Slide 1: Title Slide with image (5s default)
  deckbuilder.s.imageWithTitle(5, [
    { name: "image", content: "/images/theorems9old_11.1.1.svg", showAt: 0 },
    { name: "title", content: "Theorem 11.1.1", showAt: 1 }
  ]);

  // Slide 2: EQ slide with proof (60s default)
  deckbuilder.s.eq(60, [
    { type: "spImage", content: "/images/theorems9old_11.1.1.svg" },
    { type: "spImage", content: "/images/theorems9old_11.1.1_b.svg" },
    { type: "spImage", content: "/images/theorems9old_11.1.1_c.svg" },

    { type: "heading", content: "Given: ABCD is a parallelogram", showAt: 1 },
    { type: "heading", content: "To Prove: AB = DC and AD = BC", showAt: 5 },
    { type: "text", content: "It means prove opposite sides are equal", showAt: 8 },

    { type: "heading", content: "To Prove: ∠ADC = ∠ABC and ∠BAD = ∠BCD", showAt: 12 },
    { type: "text", content: "It means prove opposite angles are congruent", showAt: 15 },

    { type: "heading", content: "To Prove: OA = OC and OB = OD", showAt: 19 },
    { type: "text", content: "It means prove diagonals bisect each other", showAt: 22 },

    { type: "heading", content: "Major Steps", showAt: 26 },

    { type: "heading", content: "Step 1: Prove Δ in Image B are congruent", showAt: 30 },
    { type: "text", content: "Use A·S·A (Angle–Side–Angle)", showAt: 33 },
    { type: "text", content: "Proves AB = DC and AD = BC", showAt: 36 },
    { type: "text", content: "Proves ∠A = ∠C (opposite angles)", showAt: 39 },

    { type: "heading", content: "Step 2: Prove ∠B = ∠D", showAt: 43 },
    { type: "text", content: "Use angles 1, 2, 3, 4", showAt: 46 },

    { type: "heading", content: "Step 3: ΔDOA ≅ ΔBOC", showAt: 50 },
    { type: "text", content: "Use A·A·S (Angle–Angle–Side)", showAt: 53 },

    { type: "math", content: "\\boxed{\\text{Hence, proved.}}", showAt: 57 }
  ]);
}
