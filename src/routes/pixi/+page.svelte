<script>
    import { onMount, onDestroy } from 'svelte';
    import * as PIXI from 'pixi.js';
  
    let app;
    const DESIGN_WIDTH = 1020;
    const DESIGN_HEIGHT = 576;
  
    onMount(() => {
      const canvasContainer = document.getElementById('pixi-container');
  
      // Fixed resolution canvas
      app = new PIXI.Application({
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        backgroundColor: 0x00aa00, // green background for Pixi
        antialias: true
      });
  
      canvasContainer.appendChild(app.view);
  
      // Create BitmapFont
      if (!PIXI.BitmapFont.available['MyFont']) {
        PIXI.BitmapFont.from('MyFont', {
          fontFamily: 'Arial',
          fontSize: 36,
          fill: '#000000'
        });
      }
  
      const text = new PIXI.BitmapText('Hello Pixi!', {
        fontName: 'MyFont',
        fontSize: 36,
        tint: 0xff0000
      });
      text.x = 50;
      text.y = 50;
      app.stage.addChild(text);
  
      // Resize canvas with CSS scaling
      function resize() {
        const container = canvasContainer;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
  
        const scale = Math.min(
          containerWidth / DESIGN_WIDTH,
          containerHeight / DESIGN_HEIGHT
        );
  
        const canvas = app.view;
        canvas.style.width = `${DESIGN_WIDTH * scale}px`;
        canvas.style.height = `${DESIGN_HEIGHT * scale}px`;
      }
  
      resize();
      window.addEventListener('resize', resize);
  
      onDestroy(() => {
        app?.destroy(true, { children: true });
        window.removeEventListener('resize', resize);
      });
    });
  </script>
  
  <style>
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #f0f0f0; /* page background */
    }
  
    #navbar {
      height: 60px;
      background-color: #e74c3c;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 20px;
      font-weight: bold;
    }
  
    #pixi-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: calc(100vh - 60px - 40px);
      background-color: rgb(55, 55, 55); /* full container bg */
      overflow: hidden;
    }
  
   
  </style>
  <div class="bg-blue-400 min-h-screen flex flex-col">
    <div id="navbar">Fake Navbar</div>
    <div id="pixi-container" class="flex-1"></div>
    <div class="bg-gray-900 text-white h-10 flex items-center justify-center">Footer</div>
  </div>
  