<script>
  // path
  let tcode = '';
  let chapter = '';
  let exercise = '';

  // meta
  let status = '';
  let tagsCsv = '';
  let description = '';

  // payload (single file)
  let file = /** @type {File|null} */(null);
  let filename = ''; // derived from file name (no extension)
  let fileEl;        // ref to clear input

  // ui
  let uploading = false;
  let msg = '';
  let err = '';

  $: canSubmit =
    tcode.trim() &&
    chapter.toString().trim() &&
    !Number.isNaN(parseInt(chapter, 10)) &&
    exercise.trim() &&
    !!file;

  function resetForm() {
    tcode = ''; chapter = ''; exercise = '';
    status = ''; tagsCsv = ''; description = '';
    file = null; filename = '';
    if (fileEl) fileEl.value = '';
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
  }
  function onDragOver(e) { e.preventDefault(); }

  async function upload() {
    err = ''; msg = '';
    if (!canSubmit) { err = 'Please fill required fields.'; return; }

    uploading = true;
    try {
      const fd = new FormData();
      fd.append('tcode', tcode.trim());
      fd.append('chapter', chapter.toString().trim());
      fd.append('exercise', exercise.trim());
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
    } finally { uploading = false; }
  }
</script>

<section class="page dark">
  <header class="header">
    <div class="container">
      <div class="title">
        <h1>Upload Note</h1>
        <p>Send a <code>.html</code> note into <code>Question</code> (type=<strong>note</strong>).</p>
      </div>
      <button type="button" class="btn btn-primary" on:click={upload} disabled={uploading || !canSubmit}>
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
    </div>
  </header>

  <div class="toolbar">
    <div class="container toolbar-inner">
      <div class="summary">
        <span class="chip">Tcode: <strong>{tcode || '—'}</strong></span>
        <span class="sep">•</span>
        <span class="chip">Chapter: <strong>{chapter || '—'}</strong></span>
        <span class="sep">•</span>
        <span class="chip">Exercise: <strong>{exercise || '—'}</strong></span>
        <span class="sep">•</span>
        <span class="chip">File: <strong>{file ? file.name : '—'}</strong></span>
      </div>
      <button type="button" class="btn btn-primary" on:click={upload} disabled={uploading || !canSubmit}>
        {uploading ? 'Uploading…' : 'Upload'}
      </button>
    </div>
  </div>

  <main class="container">
    <div class="panel">
      <form class="form" on:submit|preventDefault={upload}>
        <div class="group">
          <h2 class="group-title">Path</h2>
          <div class="grid-3">
            <div class="row">
              <label for="tcode">Tcode<span class="req">*</span></label>
              <input id="tcode" bind:value={tcode} placeholder="fbise9mathold" required />
            </div>
            <div class="row">
              <label for="chapter">Chapter<span class="req">*</span></label>
              <input id="chapter" type="number" min="1" step="1" bind:value={chapter} required />
            </div>
            <div class="row">
              <label for="exercise">Exercise<span class="req">*</span></label>
              <input id="exercise" bind:value={exercise} placeholder="Theorems" required />
            </div>
          </div>
        </div>

        <div class="group">
          <h2 class="group-title">Metadata</h2>
          <div class="grid-3">
            <div class="row">
              <label for="status">Status</label>
              <input id="status" bind:value={status} placeholder="ready | draft | hidden" />
            </div>
            <div class="row">
              <label for="tags">Tags (CSV)</label>
              <input id="tags" bind:value={tagsCsv} placeholder="geometry, class9" />
            </div>
            <div class="row wide">
              <label for="description">Description</label>
              <textarea id="description" rows="2" bind:value={description}></textarea>
            </div>
          </div>
        </div>

        <div class="group">
          <h2 class="group-title">Note File</h2>
          <div class="row">
            <label for="file">Choose file</label>
            <input bind:this={fileEl} id="file" type="file" accept=".html,.htm" on:change={onPick} />
            <div class="drop" on:drop={onDrop} on:dragover={onDragOver}>
              Drop a .html file here or click above.
            </div>
          </div>
          <div class="row">
            <label for="filename">Filename (auto)</label>
            <input id="filename" value={filename} readonly />
            <small class="hint">Derived from the chosen file (without .html/.htm)</small>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-primary" type="submit" disabled={uploading || !canSubmit}>
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          <button type="button" class="btn" on:click={resetForm} disabled={uploading}>Clear</button>
        </div>

        {#if msg}<p class="toast ok">{msg}</p>{/if}
        {#if err}<p class="toast err">{err}</p>{/if}
      </form>
    </div>
  </main>
</section>

<style>
  .dark{--bg:#0b0b0b;--bg-soft:#101010;--panel:#121212;--panel-2:#161616;--text:#eaeaea;--muted:#a9a9a9;--border:#252525;--accent:#2aa96b;--accent-2:#1f7f50}
  .dark{color:var(--text);background:radial-gradient(1200px 600px at 10% -10%,#121212 0,transparent 60%),radial-gradient(800px 500px at 90% -20%,#101010 0,transparent 60%),var(--bg);min-height:100vh}
  .container{max-width:1040px;margin:0 auto;padding:0 16px}
  .header{padding:18px 0 8px;border-bottom:1px solid var(--border);background:linear-gradient(#0b0b0b,rgba(11,11,11,.85))}
  .header .container{display:flex;align-items:center;justify-content:space-between;gap:16px}
  .title h1{margin:0;font-size:22px}.title p{margin:4px 0 0;color:var(--muted);font-size:14px}
  .toolbar{position:sticky;top:0;z-index:10;border-bottom:1px solid var(--border);background:linear-gradient(#0b0b0b,rgba(11,11,11,.92));backdrop-filter:blur(4px)}
  .toolbar-inner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 0}
  .summary{display:flex;align-items:center;gap:10px;flex-wrap:wrap;color:var(--muted)}
  .chip{background:var(--panel-2);border:1px solid var(--border);padding:4px 8px;border-radius:999px}.sep{color:#555}
  main.container{padding:20px 16px 40px}
  .panel{background:var(--panel);border:1px solid var(--border);border-radius:16px;box-shadow:0 2px 30px rgba(0,0,0,.35);padding:18px}
  .form{display:grid;gap:24px}.group{display:grid;gap:14px}
  .group-title{margin:0;font-size:14px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);padding-left:6px}
  .grid-3{display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
  @media (max-width:900px){.grid-3{grid-template-columns:1fr}}
  .row{display:grid;gap:8px}label{font-weight:600;font-size:14px}.req{color:#e33;margin-left:4px}
  input,textarea,select{padding:10px 12px;border:1px solid var(--border);border-radius:12px;background:var(--bg-soft);color:var(--text);outline:none}
  input::placeholder,textarea::placeholder{color:#6f6f6f}
  input:focus,textarea:focus,select:focus{border-color:#2c2c2c;box-shadow:0 0 0 3px rgba(42,169,107,.15)}
  .hint{color:var(--muted);font-size:12px}
  .drop{border:1px dashed #3a3a3a;border-radius:12px;padding:18px;text-align:center;background:#121212;color:var(--muted)}
  .actions{display:flex;gap:12px;align-items:center}
  .btn{background:var(--panel-2);color:var(--text);border:1px solid var(--border);padding:10px 14px;border-radius:12px;cursor:pointer}
  .btn-primary{background:var(--accent);border-color:var(--accent-2);color:#fff}
  .btn[disabled]{opacity:.55;cursor:default}
  .toast{margin:6px 0 0;padding:10px 12px;border-radius:10px;border:1px solid var(--border)}
  .toast.ok{color:#d6ffe7;background:rgba(92,207,133,.08);border-color:rgba(92,207,133,.3)}
  .toast.err{color:#ffd6d6;background:rgba(255,110,110,.08);border-color:rgba(255,110,110,.3)}
</style>
