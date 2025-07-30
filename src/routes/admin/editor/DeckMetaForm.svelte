<!-- src/lib/DeckMetaForm.svelte -->
<script>
    /* Simple deck‑meta form: lets the author edit name, description and cover‑image URL */
    import { createEventDispatcher } from 'svelte';
    export let meta = { name: '', description: '', coverImage: '' };
    const dispatch = createEventDispatcher();
  
    function fire() {
      // emit a shallow clone so parent keeps its own reference
      dispatch('update', { meta: { ...meta } });
    }
  </script>
  
  <div class="meta-form">
    <label>
      Name (slug)
      <input bind:value={meta.name} on:change={fire} placeholder="intro_to_algebra" />
    </label>
  
    <label>
      Description
      <textarea rows="2" bind:value={meta.description} on:change={fire} />
    </label>
  
    <label>
      Cover Image URL
      <input bind:value={meta.coverImage} on:change={fire} placeholder="/images/cover.webp" />
    </label>
  </div>
  
  <style>
    .meta-form { display: grid; gap: .75rem; max-width: 600px; margin-bottom: 1rem; }
    label { display: flex; flex-direction: column; font-size: .9rem; gap: .25rem; }
    input, textarea { padding:.4rem .5rem; border:1px solid #ccc; border-radius:4px; }
  </style>
  
  
  <!-- src/lib/DefaultSlideCard.svelte -->
  <script>
    /* Generic editor for any slide that doesn't need a custom UI. */
    import { createEventDispatcher } from 'svelte';
    export let slide;      // bound from parent
    export let index = 0;  // slide index in deck
    const dispatch = createEventDispatcher();
  
    function update() {
      // propagate upstream
      dispatch('update', { slide: { ...slide }, index });
    }
    function del() {
      dispatch('delete', { index });
    }
    function addItem() {
      slide.data = [
        ...slide.data,
        { name: 'text', content: '' }
      ];
      update();
    }
  </script>
  
  <div class="card">
    <header>
      <strong>{index + 1}. {slide.type}</strong>
      <button on:click={del}>🗑️</button>
    </header>
  
    <div class="timing">
      <label>start <input type="number" bind:value={slide.start}     on:change={update} min="0"/></label>
      <label>end   <input type="number" bind:value={slide.end}       on:change={update} min={slide.start}/></label>
    </div>
  
    <table class="items">
      <thead><tr><th>name</th><th>content</th></tr></thead>
      <tbody>
        {#each slide.data as item, i}
          <tr>
            <td><input bind:value={item.name} on:change={update} /></td>
            <td><input bind:value={item.content} on:change={update} style="width:100%"/></td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button on:click={addItem}>＋ Add item</button>
  </div>
  
  <style>
    .card { border:1px solid #ddd; border-radius:6px; padding:.75rem; margin-bottom:1rem; }
    header { display:flex; justify-content:space-between; align-items:center; margin-bottom:.5rem; }
    .timing { display:flex; gap:1rem; margin-bottom:.5rem; }
    .timing label { font-size:.8rem; display:flex; flex-direction:column; gap:.25rem; }
    table { width:100%; border-collapse:collapse; font-size:.85rem; margin-bottom:.5rem; }
    th,td { border:1px solid #ccc; padding:.25rem .4rem; }
    input[type="number"] { width:6ch; }
  </style>
  
  
  <!-- src/routes/admin/editor/+page.svelte -->
  <script>
    import { onMount } from 'svelte';
    import DeckMetaForm from '$lib/DeckMetaForm.svelte';
    import DefaultSlideCard from '$lib/DefaultSlideCard.svelte';
  
    // Map of custom editors – empty for now, but pointerSlide can be added later
    const SlideEditorMap = {};
  
    // The deck object will usually come from load() via page data. For demo we init minimal.
    export let data = { deck: { name: 'new_deck', description: '', coverImage: '', slides: [] } };
    let deck = structuredClone(data.deck);
    let dirty = false;
  
    // ---- helpers ----
    function markDirty() { dirty = true; }
  
    function addSlide(type = 'titleSlide') {
      const newSlide = {
        type,
        start: deck.slides.length ? deck.slides[deck.slides.length - 1].end : 0,
        end:   (deck.slides.length ? deck.slides[deck.slides.length - 1].end : 0) + 5,
        data:  type === 'titleSlide' ? [ { name: 'title', content: 'Untitled' } ] : []
      };
      deck.slides = [...deck.slides, newSlide];
      markDirty();
    }
  
    function updateMeta(e) {
      deck = { ...deck, ...e.detail.meta };
      markDirty();
    }
  
    function updateSlide(idx, updated) {
      deck.slides[idx] = updated;
      deck.slides = [...deck.slides];
      markDirty();
    }
  
    function deleteSlide(idx) {
      deck.slides.splice(idx, 1);
      deck.slides = [...deck.slides];
      markDirty();
    }
  
    async function save() {
      // TODO – call your +page.server.js POST endpoint
      await fetch(`?filename=${deck.name}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deck)
      });
      dirty = false;
      alert('Deck saved');
    }
  </script>
  
  <h1>Deck Editor</h1>
  
  <DeckMetaForm meta={{ name: deck.name, description: deck.description, coverImage: deck.coverImage }} on:update={updateMeta} />
  
  <!-- Add Slide Toolbar -->
  <div style="margin-bottom:1rem;">
    <select bind:value={newType}>
      <option value="titleSlide">titleSlide</option>
      <option value="pointerSlide">pointerSlide</option>
      <option value="imageLeftBulletsRight">imageLeftBulletsRight</option>
    </select>
    <button on:click={() => addSlide(newType)}>＋ Add Slide</button>
  </div>
  
  <!-- Slide List -->
  {#each deck.slides as slide, i}
    {#if SlideEditorMap[slide.type]}
      <svelte:component this={SlideEditorMap[slide.type]} {slide} index={i} on:update={(e)=>updateSlide(i,e.detail.slide)} on:delete={()=>deleteSlide(i)} />
    {:else}
      <DefaultSlideCard {slide} index={i} on:update={(e)=>updateSlide(i,e.detail.slide)} on:delete={()=>deleteSlide(i)} />
    {/if}
  {/each}
  
  <!-- Save Button -->
  <button disabled={!dirty} on:click={save}>💾 Save Deck</button>
  
  <style>
    h1 { margin-top:0; }
  </style>
  