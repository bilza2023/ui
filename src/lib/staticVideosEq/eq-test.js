// slide.js

import { EqDeckBuilder,Sp } from "taleem-eq-deckbuilder";

// New deck to test all eq types
const deck = new EqDeckBuilder();

deck.title(3, "This is a Title");
deck.heading(6, "This is a Heading");
deck.text(9, "This is a block of plain text.");
deck.math(12, "E = mc^2");

const output = deck.build();
export default output;
