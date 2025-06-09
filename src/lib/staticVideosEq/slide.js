import { EqDeckBuilder,Sp } from "taleem-eq-deckbuilder";

const deck = new EqDeckBuilder();

const globalSp = new Sp()
  .title("Introduction to ChronoDynamics")
  .text("A fictional field exploring the flow and manipulation of time.")
  .getComponents();
deck.setGlobalSp(globalSp);

deck.title(3, "What is ChronoDynamics?");
deck.text(6, "ChronoDynamics studies time's flow across different reference frames.");

deck.setSp(new Sp()
  .title("Chrono Flow")
  .image("timeStream", "Visualizing time as a stream")
  .getComponents());
deck.math(9, "C_f = \\frac{dt}{d\\tau}");

deck.setSp(new Sp()
  .title("Chrono Factor")
  .text("C_f: Chrono flow factor, dt: observer time, dτ: proper time")
  .getComponents());
deck.heading(12, "Temporal Refraction");

deck.setSp(new Sp()
  .title("Time Prism")
  .image("temporalPrism", "Illustration of time bending")
  .getComponents());
deck.text(15, "Time can 'bend' when passing through dense chrono-fields.");

deck.setSp(new Sp()
  .title("Time Equation")
  .math("T = T_0 e^{-\\lambda x}")
  .getComponents());
deck.math(18, "T = T_0 e^{-\\lambda x}");

deck.setSp(new Sp()
  .title("Decay Model")
  .text("T: observed time, T₀: initial time, λ: chrono decay rate, x: distance")
  .getComponents());
deck.text(21, "Chrono decay affects how quickly events are perceived.");

deck.setSp(new Sp()
  .title("Applications")
  .table([
    ["Application", "Effect"],
    ["Chrono-Therapy", "Slows cellular time"],
    ["Time Mesh", "Stabilizes local time"],
    ["Temporal Lens", "Magnifies history"]
  ])
  .getComponents());
deck.text(24, "Fictional tools inspired by ChronoDynamics.");

deck.setSp(new Sp()
  .title("Summary")
  .text("ChronoDynamics offers imaginative insights into time flow manipulation.")
  .getComponents());
deck.title(27, "Conclusion: Time as a Tool");

export default deck.build();
