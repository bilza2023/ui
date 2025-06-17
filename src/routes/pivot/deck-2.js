import { DeckBuilder } from "deckbuilderpivot";

const deckbuilder = new DeckBuilder();

deckbuilder.setTheme("royalBlue");
deckbuilder.setBackground({
  backgroundColor: "#b3d8b4",
  backgroundImage: "/pivot/defaultBg.png",
  backgroundImageOpacity: 1.0,
  pattern: null
});

deckbuilder.s.titleSlide([
  { name: "title", content: "Welcome to Taleem.Help" }
]);

deckbuilder.s.twoColumnText([
  { name: "left", content: "Advantages:\n• Fast\n• Cheap" },
  { name: "right", content: "Disadvantages:\n• Unstable\n• Short-term" },
  { name: "title", content: "Pros and Cons" }
]);

deckbuilder.s.donutChart([
  { name: "percent", content: 72 },
  { name: "label", content: "Completion" },
  { name: "color", content: "#4CAF50" }
]);

deckbuilder.s.barChart([
  { name: "title", content: "Student Performance" },
  { name: "bar", label: "Math", value: 90, color: "#4CAF50" },
  { name: "bar", label: "Physics", value: 75, color: "#2196F3" },
  { name: "bar", label: "Chemistry", value: 80, color: "#FFC107" }
]);

deckbuilder.s.statistic([
  { name: "number", content: "95%" },
  { name: "label", content: "Exam Success Rate" }
]);

deckbuilder.s.table([
  {
    name: "table",
    content: [
      ["Subject", "Marks", "Grade"],
      ["Math", "90", "A+"],
      ["Physics", "85", "A"],
      ["Chemistry", "88", "A+"]
    ]
  }
]);

deckbuilder.s.imageWithTitle([
  { name: "image", content: "/pivot/box.webp" },
  { name: "title", content: "Explore the Universe" }
]);

deckbuilder.s.imageWithCaption([
  { name: "image", content: "/pivot/fbise9physics.webp" },
  { name: "caption", content: "Our solar system in a nutshell" }
]);

deckbuilder.s.imageRightBulletsLeft([
  { name: "image", content: "/pivot/fbise9physics.webp" },
  { name: "bullet", content: "First point about the image" },
  { name: "bullet", content: "Second insight, very sharp" },
  { name: "bullet", content: "Third takeaway, well said" }
]);

deckbuilder.s.imageLeftBulletsRight([
  { name: "image", content: "/pivot/box.webp" },
  { name: "bullet", content: "This is content Number 1" },
  { name: "bullet", content: "This is content Number 2" },
  { name: "bullet", content: "This is content Number 3" }
]);

deckbuilder.s.quoteSlide([
  { name: "quoteLine", content: "Imagination is more important", start: 0 },
  { name: "quoteLine", content: "than knowledge.", start: 2 },
  { name: "author", content: "— Albert Einstein", start: 3 }
]);

deckbuilder.s.imageSlide([
  { name: "image", content: "/pivot/fbise9physics.webp" }
]);

deckbuilder.s.cornerWordsSlide([
  { name: "card", icon: "🚀", label: "Explore" },
  { name: "card", icon: "🛠️", label: "Build" },
  { name: "card", icon: "📚", label: "Learn" },
  { name: "card", icon: "🌍", label: "Share" }
]);

export const deck = deckbuilder.build();
