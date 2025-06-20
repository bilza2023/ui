import * as PIXI from 'pixi.js';

function hexToPixiColor(hex) {
  return typeof hex === 'string' ? parseInt(hex.replace('#', ''), 16) : hex;
}

export function pixiApp(backgroundColor, width, height) {
  const bg = hexToPixiColor(backgroundColor);

  const app = new PIXI.Application({
    width,
    height,
    backgroundColor: bg,
    antialias: true,                      // ✅ Smooth edges
    resolution: window.devicePixelRatio,  // ✅ Retina / high-DPI support
    autoDensity: true                     // ✅ Scale canvas correctly
  });

  app.renderer.view.style.width = width + "px";
  app.renderer.view.style.height = height + "px";

  return app;
}
