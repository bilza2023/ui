<script>
    import BackgroundLayer from "./BackgroundLayer.svelte";
  
    export let background = {
      backgroundColor: "#000",
      backgroundImage: null,
      backgroundImageOpacity: 1
    };
  
    export let themeClass = "theme-royalBlue";
  </script>
  
  <div class="wrapper">
    <BackgroundLayer {background} />
  
    <div class="slide-content {themeClass}">
      <slot />
    </div>
  </div>
  
  <style>
    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  
    .slide-content {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      padding: 2rem;
      box-sizing: border-box;
    }
  </style>
  