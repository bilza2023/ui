

// drawBackground.js

export function drawBackground(ctx, background, width, height, assets = {}) {
    const {
      backgroundColor = "#000000",
      backgroundImage = null,
      backgroundImageOpacity = 1.0,
      pattern = null
    } = background;
  
    // Layer 1: Fill background color
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  
    // Layer 2: Draw background image (if available)
    if (backgroundImage && assets[backgroundImage]) {
      ctx.globalAlpha = backgroundImageOpacity;
      ctx.drawImage(assets[backgroundImage], 0, 0, width, height);
    }
  
    // Layer 3: Draw pattern
    if (pattern === "dots") {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#ffffff";
      const spacing = 20;
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  
    // Reset
    ctx.globalAlpha = 1.0;
  }
  