<!-- src/routes/admin/settings/+page.svelte -->
<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/components/AdminNav.svelte";
  
  import MediaUploadButton from '$lib/components/MediaUploadButton.svelte';
  import SoundUploadButton from '$lib/components/SoundUploadButton.svelte';
  import DownloadTcodeForm from './DownloadTcodeForm.svelte';
  import UploadTcodeForm from './UploadTcodeForm.svelte';

  export let form;
  export let data;
  const { tcodes } = data;

  function handleDone(e) {
    const { ok, results, error } = e.detail;
    // show toast / console
    console.log('upload:', ok, results ?? error);
  }
  // Optional: hardcode the same list here to match server allow‑list
  const KEYS = [
    { value: "index_data", label: "Home: Videos Index (index_data)" },
    { value: "blog_index", label: "Home: Blog Index (blog_index)" }
  ];
</script>

<Nav />
<AdminNav />
<h1 style="margin-left: 10%;">Settings</h1>

<form method="post" enctype="multipart/form-data">
  <fieldset>
    <legend>Upload Home Index JSON</legend>

    <label for="target_key">Target collection</label>
    <select id="target_key" name="target_key" required>
      {#each KEYS as k}
        <option value={k.value}>{k.label}</option>
      {/each}
    </select>

    <label for="index_json" style="display:block;margin-top:0.5rem">JSON file</label>
    <input id="index_json" name="index_json" type="file" accept=".json,application/json" required />

    <div style="margin-top:1rem">
      <button type="submit">Upload</button>
    </div>

    {#if form?.error}
      <p style="color:var(--danger, #e66);margin-top:0.75rem">
        {form.error}
      </p>
    {/if}

    {#if form?.ok}
      <p style="color:var(--success, #6c6);margin-top:0.75rem">
        Saved <strong>{form.key}</strong> with {form.count} items.
      </p>
    {/if}
  </fieldset>
</form>



<div class="media_div">
  <h2>Upload Media</h2>
  
  <MediaUploadButton
    label="Upload Images"
    target="images"
    accept="image/*"
    multiple
    on:done={handleDone}
  />

  <br>
  <hr>
  <br>

  <SoundUploadButton
    label="Upload Sounds"
    target="sounds"
    accept=".mp3,.wav,.ogg,.opus"
    multiple
    on:done={handleDone}
  />


<section id="synopsis-snapshots" class="snapshots space-y-4" role="region" aria-labelledby="synopsis-snapshots-title">
  <header class="space-y-1">
    <h2 id="synopsis-snapshots-title" class="text-xl font-semibold">Synopsis Snapshots</h2>
    <p class="text-sm opacity-80">Download or upload a single tcode JSON (shape identical to getNested()).</p>
  </header>

  <!-- FLEX layout, same as before -->
  <div class="snapshots__row flex flex-col gap-4 md:flex-row md:items-start">
    <div class="snapshots__card card flex-1 min-w-[280px] p-4 rounded-xl border border-white/10 bg-white/5">
      <h3 class="snapshots__title font-medium mb-2">Download tcode</h3>
      <div class="snapshots__form">
        <DownloadTcodeForm {tcodes} />
      </div>
      <p class="snapshots__hint mt-2 text-xs opacity-70">Generates <code>tcode_&lt;name&gt;.json</code>.</p>
    </div>

    <div class="snapshots__card card flex-1 min-w-[280px] p-4 rounded-xl border border-white/10 bg-white/5">
      <h3 class="snapshots__title font-medium mb-2">Upload tcode</h3>
      <div class="snapshots__form">
        <UploadTcodeForm />
      </div>
      <p class="snapshots__hint mt-2 text-xs opacity-70">Merges chapters/exercises by filename keys. No deletions.</p>
    </div>
  </div>

  {#if form?.action === 'importSynopsis'}
    {#if form?.ok}
      <div class="mt-3 rounded-md border border-green-700/60 bg-green-900/30 p-3 text-green-200 text-sm">
        Imported <strong>{form.tcode}</strong> — added {form.added.chapters} chapters, {form.added.exercises} exercises.
      </div>
    {:else}
      <div class="mt-3 rounded-md border border-red-700/60 bg-red-900/30 p-3 text-red-200 text-sm">
        {form?.message || 'Import failed'}{form?.code ? ` (${form.code})` : ''}
      </div>
    {/if}
  {/if}
</section>


</div>

<style>
    /* Card polish */
    .snapshots__card {
    backdrop-filter: saturate(120%) blur(6px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.25);
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
  }
  .snapshots__card:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.32);
    border-color: rgba(255,255,255,.14);
  }
  .snapshots__title { letter-spacing: .2px; }

  /* Form skin — scoped to this section, but reaches into child components */
  :global(#synopsis-snapshots .snapshots__form select),
  :global(#synopsis-snapshots .snapshots__form input[type="text"]),
  :global(#synopsis-snapshots .snapshots__form input[type="file"]) {
    height: 40px;
    padding: 0 12px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,.14);
    background: rgba(255,255,255,.06);
    color: inherit;
    outline: none;
    transition: border-color .12s ease, box-shadow .12s ease, background .12s ease;
  }
  :global(#synopsis-snapshots .snapshots__form input[type="file"]) {
    padding: 6px 10px; /* file inputs render differently */
    height: 42px;
  }
  :global(#synopsis-snapshots .snapshots__form select:focus),
  :global(#synopsis-snapshots .snapshots__form input:focus) {
    border-color: rgba(110, 231, 255, .7);
    box-shadow: 0 0 0 3px rgba(110, 231, 255, .18);
    background: rgba(255,255,255,.08);
  }

  /* Button skin (anchors + buttons) */
  :global(#synopsis-snapshots .snapshots__form .btn),
  :global(#synopsis-snapshots .snapshots__form .btn-primary),
  :global(#synopsis-snapshots .snapshots__form a.btn) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 14px;
    border-radius: 10px;
    font-weight: 600;
    letter-spacing: .2px;
    border: 1px solid rgba(255,255,255,.16);
    background: linear-gradient(to bottom, rgba(255,255,255,.09), rgba(255,255,255,.06));
    color: inherit;
    text-decoration: none;
    transition: transform .08s ease, box-shadow .12s ease, border-color .12s ease, background .12s ease;
  }
  :global(#synopsis-snapshots .snapshots__form .btn:hover),
  :global(#synopsis-snapshots .snapshots__form .btn-primary:hover),
  :global(#synopsis-snapshots .snapshots__form a.btn:hover) {
    transform: translateY(-0.5px);
    border-color: rgba(255,255,255,.24);
    box-shadow: 0 6px 16px rgba(0,0,0,.28);
  }
  :global(#synopsis-snapshots .snapshots__form .btn-primary) {
    background: linear-gradient(to bottom, rgba(99,102,241,.7), rgba(99,102,241,.55));
    border-color: rgba(99,102,241,.7);
  }
  :global(#synopsis-snapshots .snapshots__form .btn-primary:hover) {
    border-color: rgba(99,102,241,.9);
    box-shadow: 0 6px 18px rgba(99,102,241,.35);
  }

  /* Tiny hint text spacing */
  .snapshots__hint code {
    padding: 1px 6px;
    border-radius: 8px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.12);
  }

  /* Tighten inner row spacing inside the embedded forms */
  :global(#synopsis-snapshots .snapshots__form .flex) { gap: 10px; }
  :global(#synopsis-snapshots .snapshots__form .flex > .flex) { gap: 6px; }
  .main-section {
  min-height: auto;
}
.media_div {
  margin-left: 10%;
}
form {
    margin-left: 10%;
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    border-radius: 12px;
    padding: clamp(12px, 2vw, 20px);
    max-width: 640px;
    
  }
  fieldset { border: 0; padding: 0; }
  label { display: block; margin-top: .5rem; font-weight: 600; }
  select, input[type="file"], button {
    margin-top: .25rem;
  }
</style>
