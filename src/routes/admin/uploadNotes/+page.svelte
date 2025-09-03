<script>
  // Admin: Upload Notes (paste HTML)
  let tcode = '';
  let chapter = '';
  let exercise = '';
  let filename = '';
  let status = '';
  let description = '';
  let tags = ''; // comma-separated
  let noteText = '';

  let submitting = false;
  let result = null;

  async function submitForm(e) {
    e.preventDefault();
    submitting = true;
    result = null;

    const fd = new FormData();
    fd.set('tcode', (tcode ?? '').toString().trim());
    fd.set('chapter', (chapter ?? '').toString().trim());
    fd.set('exercise', (exercise ?? '').toString().trim());
    fd.set('filename', (filename ?? '').toString().trim());
    if (status) fd.set('status', status.toString().trim());
    if (description) fd.set('description', description.toString().trim());
    if (tags) fd.set('tags', tags.toString().trim());
    fd.set('noteText', (noteText ?? '').toString());

    try {
      const res = await fetch('/admin/uploadNotes', { method: 'POST', body: fd });
      const data = await res.json();
      result = { ok: res.ok, data };
      if (res.ok) {
        // Keep path/meta fields; clear the pasted note
        noteText = '';
      }
    } catch (err) {
      result = { ok: false, data: { error: err.message } };
    } finally {
      submitting = false;
    }
  }
</script>

<div class="wrap">
  <h1>Upload Note (Paste HTML)</h1>

  <form on:submit|preventDefault={submitForm} class="form">
    <div class="row">
      <label>Tcode</label>
      <input bind:value={tcode} placeholder="e.g. fbise9mathold" required />
    </div>

    <div class="row two">
      <div>
        <label>Chapter (number)</label>
        <input type="number" bind:value={chapter} placeholder="e.g. 11" required />
      </div>
      <div>
        <label>Exercise (slug)</label>
        <input bind:value={exercise} placeholder="e.g. theorems" required />
      </div>
    </div>

    <div class="row">
      <label>Filename (identity)</label>
      <input bind:value={filename} placeholder="unique id, no extension" required />
    </div>

    <div class="row two">
      <div>
        <label>Status (optional)</label>
        <input bind:value={status} placeholder="ready|draft|..." />
      </div>
      <div>
        <label>Tags (comma-sep, optional)</label>
        <input bind:value={tags} placeholder="algebra, ch11" />
      </div>
    </div>

    <div class="row">
      <label>Description (optional)</label>
      <input bind:value={description} placeholder="Short description" />
    </div>

    <div class="row">
      <label>Note HTML</label>
      <textarea
        bind:value={noteText}
        rows="16"
        spellcheck="false"
        placeholder="Paste HTML for the note here"
      ></textarea>
    </div>

    <div class="actions">
      <button class="primary" disabled={submitting}>Save</button>
    </div>

    {#if result}
      <p class:ok={result.ok} class:error={!result.ok}>
        {result.ok ? 'Saved ✅' : `Error: ${result.data?.error ?? 'Unknown'}`}
      </p>
    {/if}
  </form>
</div>

<style>
  /* token-only colors */
  :global(body){ background:var(--backgroundColor); color:var(--primaryText); }
  .wrap{ max-width:900px; margin:24px auto; padding:16px; }
  h1{ margin:0 0 16px; }

  .form{ display:flex; flex-direction:column; gap:14px; }
  .row{ display:flex; flex-direction:column; gap:6px; }
  .row.two{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }

  label{ color:var(--secondaryText); font-size:.95rem; }
  input, textarea{
    background:var(--surfaceColor);
    color:var(--primaryText);
    border:1px solid var(--borderColor);
    border-radius:10px;
    padding:10px 12px;
    font:inherit;
  }
  textarea{ font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }

  .actions{ display:flex; justify-content:flex-end; }
  .primary{
    background:var(--primaryColor);
    color:var(--backgroundColor);
    border:1px solid var(--primaryColor);
    padding:10px 14px;
    border-radius:10px;
    cursor:pointer;
  }
  .ok{ color:var(--secondaryColor); }
  .error{ color:var(--accentColor); }
</style>
