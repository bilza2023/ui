<script lang="ts">
    import { onMount } from 'svelte';
    import { SVG } from '@svgdotjs/svg.js';
  
    onMount(() => {
      const draw = SVG().addTo('#canvas').size(400, 400);
  
      // Example shape: red rectangle
      draw.rect(100, 100)
        .fill('red')
        .move(50, 50);
    });
  </script>
  
  <style>
    #canvas {
      width: 400px;
      height: 400px;
      border: 1px solid #ccc;
      margin: 2rem auto;
      display: block;
    }
  </style>
  
  <h1 style="text-align: center;">SVG.js Test</h1>
  <div id="canvas"></div>
  