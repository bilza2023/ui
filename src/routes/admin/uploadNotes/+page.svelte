<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/components/AdminNav.svelte";
  import "$lib/styles/forms.css"; // ✅ shared, theme-aware

  import {
    listTcodes,
    getChapters,
    getExercises,
    chapterNo as chapterNoOf
  } from "$lib/services/synopsisServices.js";

  // --- Path state (replaces PathPicker) ---
  const tcodes = listTcodes(); // [{ tcodeName, ... }]
  let tcode = tcodes[0]?.tcodeName ?? "";
  let chapters = [];
  let chapterSlug = "";
  let exercises = [];
  let exerciseSlug = "";
  let chapterNo = null;

  // mirror for your existing payload shape
  let path = { tcode: "", chapterSlug: "", chapterNo: null, exerciseSlug: "" };

  // --- Meta ---
  let status = "";
  let tagsCsv = "";
  let description = "";

  // --- Payload ---
  let file = /** @type {File|null} */ (null);
  let filename = "";
  let fileEl;

  // --- UI ---
  let uploading = false;
  let msg = "";
  let err = "";
  let dragging = false;

  // enable/disable submit
  $: canSubmit = !!path.tcode && !!path.chapterNo && !!path.exerciseSlug && !!file;

  function resetForm() {
    tcode = tcodes[0]?.tcodeName ?? "";
    chapterSlug = "";
    exerciseSlug = "";
    file = null;
    filename = "";
    if (fileEl) fileEl.value = "";
    status = "";
    tagsCsv = "";
    description = "";
    msg = "";
    err = "";
  }

  function onPick(e) {
    const picked = e.target?.files?.[0] ?? null;
    file = picked;
    filename = picked ? picked.name.replace(/\.(html|htm)$/i, "") : "";
  }
  function onDrop(e) {
    e.preventDefault();
    const dropped = e.dataTransfer?.files?.[0] ?? null;
    file = dropped || null;
    filename = file ? file.name.replace(/\.(html|htm)$/i, "") : "";
    dragging = false;
  }
  function onDragOver(e) { e.preventDefault(); dragging = true; }
  function onDragLeave() { dragging = false; }
  function onDropKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileEl?.click();
    }
  }

  // --- Cascading reactivity ---
  $: chapters = tcode ? getChapters(tcode) : [];
  $: if (!chapters.find(c => c.filename === chapterSlug)) chapterSlug = "";

  $: chapterNo = (tcode && chapterSlug) ? chapterNoOf(tcode, chapterSlug) : null;
  $: exercises = (tcode && chapterSlug) ? getExercises(tcode, chapterSlug) : [];
  $: if (!exercises.find(e => e.filename === exerciseSlug)) exerciseSlug = "";

  // mirror into your original "path" object
  $: path = { tcode, chapterSlug, chapterNo, exerciseSlug };

  // --- Upload (unchanged endpoint/payload) ---
  async function upload() {
    err = ""; msg = "";
    if (!canSubmit) { err = "Please fill required fields."; return; }

    uploading = true;
    try {
      const fd = new FormData();
      fd.append("tcode", path.tcode);
      fd.append("chapter", String(path.chapterNo));
      fd.append("exercise", path.exerciseSlug);

      if (status.trim())      fd.append("status", status.trim());
      if (tagsCsv.trim())     fd.append("tags", tagsCsv.trim());
      if (description.trim()) fd.append("description", description.trim());

      fd.append("file", file);
      fd.append("filename", filename || file.name.replace(/\.(html|htm)$/i, ""));

      const res  = await fetch("/admin/uploadNotes", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) err = data?.error ?? "Upload failed.";
      else { msg = `Uploaded ${data?.uploaded ?? 1} note.`; resetForm(); }
    } catch (e) {
      err = e?.message ?? "Network error.";
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

  <form class="form upload-form" on:submit|preventDefault={upload}>
    <!-- Path -->
    <fieldset class="block">
      <legend>Path</legend>
      <div class="form-grid">
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
      <button class="primary" type="submit" disabled={uploading || !canSubmit}>
        {uploading ? "Uploading…" : "Upload"}
      </button>
      <button type="button" class="btn" on:click={resetForm} disabled={uploading}>Clear</button>

      {#if msg}<div class="note ok">{msg}</div>{/if}
      {#if err}<div class="note err">{err}</div>{/if}
    </div>

    <p class="hint">Tip: Drag & drop a <code>.html</code> file anywhere inside the dashed area above.</p>
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

  /* Panel tone (forms.css provides the base look) */
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

  /* Grids */
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

  /* Actions/messages (buttons base from forms.css) */
  .actions { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }

  .note { padding: .45rem .6rem; border-radius: .5rem; font-size: .9rem; border: 1px solid transparent; }
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
