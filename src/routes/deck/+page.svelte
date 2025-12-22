<script>
  import { onMount } from "svelte";
  import {
    SCENES_PER_STRIP,
    SCENE_W,
    SCENE_H,
    getSceneFromStrip
  } from "./strips.js";

  const surahId = "067";

  let stripUrls = [];
  let totalScenes = 0;

  let sceneIndex = 0;
  let currentScene = null;

  onMount(async () => {
    await loadSurah(surahId);
    updateScene();
  });

  async function loadSurah(id) {
    const base = `/visual-quran/${id}`;
    const res = await fetch(`${base}/manifest.json`);
    const manifest = await res.json();

    stripUrls = Array.from(
      { length: manifest.strips },
      (_, i) => `${base}/${String(i + 1).padStart(2, "0")}.png`
    );

    totalScenes = manifest.strips * SCENES_PER_STRIP;
  }

  function updateScene() {
    const stripIndex = Math.floor(sceneIndex / SCENES_PER_STRIP);
    const sceneIndexInStrip = sceneIndex % SCENES_PER_STRIP;

    currentScene = getSceneFromStrip({
      stripUrl: stripUrls[stripIndex],
      sceneIndexInStrip
    });
  }

  // nav will control this later
  export function setScene(i) {
    if (i < 0 || i >= totalScenes) return;
    sceneIndex = i;
    updateScene();
  }
</script>

{#if currentScene}
  <div class="scene-frame">
    <img
      src={currentScene.stripUrl}
      alt="scene"
      style="
        transform: translate(
          -{currentScene.offsetX}px,
          0px
        );
      "
    />
  </div>
{/if}

<style>
  /* 🔒 FIXED PIXEL VIEWPORT — NO SCALING */
  .scene-frame {
    width: 1280px;     /* half of 2560 */
    height: 640px;     /* half of 1280 */
    overflow: hidden;
    background: #000;
    margin: 0 auto;
  }

  .scene-frame img {
    width: auto;
    height: auto;
    max-width: none;
    max-height: none;
    user-select: none;
    pointer-events: none;
    display: block;
  }
</style>
