
<script>
  export let data;                // from load()
  const { slideTypes } = data;

  // ── Deck meta state ───────────────────────────────────────────
  let filename     = '';
  let name         = '';
  let description  = '';
  let tagsCsv      = '';
  let status       = 'draft';
  let background   = {
    backgroundColor: '#F3E5AB',
    backgroundImage: '/images/taleem.webp',
    backgroundImageOpacity: 0.07
  };

  // ── Deck builder state ───────────────────────────────────────
  let slides = [];
  let newSlideType = slideTypes[0];
  let newSlideEnd  = 10;

  // Add a slide with end time only (start computed automatically)
  function addSlide() {
    const start = slides.length ? slides[slides.length - 1].end : 0;
    const slide = {
      start,
      end:   Number(newSlideEnd),
      type:  newSlideType,
      data:  []
    };
    slides = [...slides, slide];
  }

  // ── Add item to slide ────────────────────────────────────────
  function addItem(idx) {
    const slide = slides[idx];
    slide.data.push({
      name: 'bullet',
      content: 'Sample content',
      showAt: slide.start + 1
    });
    slides = [...slides]; // trigger reactivity
  }

  // ── Save deck to server ──────────────────────────────────────
  async function saveDeck() {
    if (!filename) {
      alert('Filename is required');
      return;
    }

    const deck = {
      name,
      description,
      tags: tagsCsv.split(',').map(t => t.trim()).filter(Boolean),
      status,
      version: 'deck-v1',
      background,
      deck: slides
    };

    const res = await fetch('/admin/editor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, deck })
    });

    const out = await res.json();
    if (out.success) {
      alert('Deck saved! Preview it in the player.');
    } else {
      alert(`Error: ${out.error || 'unknown'}`);
    }
  }
</script>

<div class="mx-12 p-12 border-2 border-gray-500 mt-12">
<h1>Create Deck (Quick Editor)</h1>

<section class="meta">
  <label>Filename <input bind:value={filename}/></label>
  <label>Name <input bind:value={name}/></label>
  <label>Description <input bind:value={description}/></label>
  <label>Tags (csv) <input bind:value={tagsCsv}/></label>
</section>

<section class="add-slide">
  <h2>Add Slide</h2>
  <select bind:value={newSlideType}>
    {#each slideTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>
  <label>End&nbsp;<input type="number" bind:value={newSlideEnd} min="1"/></label>
  <button on:click={addSlide}>Add Slide</button>
</section>

<section class="slides">
  <h2>Slides ({slides.length})</h2>
  {#each slides as slide, idx}
    <div class="slide-card">
      <strong>{idx + 1}. {slide.type}</strong> ({slide.start}→{slide.end}s)
      <button on:click={() => addItem(idx)}>+ Add Item</button>
      <ul>
        {#each slide.data as item}
          <li>{item.name}: {item.content} @ {item.showAt}s</li>
        {/each}
      </ul>
    </div>
  {/each}
</section>

<button class="save" on:click={saveDeck}>💾 Save Deck</button>
</div>
<style>
  /* ── Dark-theme palette ───────────────────────────── */
  :global(body) {
    background: #121212;
    color: #e0e0e0;
    font-family: system-ui, sans-serif;
  }

  h1, h2 {
    color: #fafafa;
    margin-bottom: 0.75rem;
  }

  /* ── Form controls ───────────────────────────────── */
  input,
  select,
  button {
    background: #1e1e1e;
    color: #e0e0e0;
    border: 1px solid #333;
    padding: 0.4rem 0.6rem;
    border-radius: 4px;
  }
  input:hover,
  select:hover,
  button:hover {
    border-color: #555;
  }
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.9rem;
  }

  /* ── Layout sections ─────────────────────────────── */
  section.meta,
  section.add-slide,
  section.slides {
    margin-bottom: 1.5rem;
  }

  /* ── Slide cards ─────────────────────────────────── */
  .slide-card {
    background: #1c1c1c;
    border: 1px solid #333;
    padding: 0.75rem;
    border-radius: 6px;
    margin: 0.6rem 0;
  }
  .slide-card strong {
    color: #ffd54f;
  }
  .slide-card ul {
    margin: 0.5rem 0 0;
    padding-left: 1rem;
    list-style-type: square;
  }

  /* ── Buttons ─────────────────────────────────────── */
  button {
    cursor: pointer;
    transition: background 0.15s ease;
  }
  button.save {
    font-size: 1.1rem;
    padding: 0.55rem 1.2rem;
    margin-top: 1.5rem;
    background: #2d2d2d;
    border: 1px solid #444;
  }
  button:hover {
    background: #262626;
  }
</style>
