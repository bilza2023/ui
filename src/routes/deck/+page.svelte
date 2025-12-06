<script>
  import { onMount } from 'svelte';
  import Nav from './Nav.svelte';

  let viewer;
  let OpenSeadragonLib;
  let imgSize = null;
  let playState = { playing:false, currentMs:0, rafId:null, startedAt:0 };
  // absolute URL to avoid relative path issues
  const mapUrl = typeof window !== 'undefined' ? `${window.location.origin}/quran/al-mulk.png` : '/quran/al-mulk.png';

  // named handlers so cleanup can remove them properly
  let playHandler, stopHandler, resetHandler, scrubInputHandler, scrubChangeHandler;

  onMount(async () => {
    // load OSD client-side only
    try {
      const mod = await import('openseadragon');
      OpenSeadragonLib = mod.default ?? mod;
    } catch (err) {
      OpenSeadragonLib = window.OpenSeadragon ?? null;
      if (!OpenSeadragonLib) {
        console.error('OpenSeadragon not found (npm import failed and no global found).', err);
        return;
      }
    }

    viewer = OpenSeadragonLib({
      id: "viewer",
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: { type: 'image', url: mapUrl, buildPyramid: false },
      gestureSettingsMouse: { clickToZoom: false, dblClickToZoom: false },
      showNavigator: false,
      showRotationControl: false,
      showHomeControl: false,
      showZoomControl: false,
      showFullPageControl: false,
      preserveViewport: true
    });

    viewer.addHandler('open', function() {
      const item = viewer.world.getItemAt(0);
      imgSize = item.getContentSize();
    });

    // wire controls (use named functions for clean removal)
    const playBtn = document.getElementById('playBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const scrubEl = document.getElementById('scrub');

    playHandler = () => {
      if (!playState.playing) {
        playState.playing = true;
        playState.startedAt = performance.now() - playState.currentMs;
        playState.rafId = requestAnimationFrame(() => {});
        // Keep original text update so UI reflects state
        playBtn.textContent = 'Pause';
      } else {
        playState.playing = false;
        cancelAnimationFrame(playState.rafId);
        playBtn.textContent = 'Play';
      }
    };

    stopHandler = () => {
      playState.playing = false;
      cancelAnimationFrame(playState.rafId);
      playState.currentMs = 0;
      if (playBtn) playBtn.textContent = 'Play';
      if (scrubEl) scrubEl.value = 0;
      viewer.viewport.goHome(true);
    };

    resetHandler = () => {
      playState.playing = false;
      cancelAnimationFrame(playState.rafId);
      playState.currentMs = 0;
      if (playBtn) playBtn.textContent = 'Play';
      if (scrubEl) scrubEl.value = 0;
      viewer.viewport.goHome(true);
      const badge = document.getElementById('roomBadge');
      if (badge) badge.textContent = 'Room —';
    };

    scrubInputHandler = (e) => {
      const v = Number(e.target.value);
      if (playState.playing) {
        playState.playing = false;
        cancelAnimationFrame(playState.rafId);
        const btn = document.getElementById('playBtn'); if (btn) btn.textContent = 'Play';
      }
      // not doing timeline render here; just set scrub UI
      if (scrubEl) scrubEl.value = v;
      playState.currentMs = v;
    };

    scrubChangeHandler = (e) => {
      playState.currentMs = Number(e.target.value);
    };

    if (playBtn) playBtn.addEventListener('click', playHandler);
    if (stopBtn) stopBtn.addEventListener('click', stopHandler);
    if (resetBtn) resetBtn.addEventListener('click', resetHandler);
    if (scrubEl) {
      scrubEl.addEventListener('input', scrubInputHandler);
      scrubEl.addEventListener('change', scrubChangeHandler);
    }

    // cleanup
    return () => {
      try {
        if (viewer && typeof viewer.destroy === 'function') viewer.destroy();
        if (playBtn && playHandler) playBtn.removeEventListener('click', playHandler);
        if (stopBtn && stopHandler) stopBtn.removeEventListener('click', stopHandler);
        if (resetBtn && resetHandler) resetBtn.removeEventListener('click', resetHandler);
        if (scrubEl && scrubInputHandler) scrubEl.removeEventListener('input', scrubInputHandler);
        if (scrubEl && scrubChangeHandler) scrubEl.removeEventListener('change', scrubChangeHandler);
      } catch (e) { /* ignore */ }
    };
  });
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>Taleem.Help — Map Player</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html,body { height:100%; margin:0; font-family: Inter, system-ui, sans-serif; background:#111; color:#fff; }
    #viewer { height:100%; width:100%; background:#111; position:relative; }
    .openseadragon-button, .openseadragon-viewport .navigator, .openseadragon-control { display:none !important; }
  </style>
</svelte:head>

<div id="viewer"></div>

<Nav />
