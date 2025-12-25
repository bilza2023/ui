<script>
    import { onMount } from "svelte";
  
    let viewerEl;
    let viewer;
  
    onMount(async () => {
      const OpenSeadragon = (await import("openseadragon")).default;
  
      viewer = OpenSeadragon({
        element: viewerEl,
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        tileSources: {
          type: "image",
          url: "/visual-quran/al-mulk-rooms.png"
        },
  
        showNavigator: false,
        showRotationControl: false,
        showZoomControl: false,
        showHomeControl: false,
        showFullPageControl: false,
  
        minZoomLevel: 0.5,
        maxZoomLevel: 5,
        defaultZoomLevel: 1,
  
        visibilityRatio: 1.0,
        constrainDuringPan: true,
        backgroundColor: "#000"
      });
    });
  </script>
  
  <style>
    .viewer {
      position: fixed;
      inset: 0;
      background: black;
    }
  </style>
  
  <div class="viewer" bind:this={viewerEl}></div>
  