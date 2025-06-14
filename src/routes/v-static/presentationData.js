import { DeckBuilder, GobalThemes, GlobalBackgrounds } from "taleem-video-deckbuilder";
import { titleWithBulletsAndImageSlide } from "./slidePresets/titleWithBulletsAndImageSlide";

// ===== SETUP =====
const theme = GobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalBackground(GlobalBackgrounds.dotsBg(theme));

// ===== DATA =====
const data = {
  title: "Why Learn Programming?",
  bullets: [
    "Think in systems",
    "Automate boring tasks",
    "Build ideas into reality"
  ],
  image: {
    src: "appleFallingFromTree"
  }
};

// ===== TIMING =====
const showAt = [0, 1, 2.5, 4, 5.5]; // title, bullet 1–3, image

// ===== SLIDE =====
titleWithBulletsAndImageSlide(data, theme, deck, showAt);


// ===== EXPORT =====
export const presentationData = deck.build();
