import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "../editor";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("class", 0.2);

// Slide 1: Default image
deck.addHeader("header", [{ text: "Image Component - Default" }]);
deck.full(4, "image", [], {
  src: "whatisforce",
  showAt: 0
});

// Slide 2: Default config, different image
deck.addHeader("header", [{ text: "Image Component - Alt Image" }]);
deck.full(8, "image", [], {
  src: "typesOfForce",
  showAt: 0
});

// Slide 3: Custom offset image
deck.addHeader("header", [{ text: "Image Component - Offset Position" }]);
deck.full(12, "image", [], {
  src: "physicsClass",
  showAt: 1,
});

export const presentationData = deck.build();
