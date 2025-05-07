
<script>
  
    import {Player,Assets,Items,loadImages,create} from "../../lib/taleemApp/taleem-canvas";
      
      import CanvasPlayer from "../../lib/taleemApp/CanvasModule/CanvasPlayer/CanvasPlayer.svelte";
      import { onMount,onDestroy } from "svelte";
      import {slide} from "./slide.js";
      let items = [];
      let background = null;

  
        let images = [
          "atom.png",
          "baloons.png",
          "activity1.jpg",
          "drops.png"
        ];
        let imagesUrl   = "/images/";
  

        let assets =null;
  
  onMount(async () => { 

    items = slide.items;
    background = slide.background;
      const imagesMap = await loadImages(images,'/images/');
      assets = new Assets(imagesMap);
  });
  

  </script>
  
  <!-- images is different -->
  
  {#if assets && items}
        <CanvasPlayer 
        itemLiterals={items}
        {images}
        {assets}
       { background}
        />
  {/if}
  