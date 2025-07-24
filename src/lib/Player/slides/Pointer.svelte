<!-- src/slides/Pointer.svelte -->
<script>
    /** Props provided by Player.svelte */
    export let data = [];          // slide.data array
    export let currentTime = 0;    // global clock
  
    // grab the optional background image path (first image item wins)
    const imgItem = data.find((d) => d.name === 'image' || d.name === 'background');
    $: bgUrl = imgItem?.content || imgItem?.image || imgItem?.imageUrl || null;
  
    // helper to read nested/flat fields
    const g = (item, key, def) => item[key] ?? item.extraJson?.[key] ?? def;
  
    $: pointers = data
      .filter((d) => d.name === 'pointer')
      .map((d) => {
        const show = d.showAt ?? 0;
        const hide = g(d, 'hideAt', Infinity);
        return {
          visible: currentTime >= show && currentTime < hide,
          x: g(d, 'x', 0),
          y: g(d, 'y', 0),
          type: d.typeHint || d.type || 'arrow',
          blink: !!g(d, 'blink', false),
          wiggle: !!g(d, 'wiggle', false)
        };
      });
  </script>
  
  <div class="pointer-layer">
    {#if bgUrl}
      <img class="bg" src={bgUrl} alt="slide background" />
    {/if}
  
    {#each pointers as p (p)}
      {#if p.visible}
        <div
          class="pointer {p.type} {p.blink ? 'blink' : ''} {p.wiggle ? 'wiggle' : ''}"
          style="left:{p.x}px; top:{p.y}px">
        </div>
      {/if}
    {/each}
  </div>
  
  <style>
    .pointer-layer { position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden; }
    .bg { position:absolute; top:0; left:0; width:100%; height:100%; object-fit:contain; }
    .pointer { position:absolute; transform:translate(-50%, -50%); }
    /* basic visuals */
    .arrow::before { content:""; width:0; height:0; display:block; border-left:10px solid transparent; border-right:10px solid transparent; border-top:16px solid #ff5252; }
    .circle { width:18px; height:18px; border-radius:50%; background:#42a5f5; }
    .dot   { width:10px; height:10px; border-radius:50%; background:#fff176; }
    .crosshair { width:18px; height:18px; background:#ffd54f; position:relative; }
    .crosshair::before, .crosshair::after { content:""; position:absolute; background:#ffd54f; }
    .crosshair::before { top:50%; left:0; width:100%; height:2px; transform:translateY(-50%); }
    .crosshair::after  { left:50%; top:0; width:2px; height:100%; transform:translateX(-50%); }
    /* effects */
    @keyframes blink { 0%,49%{opacity:1;} 50%,100%{opacity:0;} }
    .blink { animation:blink 1s linear infinite; }
    @keyframes wiggle { 0%,100%{ transform:translate(-50%,-50%) rotate(0deg);} 25%{ transform:translate(-50%,-50%) rotate(5deg);} 75%{ transform:translate(-50%,-50%) rotate(-5deg);} }
    .wiggle { animation:wiggle 0.3s ease-in-out infinite; }
  </style>
  