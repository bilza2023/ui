<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Application, Text } from 'pixi.js';
  
    let canvas: HTMLCanvasElement;
    let app: Application;
  
    onMount(() => {
      app = new Application({
        view: canvas,
        backgroundColor: 0x222222,
        resolution: window.devicePixelRatio || 1,
        resizeTo: canvas.parentElement   // auto‑fit
      });
  
      // 1️⃣  show anything – a white “Hello” heading
      const hello = new Text('Hello Pixi!', {
        fill: 0xffffff,
        fontSize: 48,
        fontFamily: 'Arial'
      });
      hello.anchor.set(0.5);
      hello.x = app.renderer.width  / 2;
      hello.y = app.renderer.height / 2;
      app.stage.addChild(hello);
    });
  
    onDestroy(() => app?.destroy(true, { children: true }));
  </script>
  
  <canvas bind:this={canvas} class="w-full h-full" />
  