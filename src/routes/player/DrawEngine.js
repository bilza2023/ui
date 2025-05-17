// DrawEngine.js

import renderCanvasItems from './renderer/CanvasRenderer.js';
import { getActiveSlide } from './SlideUtils.js';

export default class DrawEngine {
  constructor(slidesData, app) {
    this.slides = slidesData.slides;
    this.designWidth = slidesData.designWidth;
    this.designHeight = slidesData.designHeight;
    this.app = app;
    this.lastSlideId = null;
  }

  draw(currentTime) {
    // debugger;
    const slide = getActiveSlide(this.slides, currentTime);
    if (!slide) return;

    // Prevent re-rendering the same slide if desired
    // const isNewSlide = slide.id !== this.lastSlideId;
    // if (isNewSlide) {
    //   this.lastSlideId = slide.id;
    // }
    
///////////////////////////////////////////
// here remove items which are not to be show
// for (const item of slide.items) {
//   console.log(`item.showAt =`, item.showAt, `currentTime =`, currentTime);
// }
console.log("DrawEngine draw() time:", currentTime);


const visibleItems = slide.items.filter(item =>
  item.visible !== false &&
  (item.showAt === undefined || currentTime >= item.showAt)
);
//this is a function call
    renderCanvasItems(
      this.app,
      visibleItems,
      this.designWidth,
      this.designHeight,
      slide.backgroundColor || "#000"
    );
  }
}
