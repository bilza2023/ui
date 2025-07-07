<script>
    export let backgroundColor = "#0e490f";
    export let backgroundImage = null;
    export let backgroundImageOpacity = 0.07;
    export let patternOpacity = 0.25;
    export let patternSize = 28;
  </script>
  
  <!-- Layer 1: Color -->
  <div
    style="
      background-color: {backgroundColor};
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    "
  ></div>
  
  <!-- Layer 2: Image -->
  {#if backgroundImage}
    <div
      style="
        background-image: url({backgroundImage});
        background-size: cover;
        background-position: center;
        opacity: {backgroundImageOpacity};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      "
    ></div>
  {/if}
  
  <!-- Layer 3: Pattern -->
  <div
    style="
      background-image: radial-gradient(rgba(255,255,255,{patternOpacity}) 1px, transparent 1px);
      background-size: {patternSize}px {patternSize}px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    "
  ></div>
  