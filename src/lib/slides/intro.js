import SlideBuilder from '$lib/slimPlayer/api/SlideBuilder.js';

export default function intro() {
  const slides = [];

  const s1 = new SlideBuilder("Intro 1");
  s1.setBackground({ backgroundImage: "black_mat" });
  s1.addText({ text: "Welcome to taleem.help", x: 100, y: 100, fontSize: 50, color: "yellow" });
  slides.push(s1.build());

  const s2 = new SlideBuilder("Intro 2");
  s2.setBackground({ backgroundImage: "black_mat" });
  s2.addText({ text: "Your Journey Starts Here", x: 100, y: 180, fontSize: 40, color: "lime" });
  slides.push(s2.build());

  return slides;
}
