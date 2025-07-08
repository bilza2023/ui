import { DeckBuilder } from "taleem-pivot-deckbuilder";
const deckbuilder = new DeckBuilder();

export const meta = {
  title: "What is Algebra?",
  description: "An introductory algebra deck covering unknowns, expressions, equations, and logical thinking.",
  createdAt: "2024-07-08T00:00:00Z",
  updatedAt: "2024-07-08T00:00:00Z",
  slides: {
    what_is_algebra: {
      end: 18,
      items: [0],
      label: "What is Algebra?"
    },
    known_vs_unknown: {
      end: 53,
      items: [0, 2, 4]
    },
    variables_intro: {
      end: 83,
      items: [0, 2, 4]
    },
    image_x_y_z: {
      end: 115,
      items: [0, 2, 4, 6],
      images: ["/images/box.webp"]
    },
    expressions_right: {
      end: 138,
      items: [0, 2, 4],
      images: ["/images/box.webp"]
    },
    solving_values: {
      end: 160,
      items: [0, 2]
    },
    pattern_repetition: {
      end: 180,
      items: [0, 2]
    },
    equations_balanced: {
      end: 196,
      items: [0, 2, 4],
      images: ["/images/box.webp"]
    },
    generalizing_arithmetic: {
      end: 210,
      items: [0, 2, 4]
    },
    applied_uses: {
      end: 216,
      items: [0, 2, 4],
      images: ["/images/fbise9physics.webp"]
    },
    thinking_benefits: {
      end: 221,
      items: [0, 2, 4]
    }
  }
};

const t = meta.slides;

deckbuilder.s.titleSlide(t.what_is_algebra.end, [
  { name: "title", content: "What is Algebra?", showAt: t.what_is_algebra.items[0] }
]);

deckbuilder.s.twoColumnText(t.known_vs_unknown.end, [
  { name: "title", content: "Known vs Unknown", showAt: t.known_vs_unknown.items[0] },
  { name: "left", content: "Arithmetic\n5 + 3", showAt: t.known_vs_unknown.items[1] },
  { name: "right", content: "Algebra\nx + 3", showAt: t.known_vs_unknown.items[2] }
]);

deckbuilder.s.bulletList(t.variables_intro.end, [
  { name: "bullet", content: "Variables stand for unknowns", showAt: t.variables_intro.items[0] },
  { name: "bullet", content: "We use x, y, z to hold values", showAt: t.variables_intro.items[1] },
  { name: "bullet", content: "x = ?", showAt: t.variables_intro.items[2] }
]);

deckbuilder.s.imageLeftBulletsRight(t.image_x_y_z.end, [
  { name: "image", content: t.image_x_y_z.images[0], showAt: t.image_x_y_z.items[0] },
  { name: "bullet", content: "x = 5", showAt: t.image_x_y_z.items[1] },
  { name: "bullet", content: "y = 10", showAt: t.image_x_y_z.items[2] },
  { name: "bullet", content: "z = -3", showAt: t.image_x_y_z.items[3] }
]);

deckbuilder.s.imageRightBulletsLeft(t.expressions_right.end, [
  { name: "image", content: t.expressions_right.images[0], showAt: t.expressions_right.items[0] },
  { name: "bullet", content: "Algebraic expressions combine variables and numbers", showAt: t.expressions_right.items[1] },
  { name: "bullet", content: "Examples: x + 2, 3x, x – 7", showAt: t.expressions_right.items[2] }
]);

deckbuilder.s.bulletList(t.solving_values.end, [
  { name: "bullet", content: "We solve to find values", showAt: t.solving_values.items[0] },
  { name: "bullet", content: "Example: x + 2 = 5 → x = 3", showAt: t.solving_values.items[1] }
]);

deckbuilder.s.bulletList(t.pattern_repetition.end, [
  { name: "bullet", content: "Patterns like x + x + x = 3x", showAt: t.pattern_repetition.items[0] },
  { name: "bullet", content: "Simplify repetition using algebra", showAt: t.pattern_repetition.items[1] }
]);

deckbuilder.s.imageLeftBulletsRight(t.equations_balanced.end, [
  { name: "image", content: t.equations_balanced.images[0], showAt: t.equations_balanced.items[0] },
  { name: "bullet", content: "Equations are balanced", showAt: t.equations_balanced.items[1] },
  { name: "bullet", content: "x + 4 = 10 means both sides are equal", showAt: t.equations_balanced.items[2] }
]);

deckbuilder.s.twoColumnText(t.generalizing_arithmetic.end, [
  { name: "title", content: "Generalizing Arithmetic", showAt: t.generalizing_arithmetic.items[0] },
  { name: "left", content: "Example: a + b = b + a", showAt: t.generalizing_arithmetic.items[1] },
  { name: "right", content: "Applies to many numbers", showAt: t.generalizing_arithmetic.items[2] }
]);

deckbuilder.s.imageRightBulletsLeft(t.applied_uses.end, [
  { name: "image", content: t.applied_uses.images[0], showAt: t.applied_uses.items[0] },
  { name: "bullet", content: "Used in science and technology", showAt: t.applied_uses.items[1] },
  { name: "bullet", content: "Also in finance and design", showAt: t.applied_uses.items[2] }
]);

deckbuilder.s.bulletList(t.thinking_benefits.end, [
  { name: "bullet", content: "Algebra builds logical thinking", showAt: t.thinking_benefits.items[0] },
  { name: "bullet", content: "It helps spot patterns", showAt: t.thinking_benefits.items[1] },
  { name: "bullet", content: "Trains you to solve problems step-by-step", showAt: t.thinking_benefits.items[2] }
]);

export const deck = deckbuilder.build();
