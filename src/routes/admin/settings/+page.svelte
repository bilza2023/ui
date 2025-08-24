<!-- src/routes/admin/settings/+page.svelte -->
<script>
  import Nav from "$lib/appComps/Nav.svelte";
  import AdminNav from "$lib/AdminNav.svelte";

  export let form; // SvelteKit form action status (optional if you use enhance)

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

<style>
  .main-section {
  min-height: auto;
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
