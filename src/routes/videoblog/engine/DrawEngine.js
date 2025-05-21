

export default class DrawEngine {
  constructor(app, options = {}) {
    this.app = app;
    this.stage = app.stage;
    this.debug = options.debug || false;
  }

  draw(slide, currentTime) {
    this.stage.removeChildren();

    const visibleItems = slide.items.filter(item => {
      return item.data.showAt === undefined || currentTime >= item.data.showAt;
    });

    visibleItems.forEach(item => {
      if (this.debug) {
        console.log(`Rendering item: ${item.data.id} at time ${currentTime}`);
      }
      this.stage.addChild(item.displayObject);
    });
  }
}
