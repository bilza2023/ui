import SlideBuilder from '../slimPlayer/api/SlideBuilder.js';

export default function fullTest() {
  const slides = [];

  // Slide 1: Hero Message
  const s1 = new SlideBuilder("Welcome Slide");
  s1.setBackground({ backgroundImage: "black_mat" });
  s1.addText({ text: "Welcome to taleem.help", x: 80, y: 100, fontSize: 60, color: "yellow" });
  s1.addText({ text: "Your gateway to powerful, simple education.", x: 80, y: 180, fontSize: 40, color: "cyan" });
  s1.addRectangle({ x: 70, y: 90, width: 860, height: 120, fillColor: "rgba(255,255,255,0.1)", borderColor: "#ffffff", borderWidth: 1 });
  slides.push(s1.build());

  // Slide 2: Shapes Showcase
  const s2 = new SlideBuilder("Canvas Test");
  s2.setBackground({ backgroundImage: "black_mat" });
  s2.addText({ text: "We Support Canvas Shapes", x: 100, y: 80, fontSize: 60, color: "lime" });
  s2.addCircle({ x: 200, y: 250, radius: 60, color: "red", filled: true });
  s2.addRectangle({ x: 350, y: 200, width: 120, height: 80, fillColor: "blue", borderColor: "white", borderWidth: 2 });
  s2.addText({ text: "Circle", x: 170, y: 330, fontSize: 36, color: "#aaa" });
  s2.addText({ text: "Rectangle", x: 340, y: 300, fontSize: 36, color: "#aaa" });
//   s2.addLine({ x: 520, y: 240, width: 200, height: 0, color: "yellow", lineWidth: 3 });
  s2.addText({ text: "Line Element", x: 540, y: 260, fontSize: 36, color: "yellow" });
  slides.push(s2.build());

  // Slide 3: Motivation + Sprite
  const s3 = new SlideBuilder("Motivation");
  s3.setBackground({ backgroundImage: "black_mat" });
  s3.addText({ text: "Consistency Beats Intensity", x: 100, y: 100, fontSize: 60, color: "#00e676" });
  s3.addText({ text: "Even slow progress is progress.", x: 100, y: 180, fontSize: 40, color: "#cccccc" });
  s3.addSprite({ x: 700, y: 80, width: 130, height: 130, spriteName: "students", selectedItem: "girl_waving" });
  slides.push(s3.build());

  return slides;
}
