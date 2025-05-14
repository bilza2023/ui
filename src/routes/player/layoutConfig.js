// layoutConfig.js
export const ASPECT_RATIO   = 16 / 9;
export const DEFAULT_DESIGN = { width: 1020, height: 576 };

// 1 ─ canvas fitting
export function fitCanvasToViewport(viewportW, viewportH) {
  let width  = viewportW;
  let height = width / ASPECT_RATIO;
  if (height > viewportH) {
    height = viewportH;
    width  = height * ASPECT_RATIO;
  }
  return { width: Math.floor(width), height: Math.floor(height) };
}

// 2 ─ internal helpers
function calcUniformScale(canvasW, canvasH, designW, designH) {
  return Math.min(canvasW / designW, canvasH / designH);
}
function calcCenterOffset(canvasW, canvasH, designW, designH, scale) {
  return {
    offsetX: (canvasW  - designW  * scale) / 2,
    offsetY: (canvasH  - designH  * scale) / 2,
  };
}

// 3 ─ public metrics bundle
export function getSlideMetrics(canvasW, canvasH, designW, designH) {
  const scale = calcUniformScale(canvasW, canvasH, designW, designH);
  const { offsetX, offsetY } = calcCenterOffset(
    canvasW,
    canvasH,
    designW,
    designH,
    scale
  );
  return { scale, offsetX, offsetY };
}

// 4 ─ mapping helpers
export function toScreenCoords(item, { scale, offsetX, offsetY }) {
  const m = { ...item };
  if (item.x      !== undefined) m.x      = item.x      * scale + offsetX;
  if (item.y      !== undefined) m.y      = item.y      * scale + offsetY;
  if (item.width  !== undefined) m.width  = item.width  * scale;
  if (item.height !== undefined) m.height = item.height * scale;
  if (item.radius !== undefined) m.radius = item.radius * scale;
  return m;
}
export function mapSlideItems(items, metrics) {
  return items.map((it) => toScreenCoords(it, metrics));
}
