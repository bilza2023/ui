<script>
  import { enhance } from '$app/forms';
  import NestedSynopsis from './NestedSynopsis.svelte';
  export let data; 
  export let form;
  let { tcodes = [], nested = [] } = data;

  // nested: [{ tcodeName, name?, description?, image?, chapters: [{ name, filename, sortOrder, exercises: [{ name, filename, sortOrder }] }] }]
  const tcodeToChapters = new Map();
  for (const tc of nested) tcodeToChapters.set(tc.tcodeName, tc.chapters || []);

  // Exercise form cascade (tcode -> chapters)
  let exTcode = tcodes[0]?.tcode || '';
  let exChapterFilename = '';
  $: exChapters = tcodeToChapters.get(exTcode) || [];
  $: if (exChapters.length && !exChapters.find(c => c.filename === exChapterFilename)) {
    exChapterFilename = exChapters[0]?.filename || '';
  }
</script>

<div class="theme-dark page">
  <div class="container">
    <header class="page-header">
      <h1>Admin · Synopsis (v2)</h1>
      <p class="muted">Add <em>tcode</em>, <em>chapter</em>, <em>exercise</em>. Preview current snapshot below.</p>
    </header>

    <!-- Forms -->
    <div class="cards">
      <!-- Add Tcode -->
      <form method="POST" use:enhance action="?/addTcode" class="card">
        <h2 class="card-title">Add Tcode</h2>
        <label class="field"><span>tcode (unique)</span><input name="tcode" required class="input" /></label>
        <label class="field"><span>name</span><input name="name" required class="input" /></label>
        <label class="field"><span>description</span><input name="description" class="input" /></label>
        <label class="field"><span>image</span><input name="image" class="input" /></label>
        <button class="btn">Add</button>
        {#if form?.action === 'addTcode'} <p class="msg {form.ok ? 'ok' : 'err'}">{form.message}</p> {/if}
      </form>

      <!-- Add Chapter -->
      <form method="POST" use:enhance action="?/addChapter" class="card">
        <h2 class="card-title">Add Chapter</h2>
        <label class="field">
          <span>tcode</span>
          <select name="tcode" required class="input">
            <option value="" disabled selected>— select —</option>
            {#each tcodes as tc}<option value={tc.tcode}>{tc.tcode}</option>{/each}
          </select>
        </label>
        <label class="field"><span>filename (chapter slug)</span><input name="filename" placeholder="ch02-kinematics" required class="input" /></label>
        <label class="field"><span>number (auto = sortOrder)</span><input name="number" type="number" min="1" class="input" placeholder="leave blank for auto" /></label>
        <label class="field"><span>name</span><input name="name" required class="input" /></label>
        <button class="btn">Add</button>
        {#if form?.action === 'addChapter'} <p class="msg {form.ok ? 'ok' : 'err'}">{form.message}</p> {/if}
      </form>

      <!-- Add Exercise (cascading chapters) -->
      <form method="POST" use:enhance action="?/addExercise" class="card">
        <h2 class="card-title">Add Exercise</h2>
        <label class="field">
          <span>tcode</span>
          <select name="tcode" class="input" bind:value={exTcode} required>
            <option value="" disabled selected>— select —</option>
            {#each tcodes as tc}<option value={tc.tcode}>{tc.tcode}</option>{/each}
          </select>
        </label>
        <label class="field">
          <span>chapter (filename)</span>
          <select name="chapterFilename" class="input" bind:value={exChapterFilename} required>
            {#if exChapters.length === 0}
              <option value="" disabled selected>— no chapters —</option>
            {:else}
              {#each exChapters as ch}
                <option value={ch.filename}>
                  {ch.sortOrder ? `Ch-${String(ch.sortOrder).padStart(2,'0')}` : 'Ch-—'} · {ch.name}
                </option>
              {/each}
            {/if}
          </select>
        </label>
        <label class="field"><span>filename (exercise slug)</span><input name="filename" placeholder="acceleration" required class="input" /></label>
        <label class="field"><span>name</span><input name="name" required class="input" /></label>
        <button class="btn">Add</button>
        {#if form?.action === 'addExercise'} <p class="msg {form.ok ? 'ok' : 'err'}">{form.message}</p> {/if}
      </form>
    </div>

    <!-- Preview -->
  
<!-- Preview -->
<div class="preview-head"><span class="muted">Current Synopsis (DB Snapshot)</span></div>
<div class="preview">
  <NestedSynopsis {nested} />
</div>

</div>
</div>



<style>
  @import '$lib/styles/tokens.css';

  /* Page shell */
  .page {
    min-height: 100vh;
    background: var(--backgroundColor);
    color: var(--primaryText);
  }
  .container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 24px;
  }

  /* Header */
  .page-header h1 {
    margin: 0 0 4px;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .muted { color: var(--secondaryText); }
  .small { font-size: 0.85rem; }

  /* Toolbar (upload/export etc.) */
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin: 12px 0 16px;
  }
  .inline { display: flex; align-items: center; gap: 8px; }
  .input-file { color: var(--secondaryText); }

  /* Cards row (3 forms) */
  .cards {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  @media (min-width: 900px) {
    .cards { grid-template-columns: repeat(3, 1fr); }
  }

  /* Card */
  .card {
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    border-radius: 14px;
    padding: 16px;
  }
  .card-title {
    margin: 0 0 8px;
    font-weight: 600;
  }

  /* Fields & inputs */
  .field { display: grid; gap: 6px; margin: 8px 0; font-size: 0.95rem; }
  .field > span { color: var(--secondaryText); }

  .input,
  .input[type='file'],
  select,
  textarea {
    width: 100%;
    background: var(--backgroundColor);
    color: var(--primaryText);
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    padding: 8px 10px;
    outline: none;
  }
  .input:focus,
  select:focus,
  textarea:focus {
    border-color: var(--primaryColor);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--primaryColor) 28%, transparent);
  }
  .input.sm { padding: 6px 8px; border-radius: 8px; }

  /* Buttons */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid var(--primaryColor);
    background: var(--primaryColor);
    color: #fff;
    cursor: pointer;
    transition: filter .15s ease;
  }
  .btn:hover { filter: brightness(1.05); }

  .btn.ghost {
    background: transparent;
    color: var(--primaryText);
    border-color: var(--borderColor);
  }
  .btn.ghost:hover {
    border-color: var(--primaryColor);
    color: var(--primaryColor);
  }

  /* Form feedback */
  .msg { font-size: 0.85rem; margin-top: 6px; }
  .msg.ok { color: var(--secondaryColor); }
  .msg.err { color: var(--accentColor); }

  /* Preview block (wrapper around NestedSynopsis) */
  .preview-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 18px 0 8px;
  }
  .preview {
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    border-radius: 14px;
    padding: 16px;
    overflow: auto;
  }
</style>
