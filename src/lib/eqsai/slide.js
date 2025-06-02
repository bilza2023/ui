// slide.js

import { EqDeckBuilder } from "./EqDeckBuilder.js";
import { Sp } from "./Sp.js";

// Create a new deck
const deck = new EqDeckBuilder();

// Set a global side panel (optional)
const globalSp = new Sp()
  .title("Momentum")
  .text("A fundamental concept in physics")
  .math("p = mv")
  .getComponents();

deck.setGlobalSp(globalSp);

// EQ 1: Uses global SP
deck.title(5, "Understanding Momentum");

// EQ 2: Custom SP override
deck.heading(10, "Definition");
const sp2 = new Sp()
  .text("Momentum is the product of mass and velocity.")
  .getComponents();
deck.setSp(sp2);

// EQ 3: No SP (explicitly suppressed)
deck.math(15, "p = m \times v");
deck.setSp([]);

// EQ 4: Uses global SP again
deck.text(20, "This equation holds true in all inertial frames.");

// Final JSON output
const output = deck.build();

// console.log(JSON.stringify(output, null, 2));

export default output;
