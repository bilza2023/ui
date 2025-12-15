// src/lib/anim.js
// Final animator with first-scene stabilization fix.
// Public API: createAnimator(viewer, opts) => { init(imgSize), start(waitMs, {skipHome}), stop(), isRunning() }

export function createAnimator(viewer, opts = {}) {
  // -------------------------
  // HARD CONSTANTS (sheet geometry)
  // -------------------------
  const IMG_WIDTH = 15360; // full PNG width px
  const IMG_HEIGHT = 6400; // full PNG height px
  const COLS = 6;          // number of scene columns
  const ROWS = 5;          // number of scene rows
  const SCENE_W = 2560;    // width of one scene px (40 tiles * 64)
  const SCENE_H = 1280;    // height of one scene px (20 tiles * 64)
  const ROOM_COUNT = 30;   // logical scenes per sheet

  // tuning & helpers
  const BASE_TRANSITION_PER_PX = opts.baseTransitionPerPx ?? 0.06;
  const EASE = opts.ease ?? ((t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // internal state
  let imgSize = { x: IMG_WIDTH, y: IMG_HEIGHT }; // defaults to hard constants
  let roomMeta = [];   // array of { index, left, top, width, height, centerPx, normRect, toZoom }
  let sequence = [];   // zig-zag order
  const anim = { running: false, cancelRequested: false, currentTask: null };

  // -------------------------
  // Build integer grid and sequence using FLOORed scene sizes (matches original HTML)
  // -------------------------
  function buildGridAndSequence() {
    roomMeta = new Array(ROOM_COUNT);
    sequence = [];

    // integer room sizes to avoid fractional px rounding differences
    const roomWpx = Math.floor(imgSize.x / COLS);
    const roomHpx = Math.floor(imgSize.y / ROWS);

    for (let r = 0; r < ROWS; r++) {
      const rowIndexes = [];
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        if (idx >= ROOM_COUNT) break;

        const left = c * roomWpx;
        const top = r * roomHpx;
        const width = SCENE_W;   // content scene width
        const height = SCENE_H;  // content scene height

        // clamp: ensure rect fits inside image
        const leftClamped = Math.max(0, Math.min(imgSize.x - width, left));
        const topClamped = Math.max(0, Math.min(imgSize.y - height, top));

        const centerX = leftClamped + width / 2;
        const centerY = topClamped + height / 2;

        roomMeta[idx] = {
          index: idx,
          left: leftClamped,
          top: topClamped,
          width,
          height,
          centerPx: { x: centerX, y: centerY },
          normRect: {
            x: leftClamped / imgSize.x,
            y: topClamped / imgSize.y,
            w: width / imgSize.x,
            h: height / imgSize.y
          },
          toZoom: null // computed later once viewer is ready
        };

        rowIndexes.push(idx);
      }

      if (r % 2 === 1) rowIndexes.reverse(); // zig-zag
      sequence.push(...rowIndexes);
    }

    sequence = sequence.slice(0, ROOM_COUNT);
  }

  // -------------------------
  // Prepare per-room toZoom values using viewport-space measurement (like original HTML)
  // Must be called when viewer/world/item is open and viewport funcs are available.
  // -------------------------
  function prepareRoomZooms() {
    try {
      const homeBounds = viewer.viewport.getHomeBounds ? viewer.viewport.getHomeBounds() : viewer.viewport.getBounds(true);
      const homeWidth = homeBounds.width || 1; // viewport fraction that fits the whole image
      const currentZoom = viewer.viewport.getZoom(true);

      // min/max zoom safety
      const minZoom = viewer.viewport.getMinZoom ? viewer.viewport.getMinZoom() : 0.01;
      const maxZoom = viewer.viewport.getMaxZoom ? viewer.viewport.getMaxZoom() : 100;

      for (let rm of roomMeta) {
        // top-left and bottom-right image points
        const tl = new OpenSeadragon.Point(rm.left, rm.top);
        const br = new OpenSeadragon.Point(rm.left + rm.width, rm.top + rm.height);

        // convert to viewport coords
        const tlVP = viewer.viewport.imageToViewportCoordinates(tl);
        const brVP = viewer.viewport.imageToViewportCoordinates(br);

        const vpWidth = Math.abs(brVP.x - tlVP.x) || 1; // avoid division by zero
        // compute approx target zoom so that room fills ~85% of viewport width (matches HTML)
        const approxZoom = (currentZoom * (homeWidth * 0.85)) / vpWidth;
        const z = clamp(approxZoom, minZoom, maxZoom);
        rm.toZoom = z;
      }
    } catch (e) {
      // fallback: assign a reasonable zoom (current)
      for (let rm of roomMeta) rm.toZoom = viewer.viewport.getZoom(true);
    }
  }

  // -------------------------
  // Fit a normalized rect (preferred)
  // -------------------------
  function fitRoomRect(normRect, animate = true) {
    try {
      const rect = new OpenSeadragon.Rect(normRect.x, normRect.y, normRect.w, normRect.h);
      viewer.viewport.fitBounds(rect, animate);
      return true;
    } catch (e) {
      return false;
    }
  }

  // -------------------------
  // Animate by lerping center (image px) and zoom and calling panTo/zoomTo each RAF
  // -------------------------
  function animateTransition(fromMeta, toMeta, durationMs) {
    return new Promise((resolve) => {
      const start = performance.now();

      function frame(now) {
        if (anim.cancelRequested) return resolve(false);
        const t = clamp((now - start) / Math.max(1, durationMs), 0, 1);
        const e = EASE(t);

        // interpolate center in image pixels
        const cx = lerp(fromMeta.centerPx.x, toMeta.centerPx.x, e);
        const cy = lerp(fromMeta.centerPx.y, toMeta.centerPx.y, e);

        // interpolate zoom (use toZoom fields; fallback to current zoom)
        const fromZ = fromMeta.toZoom ?? viewer.viewport.getZoom(true);
        const toZ = toMeta.toZoom ?? viewer.viewport.getZoom(true);
        const z = lerp(fromZ, toZ, e);

        try {
          const imgP = new OpenSeadragon.Point(cx, cy);
          const vp = viewer.viewport.imageToViewportCoordinates(imgP);
          // instantaneous per-frame update; combined with RAF produces smooth animation
          viewer.viewport.panTo(vp, false);
          viewer.viewport.zoomTo(z, vp, false);
        } catch {
          // ignore per-frame transform errors
        }

        if (t < 1) {
          anim.currentTask = requestAnimationFrame(frame);
        } else {
          anim.currentTask = null;
          resolve(true);
        }
      }

      anim.currentTask = requestAnimationFrame(frame);
    });
  }

  function sleepMs(ms) {
    return new Promise((resolve) => {
      const start = performance.now();
      function tick(now) {
        if (anim.cancelRequested) return resolve(false);
        if (now - start >= ms) return resolve(true);
        anim.currentTask = requestAnimationFrame(tick);
      }
      anim.currentTask = requestAnimationFrame(tick);
    });
  }

  // -------------------------
  // Public API
  // -------------------------
  function init(givenImgSize) {
    // keep hard-coded constants as canonical; warn if passed size differs
    if (givenImgSize && (Math.round(givenImgSize.x) !== IMG_WIDTH || Math.round(givenImgSize.y) !== IMG_HEIGHT)) {
      console.warn('Animator.init: given image size differs from hard-coded sheet constants', { givenImgSize, expected: { IMG_WIDTH, IMG_HEIGHT } });
      // still set to constants to avoid surprises
      imgSize = { x: IMG_WIDTH, y: IMG_HEIGHT };
    } else {
      imgSize = { x: IMG_WIDTH, y: IMG_HEIGHT };
    }

    buildGridAndSequence();
    // do NOT prepareRoomZooms here — wait until viewport is settled (handled in start)
  }

  async function start(waitMs = 5000, options = { skipHome: false }) {
    waitMs = clamp(Number(waitMs) || 5000, 5000, 500000);
    if (!viewer || !roomMeta.length) return;
    if (anim.running) return;
    anim.running = true;
    anim.cancelRequested = false;

    const goHome = () => viewer.viewport.goHome(true);

    while (!anim.cancelRequested) {
      if (!options.skipHome) {
        // ensure we are at home first, and allow viewport to settle
        goHome();
        // stabilization: wait two RAFs and a tiny sleep to let OSD compute home bounds/zoom
        await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
        if (!(await sleepMs(40))) break;
      }

      // Recompute per-room zooms now that the viewport/home is stable
      prepareRoomZooms();

      // start at first scene
      const firstIdx = sequence[0] ?? 0;
      const firstMeta = roomMeta[firstIdx];

      // prefer to fit rect directly (OSD handles exact framing)
      const fitOk = fitRoomRect(firstMeta.normRect, true);
      if (!fitOk) {
        // fallback: animate center+zoom from home to first scene
        const dist = Math.hypot(firstMeta.centerPx.x - IMG_WIDTH / 2, firstMeta.centerPx.y - IMG_HEIGHT / 2);
        const tMs = Math.max(300, Math.round(dist * BASE_TRANSITION_PER_PX));
        const ok = await animateTransition(
          { centerPx: { x: IMG_WIDTH / 2, y: IMG_HEIGHT / 2 }, toZoom: viewer.viewport.getZoom(true) },
          firstMeta,
          tMs
        );
        if (!ok) break;
      }

      if (!(await sleepMs(waitMs))) break;

      // iterate remaining scenes
      for (let i = 1; i < sequence.length; i++) {
        const from = roomMeta[sequence[i - 1]];
        const to = roomMeta[sequence[i]];
        const dx = to.centerPx.x - from.centerPx.x;
        const dy = to.centerPx.y - from.centerPx.y;
        const dist2 = Math.hypot(dx, dy);
        const t2 = Math.max(250, Math.round(dist2 * BASE_TRANSITION_PER_PX));

        if (!(await animateTransition(from, to, t2))) break;
        if (!(await sleepMs(waitMs))) break;
      }

      // optionally return home
      if (!options.skipHome) {
        const lastMeta = roomMeta[sequence[sequence.length - 1] ?? 0];
        const home = { x: IMG_WIDTH / 2, y: IMG_HEIGHT / 2 };
        const dist3 = Math.hypot(lastMeta.centerPx.x - home.x, lastMeta.centerPx.y - home.y);
        const t3 = Math.max(300, Math.round(dist3 * BASE_TRANSITION_PER_PX));
        const fullRect = { x: 0, y: 0, w: 1, h: 1 };
        await animateTransition(lastMeta, { centerPx: home, normRect: fullRect, toZoom: viewer.viewport.getHomeZoom() }, t3);
        await sleepMs(400);
      }

      // loop again unless canceled
    }

    anim.running = false;
    anim.cancelRequested = false;
  }

  function stop() {
    anim.cancelRequested = true;
    if (anim.currentTask) cancelAnimationFrame(anim.currentTask);
    anim.currentTask = null;
    anim.running = false;
  }

  function isRunning() {
    return anim.running;
  }

  // expose API
  return { init, start, stop, isRunning };
}
