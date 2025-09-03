
<script>
  import { enhance } from '$app/forms';
  export let data;

  // Local working copy to keep dropdowns and UI in sync after actions
  let tcodes = Array.isArray(data?.tcodes) ? structuredClone(data.tcodes) : [];

  // Per-form state (sticky values + messages)
  let addForm = null;
  let renameForm = null;
  let deleteForm = null;

  // Dropdown selections
  let renameSlug = tcodes[0]?.slug ?? '';
  let deleteSlug = tcodes[0]?.slug ?? '';

  // Helpers
  const bySlug = (slug) => tcodes.find(t => t.slug === slug);
  const canDelete = (slug) => {
    const t = bySlug(slug);
    return t ? (Number(t.chapterCount) === 0) : false;
  };

  // Enhance handlers (one per form, so each keeps its own sticky state)
  const onEnhanceAdd = () => ({ result }) => {
    if (result.type === 'failure') {
      addForm = result.data;
      return;
    }
    // success
    addForm = result.data;
    const t = result.data?.tcode;
    if (t && !bySlug(t.slug)) {
      tcodes = [...tcodes, t];
      // preselect for convenience
      renameSlug = t.slug;
      deleteSlug = t.slug;
    }
    // clear sticky values after success
    addForm.values = { name: '', description: '', image: '' };
  };

  const onEnhanceRename = () => ({ result }) => {
    if (result.type === 'failure') {
      renameForm = result.data;
      return;
    }
    // success
    renameForm = result.data;
    const { slug, name } = result.data ?? {};
    const t = bySlug(slug);
    if (t) t.name = name;
  };

  const onEnhanceDelete = () => ({ result }) => {
    if (result.type === 'failure') {
      deleteForm = result.data;
      return;
    }
    // success
    deleteForm = result.data;
    const { slug } = result.data ?? {};
    tcodes = tcodes.filter(t => t.slug !== slug);

    // Reset selections if we removed the selected one
    if (renameSlug === slug) renameSlug = tcodes[0]?.slug ?? '';
    if (deleteSlug === slug) deleteSlug = tcodes[0]?.slug ?? '';
  };
</script>

<style>
  .wrap {
    max-width: 880px;
    margin: 2rem auto;
    display: grid;
    gap: 2rem;
  }
  .row {
    display: grid;
    gap: 1.5rem;
  }
  @media (min-width: 900px) {
    .row { grid-template-columns: 1fr 1fr 1fr; }
  }

  .card {
    background: #111827; /* slate-900 */
    border: 1px solid #1f2937; /* slate-800 */
    border-radius: 14px;
    padding: 1.25rem;
    display: grid;
    gap: 0.75rem;
    box-shadow: 0 2px 6px rgba(0,0,0,.25);
  }
  .card h2 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #e5e7eb; /* slate-200 */
    margin: 0 0 .25rem 0;
  }

  form { display: grid; gap: .75rem; }
  label { font-size: .9rem; color: #cbd5e1; } /* slate-300 */

  input, select, textarea {
    width: 100%;
    padding: .6rem .8rem;
    background: #0b1220; /* near-black */
    color: #f9fafb;
    border: 1px solid #253046;
    border-radius: 10px;
  }
  input:focus, select:focus, textarea:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 1px;
  }

  .hint { font-size: .8rem; color: #94a3b8; } /* slate-400 */
  .warn { font-size: .85rem; background: #3b1f1f; color: #fecaca; padding: .5rem .6rem; border-radius: 10px; }
  .ok   { font-size: .85rem; background: #073a30; color: #bff0e6; padding: .5rem .6rem; border-radius: 10px; }

  .btn {
    appearance: none;
    border: 0;
    border-radius: 10px;
    padding: .6rem .9rem;
    font-weight: 700;
    color: #0b1220;
    background: #60a5fa; /* blue-400 */
    cursor: pointer;
  }
  .btn:hover { background: #3b82f6; }
  .btn:disabled {
    opacity: .5;
    cursor: not-allowed;
  }

  .list {
    background: #0b1220;
    border: 1px solid #172036;
    border-radius: 14px;
    padding: 1rem;
  }
  .list h3 { margin: 0 0 .5rem 0; color: #cbd5e1; }
  .item {
    display: flex; justify-content: space-between; align-items: center;
    padding: .5rem .25rem; border-bottom: 1px dashed #1f2937;
    color: #e5e7eb;
  }
  .item:last-child { border-bottom: 0; }
  .count { font-size: .85rem; color: #94a3b8; }
</style>

<div class="wrap">
  <div class="row">
    <!-- Add Tcode -->
    <section class="card">
      <h2>Add Tcode</h2>

      {#if addForm?.message}
        <div class={addForm.ok ? 'ok' : 'warn'}>{addForm.message}</div>
      {/if}

      <form method="post" action="?/addTcode" use:enhance={onEnhanceAdd}>
        <div>
          <label for="add_name">Name</label>
          <input id="add_name" name="name" placeholder="e.g., FBISE Class 9 Physics"
                 value={addForm?.values?.name ?? ''} />
          <div class="hint">Slug will be generated automatically and never changes.</div>
        </div>

        <div>
          <label for="add_description">Description</label>
          <input id="add_description" name="description" placeholder="Optional"
                 value={addForm?.values?.description ?? ''} />
        </div>

        <div>
          <label for="add_image">Image URL</label>
          <input id="add_image" name="image" placeholder="/bookcovers/... or https://..."
                 value={addForm?.values?.image ?? ''} />
        </div>

        <button class="btn" type="submit">Add</button>
      </form>
    </section>

    <!-- Rename Tcode (name only) -->
    <section class="card">
      <h2>Rename Tcode</h2>

      {#if renameForm?.message}
        <div class={renameForm.ok ? 'ok' : 'warn'}>{renameForm.message}</div>
      {/if}

      <form method="post" action="?/renameTcode" use:enhance={onEnhanceRename}>
        <div>
          <label for="rename_slug">Choose</label>
          <select id="rename_slug" name="slug" bind:value={renameSlug}>
            {#each tcodes as t}
              <option value={t.slug}>{t.name} ({t.slug})</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="rename_name">New name</label>
          <input id="rename_name" name="name" placeholder="New display name"
                 value={renameForm?.values?.name ?? ''} />
        </div>

        <button class="btn" type="submit">Rename</button>
      </form>
    </section>

    <!-- Delete Tcode (blocked if chapters exist) -->
    <section class="card">
      <h2>Delete Tcode</h2>

      {#if deleteForm?.message}
        <div class={deleteForm.ok ? 'ok' : 'warn'}>{deleteForm.message}</div>
      {/if}

      <form method="post" action="?/deleteTcode" use:enhance={onEnhanceDelete}>
        <div>
          <label for="delete_slug">Choose</label>
          <select id="delete_slug" name="slug" bind:value={deleteSlug}>
            {#each tcodes as t}
              <option value={t.slug}>
                {t.name} ({t.slug}){t.chapterCount > 0 ? ' — has chapters' : ''}
              </option>
            {/each}
          </select>
          {#if bySlug(deleteSlug)?.chapterCount > 0}
            <div class="warn" style="margin-top:.5rem;">
              This tcode has chapters; delete or move them first.
            </div>
          {/if}
        </div>

        <button class="btn" type="submit" disabled={!canDelete(deleteSlug)}>Delete</button>
      </form>
    </section>
  </div>

  <!-- Optional: current list for context -->
  <section class="list">
    <h3>Subjects</h3>
    {#if tcodes.length === 0}
      <div class="hint">No tcodes yet.</div>
    {:else}
      {#each tcodes as t}
        <div class="item">
          <div>
            <div>{t.name}</div>
            <div class="count">{t.slug} · {t.chapterCount} chapters</div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</div>
