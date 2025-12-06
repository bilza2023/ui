<script>
  import { onMount, onDestroy } from "svelte";

  const MAP_URL = "http://localhost:5173/quran/al-mulk.png";

  let viewer = null;

  onMount(async () => {
    try {
      const mod = await import("openseadragon");
      const OpenSeadragonLib = mod.default ?? mod;
      // keep a global reference to constructors used elsewhere (optional)
      window.OpenSeadragon = OpenSeadragonLib;

      viewer = OpenSeadragonLib({
        id: "viewer",
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        gestureSettingsMouse: {
          clickToZoom: false,
          dblClickToZoom: false
        },
        showNavigator: false,
        showHomeControl: false,
        showZoomControl: false,
        showFullPageControl: false,
        preserveViewport: true
      });

      // Open the single image (no pyramid)
      viewer.open({ type: "image", url: MAP_URL, buildPyramid: false });

      viewer.addHandler("open", () => {
        try {
          const item = viewer.world.getItemAt(0);
          const size = item.getContentSize();
          console.log("Image loaded. Size:", size);
          // Fit to home viewport immediately
          viewer.viewport.goHome(true);
        } catch (e) {
          // ignore
        }
      });
    } catch (err) {
      console.error("OpenSeadragon init failed:", err);
    }
  });

  onDestroy(() => {
    try {
      if (viewer && typeof viewer.destroy === "function") viewer.destroy();
      viewer = null;
    } catch (e) { /* ignore */ }
  });
</script>

<svelte:head>
  <meta charset="utf-8" />
  <title>Taleem.Help — Map Viewer (image only)</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html, body {
      height: 100%;
      margin: 0;
      background: #111;
      color: #fff;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }
    #viewer {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #111;
      overflow: hidden;
      touch-action: none; /* let OSD handle gestures */
    }
    /* hide any default OSD chrome */
    .openseadragon-button,
    .openseadragon-viewport .navigator,
    .openseadragon-control {
      display: none !important;
    }
  </style>
</svelte:head>

<div id="viewer" aria-label="Map viewer"></div>
