<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/AdminNav.svelte";
  import {
    listTcodes,
    getChapters,
    getExercises,
    chapterNo as chapterNoOf
  } from "$lib/services/synopsisServices.js";

  // --- Path state (replaces PathPicker) ---
  const tcodes = listTcodes(); // [{ tcodeName, ... }]
  let tcode = tcodes[0]?.tcodeName ?? '';
  let chapters = [];
  let chapterSlug = '';
  let exercises = [];
  let exerciseSlug = '';
  let chapterNo = null;

  // keep your original "path" object in sync (so the rest of your code stays the same)
  let path = { tcode: '', chapterSlug: '', chapterNo: null, exerciseSlug: '' };

  // --- Meta ---
  let status = '';
  let tagsCsv = '';
  let description = '';

  // --- Payload ---
  let file = /** @type {File|null} */ (null);
  let filename = '';
  let fileEl;

  // --- UI ---
  let uploading = false;
  let msg = '';
  let err = '';
  let dragging = false;

  // Derived: enable/disable submit
  $: canSubmit = !!path.tcode && !!path.chapterNo && !!path.exerciseSlug && !!file;

  function resetForm() {
    tcode = tcodes[0]?.tcodeName ?? '';
    chapterSlug = '';
    exerciseSlug = '';
    file = null; filename = '';
    if (fileEl) fileEl.value = '';
    status = ''; tagsCsv = ''; description = '';
    msg = ''; err = '';
  }

  function onPick(e) {
    const picked = (e.target.files && e.target.files[0]) ? e.target.files[0] : null;
    file = picked;
    filename = picked ? picked.name.replace(/\.(html|htm)$/i, '') : '';
  }
  function onDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer?.files?.[0] ?? null;
    file = dropped || null;
    filename = file ? file.name.replace(/\.(html|htm)$/i, '') : '';
    dragging = false;
  }
  function onDragOver(e) { e.preventDefault(); dragging = true; }
  function onDragLeave() { dragging = false; }
  function onDropKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileEl?.click();
    }
  }

  // --- Cascading reactivity ---
  $: chapters = tcode ? getChapters(tcode) : [];
  $: if (!chapters.find(c => c.filename === chapterSlug)) chapterSlug = '';

  $: chapterNo = (tcode && chapterSlug) ? chapterNoOf(tcode, chapterSlug) : null;
  $: exercises = (tcode && chapterSlug) ? getExercises(tcode, chapterSlug) : [];
  $: if (!exercises.find(e => e.filename === exerciseSlug)) exerciseSlug = '';

  // mirror into your original "path" object
  $: path = {
    tcode,
    chapterSlug,
    chapterNo,
    exerciseSlug
  };

  // --- Upload (unchanged endpoint/payload) ---
  async function upload() {
    err = ''; msg = '';
    if (!canSubmit) { err = 'Please fill required fields.'; return; }

    uploading = true;
    try {
      const fd = new FormData();
      fd.append('tcode', path.tcode);
      fd.append('chapter', String(path.chapterNo));
      fd.append('exercise', path.exerciseSlug);

      if (status.trim())       fd.append('status', status.trim());
      if (tagsCsv.trim())      fd.append('tags', tagsCsv.trim());
      if (description.trim())  fd.append('description', description.trim());

      fd.append('file', file);
      fd.append('filename', filename || file.name.replace(/\.(html|htm)$/i, ''));

      const res = await fetch('/admin/uploadNotes', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) err = data?.error ?? 'Upload failed.';
      else { msg = `Uploaded ${data?.uploaded ?? 1} note.`; resetForm(); }
    } catch (e) {
      err = e?.message ?? 'Network error.';
    } finally {
      uploading = false;
    }
  }
</script>

<Nav />
<AdminNav />

<section class="wrap">
  <header class="pagehead">
    <h1>Upload Note (.html)</h1>
    <p>Select the path, drop your <code>.html</code> file, add optional meta, then upload.</p>
  </header>

  <form class="card" on:submit|preventDefault={upload}>
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
          <label for="chapterSlug">Chapter</label>
          <select id="chapterSlug" bind:value={chapterSlug} disabled={!tcode || !chapters.length}>
            <option value="" disabled selected>{tcode ? 'Select chapter' : 'Pick tcode first'}</option>
            {#each chapters as ch}
              <option value={ch.filename}>Ch {String(ch.number).padStart(2,'0')} — {ch.name}</option>
            {/each}
          </select>
          {#if chapterNo !== null}
            <small class="hint">Chapter #: <strong>{chapterNo}</strong></small>
          {/if}
        </div>

        <!-- Exercise (slug) -->
        <div class="field">
          <label for="exerciseSlug">Exercise</label>
          <select id="exerciseSlug" bind:value={exerciseSlug} disabled={!chapterSlug || !exercises.length}>
            <option value="" disabled selected>{chapterSlug ? 'Select exercise' : 'Pick chapter first'}</option>
            {#each exercises as ex}
              <option value={ex.filename}>{ex.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </fieldset>

    <!-- Metadata -->
    <fieldset class="block">
      <legend>Metadata</legend>
      <div class="form-grid two">
        <div class="field">
          <label for="status">Status</label>
          <input id="status" bind:value={status} placeholder="ready | draft | hidden" />
        </div>
        <div class="field">
          <label for="tags">Tags (CSV)</label>
          <input id="tags" bind:value={tagsCsv} placeholder="geometry, class9" />
        </div>
        <div class="field" style="grid-column: 1 / -1;">
          <label for="description">Description</label>
          <textarea id="description" rows="2" bind:value={description}></textarea>
        </div>
      </div>
    </fieldset>

    <!-- Note File -->
    <fieldset class="block">
      <legend>Note File</legend>
      <div class="dropgrid">
        <div
          class={"dropzone " + (dragging ? "is-dragging" : "")}
          role="button" tabindex="0"
          aria-label="Drop .html here or click to browse"
          on:click={() => fileEl?.click()}
          on:dragover={onDragOver}
          on:dragleave={onDragLeave}
          on:drop={onDrop}
          on:keydown={onDropKey}
        >
          <div class="dz-icon">⇪</div>
          <div class="dz-text">
            {#if file}
              <strong>{file.name}</strong>
              <small>{Math.round(file.size/1024)} KB</small>
            {:else}
              <strong>Drop your .html here</strong>
              <small>or click to choose</small>
            {/if}
          </div>
          <input
            bind:this={fileEl}
            id="file"
            type="file"
            accept=".html,.htm,text/html"
            on:change={onPick}
            class="hidden-input"
          />
        </div>

        <div class="sidegrid">
          <div class="field">
            <label for="filename">Filename (auto)</label>
            <input id="filename" value={filename} readonly placeholder="auto from file" />
            <small class="hint">Derived from the chosen file (without .html/.htm)</small>
          </div>
        </div>
      </div>
    </fieldset>

    <!-- Actions & messages -->
    <div class="actions">
      <button class="btn-primary" type="submit" disabled={uploading || !canSubmit}>
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
      <button type="button" class="btn" on:click={resetForm} disabled={uploading}>Clear</button>

      {#if msg}<div class="note ok">{msg}</div>{/if}
      {#if err}<div class="note err">{err}</div>{/if}
    </div>

    <p class="hint">Tip: Drag & drop a <code>.html</code> file anywhere inside the dashed area above.</p>
  </form>
</section>

<style>
  .wrap { max-width: 720px; margin: 0 auto; padding: 24px 16px; }
  .pagehead h1 { font-size: 1.5rem; font-weight: 700; margin: 0 0 .25rem; }
  .pagehead p { opacity: .75; margin: 0 0 1rem; font-size: .95rem; }

  .card { background: #0f0f11; border: 1px solid #26262b; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,.35); padding: 20px; }
  .block + .block { margin-top: 18px; }
  .block > legend { font-size: .9rem; letter-spacing: .02em; opacity: .8; margin-bottom: 10px; padding: 0 4px; }

  .form-grid { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
  .form-grid.two { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }

  .field label { display: block; font-size: .85rem; font-weight: 600; margin-bottom: .35rem; color: #c9c9d1; }
  .field input, .field select, .field textarea { width: 100%; padding: .6rem .7rem; border: 1px solid #36363b; border-radius: .55rem; background: #121217; color: #f0f0f3; transition: border-color .15s, box-shadow .15s; }
  .field input:focus, .field select:focus, .field textarea:focus { outline: none; border-color: #bfa074; box-shadow: 0 0 0 3px rgba(191,160,116,.2); }

  .dropgrid { display: grid; gap: 14px; grid-template-columns: 1.2fr .8fr; }
  @media (max-width: 820px) { .dropgrid { grid-template-columns: 1fr; } }

  .dropzone { position: relative; min-height: 130px; border: 2px dashed #3a3a40; border-radius: 14px; background: linear-gradient(180deg, #111114, #0f0f12); display: flex; align-items: center; gap: 14px; padding: 14px 16px; cursor: pointer; }
  .dropzone.is-dragging { border-color: #bfa074; background: radial-gradient(1000px 200px at 50% -200px, rgba(191,160,116,.15), transparent 70%), linear-gradient(180deg, #111114, #0f0f12); }
  .dz-icon { font-size: 1.4rem; width: 2.5rem; height: 2.5rem; line-height: 2.5rem; text-align: center; border-radius: 12px; border: 1px solid #3a3a40; background: #141418; color: #d9d3c7; flex: 0 0 auto; }
  .dz-text { display: flex; flex-direction: column; }
  .dz-text strong { font-weight: 700; font-size: .95rem; }
  .dz-text small { opacity: .7; margin-top: 2px; }
  .hidden-input { position: absolute; inset: 0; opacity: 0; pointer-events: none; }

  .sidegrid { display: grid; gap: 12px; grid-template-columns: 1fr; }

  .actions { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }
  .btn-primary { background: #bfa074; color: #0e0e10; font-weight: 700; padding: .6rem 1rem; border: 1px solid #bfa074; border-radius: .6rem; transition: transform .05s ease, filter .15s ease; }
  .btn-primary:hover { filter: brightness(1.05); }
  .btn-primary:disabled { opacity: .6; cursor: not-allowed; }
  .btn-primary:active { transform: translateY(1px); }

  .btn { background: #18181c; color: #f0f0f3; border: 1px solid #2b2b31; padding: .6rem 1rem; border-radius: .6rem; }
  .btn[disabled] { opacity: .55; cursor: default; }

  .note { padding: .45rem .6rem; border-radius: .5rem; font-size: .9rem; border: 1px solid transparent; }
  .note.ok { color: #c7f5cf; background: #0f1c12; border-color: #1c3b24; }
  .note.err { color: #ffd6d6; background: #2a1111; border-color: #5c1f1f; }

  .hint { margin-top: 6px; font-size: .8rem; opacity: .65; }
</style>
