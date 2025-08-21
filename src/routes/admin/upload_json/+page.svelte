<script>
  let tcode = '';
  let chapter = '';
  let exercise = '';

  let file = null;
  let filename = '';
  let description = '';
  let tagsCsv = '';
  let status = '';

  let loading = false;
  let msg = '';
  let err = '';

  const STATUS = ['draft', 'ready', 'published', 'archived'];

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
    const f = e.dataTransfer?.files?.[0] ?? null;
    file = f;
    filename = f ? toSafeName(f.name) : '';
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function upload() {
    err = '';
    msg = '';

    if (!file) { err = 'Pick a .json file.'; return; }
    if (!/\.json$/i.test(file.name)) { err = 'Only .json files allowed.'; return; }
    if (!tcode || !chapter || !exercise) { err = 'tcode, chapter, exercise are required.'; return; }

    loading = true;
    try {
      const fd = new FormData();
      fd.append('tcode', tcode.trim());
      fd.append('chapter', String(parseInt(chapter, 10)));
      fd.append('exercise', exercise.trim());
      fd.append('file', file);
      fd.append('filename', toSafeName(filename || file.name));
      if (description) fd.append('description', description);
      if (tagsCsv) fd.append('tags', tagsCsv);
      if (status) fd.append('status', status);

      const res = await fetch('/admin/upload_json', { method: 'POST', body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || 'Upload failed');
      msg = `Uploaded ✓ (${data.filename})`;
      // reset only file fields; keep path fields
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

<h1 class="text-xl mb-4">Upload JSON (lean)</h1>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="space-y-4" on:drop={onDrop} on:dragover={onDragOver}>
  <div class="grid gap-3 md:grid-cols-3">
    <div>
      <label for="tcode">tcode</label>
      <input id="tcode" bind:value={tcode} placeholder="e.g. fbise9math" />
    </div>
    <div>
      <label for="chapter">chapter</label>
      <input id="chapter" bind:value={chapter} inputmode="numeric" placeholder="e.g. 11" />
    </div>
    <div>
      <label for="exercise">exercise</label>
      <input id="exercise" bind:value={exercise} placeholder="e.g. 1.1" />
    </div>
  </div>

  <div class="grid gap-3 md:grid-cols-3">
    <div>
      <label for="file">.json file</label>
      <input id="file" type="file" accept="application/json,.json" on:change={pickFile} />
    </div>
    <div>
      <label for="filename">filename (auto)</label>
      <input id="filename" bind:value={filename} placeholder="auto from file" />
    </div>
    <div>
      <label for="status">status</label>
      <select id="status" bind:value={status}>
        <option value="">(auto)</option>
        {#each STATUS as s}<option value={s}>{s}</option>{/each}
      </select>
    </div>
  </div>

  <div class="grid gap-3 md:grid-cols-2">
    <div>
      <label for="description">description</label>
      <input id="description" bind:value={description} placeholder="optional" />
    </div>
    <div>
      <label for="tags">tags (csv)</label>
      <input id="tags" bind:value={tagsCsv} placeholder="algebra, basics" />
    </div>
  </div>

  <div class="flex items-center gap-3">
    <button on:click|preventDefault={upload} disabled={loading}>
      {loading ? 'Uploading…' : 'Upload JSON'}
    </button>
    {#if msg}<span class="text-green-400">{msg}</span>{/if}
    {#if err}<span class="text-red-400">{err}</span>{/if}
  </div>

  <p class="text-xs opacity-70">Tip: You can also drag & drop a .json file anywhere on this form.</p>
</div>

<style>
  label { display:block; margin-bottom: 0.25rem; opacity:.8 }
  input, select { width:100%; padding:.5rem .6rem; border:1px solid #333; border-radius:.5rem; background:transparent }
  button { padding:.55rem .9rem; border:1px solid #444; border-radius:.6rem; }
  .space-y-4 > * + * { margin-top:1rem }
  .grid { display:grid }
</style>
