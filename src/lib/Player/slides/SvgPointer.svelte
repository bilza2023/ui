<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
  
    /** Props injected by the player */
    export let data: any[] = [];   // slide.data
    export let currentTime = 0;    // global clock (seconds)
  
    const DEF_DUR = 5;             // default pointer lifetime
  
    /* ---------------------------------------------------------------------- */
    /* 1.  Separate entries                                                   */
    const imgEntry  = data.find(d => d.type === 'image');
    const pointers  = data.filter(d => d.type !== 'image');
  
    /* 2.  Refs used inside the component                                     */
    let container: HTMLDivElement | null = null;  // mount point for SVG
    let svgRoot:   SVGSVGElement  | null = null;  // inline SVG root
    let overlay:   SVGGElement    | null = null;  // <g id="overlay">
  
    /** Map<pointerObj, SVGElement> keeps track of rendered shapes */
    const rendered = new Map<any, SVGElement>();
  
    /* ---------------------------------------------------------------------- */
    onMount(async () => {
      if (!imgEntry || !container) return;
  
      // 1 — fetch SVG text
      const raw = await (await fetch(imgEntry.content)).text();
  
      // 2 — parse into an SVG DOM node
      svgRoot = new DOMParser()
        .parseFromString(raw, 'image/svg+xml')
        .documentElement as SVGSVGElement;
  
      svgRoot.setAttribute('width',  '100%');
      svgRoot.setAttribute('height', '100%');
  
      // 3 — create overlay group
      overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      overlay.setAttribute('id', 'overlay');
      svgRoot.appendChild(overlay);
  
      // 4 — inject into the page
      container.appendChild(svgRoot);
    });
  
    onDestroy(() => {
      rendered.clear();
      if (svgRoot && container) container.removeChild(svgRoot);
    });
  
    /* ---------------------------------------------------------------------- */
    /** Factory that returns an SVG element for one pointer item */
    function makeShape(p) {
      const NS = 'http://www.w3.org/2000/svg';
      let el: SVGElement | null = null;
  
      switch (p.type) {
        case 'arrow':
          el = document.createElementNS(NS, 'path');
          el.setAttribute('d', 'M0,0 L18,0 M10,-6 L18,0 L10,6');
          el.classList.add('arrow');
          break;
  
        case 'circle':
          el = document.createElementNS(NS, 'circle');
          el.setAttribute('r', '12');
          el.classList.add('circle');
          break;
  
        case 'cross':
          el = document.createElementNS(NS, 'g');
          el.innerHTML =
            '<line x1="-10" y1="-10" x2="10"  y2="10"></line>' +
            '<line x1="-10" y1="10"  x2="10"  y2="-10"></line>';
          el.classList.add('cross');
          break;
      }
  
      if (el) el.setAttribute('transform', `translate(${p.x} ${p.y})`);
      return el;
    }
  
    /* ---------------------------------------------------------------------- */
    /** Reactive block – runs whenever currentTime changes */
    $: if (overlay) {
      for (const p of pointers) {
        const dur     = p.duration ?? DEF_DUR;
        const active  = currentTime >= p.showAt && currentTime < p.showAt + dur;
  
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
  
  <!-- Mount point for the inline SVG -->
  <div class="svg-wrapper" bind:this={container}></div>
  
  <style>
    .svg-wrapper {
      width: 100%;
      height: 100%;
    }
  
    svg g#overlay .arrow {
      stroke: red;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
    }
    svg g#overlay .circle {
      stroke: gold;
      fill: none;
      stroke-width: 2;
    }
    svg g#overlay .cross line {
      stroke: red;
      stroke-width: 2;
      stroke-linecap: round;
    }
  </style>
  