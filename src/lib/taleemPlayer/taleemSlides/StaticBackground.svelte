<script>
  // Dumb renderer: receives finalized values, paints the layer.
  export let backgroundColor = '#000000';
  export let backgroundImage = null;        // string | null
  export let backgroundImageOpacity = 1.0;  // 0..1
</script>

<!-- Absolute layer. Parent should stack via CSS. -->
<div
  class="static-bg"
  style="
    position: absolute;
    inset: 0;
    background-color: {backgroundColor};
  "
  aria-hidden="true"
>
  {#if backgroundImage}
    <div
      class="static-bg__image"
      style="
        position: absolute;
        inset: 0;
        background-image: url({backgroundImage});
        background-size: cover;
        background-position: center;
        opacity: {backgroundImageOpacity};
        pointer-events: none;
      "
    ></div>
  {/if}
</div>