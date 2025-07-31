export function defineDeck(deckbuilder) {
    deckbuilder.addDetails({
      name: "parallelogram_and_triangle",
      description: "How triangles give rise to parallelograms — midpoints, sides, and key properties",
      tags: ["geometry", "class9", "parallelogram", "triangle"],
      status: "ready"
    });
  
    deckbuilder.setBackgroundImage("/images/taleem.webp");
    deckbuilder.setBackgroundColor("#D8E8F9");
    deckbuilder.setBackgroundOpacity(0.1);
  
    // Slide 1 — Title
    deckbuilder.s.titleSlide(10, [
      { name: "title", content: "Parallelogram and Triangle", showAt: 0 }
    ]);
  
    // Slide 2 — Mantra
    deckbuilder.s.titleAndSubtitle(20, [
      { name: "title", content: "Memory Line", showAt: 10 },
      { name: "subtitle", content: "Do side barabar aur parallel? Samjho parallelogram tayyar!", showAt: 12 }
    ]);
  
    // Slide 3 — What is a Parallelogram?
    deckbuilder.s.imageLeftBulletsRight(30, [
      { name: "image", content: "/images/parallellogram.webp", showAt: 20 },
      { name: "bullet", content: "Opposite sides are equal", showAt: 22 },
      { name: "bullet", content: "Opposite sides are parallel", showAt: 24 },
      { name: "bullet", content: "Opposite angles are equal", showAt: 26 },
      { name: "bullet", content: "Diagonals bisect each other", showAt: 28 }
    ]);
  
    // Slide 4 — Triangle → Parallelogram
    deckbuilder.s.imageLeftBulletsRight(50, [
      { name: "image", content: "/images/theorems9old_11.1.3.svg", showAt: 30 },
      { name: "bullet", content: "Take triangle ABC", showAt: 30 },
      { name: "bullet", content: "Mark midpoints L and M", showAt: 32 },
      { name: "bullet", content: "Join MN → parallel to BC, half its length", showAt: 34 },
      { name: "bullet", content: "NMBC behaves like a parallelogram", showAt: 36 }
    ]);
  
    // Slide 5 — Mantra Again
    deckbuilder.s.titleSlide(60, [
      { name: "title", content: "Do side barabar aur parallel? Samjho parallelogram tayyar!", showAt: 50 }
    ]);
  }