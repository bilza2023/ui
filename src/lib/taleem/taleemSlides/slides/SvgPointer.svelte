<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  /** Props injected by the player */
  export let data: any[] = [];     // slide.data
  export let currentTime = 0;      // global clock (seconds)

  const DEF_DUR = 5;               // default lifetime

  /* ------------------------------------------------------------------ */
  /* Split entries                                                      */
  const imgEntry  = data.find(d => d.type === 'image');
  const pointers  = data.filter(d => d.type !== 'image');

  /* DOM refs                                                            */
  let container: HTMLDivElement | null = null;   // mount target
  let svgRoot:   SVGSVGElement  | null = null;   // inline SVG
  let overlay:   SVGGElement    | null = null;   // <g id="overlay">

  /** Track rendered pointer→element */
  const rendered = new Map<any, SVGElement>();

  /* ------------------------------------------------------------------ */
  onMount(async () => {
    if (!imgEntry || !container) return;

    /* 1 – fetch & parse SVG */
    const text   = await (await fetch(imgEntry.content)).text();
    svgRoot      = new DOMParser()
                     .parseFromString(text, 'image/svg+xml')
                     .documentElement as SVGSVGElement;

    svgRoot.setAttribute('width',  '100%');
    svgRoot.setAttribute('height', '100%');

    /* 2 – overlay group */
    overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlay.setAttribute('id', 'overlay');
    svgRoot.appendChild(overlay);

    /* 3 – inject */
    container.appendChild(svgRoot);
  });

  onDestroy(() => {
    rendered.clear();
    if (svgRoot && container) container.removeChild(svgRoot);
  });

  /* ------------------------------------------------------------------ */
  /** Build one pointer element */
  function makeShape(p) {
    const NS = 'http://www.w3.org/2000/svg';
    let el: SVGElement | null = null;

    switch (p.type) {
      case 'arrow': {
        el = document.createElementNS(NS, 'path');
        el.setAttribute('d', 'M0,0 L18,0 M10,-6 L18,0 L10,6');
        el.classList.add('arrow', 'blink');
        break;
      }
      case 'circle': {
        el = document.createElementNS(NS, 'circle');
        el.setAttribute('r', '12');
        el.classList.add('circle', 'blink');
        break;
      }
      case 'dot': {
        el = document.createElementNS(NS, 'circle');
        el.setAttribute('r', '4');
        el.classList.add('dot', 'blink');
        break;
      }
    }
    if (el) el.setAttribute('transform', `translate(${p.x} ${p.y})`);
    return el;
  }

  /* ------------------------------------------------------------------ */
  /* Reactive timeline */
  $: if (overlay) {
    for (const p of pointers) {
      const dur    = p.duration ?? DEF_DUR;
      const active = currentTime >= p.showAt && currentTime < p.showAt + dur;

      if (active && !rendered.has(p)) {
        const shape = makeShape(p);
        if (shape) {
          overlay.appendChild(shape);
          rendered.set(p, shape);
        }
      }
      if (!active && rendered.has(p)) {
        overlay.removeChild(rendered.get(p));
        rendered.delete(p);
      }
    }
  }
</script>

<!-- mount point -->
<div class="svg-wrapper" bind:this={container}></div>
<style>
  .svg-wrapper {
    width: 100%;
    height: 100%;
  }

  /* blinking animation */
  @keyframes blink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.15; }
  }

  /* :global() makes rules hit runtime SVG nodes  */
  :global(.blink) {
    animation: blink 1s linear infinite;
  }

  :global(svg g#overlay .arrow) {
    stroke: red;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
  }

  :global(svg g#overlay .circle) {
    stroke: red;
    fill: none;          /* empty circle */
    stroke-width: 2;
  }

  :global(svg g#overlay .dot) {
    fill: red;
    stroke: red;
    stroke-width: 0;
  }
</style>