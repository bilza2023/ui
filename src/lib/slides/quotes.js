import SlideBuilder from '$lib/slimPlayer/api/SlideBuilder.js';

export default function quotes() {
  const slides = [];

  const s1 = new SlideBuilder("Quote 1");
  s1.setBackground({ backgroundImage: "black_mat" });
  s1.addText({ text: `"Education is the passport to the future,"`, x: 100, y: 180, fontSize: 36, color: "cyan" });
  s1.addText({ text: `"for tomorrow belongs to those who prepare for it today."`, x: 100, y: 230, fontSize: 36, color: "cyan" });
  s1.addText({ text: "— Malcolm X", x: 500, y: 290, fontSize: 22, color: "lime" });
  slides.push(s1.build());

  const s2 = new SlideBuilder("Quote 2");
  s2.setBackground({ backgroundImage: "black_mat" });
  s2.addText({ text: `"The beautiful thing about learning is that nobody"`, x: 80, y: 180, fontSize: 34, color: "yellow" });
  s2.addText({ text: `"can take it away from you."`, x: 80, y: 230, fontSize: 34, color: "yellow" });
  s2.addText({ text: "— B.B. King", x: 480, y: 280, fontSize: 22, color: "orange" });
  slides.push(s2.build());

  return slides;
}
