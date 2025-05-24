


// hooks/runAnimation.js
import AnimationModule from "./animationModule/AnimationModule";

const animationEngine = new AnimationModule();

export function runAnimation(item, currentTime) {
  animationEngine.runAnimations([item], currentTime);
}
