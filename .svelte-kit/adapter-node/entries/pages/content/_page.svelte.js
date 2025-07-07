import { DeckBuilder } from "taleem-pivot-deckbuilder";
import { c as create_ssr_component, a as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import "howler";
/* empty css                                                         */
import "katex";
const deckbuilder$3 = new DeckBuilder();
deckbuilder$3.s.titleSlide(18, [
  { name: "title", content: "What is Algebra?", showAt: 0 }
]);
deckbuilder$3.s.twoColumnText(53, [
  { name: "title", content: "Known vs Unknown", showAt: 0 },
  { name: "left", content: "Arithmetic\n5 + 3", showAt: 2 },
  { name: "right", content: "Algebra\nx + 3", showAt: 4 }
]);
deckbuilder$3.s.bulletList(83, [
  { name: "bullet", content: "Variables stand for unknowns", showAt: 0 },
  { name: "bullet", content: "We use x, y, z to hold values", showAt: 2 },
  { name: "bullet", content: "x = ?", showAt: 4 }
]);
deckbuilder$3.s.imageLeftBulletsRight(115, [
  { name: "image", content: "/images/box.webp", showAt: 0 },
  { name: "bullet", content: "x = 5", showAt: 2 },
  { name: "bullet", content: "y = 10", showAt: 4 },
  { name: "bullet", content: "z = -3", showAt: 6 }
]);
deckbuilder$3.s.imageRightBulletsLeft(138, [
  { name: "image", content: "/images/box.webp", showAt: 0 },
  { name: "bullet", content: "Algebraic expressions combine variables and numbers", showAt: 2 },
  { name: "bullet", content: "Examples: x + 2, 3x, x – 7", showAt: 4 }
]);
deckbuilder$3.s.bulletList(160, [
  { name: "bullet", content: "We solve to find values", showAt: 0 },
  { name: "bullet", content: "Example: x + 2 = 5 → x = 3", showAt: 2 }
]);
deckbuilder$3.s.bulletList(180, [
  { name: "bullet", content: "Patterns like x + x + x = 3x", showAt: 0 },
  { name: "bullet", content: "Simplify repetition using algebra", showAt: 2 }
]);
deckbuilder$3.s.imageLeftBulletsRight(196, [
  { name: "image", content: "/images/box.webp", showAt: 0 },
  { name: "bullet", content: "Equations are balanced", showAt: 2 },
  { name: "bullet", content: "x + 4 = 10 means both sides are equal", showAt: 4 }
]);
deckbuilder$3.s.twoColumnText(210, [
  { name: "title", content: "Generalizing Arithmetic", showAt: 0 },
  { name: "left", content: "Example: a + b = b + a", showAt: 2 },
  { name: "right", content: "Applies to many numbers", showAt: 4 }
]);
deckbuilder$3.s.imageRightBulletsLeft(216, [
  { name: "image", content: "/images/fbise9physics.webp", showAt: 0 },
  { name: "bullet", content: "Used in science and technology", showAt: 2 },
  { name: "bullet", content: "Also in finance and design", showAt: 4 }
]);
deckbuilder$3.s.bulletList(221, [
  { name: "bullet", content: "Algebra builds logical thinking", showAt: 0 },
  { name: "bullet", content: "It helps spot patterns", showAt: 2 },
  { name: "bullet", content: "Trains you to solve problems step-by-step", showAt: 4 }
]);
const deck$2 = deckbuilder$3.build();
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deck: deck$2
}, Symbol.toStringTag, { value: "Module" }));
const deckbuilder$2 = new DeckBuilder();
deckbuilder$2.s.titleSlide(10, [
  { name: "title", content: "--Test--Test--Test", showAt: 0 }
]);
deckbuilder$2.s.twoColumnText(20, [
  { name: "title", content: "Branches of Physics", showAt: 0 },
  { name: "left", content: "• Mechanics\n• Thermodynamics\n• Electromagnetism", showAt: 1 },
  { name: "right", content: "• Optics\n• Quantum Physics\n• Nuclear Physics", showAt: 2 }
]);
deckbuilder$2.s.imageWithTitle(30, [
  { name: "image", content: "/pivot/fbise9physics.webp", showAt: 0 },
  { name: "title", content: "Understanding the Physical World", showAt: 1 }
]);
deckbuilder$2.s.statistic(40, [
  { name: "number", content: "9", showAt: 0 },
  { name: "label", content: "Core Physics Chapters", showAt: 2 }
]);
deckbuilder$2.s.quoteSlide(50, [
  { name: "quoteLine", content: "Physics is the poetry of nature.", showAt: 0 },
  { name: "author", content: "— Taleem.Help", showAt: 2 }
]);
deckbuilder$2.s.imageSlide(60, [
  { name: "image", content: "/pivot/box.webp", showAt: 0 }
]);
deckbuilder$2.s.contactSlide(70, [
  { name: "headline", content: "Need Help with Physics?", showAt: 0 },
  { name: "email", content: "support@taleem.help", showAt: 1 },
  { name: "phone", content: "+92 300 0000000", showAt: 2 }
]);
const deck$1 = deckbuilder$2.build();
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deck: deck$1
}, Symbol.toStringTag, { value: "Module" }));
const deckbuilder$1 = new DeckBuilder();
deckbuilder$1.s.titleSlide(10, [
  { name: "title", content: "--Test2--222222--Test2", showAt: 0 }
]);
deckbuilder$1.s.twoColumnText(20, [
  { name: "title", content: "Branches of Physics", showAt: 0 },
  { name: "left", content: "• Mechanics\n• Thermodynamics\n• Electromagnetism", showAt: 1 },
  { name: "right", content: "• Optics\n• Quantum Physics\n• Nuclear Physics", showAt: 2 }
]);
deckbuilder$1.s.imageWithTitle(30, [
  { name: "image", content: "/pivot/fbise9physics.webp", showAt: 0 },
  { name: "title", content: "Understanding the Physical World", showAt: 1 }
]);
deckbuilder$1.s.statistic(40, [
  { name: "number", content: "9", showAt: 0 },
  { name: "label", content: "Core Physics Chapters", showAt: 2 }
]);
deckbuilder$1.s.quoteSlide(50, [
  { name: "quoteLine", content: "Physics is the poetry of nature.", showAt: 0 },
  { name: "author", content: "— Taleem.Help", showAt: 2 }
]);
deckbuilder$1.s.imageSlide(60, [
  { name: "image", content: "/pivot/box.webp", showAt: 0 }
]);
deckbuilder$1.s.contactSlide(70, [
  { name: "headline", content: "Need Help with Physics?", showAt: 0 },
  { name: "email", content: "support@taleem.help", showAt: 1 },
  { name: "phone", content: "+92 300 0000000", showAt: 2 }
]);
const deck = deckbuilder$1.build();
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  deck
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
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra.js": __vite_glob_0_0, "/src/lib/content/test__test_chapter__test_ex__test_question.js": __vite_glob_0_1, "/src/lib/content/test__test_chapter__test_ex__test_question2.js": __vite_glob_0_2 });
  const deckMap = {};
  for (const path in modules) {
    deckMap[path.split("/").pop().replace(/\\.js$/, "")] = modules[path].default ?? modules[path];
  }
  $$unsubscribe_page();
  return `${``}`;
});
export {
  Page as default
};
