
import toPixiColor from "./toPixiColor.js";

export default function getBackgroundColor(slide) {
  const color = slide?.backgroundColor ?? "#000000";
  return toPixiColor(color);
}
