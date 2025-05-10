
import SlideBuilder from '../slimPlayer/api/SlideBuilder.js';

export default function positionTest() {
  const slides = [];

  const s = new SlideBuilder("Position Test");
  s.setBackground({ backgroundImage: "black_mat" });

  // Dimensions: canvas assumed 1000x562

  // Corners
  s.addRectangle({ x: 0, y: 0, width: 50, height: 50, fillColor: "red" });                         // Top-left
  s.addCircle({ x: 950, y: 0, radius: 25, color: "green", filled: true });                         // Top-right
  s.addRectangle({ x: 0, y: 512, width: 50, height: 50, fillColor: "blue" });                      // Bottom-left
  s.addCircle({ x: 950, y: 512, radius: 25, color: "orange", filled: true });                      // Bottom-right

  // Midpoints of edges
  s.addRectangle({ x: 475, y: 0, width: 50, height: 50, fillColor: "#ffcc00" });                   // Top-center
  s.addRectangle({ x: 475, y: 512, width: 50, height: 50, fillColor: "#ffcc00" });                 // Bottom-center
  s.addCircle({ x: 0, y: 256, radius: 25, color: "#00e5ff", filled: true });                       // Left-center
  s.addCircle({ x: 950, y: 256, radius: 25, color: "#00e5ff", filled: true });                     // Right-center

  // Center of canvas
  s.addRectangle({ x: 475, y: 256, width: 50, height: 50, fillColor: "#ffffff" });                 // Center rectangle
  s.addCircle({ x: 500, y: 281, radius: 10, color: "#ff4081", filled: true });                     // Center dot

  s.addText({ text: "Position Test (1000x562)", x: 300, y: 40, fontSize: 30, color: "yellow" });

  slides.push(s.build());
  return slides;
}
