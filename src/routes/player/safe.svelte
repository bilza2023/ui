<script>
  import { onMount } from "svelte";
  import * as PIXI from "pixi.js";

  // Full CanvasText object from Editor with backgroundColor + padding
  const slideData = [
    {
      type: "text",
      x: 100,
      y: 150,
      width: 400,
      height: 100,
      text: "Aligned with Editor Format",
      fontSize: 36,
      fontFamily: "Arial",
      color: "#ffffff",
      backgroundColor: "#444444",
      padding: 10,
      textAlign: "center",
      lineHeight: 1.4,
      rotation: 0,
      visible: true,
      zIndex: 2,
    },
  ];

  let app;

  onMount(() => {
    app = new PIXI.Application({
      width: 800,
      height: 400,
      backgroundColor: 0x2e2e2e,
    });

    document.getElementById("pixi-canvas").appendChild(app.view);

    for (const item of slideData) {
      if (item.type === "text" && item.visible !== false) {
        const padding = item.padding || 0;

        const style = new PIXI.TextStyle({
          fontFamily: item.fontFamily || "Arial",
          fontSize: item.fontSize || 24,
          fill: item.color || "#ffffff",
          wordWrap: true,
          wordWrapWidth: item.width - 2 * padding || 400,
          align: item.textAlign || "left",
          lineHeight: item.lineHeight || 1.2,
        });

        const textObj = new PIXI.Text(item.text, style);

        // measure text size
        const bounds = textObj.getLocalBounds();
        const boxWidth = bounds.width + 2 * padding;
        const boxHeight = bounds.height + 2 * padding;

        // draw background rectangle
        if (item.backgroundColor) {
          const bg = new PIXI.Graphics();
          bg.beginFill(PIXI.utils.string2hex(item.backgroundColor));
          bg.drawRect(0, 0, boxWidth, boxHeight);
          bg.endFill();
          bg.x = item.x;
          bg.y = item.y;
          bg.rotation = item.rotation || 0;
          if (item.zIndex !== undefined) bg.zIndex = item.zIndex;

          app.stage.addChild(bg);

          // position text over background with padding
          textObj.x = item.x + padding;
          textObj.y = item.y + padding;
        } else {
          textObj.x = item.x;
          textObj.y = item.y;
        }

        textObj.rotation = item.rotation || 0;
        if (item.zIndex !== undefined) textObj.zIndex = item.zIndex;

        app.stage.addChild(textObj);
      }
    }

    app.stage.sortChildren();
  });
</script>

<div id="pixi-canvas" class="w-full h-auto border border-gray-500"></div>
