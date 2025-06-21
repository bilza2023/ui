// pivot-player/src/DrawEngine.js
import SlideRenderer from './SlideRenderer.svelte';

export default class DrawEngine {
  constructor(mountEl) {
    this.renderer = new SlideRenderer({
      target: mountEl,
      props: { slide: {}, currentTime: 0 }
    });
  }

  draw(slide, time) {
    this.renderer.$set({ slide, currentTime: time });
  }

  destroy() {
    this.renderer.$destroy();
  }
}
