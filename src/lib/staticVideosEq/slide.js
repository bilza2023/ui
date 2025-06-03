// sp-test-slide.js

import { EqDeckBuilder } from "../eqsAIApi/EqDeckBuilder.js";
import { Sp } from "../eqsAIApi/Sp.js";

const deck = new EqDeckBuilder();

// Title with SP: title
deck.text(3, "SP: title");
deck.setSp(new Sp().title("This is a Side Title").getComponents());

// Title with SP: text
deck.text(6, "SP: text");
deck.setSp(new Sp().text("Here is a side explanation.").getComponents());

// Title with SP: math
deck.text(9, "SP: math");
deck.setSp(new Sp().math("F = ma").getComponents());

// Title with SP: image
deck.text(12, "SP: image");
deck.setSp(new Sp().image("https://via.placeholder.com/150", "Sample image").getComponents());

export default deck.build();
