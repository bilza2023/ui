<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/components/AdminNav.svelte";
  import '$lib/styles/forms.css'; // ✅ shared, theme-aware form styles

  import {
    listTcodes,
    getChapters,
    getExercises,
    chapterNo as chapterNoOf
  } from "$lib/services/synopsisServices.js";

  // data sources (client-safe)
  const tcodes = listTcodes(); // [{ tcodeName, description, image }]

  // path state (cascading)
  let tcode = tcodes[0]?.tcodeName ?? '';
  let chapters = [];
  let chapterSlug = '';
  let chapterNumber = null;
  let exercises = [];
  let exerciseSlug = '';

  // file & meta
  let file = null;
  let filename = '';
  let description = '';
  let tagsCsv = '';
  let status = '';

  // ui
  let loading = false;
  let msg = '';
  let err = '';
  let dragging = false;

  const STATUS = ['draft', 'ready', 'published', 'archived'];

  // —— helpers ——
  function toSafeName(name) {
    return (name || '')
      .replace(/\.json$/i, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function pickFile(e) {
    const f = e.target?.files?.[0] ?? null;
    file = f;
    filename = f ? toSafeName(f.name) : '';
  }
  function onDrop(e) {
    e.preventDefault();
    dragging = false;
    const f = e.dataTransfer?.files?.[0] ?? null;
    file = f;
    filename = f ? toSafeName(f.name) : '';
  }
  function onDragOver(e) { e.preventDefault(); dragging = true; }
  function onDragLeave() { dragging = false; }

  // —— cascading reactivity ——
  $: chapters = tcode ? getChapters(tcode) : [];
  $: if (!chapters.find(c => c.filename === chapterSlug)) chapterSlug = ''; // reset if tcode changed

  $: chapterNumber = (tcode && chapterSlug) ? chapterNoOf(tcode, chapterSlug) : null;

  $: exercises = (tcode && chapterSlug) ? getExercises(tcode, chapterSlug) : [];
  $: if (!exercises.find(e => e.filename === exerciseSlug)) exerciseSlug = ''; // reset if chapter changed

  // submit enabled?
  $: canSubmit = !!tcode && !!chapterNumber && !!exerciseSlug && !!file;

  async function upload() {
    err = ''; msg = '';
    if (!canSubmit) { err = 'Please fill required fields.'; return; }

    loading = true;
    try {
      const fd = new FormData();
      fd.append('tcode', tcode);
      fd.append('chapter', String(chapterNumber));   // number from synopsis
      fd.append('exercise', exerciseSlug);          // exercise filename (slug)
      fd.append('file', file);
      fd.append('filename', toSafeName(filename || file.name));
      if (description) fd.append('description', description);
      if (tagsCsv) fd.append('tags', tagsCsv);
      if (status) fd.append('status', status);

      const res = await fetch('/admin/upload_json', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Upload failed');

      msg = `Uploaded ✓ (${data.filename})`;
      file = null;
      filename = '';
      (document.getElementById('file') || {}).value = '';
    } catch (e) {
      err = e.message || 'Error';
    } finally {
      loading = false;
    }
  }
</script>

<Nav />
<AdminNav />

<section class="wrap">
  <header class="pagehead">
    <h1>Upload JSON Deck</h1>
    <p>Pick the path, drop your <code>.json</code>, add optional meta, then upload.</p>
  </header>

  <form
    class="form upload-form"
    on:drop={onDrop}
    on:dragover={onDragOver}
    on:dragleave={onDragLeave}
  >
    <!-- Path (cascading) -->
    <fieldset class="block">
      <legend>Path</legend>
      <div class="form-grid">
        <!-- Tcode -->
        <div class="field">
          <label for="tcode">Tcode</label>
          <select id="tcode" bind:value={tcode}>
            {#if !tcodes.length}
              <option value="">No subjects registered</option>
            {:else}
              {#each tcodes as t}
                <option value={t.tcodeName}>{t.tcodeName}</option>
              {/each}
            {/if}
          </select>
        </div>

        <!-- Chapter (slug) -->
        <div class="field">
          <label for="chapter">Chapter</label>
          <select id="chapter" bind:value={chapterSlug} disabled={!tcode || !chapters.length}>
            <option value="" disabled selected>{tcode ? 'Select chapter' : 'Pick tcode first'}</option>
            {#each chapters as ch}
              <option value={ch.filename}>
                Ch {String(ch.number).padStart(2,'0')} — {ch.name}
              </option>
            {/each}
          </select>
          {#if chapterNumber !== null}
            <small class="hint">Chapter #: <strong>{chapterNumber}</strong></small>
          {/if}
        </div>

        <!-- Exercise (slug) -->
        <div class="field">
          <label for="exercise">Exercise</label>
          <select id="exercise" bind:value={exerciseSlug} disabled={!chapterSlug || !exercises.length}>
            <option value="" disabled selected>
              {chapterSlug ? 'Select exercise' : 'Pick chapter first'}
            </option>
            {#each exercises as ex}
              <option value={ex.filename}>{ex.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </fieldset>

    <!-- File -->
    <fieldset class="block">
      <legend>File</legend>

      <div class="dropgrid">
        <div
          class={"dropzone " + (dragging ? "is-dragging" : "")}
          role="button" tabindex="0"
          aria-label="Drop JSON here or click to browse"
          on:click={() => document.getElementById('file')?.click()}
        >
          <div class="dz-icon">⇪</div>
          <div class="dz-text">
            {#if file}
              <strong>{file.name}</strong>
              <small>{Math.round(file.size/1024)} KB</small>
            {:else}
              <strong>Drop your .json here</strong>
              <small>or click to choose</small>
            {/if}
          </div>
          <input
            id="file"
            type="file"
            accept="application/json,.json"
            on:change={pickFile}
            class="hidden-input"
          />
        </div>

        <div class="sidegrid">
          <div class="field">
            <label for="filename">Filename (auto)</label>
            <input id="filename" bind:value={filename} placeholder="auto from file" />
          </div>
          <div class="field">
            <label for="status">Status</label>
            <select id="status" bind:value={status}>
              <option value="">(auto)</option>
              {#each STATUS as s}
                <option value={s}>{s}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Meta -->
    <fieldset class="block">
      <legend>Meta</legend>
      <div class="form-grid two">
        <div class="field">
          <label for="description">Description</label>
          <input id="description" bind:value={description} placeholder="optional" />
        </div>
        <div class="field">
          <label for="tags">Tags (csv)</label>
          <input id="tags" bind:value={tagsCsv} placeholder="algebra, basics" />
        </div>
      </div>
    </fieldset>

    <!-- Actions -->
    <div class="actions">
      <button on:click|preventDefault={upload} disabled={loading || !canSubmit} class="primary">
        {loading ? 'Uploading…' : 'Upload JSON'}
      </button>

      {#if msg}<div class="note ok">{msg}</div>{/if}
      {#if err}<div class="note err">{err}</div>{/if}
    </div>

    <p class="hint">Tip: Drag & drop a <code>.json</code> file anywhere inside the dashed area above.</p>
  </form>
</section>

<style>
  .wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 24px 16px;
    color: var(--primaryText);
  }

  .pagehead h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 .25rem;
    color: var(--primaryText);
  }
  .pagehead p {
    margin: 0 0 1rem;
    font-size: .95rem;
    color: var(--secondaryText);
  }
  .pagehead code {
    background: color-mix(in oklab, var(--accentColor) 14%, var(--surfaceColor));
    border: 1px solid var(--borderColor);
    border-radius: 6px;
    padding: 1px 6px;
    color: var(--primaryText);
  }

  /* Panel tone (forms.css handles base look) */
  .upload-form {
    background: var(--surfaceColor);
    border-color: var(--borderColor);
  }

  .block + .block { margin-top: 18px; }
  .block > legend {
    font-size: .9rem;
    letter-spacing: .02em;
    color: var(--secondaryText);
    margin-bottom: 10px;
    padding: 0 4px;
  }

  /* Grid helpers */
  .form-grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .form-grid.two { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }

  /* Dropzone layout */
  .dropgrid { display: grid; gap: 14px; grid-template-columns: 1.2fr .8fr; }
  @media (max-width: 820px) { .dropgrid { grid-template-columns: 1fr; } }

  /* Dropzone (token-only) */
  .dropzone {
    position: relative;
    min-height: 130px;
    border: 2px dashed var(--borderColor);
    border-radius: 14px;
    background:
      radial-gradient(1000px 200px at 50% -300px, color-mix(in oklab, var(--accentColor) 10%, transparent), transparent 70%),
      linear-gradient(180deg, color-mix(in oklab, var(--accentColor) 6%, var(--surfaceColor)), var(--surfaceColor));
    display: flex; align-items: center; gap: 14px; padding: 14px 16px; cursor: pointer;
    transition: border-color .15s ease, background .15s ease, box-shadow .15s ease;
  }
  .dropzone.is-dragging {
    border-color: color-mix(in oklab, var(--primaryColor) 55%, var(--borderColor));
    box-shadow: 0 0 0 4px color-mix(in oklab, var(--primaryColor) 20%, var(--backgroundColor));
    background:
      radial-gradient(1000px 200px at 50% -300px, color-mix(in oklab, var(--primaryColor) 18%, transparent), transparent 70%),
      linear-gradient(180deg, color-mix(in oklab, var(--primaryColor) 10%, var(--surfaceColor)), var(--surfaceColor));
  }

  .dz-icon {
    font-size: 1.4rem;
    width: 2.5rem; height: 2.5rem; line-height: 2.5rem; text-align: center;
    border-radius: 12px;
    border: 1px solid var(--borderColor);
    background: var(--surfaceColor);
    color: var(--primaryText);
    flex: 0 0 auto;
  }
  .dz-text { display: flex; flex-direction: column; }
  .dz-text strong { font-weight: 700; font-size: .95rem; color: var(--primaryText); }
  .dz-text small { color: var(--secondaryText); margin-top: 2px; }

  .hidden-input { position: absolute; inset: 0; opacity: 0; pointer-events: none; }

  .sidegrid { display: grid; gap: 12px; grid-template-columns: 1fr; }

  /* Actions (buttons come from forms.css) */
  .actions { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }

  /* Notes (success/error) */
  .note {
    padding: .45rem .6rem; border-radius: .5rem; font-size: .9rem; border: 1px solid transparent;
  }
  .note.ok {
    color: var(--primaryText);
    background: color-mix(in oklab, var(--secondaryColor) 12%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--secondaryColor) 40%, var(--borderColor));
  }
  .note.err {
    color: var(--primaryText);
    background: color-mix(in oklab, var(--accentColor) 14%, var(--surfaceColor));
    border-color: color-mix(in oklab, var(--accentColor) 50%, var(--borderColor));
  }
</style>
