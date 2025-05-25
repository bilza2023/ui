// lib/templates/index.js

import heading from "./items/heading.js";
import titleWith3Bullets from "./slides/titleWith3Bullets.js";
// later: import more items

// import slide templates later: import titleWith3Bullets from "./slides/titleWith3Bullets.js";

export const templates = {
  items: {
    heading,
    // flowersInLBot, imageLeftTextRight, etc.
  },
  slide: {
    titleWith3Bullets
  },
};
