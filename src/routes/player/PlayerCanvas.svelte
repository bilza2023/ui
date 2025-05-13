<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { Application, Text } from 'pixi.js';
  
    let app: Application;
  
    onMount(async () => {
      app = new Application();
  
      // async init – waits for renderer creation
      await app.init({
        backgroundColor: 0x222222,
        resizeTo: window            // auto‑fit viewport
      });
  
      // center text with the now‑ready screen size
      const hello = new Text('Hello Pixi v8!', {
        fill: 0xffffff,
        fontSize: 48,
        fontFamily: 'Arial'
      });
      hello.anchor.set(0.5);
      hello.x = app.screen.width  / 2;
      hello.y = app.screen.height / 2;
      app.stage.addChild(hello);
  
      // add canvas to DOM
      document.getElementById('pixi-root')!.appendChild(app.canvas);
    });
  
    onDestroy(() => app?.destroy(true, { children: true }));
  </script>
  
  <div id="pixi-root" class="w-full h-full"></div>
  