


export function defineDeck(deckbuilder) {
  deckbuilder.addDetails({
    name: "angles_and_transversals",
    description: "Intro to angle types formed by a transversal — with memory trick",
    tags: ["geometry", "angles", "class9"],
    status: "ready"
  });

  deckbuilder.setBackgroundImage("/images/taleem.webp");
  deckbuilder.setBackgroundColor("#F3E5AB");
  deckbuilder.setBackgroundOpacity(0.1);

  // Slide 1 — Title
  deckbuilder.s.titleSlide(5, [
    { name: "title", content: "Angles and Transversals", showAt: 0 }
  ]);

  // Slide 1b — Memory Line
  deckbuilder.s.imageSlide(10, [
    { name: "image", content: "/images/traversal.webp", showAt: 0 }
  ]);

  // Slide 2 — Memory Line
  deckbuilder.s.titleAndSubtitle(20, [
    { name: "title", content: "Memory Line", showAt: 0 },
    { name: "subtitle", content: "Jahan angles milay — Alternate aur Corresponding barabar, Interior mil ke 180!", showAt: 0 }
  ]);

  // Slide 3 — Pointer Slide
  deckbuilder.s.imageSlide(40, [
    { name: "image", content: "/images/angles.jpg", showAt: 0 }
  ]);

  // Slide 4 — Memory Line (Again)
  deckbuilder.s.titleSlide(50, [
    { name: "title", content: "Jahan angles milay — Alternate aur Corresponding barabar, Interior mil ke 180!", showAt: 0 }
  ]);
}
