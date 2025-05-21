
import { textItem } from "./items/textItem.js";
import { circleItem } from "./items/circleItem.js";
import { rectItem } from "./items/rectItem.js";
import { imageItem } from "./items/imageItem.js";

export const mockSlide = {
  startAt: 0,
  endAt: 5,
  backgroundColor: 0x14326d, // single bg color for entire slide- no guess work here. 
  background: {}, // background object for background image and patterns 
  items: [textItem, circleItem, rectItem, imageItem]
};
