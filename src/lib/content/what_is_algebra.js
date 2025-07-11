
// what_is_algebra_deck.js

export function defineDeck(deckbuilder) {

    deckbuilder.addDetails({
      name:        "what_is_algebra",
      description: "Introductory deck on the concept and purpose of Algebra",
      tags:        ["algebra", "math", "class9"],
      status:      "draft",
      createdAt:   "2025-07-11T00:00:00Z",
      editedAt:    "2025-07-11T00:00:00Z"
    });
    
    
    deckbuilder.s.titleSlide(10, [
      { name: "title", content: "What is Algebra?", showAt: 0 }
    ]);
  
    deckbuilder.s.imageLeftBulletsRight(20, [
      { name: "bullet", content: "The word Algebra comes from Arabic — “al-jabr” — meaning “reunion of broken parts”.", showAt: 10 },
      { name: "bullet", content: "Originally referred to fixing things, like bones or equations.", showAt: 12 },
      { name: "bullet", content: "Now used for mathematical restoration.", showAt: 14 }
    ]);
  
    deckbuilder.s.bulletList(30, [
      { name: "bullet", content: "total cost = price × quantity", showAt: 21 },
      { name: "bullet", content: "area = length × width", showAt: 23 }
    ]);
  
    deckbuilder.s.titleAndSubtitle(40, [
      { name: "title", content: "What Problems Does Algebra Solve?", showAt: 30 },
      { name: "subtitle", content: "Unknowns, formulas, and patterns", showAt: 32 }
    ]);
  
    deckbuilder.s.twoColumnText(50, [
      { name: "left", content: "“I think of a number. I add 3. The result is 7.”", showAt: 40 },
      { name: "right", content: "Finding missing parts using simple rules.", showAt: 42 }
    ]);
  
    deckbuilder.s.twoColumnText(60, [
      { name: "left", content: "Area = length × width", showAt: 50 },
      { name: "right", content: "Speed = distance / time\nTotal = rate × time", showAt: 52 }
    ]);
  
    deckbuilder.s.imageWithCaption(70, [
      { name: "image", content: "/images/pythagoras_diagram.webp", showAt: 60 },
      { name: "caption", content: "a² + b² = c² — the Pythagorean Theorem in any right triangle.", showAt: 62 }
    ]);
  }
  