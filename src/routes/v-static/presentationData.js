// /presentationData.js
import { createKit } from "taleem-slidekit";

// === Global Defaults ===
createKit.setTheme("royalBlue");
createKit.setPattern("dots");
createKit.setBgImage("rocketTakeoff");
createKit.setBgOpacity(0.2);

// === SlideKit Instance ===
const kit = createKit.create();

// === Slide 1 ===
kit.add("imageLeftBulletsRight", 10, {
  image: { src: "rocketTakeoff" },
  bullets: [
    "Ignition systems online",
    "Fuel pressure stable",
    "Launch stabilizers engaged"
  ]
}, {
  showAt: [0, 1, 2, 3]
});

// === Slide 2 ===
kit.add("titleAndImageSlide", 20, {
  title: "Liftoff Achieved",
  image: { src: "rocketTakeoff" }
}, {
  showAt: [0]
});

// === Final Output ===
export const presentationData = kit.build();
