import { c as create_ssr_component, a as subscribe } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import "howler";
import "../../../chunks/ZodDeckV1.js";
import "katex";
import { DeckBuilder } from "taleem-pivot-deckbuilder";
function defineDeck$2(deckbuilder2) {
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
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$2
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck$1(deckbuilder2) {
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
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineDeck: defineDeck$1
}, Symbol.toStringTag, { value: "Module" }));
function defineDeck(deckbuilder2) {
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
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  const modules = /* @__PURE__ */ Object.assign({ "/src/lib/content/fbise9matholdsyllabus__algebric_manipulation__basics__what-is-algebra.js": __vite_glob_0_0, "/src/lib/content/test__test_chapter__test_ex__test_question.js": __vite_glob_0_1, "/src/lib/content/test__test_chapter__test_ex__test_question2.js": __vite_glob_0_2 });
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
