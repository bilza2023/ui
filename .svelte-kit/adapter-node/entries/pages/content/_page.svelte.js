import { c as create_ssr_component, a as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import "howler";
import "../../../chunks/ZodDeckV1.js";
import "katex";
import { DeckBuilder } from "taleem-pivot-deckbuilder";
function defineDeck$5(deckbuilder2) {
  deckbuilder2.addDetails({
    name: "common_identities",
    description: "Explainer on three algebraic identities with sidebar support",
    tags: ["algebra", "identities", "eq", "class9"],
    status: "draft",
    createdAt: "2025-07-12T00:00:00Z",
    editedAt: "2025-07-12T00:00:00Z"
  });
  deckbuilder2.s.titleSlide(10, [
    { name: "title", content: "Common Algebraic Identities", showAt: 0 }
  ]);
  deckbuilder2.s.imageWithCaption(20, [
    { name: "image", content: "/images/box.webp", showAt: 0 },
    { name: "caption", content: "Identities help in expanding and simplifying expressions.", showAt: 1 }
  ]);
  deckbuilder2.s.eq(50, [
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
  deckbuilder2.s.titleSlide(60, [
    { name: "title", content: "That’s It — Practice These!", showAt: 0 }
  ]);
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$5
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck$4(deckbuilder2) {
  deckbuilder2.addDetails({
    name: "algebra_equation_vs_expression",
    description: "Intro to algebraic expressions and equations",
    tags: ["algebra", "expression", "equation"],
    status: "draft",
    createdAt: "2025-07-12T00:00:00Z",
    editedAt: "2025-07-12T00:00:00Z"
  });
  deckbuilder2.s.titleSlide(10, [
    { name: "title", content: "What is an Algebraic Expression and Equation", showAt: 0 }
  ]);
  deckbuilder2.s.imageLeftBulletsRight(25, [
    { name: "image", content: "/images/expression_example_labeled.webp", showAt: 10 },
    { name: "bullet", content: "An expression combines numbers, variables, and operations", showAt: 12 },
    { name: "bullet", content: "It does NOT have an equals sign", showAt: 15 },
    { name: "bullet", content: "Example: 3x + 5", showAt: 18 }
  ]);
  deckbuilder2.s.imageLeftBulletsRight(40, [
    { name: "image", content: "/images/equation_balance_scale_labeled.webp", showAt: 25 },
    { name: "bullet", content: "An equation shows equality between two expressions", showAt: 27 },
    { name: "bullet", content: "It includes an equals sign", showAt: 30 },
    { name: "bullet", content: "Example: 3x + 5 = 11", showAt: 33 }
  ]);
  deckbuilder2.s.table(55, [
    { name: "headers", content: ["Expression", "Equation"], showAt: 40 },
    { name: "rows", content: [
      ["3x + 5", "3x + 5 = 11"],
      ["No equals sign", "Has equals sign"],
      ["Not solvable", "Solvable"],
      ["A phrase", "A full sentence"]
    ], showAt: 42 }
  ]);
  deckbuilder2.s.imageWithCaption(70, [
    { name: "image", content: "/images/student_solving_equation_blackboard.webp", showAt: 55 },
    { name: "caption", content: "Solving equations reveals unknowns — this is real algebra", showAt: 57 }
  ]);
  deckbuilder2.s.titleSlide(80, [
    { name: "title", content: "Expression vs Equation — Know the Difference", showAt: 0 }
  ]);
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$4
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck$3(deckbuilder2) {
  deckbuilder2.addDetails({
    name: "goldstart_deck",
    description: "A comprehensive test deck for mobile layout audit",
    tags: ["mobile", "audit", "gold-standard"],
    status: "draft",
    createdAt: "2025-07-09T00:00:00Z",
    editedAt: "2025-07-09T00:00:00Z"
  });
  deckbuilder2.s.titleSlide(10, [
    { name: "title", content: "GoldStart Deck", showAt: 0 }
  ]);
  deckbuilder2.s.titleAndSubtitle(20, [
    { name: "title", content: "Welcome to Physics", showAt: 0 },
    { name: "subtitle", content: "Mobile Audit Preview", showAt: 1 }
  ]);
  deckbuilder2.s.bulletList(30, [
    { name: "bullet", content: "Point One", showAt: 21 },
    { name: "bullet", content: "Point Two", showAt: 22 },
    { name: "bullet", content: "Point Three", showAt: 23 }
  ]);
  deckbuilder2.s.twoColumnText(40, [
    { name: "title", content: "Branches", showAt: 0 },
    { name: "left", content: "Mechanics\nOptics", showAt: 1 },
    { name: "right", content: "Thermodynamics\nQuantum", showAt: 2 }
  ]);
  deckbuilder2.s.imageSlide(50, [
    { name: "image", content: "/images/box.webp", showAt: 0 }
  ]);
  deckbuilder2.s.imageWithTitle(60, [
    { name: "image", content: "/images/box.webp", showAt: 50 },
    { name: "title", content: "Sample Image Title", showAt: 52 }
  ]);
  deckbuilder2.s.imageWithCaption(70, [
    { name: "image", content: "/images/box.webp", showAt: 0 },
    { name: "caption", content: "This is a caption", showAt: 1 }
  ]);
  deckbuilder2.s.imageLeftBulletsRight(80, [
    { name: "image", content: "/images/box.webp", showAt: 71 },
    { name: "bullet", content: "Left bullet one", showAt: 74 },
    { name: "bullet", content: "Left bullet two", showAt: 78 }
  ]);
  deckbuilder2.s.imageRightBulletsLeft(90, [
    { name: "image", content: "/images/box.webp", showAt: 81 },
    { name: "bullet", content: "Right bullet one", showAt: 84 },
    { name: "bullet", content: "Right bullet two", showAt: 86 }
  ]);
  deckbuilder2.s.table(100, [
    { name: "headers", content: ["A", "B", "C"], showAt: 0 },
    { name: "rows", content: [["1", "2", "3"], ["4", "5", "6"]], showAt: 1 }
  ]);
  deckbuilder2.s.statistic(110, [
    { name: "number", content: "42", showAt: 0 },
    { name: "label", content: "Answer", showAt: 1 }
  ]);
  deckbuilder2.s.donutChart(120, [
    { name: "percent", content: "60", showAt: 0 },
    { name: "label", content: "Alpha", showAt: 0 },
    { name: "color", content: "#4CAF50", showAt: 0 },
    { name: "percent", content: "40", showAt: 1 },
    { name: "label", content: "Beta", showAt: 1 },
    { name: "color", content: "#FF9800", showAt: 1 }
  ]);
  deckbuilder2.s.bigNumber(130, [
    { name: "number", content: "100%", showAt: 0 },
    { name: "label", content: "Completion", showAt: 1 }
  ]);
  deckbuilder2.s.barChart(140, [
    { name: "bar", label: "Math", value: 80, showAt: 0 },
    { name: "bar", label: "Physics", value: 70, showAt: 1 },
    { name: "bar", label: "Chemistry", value: 90, showAt: 2 }
  ]);
  deckbuilder2.s.quoteSlide(150, [
    { name: "quoteLine", content: "Physics is the poetry of nature.", showAt: 0 },
    { name: "author", content: "— Taleem.Help", showAt: 1 }
  ]);
  deckbuilder2.s.quoteWithImage(160, [
    { name: "quoteLine", content: "Science is understanding.", showAt: 0 },
    { name: "author", content: "Taleem.help", showAt: 1 },
    { name: "image", content: "/images/activity1.jpg", showAt: 2 }
  ]);
  deckbuilder2.s.cornerWordsSlide(170, [
    { name: "card", icon: "🔭", label: "Observe", showAt: 160 },
    { name: "card", icon: "⚗️", label: "Experiment", showAt: 163 },
    { name: "card", icon: "🔬", label: "Analyze", showAt: 165 },
    { name: "card", icon: "💡", label: "Innovate", showAt: 168 }
  ]);
  deckbuilder2.s.contactSlide(180, [
    { name: "headline", content: "Need Help?", showAt: 0 },
    { name: "email", content: "support@taleem.help", showAt: 1 },
    { name: "phone", content: "+92 300 0000000", showAt: 2 }
  ]);
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$3
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck$2(deckbuilder2) {
  deckbuilder2.s.titleSlide(10, [
    { name: "title", content: "--Test--Test--Test", showAt: 0 }
  ]);
  deckbuilder2.s.twoColumnText(20, [
    { name: "title", content: "Branches of Physics", showAt: 0 },
    { name: "left", content: "• Mechanics\n• Thermodynamics\n• Electromagnetism", showAt: 1 },
    { name: "right", content: "• Optics\n• Quantum Physics\n• Nuclear Physics", showAt: 2 }
  ]);
  deckbuilder2.s.imageWithTitle(30, [
    { name: "image", content: "/pivot/fbise9physics.webp", showAt: 0 },
    { name: "title", content: "Understanding the Physical World", showAt: 1 }
  ]);
  deckbuilder2.s.statistic(40, [
    { name: "number", content: "9", showAt: 0 },
    { name: "label", content: "Core Physics Chapters", showAt: 2 }
  ]);
  deckbuilder2.s.quoteSlide(50, [
    { name: "quoteLine", content: "Physics is the poetry of nature.", showAt: 0 },
    { name: "author", content: "— Taleem.Help", showAt: 2 }
  ]);
  deckbuilder2.s.imageSlide(60, [
    { name: "image", content: "/pivot/box.webp", showAt: 0 }
  ]);
  deckbuilder2.s.contactSlide(70, [
    { name: "headline", content: "Need Help with Physics?", showAt: 0 },
    { name: "email", content: "support@taleem.help", showAt: 1 },
    { name: "phone", content: "+92 300 0000000", showAt: 2 }
  ]);
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$2
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck$1(deckbuilder2) {
  deckbuilder2.s.titleSlide(10, [
    { name: "title", content: "--Test2--222222--Test2", showAt: 0 }
  ]);
  deckbuilder2.s.twoColumnText(20, [
    { name: "title", content: "Branches of Physics", showAt: 0 },
    { name: "left", content: "• Mechanics\n• Thermodynamics\n• Electromagnetism", showAt: 1 },
    { name: "right", content: "• Optics\n• Quantum Physics\n• Nuclear Physics", showAt: 2 }
  ]);
  deckbuilder2.s.imageWithTitle(30, [
    { name: "image", content: "/pivot/fbise9physics.webp", showAt: 0 },
    { name: "title", content: "Understanding the Physical World", showAt: 1 }
  ]);
  deckbuilder2.s.statistic(40, [
    { name: "number", content: "9", showAt: 0 },
    { name: "label", content: "Core Physics Chapters", showAt: 2 }
  ]);
  deckbuilder2.s.quoteSlide(50, [
    { name: "quoteLine", content: "Physics is the poetry of nature.", showAt: 0 },
    { name: "author", content: "— Taleem.Help", showAt: 2 }
  ]);
  deckbuilder2.s.imageSlide(60, [
    { name: "image", content: "/pivot/box.webp", showAt: 0 }
  ]);
  deckbuilder2.s.contactSlide(70, [
    { name: "headline", content: "Need Help with Physics?", showAt: 0 },
    { name: "email", content: "support@taleem.help", showAt: 1 },
    { name: "phone", content: "+92 300 0000000", showAt: 2 }
  ]);
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$1
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck(deckbuilder2) {
  deckbuilder2.addDetails({
    name: "what_is_algebra",
    description: "Introductory deck on the concept and purpose of Algebra",
    tags: ["algebra", "math", "class9"],
    status: "draft",
    createdAt: "2025-07-11T00:00:00Z",
    editedAt: "2025-07-11T00:00:00Z"
  });
  deckbuilder2.s.titleSlide(10, [
    { name: "title", content: "What is Algebra?", showAt: 0 }
  ]);
  deckbuilder2.s.imageLeftBulletsRight(20, [
    { name: "bullet", content: "The word Algebra comes from Arabic — “al-jabr” — meaning “reunion of broken parts”.", showAt: 10 },
    { name: "bullet", content: "Originally referred to fixing things, like bones or equations.", showAt: 12 },
    { name: "bullet", content: "Now used for mathematical restoration.", showAt: 14 }
  ]);
  deckbuilder2.s.bulletList(30, [
    { name: "bullet", content: "total cost = price × quantity", showAt: 21 },
    { name: "bullet", content: "area = length × width", showAt: 23 }
  ]);
  deckbuilder2.s.titleAndSubtitle(40, [
    { name: "title", content: "What Problems Does Algebra Solve?", showAt: 30 },
    { name: "subtitle", content: "Unknowns, formulas, and patterns", showAt: 32 }
  ]);
  deckbuilder2.s.twoColumnText(50, [
    { name: "left", content: "“I think of a number. I add 3. The result is 7.”", showAt: 40 },
    { name: "right", content: "Finding missing parts using simple rules.", showAt: 42 }
  ]);
  deckbuilder2.s.twoColumnText(60, [
    { name: "left", content: "Area = length × width", showAt: 50 },
    { name: "right", content: "Speed = distance / time\nTotal = rate × time", showAt: 52 }
  ]);
  deckbuilder2.s.imageWithCaption(70, [
    { name: "image", content: "/images/pythagoras_diagram.webp", showAt: 60 },
    { name: "caption", content: "a² + b² = c² — the Pythagorean Theorem in any right triangle.", showAt: 62 }
  ]);
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck
}, Symbol.toStringTag, { value: "Module" }));
const deckbuilder = new DeckBuilder();
deckbuilder.s.titleSlide(8, [
  { name: "title", content: "404: Content Not Found", showAt: 0 }
]);
deckbuilder.s.imageWithCaption(18, [
  { name: "image", content: "/pivot/box.webp", showAt: 0 },
  { name: "caption", content: "Oops! This page is empty.", showAt: 1 }
]);
deckbuilder.s.quoteSlide(28, [
  { name: "quoteLine", content: "Not all those who wander are lost... but this page might be.", showAt: 0 },
  { name: "author", content: "— Taleem.Help Bot", showAt: 2 }
]);
deckbuilder.s.contactSlide(38, [
  { name: "heading", content: "Need Assistance?", showAt: 0 },
  { name: "subheading", content: "Visit our Help Center or Contact Support", showAt: 1 },
  { name: "email", content: "support@taleem.help", showAt: 2 }
]);
deckbuilder.build();
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/algebra_common_identities_deck.js": __vite_glob_0_0, "/src/lib/content/algebra_equation_vs_expression.js": __vite_glob_0_1, "/src/lib/content/fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra.js": __vite_glob_0_2, "/src/lib/content/test__test_chapter__test_ex__test_question.js": __vite_glob_0_3, "/src/lib/content/test__test_chapter__test_ex__test_question2.js": __vite_glob_0_4, "/src/lib/content/what_is_algebra.js": __vite_glob_0_5 });
  for (const path in modules) {
    path.split("/").pop().replace(/\.js$/, "");
    const mod = modules[path];
    mod.defineDeck ?? mod.default;
  }
  $$unsubscribe_page();
  return `${``}`;
});
export {
  Page as default
};
