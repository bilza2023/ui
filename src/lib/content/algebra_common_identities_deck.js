// common_identities_deck.js
// Mixed-format explainer deck on Algebraic Identities

export function defineDeck(deckbuilder) {
    deckbuilder.addDetails({
      name: "common_identities",
      description: "Explainer on three algebraic identities with sidebar support",
      tags: ["algebra", "identities", "eq", "class9"],
      status: "draft",
      createdAt: "2025-07-12T00:00:00Z",
      editedAt: "2025-07-12T00:00:00Z"
    });
  
    // Slide 1: Title
    deckbuilder.s.titleSlide(10, [
      { name: "title", content: "Common Algebraic Identities", showAt: 0 }
    ]);
  
    // Slide 2: Intro Caption
    deckbuilder.s.imageWithCaption(20, [
      { name: "image", content: "/images/box.webp", showAt: 0 },
      { name: "caption", content: "Identities help in expanding and simplifying expressions.", showAt: 1 }
    ]);
  
    // Slide 3: All Identities Combined
    deckbuilder.s.eq(50, [
      // Identity 1
      { type: "math", content: "(a + b)^2 = a^2 + 2ab + b^2", showAt: 20 },
      { type: "spHeading", content: "Identity 1" },
      { type: "spText", content: "Square of sum" },
      { type: "spMath", content: "(x + 3)^2 = x^2 + 6x + 9" },
  
      // Identity 2
      { type: "math", content: "(a - b)^2 = a^2 - 2ab + b^2", showAt: 30 },
      { type: "spHeading", content: "Identity 2" },
      { type: "spText", content: "Square of difference" },
      { type: "spMath", content: "(x - 4)^2 = x^2 - 8x + 16" },
  
      // Identity 3
      { type: "math", content: "a^2 - b^2 = (a + b)(a - b)", showAt: 40 },
      { type: "spHeading", content: "Identity 3" },
      { type: "spText", content: "Difference of squares" },
      { type: "spMath", content: "x^2 - 9 = (x + 3)(x - 3)" }
    ]);
  
    // Slide 4: Goodbye
    deckbuilder.s.titleSlide(60, [
      { name: "title", content: "That’s It — Practice These!", showAt: 0 }
    ]);
  }
  