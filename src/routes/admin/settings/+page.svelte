<script>
    // @ts-nocheck
    import Nav from "$lib/appComps/Nav.svelte";
    import AdminNav from "$lib/AdminNav.svelte";
    export let form;
  </script>
  
  <Nav />
  <AdminNav />
  <h1>Settings</h1>
  
  <form method="POST" enctype="multipart/form-data">
    <label class="btn">
      Upload Index Data
      <input
        name="index_json"
        type="file"
        accept=".json,application/json"
        required
        hidden
        on:change={(e) => e.currentTarget.form?.requestSubmit()}
      />
    </label>
  </form>
  
  {#if form?.ok}
    <p>✅ Saved {form.count} items.</p>
  {:else if form?.error}
    <p style="color:#f66">❌ {form.error}</p>
  {/if}
  