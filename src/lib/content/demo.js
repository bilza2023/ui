import { DeckBuilder, GlobalThemes, GlobalBackgrounds } from "taleem-deckbuilders";

const theme = GlobalThemes.royalBlue;
const deck = new DeckBuilder();
deck.setGlobalTheme(theme);
deck.setGlobalBackground(GlobalBackgrounds.defaultBg(theme));
deck.setGlobalBackgroundImage("taleemclass", 0.07);

// Slide 1: Oops!
deck.addHeader("header", [{ text: "Oops!" }]);
deck.half(5,
  "image", [], {
    src: "everyDayItems",
    showAt: 1,
    width: 360,
    height: 280,
    margin: 20
  },
  "bullets", [
    { text: "We couldn’t find anything.", showAt: 2 },
    { text: "Maybe it's still loading?", showAt: 3 }
  ],
  { fontSize: 36, lineGap: 64, gapFromTop: 60 }
);

// Slide 2: What Now?
deck.addHeader("header", [{ text: "Try Again?" }]);
deck.half(10,
  "image", [], {
    src: "rocketTakeoff",
    showAt: 6,
    width: 360,
    height: 280,
    margin: 20
  },
  "bullets", [
    { text: "Refresh the page", showAt: 7 },
    { text: "Or pick a new topic", showAt: 8 }
  ],
  { fontSize: 36, lineGap: 64, gapFromTop: 60 }
);

export const presentationData = deck.build();
