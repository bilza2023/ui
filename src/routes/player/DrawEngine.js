import renderCanvasItems from './renderer/CanvasRenderer.js';

export default {
  draw(slidesData, currentTime, app) {
    debugger;
    const slide = slidesData.slides[0]; // always take the first slide
    if (!slide) return;

    renderCanvasItems(
      app,
      slide.items,
      slidesData.designWidth,
      slidesData.designHeight,
      slide.backgroundColor || "#000"
    );
  }
};
