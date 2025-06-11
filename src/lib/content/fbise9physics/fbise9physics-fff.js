import { EqDeckBuilder, Sp } from "taleem-eq-deckbuilder";

const deck = new EqDeckBuilder();

const globalSp = new Sp()
  .title("Test Deck: Physics Foundations")
  .text("This deck introduces core physics ideas using visuals and equations.")
  .getComponents();
deck.setGlobalSp(globalSp);

deck.title(3, "Physical Quantities and Units");
deck.text(6, "Physics is built on measurements. We quantify observations using units.");

deck.setSp(new Sp()
  .title("SI Units")
  .table([
    ["Quantity", "Unit", "Symbol"],
    ["Length", "meter", "m"],
    ["Mass", "kilogram", "kg"],
    ["Time", "second", "s"]
  ])
  .getComponents());
deck.text(9, "The International System of Units (SI) standardizes measurements.");

deck.setSp(new Sp()
  .title("Speed Formula")
  .math("v = \\frac{d}{t}")
  .getComponents());
deck.math(12, "v = \\frac{d}{t}");

deck.setSp(new Sp()
  .title("Speed Components")
  .text("v: speed, d: distance, t: time")
  .getComponents());
deck.text(15, "Speed measures how quickly an object changes its position.");

deck.setSp(new Sp()
  .title("Summary")
  .text("Understanding units and formulas is the first step in mastering physics.")
  .getComponents());
deck.title(18, "End of Test Deck");

console.log("deck.build()", deck.build());
export default deck.build();
