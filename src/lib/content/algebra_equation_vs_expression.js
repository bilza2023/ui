

// algebra_equation_vs_expression.js
// Topic: What is an Algebraic Expression and Equation

export function defineDeck(deckbuilder) {
    deckbuilder.addDetails({
      name:        "algebra_equation_vs_expression",
      description: "Intro to algebraic expressions and equations",
      tags:        ["algebra", "expression", "equation"],
      status:      "draft",
      createdAt:   "2025-07-12T00:00:00Z",
      editedAt:    "2025-07-12T00:00:00Z"
    });
  
    // Slide 1 — Overview
    deckbuilder.s.titleSlide(10, [
      { name: "title", content: "What is an Algebraic Expression and Equation", showAt: 0 }
    ]);
  
    // Slide 2 — Expression
    deckbuilder.s.imageLeftBulletsRight(25, [
      { name: "image", content: "/images/expression_example_labeled.webp", showAt: 10 },
      { name: "bullet", content: "An expression combines numbers, variables, and operations", showAt: 12 },
      { name: "bullet", content: "It does NOT have an equals sign", showAt: 15 },
      { name: "bullet", content: "Example: 3x + 5", showAt: 18 }
    ]);
  
    // Slide 3 — Equation
    deckbuilder.s.imageLeftBulletsRight(40, [
      { name: "image", content: "/images/equation_balance_scale_labeled.webp", showAt: 25 },
      { name: "bullet", content: "An equation shows equality between two expressions", showAt: 27 },
      { name: "bullet", content: "It includes an equals sign", showAt: 30 },
      { name: "bullet", content: "Example: 3x + 5 = 11", showAt: 33 }
    ]);
  
    // Slide 4 — Comparison Table
    deckbuilder.s.table(55, [
      { name: "headers", content: ["Expression", "Equation"], showAt: 40 },
      { name: "rows", content: [
        ["3x + 5", "3x + 5 = 11"],
        ["No equals sign", "Has equals sign"],
        ["Not solvable", "Solvable"],
        ["A phrase", "A full sentence"]
      ], showAt: 42 }
    ]);
  
    // Slide 5 — Why it Matters
    deckbuilder.s.imageWithCaption(70, [
      { name: "image", content: "/images/student_solving_equation_blackboard.webp", showAt: 55 },
      { name: "caption", content: "Solving equations reveals unknowns — this is real algebra", showAt: 57 }
    ]);
  
    // Slide 6 — Wrap-Up
    deckbuilder.s.titleSlide(80, [
      { name: "title", content: "Expression vs Equation — Know the Difference", showAt: 0 }
    ]);
  }
  