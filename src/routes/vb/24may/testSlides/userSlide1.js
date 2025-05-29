import { DeckBuilder } from "../editor/TwoTemplates/DeckBuilder.js";
import { GlobalThemes } from "../editor/theme/globalThemes.js";
import { getDefaultBackground } from "../editor/getDefaultBackground.js";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(getDefaultBackground(theme));

// Slide 1: Intro with Large Bullet Points
deck.full(5, "bullets", [
  { text: "Pakistan's education crisis is deep and persistent", showAt: 1 },
  { text: "A complex mix of funding, access, and policy failures", showAt: 3 }
], {
  x: 100,
  y: 120,
  lineGap: 80,
  stylePresetKey: "text.bulletLarge"
});

// Slide 2: Low Investment in Education
deck.addHeader("header", [{ text: "Chronic Underfunding" }]);
deck.full(10, "bullets", [
  { text: "Less than 2.5% of GDP spent on education", showAt: 6 },
  { text: "Poor infrastructure and resources", showAt: 7 },
  { text: "Limited teacher training and salaries", showAt: 8 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});

// Slide 3: Inequality in Access
deck.addHeader("header", [{ text: "Access Disparity" }]);
deck.full(15, "bullets", [
  { text: "Urban vs Rural education gap", showAt: 11 },
  { text: "Gender-based access issues", showAt: 12 },
  { text: "Public, private, and madrassah divide", showAt: 13 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});

// Slide 4: Curriculum and Pedagogy
deck.addHeader("header", [{ text: "Outdated Curriculum" }]);
deck.half(
  22,
  "image", [], {
    src: "class",
    showAt: 16,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets", [
    { text: "Rote learning dominates", showAt: 17 },
    { text: "Outdated subject matter", showAt: 18 },
    { text: "No STEM or soft skills", showAt: 19 }
  ],
  { lineGap: 50, fontSize: 26 }
);

// Slide 5: Political Interference
deck.addHeader("header", [{ text: "Governance Challenges" }]);
deck.full(27, "bullets", [
  { text: "Frequent policy changes", showAt: 23 },
  { text: "Curriculum politicization", showAt: 24 },
  { text: "Corruption and inefficiency", showAt: 25 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});

// Slide 6: Dropouts
deck.addHeader("header", [{ text: "The Dropout Problem" }]);
deck.half(
  32,
  "image", [], {
    src: "drops",
    showAt: 28,
    stylePresetKey: "fullWidth",
    layoutMode: "center"
  },
  "bullets", [
    { text: "Kids leave school early", showAt: 29 },
    { text: "Driven by poverty, poor quality", showAt: 30 },
    { text: "Girls in villages worst hit", showAt: 31 }
  ],
  { lineGap: 50, fontSize: 26 }
);

// Slide 7: Call to Action
deck.addHeader("header", [{ text: "The Way Forward" }]);
deck.full(37, "bullets", [
  { text: "Increase education budget", showAt: 33 },
  { text: "Support teacher development", showAt: 34 },
  { text: "Modernize curriculum", showAt: 35 },
  { text: "Ensure equity across regions and genders", showAt: 36 }
], {
  x: 120,
  y: 100,
  lineGap: 70,
  stylePresetKey: "text.bulletSmall"
});

// Slide 8: Ending Quote as Full Slide
deck.addHeader("header", [{ text: "Final Thoughts" }]);
deck.full(42, "quote", [
  { text: "A nation is not built by bricks,", showAt: 38 },
  { text: "but by the education of its youth.", showAt: 39 },
  { text: "Let us invest in minds,", showAt: 40 },
  { text: "to secure a brighter future.", showAt: 41 }
]);

export const presentationData = deck.build();
