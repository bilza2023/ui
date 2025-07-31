// File: deckbuilder_deck.js
// import DeckBuilder from '../../../lib/deckbuilder/Deckbuilder.js';

export default function defineDeck(deckbuilder){


deckbuilder.addDetails({
  name:        "work_desk_demo",
  description: "Sample deck for work_desk preview — no images",
  tags:        ["demo", "geometry"],
  status:      "draft"
});

deckbuilder.setBackgroundColor("#FAF3E0");
deckbuilder.setBackgroundOpacity(0.08);

/* ───────── Slide 1 — Title ───────── */
deckbuilder.s.titleSlide(5, [
  { name: "title", content: "Understanding Parallelograms", showAt: 0 }
]);

/* ───────── Slide 2 — EQ slide (long, with spImage + text lines) ───────── */
deckbuilder.s.eq(30, [
  { type: "spImage",  content: "/images/parallelogram_properties_labeled.png" },
  { type: "spImage",  content: "/images/theorems9old_11.1.2.svg" },
  { type: "heading",  content: "Properties Of Parallelogram",                          showAt: 15 },
  { type: "text",     content: "1. Opposite sides are parallel and equal",    showAt: 16 },
  { type: "text",     content: "2. Opposite angles are equal",                showAt: 18 },
  { type: "text",     content: "3. Adjacent angles add up to 180°",           showAt: 20 },
  { type: "text",     content: "4. Diagonals bisect each other",              showAt: 24 },
  { type: "heading",     content: "Additional Properties",                    showAt: 25 },
  { type: "text",     content: "5. One right angle → all are right angles",   showAt: 26 },
  { type: "text",     content: "6. Diagonal forms 2 congruent triangles",     showAt: 26 },
]);

}
/* ───────── Build & export ───────── */
// const deck = deckbuilder.build();
// export default deck;
