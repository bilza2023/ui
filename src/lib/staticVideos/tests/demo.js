import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../editor";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("physicsClass", 0.07);

// Slide 1: Header + Quote
deck.addHeader("header", [{ text: "Inspiration" }]);
deck.full(5, "quote", [
  { text: "Learning never exhausts the mind.", showAt: 1 },
  { text: "It only ignites it.", showAt: 2 },
  { text: "— Leonardo da Vinci", showAt: 3 }
]);

// Slide 2: Header + Bullets
deck.addHeader("header", [{ text: "Why We Learn" }]);
deck.full(10, "bullets", [
  { text: "To grow intellectually", showAt: 6 },
  { text: "To understand our world", showAt: 7 },
  { text: "To shape our future", showAt: 8 },
  { text: "To solve real problems", showAt: 9 }
]);

// Slide 3: Header + Image
deck.addHeader("header", [{ text: "Curiosity in Action" }]);
deck.full(15, "image", [], {
  src: "whatisforce",
  showAt: 11
});

// Slide 4: Header + Table
deck.addHeader("header", [{ text: "Scoreboard" }]);
deck.full(20, "table", [
  { cells: ["Name", "Subject", "Score"] },
  { cells: ["Ali", "Math", "92"], showAt: 16 },
  { cells: ["Sara", "Biology", "87"], showAt: 17 },
  { cells: ["John", "Chemistry", "78"], showAt: 18 }
]);

// Slide 5: Header + Bar Chart
deck.addHeader("header", [{ text: "Subject Strengths" }]);
deck.full(25, "barchart", [
  { label: "Math", value: 90, color: "#e74c3c", showAt: 21 },
  { label: "Physics", value: 75, color: "#3498db", showAt: 22 },
  { label: "Chemistry", value: 65, color: "#2ecc71", showAt: 23 }
]);

// Slide 6: Header + Donut Chart
deck.addHeader("header", [{ text: "Time Allocation" }]);
deck.full(30, "donutChart", [
  { label: "Study", value: 50, color: "#8e44ad" },
  { label: "Leisure", value: 30, color: "#2980b9" },
  { label: "Sleep", value: 20, color: "#f39c12" }
]);

// Slide 7: Header + Pie Chart
deck.addHeader("header", [{ text: "Energy Sources" }]);
deck.full(35, "pieChart", [
  { label: "Food", value: 60, color: "#e67e22" },
  { label: "Rest", value: 25, color: "#1abc9c" },
  { label: "Motivation", value: 15, color: "#9b59b6" }
]);

// Slide 8: Half Slide — Healthy Habits
deck.addHeader("header", [{ text: "Healthy Habits" }]);
deck.half(
  40,
  "bullets", [
    { text: "Eat balanced meals", showAt: 36 },
    { text: "Stay hydrated", showAt: 37 },
    { text: "Sleep 7–8 hours", showAt: 38 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "class",
    showAt: 36
  }
);

// Slide 9: Half Slide — Study Tips
deck.addHeader("header", [{ text: "Study Tips" }]);
deck.half(
  45,
  "bullets", [
    { text: "Set goals daily", showAt: 41 },
    { text: "Use active recall", showAt: 42 },
    { text: "Review often", showAt: 43 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "femaleTeacher",
    showAt: 41
  }
);

// Slide 10: Half Slide — Classroom Values
deck.addHeader("header", [{ text: "Classroom Values" }]);
deck.half(
  50,
  "bullets", [
    { text: "Respect everyone", showAt: 46 },
    { text: "Ask questions", showAt: 47 },
    { text: "Help your peers", showAt: 48 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "class",
    showAt: 46
  }
);

// Slide 11: Half Slide — Science Concepts
deck.addHeader("header", [{ text: "Science Concepts" }]);
deck.half(
  55,
  "bullets", [
    { text: "Force and motion", showAt: 51 },
    { text: "Gravity pulls down", showAt: 52 },
    { text: "Friction resists movement", showAt: 53 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "whatisforce",
    showAt: 51
  }
);

// Slide 12: Half Slide — Learning Strategies
deck.addHeader("header", [{ text: "Learning Strategies" }]);
deck.half(
  60,
  "bullets", [
    { text: "Use mnemonics", showAt: 56 },
    { text: "Teach others", showAt: 57 },
    { text: "Stay organized", showAt: 58 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "femaleTeacher",
    showAt: 56
  }
);

// Slide 13: Half Slide — Class Tools
deck.addHeader("header", [{ text: "Class Tools" }]);
deck.half(
  65,
  "bullets", [
    { text: "Use notebooks wisely", showAt: 61 },
    { text: "Digital apps help too", showAt: 62 },
    { text: "Whiteboards for collaboration", showAt: 63 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "class",
    showAt: 61
  }
);

// Slide 14: Half Slide — Classroom Roles
deck.addHeader("header", [{ text: "Classroom Roles" }]);
deck.half(
  70,
  "bullets", [
    { text: "Teacher guides learning", showAt: 66 },
    { text: "Students explore", showAt: 67 },
    { text: "Everyone contributes", showAt: 68 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "femaleTeacher",
    showAt: 66
  }
);

// Slide 15: Half Slide — Summary
deck.addHeader("header", [{ text: "Summary" }]);
deck.half(
  75,
  "bullets", [
    { text: "We explored concepts", showAt: 71 },
    { text: "We saw visuals", showAt: 72 },
    { text: "We used data", showAt: 73 }
  ], {
    lineGap: 70,
    fontSize: 34
  },
  "image", [], {
    src: "class",
    showAt: 71
  }
);

export const presentationData = deck.build();
