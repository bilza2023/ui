import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../editor";

const theme = GlobalThemes.pastel;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.06);

// Slide 1: Quote Introduction
deck.addHeader("header", [{ text: "The Future is Now" }]);
deck.full(6, "quote", [
  { text: "Artificial Intelligence is not a luxury", showAt: 1 },
  { text: "It is a necessity for our students.", showAt: 3 }
], {
  author: { text: "- Educationist in Pakistan", showAt: 4 },
  fontSize: 46,
  lineHeight: 1.4,
  startY: 160
});

// Slide 2: Current Challenges in Education
deck.addHeader("header", [{ text: "Challenges Facing Pakistani Students" }]);
deck.full(12, "bullets", [
  { text: "Overcrowded classrooms limit attention", showAt: 7 },
  { text: "Lack of updated learning resources", showAt: 8 },
  { text: "Low access to qualified teachers", showAt: 9 },
  { text: "Gaps in personalized learning", showAt: 10 },
  { text: "Language barriers in content", showAt: 11 }
], {
  fontSize: 32,
  lineGap: 44,
  alignment: "top",
  gapFromTop: 40,
  textAlign: "left"
});

// Slide 3: Benefits of AI in Education
deck.addHeader("header", [{ text: "How AI Can Help" }]);
deck.full(18, "bullets", [
  { text: "Personalized learning paths for every student", showAt: 13 },
  { text: "24/7 tutoring via AI bots", showAt: 14 },
  { text: "Real-time translation of concepts", showAt: 15 },
  { text: "Instant feedback on assignments", showAt: 16 },
  { text: "Skill-based progress tracking", showAt: 17 }
], {
  fontSize: 32,
  lineGap: 44,
  alignment: "top",
  gapFromTop: 40,
  textAlign: "left"
});

// Slide 4: AI Adoption Statistics
deck.addHeader("header", [{ text: "AI Use Among Students" }]);
deck.full(24, "barchart", [
  { label: "Global", value: 75, color: "#2ecc71" },
  { label: "India", value: 68, color: "#f39c12" },
  { label: "Pakistan", value: 32, color: "#e74c3c" }
], {
  maxValue: 100,
  height: 240,
  barPadding: 20,
  maxBarWidth: 28,
  fontSize: 22,
  labelFontSize: 20
});

// Slide 5: Student Testimonial
deck.addHeader("header", [{ text: "Real Voice" }]);
deck.full(30, "quote", [
  { text: "Using AI helped me learn faster", showAt: 25 },
  { text: "and feel more confident in exams.", showAt: 26 }
], {
  author: { text: "- A Pakistani Matric Student", showAt: 28 },
  fontSize: 44,
  startY: 160
});

// Slide 6: Comparison: With vs Without AI
deck.addHeader("header", [{ text: "AI vs No AI Learning" }]);
deck.full(36, "table", [
  ["Feature", "With AI", "Without AI"],
  ["Feedback Speed", "Instant", "Days/Weeks"],
  ["Learning Style", "Customized", "One-size"],
  ["Access Time", "24/7", "Limited"],
  ["Language Aid", "Live Translations", "Manual Help"]
], {
  fontSize: 28,
  drawBorders: true,
  bgColor: "#000000",
  bgOpacity: 0.3,
  textAlign: "center",
  textColor: "#ffffff",
  width: 800,
  rowHeight: 60
});

// Slide 7: The Path Forward
deck.addHeader("header", [{ text: "Pakistan's Future with AI" }]);
deck.full(42, "donutChart", [
  { label: "Personalized Learning", value: 40, color: "#3498db" },
  { label: "AI Tutoring", value: 30, color: "#e67e22" },
  { label: "Inclusive Education", value: 30, color: "#2ecc71" }
], {
  outerRadius: 100,
  innerRadius: 60
});

// Final Slide: Call to Action
deck.addHeader("header", [{ text: "Time to Act" }]);
deck.full(48, "quote", [
  { text: "The students of today must", showAt: 44 },
  { text: "be equipped with tools of tomorrow.", showAt: 45 }
], {
  author: { text: "- National Education Report, 2024", showAt: 47 },
  fontSize: 44,
  startY: 160
});

export const presentationData = deck.build();