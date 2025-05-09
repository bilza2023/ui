import SlideBuilder from '../slimPlayer/api/SlideBuilder.js';

export default function motivation() {
  const slides = [];

  const s1 = new SlideBuilder("Push Yourself");
  s1.setBackground({ backgroundImage: "black_mat" });
  s1.addText({ text: "Push Yourself,", x: 100, y: 160, fontSize: 42, color: "yellow" });
  s1.addText({ text: "because no one else will do it for you.", x: 100, y: 210, fontSize: 36, color: "cyan" });
  s1.addSprite({ x: 700, y: 80, width: 120, height: 120, spriteName: "students", selectedItem: "girl_waving" });
  slides.push(s1.build());

  const s2 = new SlideBuilder("Consistency");
  s2.setBackground({ backgroundImage: "black_mat" });
  s2.addText({ text: "Success doesn’t come from what you do occasionally,", x: 60, y: 160, fontSize: 30, color: "#00e676" });
  s2.addText({ text: "it comes from what you do consistently.", x: 60, y: 210, fontSize: 30, color: "#00e676" });
  s2.addSprite({ x: 600, y: 90, width: 130, height: 130, spriteName: "students", selectedItem: "man_tblt_stndg" });
  slides.push(s2.build());

  return slides;
}
