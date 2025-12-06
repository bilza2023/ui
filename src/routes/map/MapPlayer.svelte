<script>
    import { onMount } from "svelte";
    import OpenSeadragon from "openseadragon";
  
    export let imageUrl;
    export let totalRooms;
    export let roomsPerRow;
  
    // Timeline + state
    let viewer;
    let roomMeta = {};
    let timeline = [];
    let durationMs = 0;
    let currentMs = 0;
    let playing = false;
    let rafId = null;
  
    let roomBadge = "Room —";
  
    // constants
    const holdMsDefault = 1800;
    const betweenDelay = 300;
    const transitionBaseMs = 600;
    const transitionPer1000px = 220;
    const minTransitionMs = 350;
    const maxTransitionMs = 2000;
  
    let imgSize = null;
    let roomWpx = null;
    let roomHpx = null;
    let rowsCount = null;
    let sequence = [];
  
    const easeInOutCubic = t =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  
    function roomRectByIndex(idx) {
      const i = idx - 1;
      const row = Math.floor(i / roomsPerRow);
      const col = i % roomsPerRow;
      const x = col * roomWpx;
      const y = row * roomHpx;
      return { x, y, width: roomWpx, height: roomHpx, row, col };
    }
    function roomCenterPx(idx) {
      const r = roomRectByIndex(idx);
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
  
    /* Build zoom metadata */
    function prepareRoomMeta() {
      roomMeta = {};
      const homeBounds = viewer.viewport.getHomeBounds();
      const homeWidth = homeBounds.width;
  
      for (let i = 1; i <= totalRooms; i++) {
        const r = roomRectByIndex(i);
        const tl = viewer.viewport.imageToViewportCoordinates(
          new OpenSeadragon.Point(r.x, r.y),
          true
        );
        const br = viewer.viewport.imageToViewportCoordinates(
          new OpenSeadragon.Point(r.x + r.width, r.y + r.height),
          true
        );
        const vpW = br.x - tl.x;
        const currentZoom = viewer.viewport.getZoom(true);
        const approxZoom =
          vpW > 0 ? (currentZoom * (homeWidth * 0.85)) / vpW : currentZoom * 2;
  
        roomMeta[i] = {
          centerPx: roomCenterPx(i),
          toZoom: clamp(
            approxZoom,
            viewer.viewport.getMinZoom(),
            viewer.viewport.getMaxZoom()
          )
        };
      }
    }
  
    /* Build zigzag timeline */
    function buildSequenceAndTimeline() {
      sequence = [];
      for (let r = 0; r < rowsCount; r++) {
        let rowIndices = [];
        for (let c = 0; c < roomsPerRow; c++) {
          const idx = r * roomsPerRow + c + 1;
          if (idx <= totalRooms) rowIndices.push(idx);
        }
        if (r % 2 === 1) rowIndices.reverse(); // zigzag
        sequence.push(...rowIndices);
      }
  
      timeline = [];
      durationMs = 0;
  
      let prevCenter = { x: imgSize.x / 2, y: imgSize.y / 2 };
      let prevZoom = viewer.viewport.getZoom(true);
  
      for (let i = 0; i < sequence.length; i++) {
        const room = sequence[i];
        const meta = roomMeta[room];
        const center = meta.centerPx;
        const toZoom = meta.toZoom;
  
        const dx = center.x - prevCenter.x;
        const dy = center.y - prevCenter.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
  
        let transitionMs = Math.round(
          transitionBaseMs + (dist / 1000) * transitionPer1000px
        );
        transitionMs = clamp(
          transitionMs,
          minTransitionMs,
          maxTransitionMs
        );
  
        timeline.push({
          start: durationMs,
          end: durationMs + transitionMs,
          type: "transition",
          room,
          meta: {
            fromCenter: prevCenter,
            fromZoom: prevZoom,
            toCenter: center,
            toZoom,
            duration: transitionMs
          }
        });
  
        durationMs += transitionMs;
  
        timeline.push({
          start: durationMs,
          end: durationMs + holdMsDefault,
          type: "hold",
          room
        });
        durationMs += holdMsDefault;
  
        timeline.push({
          start: durationMs,
          end: durationMs + betweenDelay,
          type: "gap",
          room
        });
        durationMs += betweenDelay;
  
        prevCenter = center;
        prevZoom = toZoom;
      }
    }
  
    /* Render timeline state */
    function renderAt(ms) {
      currentMs = clamp(ms, 0, durationMs);
  
      // binary search
      let lo = 0, hi = timeline.length - 1, sIdx = 0;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const t = timeline[mid];
        if (currentMs < t.start) hi = mid - 1;
        else if (currentMs > t.end) lo = mid + 1;
        else {
          sIdx = mid;
          break;
        }
      }
  
      const step = timeline[sIdx];
      const progress =
        step.end === step.start
          ? 1
          : (currentMs - step.start) / (step.end - step.start);
  
      if (step.type === "transition") {
        const m = step.meta;
        const eased = easeInOutCubic(progress);
        const cx = lerp(m.fromCenter.x, m.toCenter.x, eased);
        const cy = lerp(m.fromCenter.y, m.toCenter.y, eased);
        const z = lerp(m.fromZoom, m.toZoom, eased);
  
        const vp = viewer.viewport.imageToViewportCoordinates(
          new OpenSeadragon.Point(cx, cy),
          true
        );
        viewer.viewport.panTo(vp, false);
        viewer.viewport.zoomTo(z, false);
        roomBadge = "Room —";
      } else if (step.type === "hold") {
        const meta = roomMeta[step.room];
        const vp = viewer.viewport.imageToViewportCoordinates(
          new OpenSeadragon.Point(meta.centerPx.x, meta.centerPx.y),
          true
        );
        viewer.viewport.panTo(vp, false);
        viewer.viewport.zoomTo(meta.toZoom, false);
        roomBadge = "Room " + step.room;
      } else {
        roomBadge = "Room —";
      }
    }
  
    /* Play loop */
    function tick() {
      if (!playing) return;
      const speed = 1.0;
      const now = performance.now();
      const ms = (now - playState.startedAt) * speed;
  
      if (ms >= durationMs) {
        renderAt(durationMs);
        stop();
        return;
      }
  
      renderAt(ms);
      rafId = requestAnimationFrame(tick);
    }
  
    const playState = { startedAt: 0 };
  
    function play() {
      if (playing) return;
      playing = true;
      playState.startedAt = performance.now() - currentMs;
      tick();
    }
  
    function pause() {
      playing = false;
      cancelAnimationFrame(rafId);
    }
  
    function stop() {
      playing = false;
      cancelAnimationFrame(rafId);
      currentMs = 0;
      renderAt(0);
    }
  
    function seek(ms) {
      pause();
      renderAt(ms);
    }
  
    // expose for Toolbar
    export function handlePlayPause() {
      if (!playing) play();
      else pause();
    }
    export function handleStop() {
      stop();
      viewer.viewport.goHome(true);
    }
    export function handleReset() {
      stop();
      viewer.viewport.goHome(true);
    }
    export function handleSeek(ms) {
      seek(ms);
    }
    export function getDuration() {
      return durationMs;
    }
    export function getCurrentMs() {
      return currentMs;
    }
  
    /* Initialize viewer */
    onMount(() => {
      viewer = OpenSeadragon({
        id: "viewer",
        prefixUrl:
          "https://openseadragon.github.io/openseadragon/images/",
        tileSources: {
          type: "image",
          url: imageUrl,
          buildPyramid: false
        },
        gestureSettingsMouse: { clickToZoom: false, dblClickToZoom: false },
        showNavigator: false
      });
  
      viewer.addHandler("open", () => {
        const item = viewer.world.getItemAt(0);
        imgSize = item.getContentSize();
  
        rowsCount = Math.ceil(totalRooms / roomsPerRow);
        roomWpx = Math.floor(imgSize.x / roomsPerRow);
        roomHpx = Math.floor(imgSize.y / rowsCount);
  
        prepareRoomMeta();
        buildSequenceAndTimeline();
        viewer.viewport.goHome(true);
      });
    });
  </script>
  
  <div id="viewer" style="height:100%;width:100%;"></div>
  
  <div class="room-badge">
    {roomBadge}
  </div>
  
  <slot />
  