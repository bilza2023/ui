<script>
  import { enhance } from '$app/forms';
  export let data;

  // Working copies used by the UI (kept in sync after actions)
  let tcodes = Array.isArray(data?.tcodes) ? structuredClone(data.tcodes) : [];
  let chaptersByTcode = data?.chaptersByTcode ? structuredClone(data.chaptersByTcode) : {};

  // Selections
  let add_tcode     = tcodes[0]?.slug ?? '';
  let rename_tcode  = tcodes[0]?.slug ?? '';
  let delete_tcode  = tcodes[0]?.slug ?? '';

  let rename_chapter = (chaptersByTcode[rename_tcode]?.[0]?.slug) ?? '';
  let delete_chapter = (chaptersByTcode[delete_tcode]?.[0]?.slug) ?? '';

  // Per-form states (sticky)
  let addForm = null;
  let renameForm = null;
  let deleteForm = null;

  // Helpers
  const chaptersOf = (slug) => Array.isArray(chaptersByTcode?.[slug]) ? chaptersByTcode[slug] : [];
  const findChapter = (tcode, chapterSlug) => chaptersOf(tcode).find(c => c.slug === chapterSlug);
  const canDelete = (tcode, chapterSlug) => {
    const c = findChapter(tcode, chapterSlug);
    return c ? Number(c.exerciseCount) === 0 : false;
  };

  // When tcode changes, reset dependent chapter selections
  $: rename_chapter = (chaptersOf(rename_tcode)[0]?.slug) ?? '';
  $: delete_chapter = (chaptersOf(delete_tcode)[0]?.slug) ?? '';

  // Enhance handlers
  const onEnhanceAdd = () => ({ result }) => {
    if (result.type === 'failure') {
      addForm = result.data;
      return;
    }
    addForm = result.data;
    const tcodeSlug = result.data?.tcodeSlug;
    const chapter = result.data?.chapter;
    if (tcodeSlug && chapter) {
      const list = chaptersOf(tcodeSlug);
      if (!list.find(x => x.slug === chapter.slug)) {
        chaptersByTcode[tcodeSlug] = [...list, chapter]
          .sort((a,b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
      }
      // QoL: set pickers to the newly added
      rename_tcode = tcodeSlug;
      delete_tcode = tcodeSlug;
      rename_chapter = chapter.slug;
      delete_chapter = chapter.slug;
    }
    // clear sticky inputs
    addForm.values = { tcode: add_tcode, name: '', sortOrder: '' };
  };

  const onEnhanceRename = () => ({ result }) => {
    if (result.type === 'failure') {
      renameForm = result.data;
      return;
    }
    renameForm = result.data;
    const tcodeSlug = result.data?.tcodeSlug;
    const chapterSlug = result.data?.chapterSlug;
    const name = result.data?.name;
    const row = findChapter(tcodeSlug, chapterSlug);
    if (row) row.name = name;
  };

  const onEnhanceDelete = () => ({ result }) => {
    if (result.type === 'failure') {
      deleteForm = result.data;
      return;
    }
    deleteForm = result.data;
    const tcodeSlug = result.data?.tcodeSlug;
    const chapterSlug = result.data?.chapterSlug;
    if (tcodeSlug && chapterSlug) {
      chaptersByTcode[tcodeSlug] = chaptersOf(tcodeSlug).filter(c => c.slug !== chapterSlug);
      if (rename_tcode === tcodeSlug && rename_chapter === chapterSlug) {
        rename_chapter = chaptersOf(tcodeSlug)[0]?.slug ?? '';
      }
      if (delete_tcode === tcodeSlug && delete_chapter === chapterSlug) {
        delete_chapter = chaptersOf(tcodeSlug)[0]?.slug ?? '';
      }
    }
  };
</script>

<style>
  .wrap {
    max-width: 980px;
    margin: 2rem auto;
    display: grid;
    gap: 2rem;
  }
  .row {
    display: grid;
    gap: 1.5rem;
  }
  @media (min-width: 1000px) {
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

  input, select {
    width: 100%;
    padding: .6rem .8rem;
    background: #0b1220; /* near-black */
    color: #f9fafb;
    border: 1px solid #253046;
    border-radius: 10px;
  }
  input:focus, select:focus {
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

  .panel {
    background: #0b1220;
    border: 1px solid #172036;
    border-radius: 14px;
    padding: 1rem;
  }
  .panel h3 { margin: 0 0 .5rem 0; color: #cbd5e1; }
  .item {
    display: grid; grid-template-columns: 1fr auto;
    gap: .5rem;
    padding: .5rem .25rem; border-bottom: 1px dashed #1f2937;
    color: #e5e7eb;
  }
  .item:last-child { border-bottom: 0; }
  .meta { font-size: .85rem; color: #94a3b8; }
</style>

<div class="wrap">
  <div class="row">
    <!-- Add Chapter -->
    <section class="card">
      <h2>Add Chapter</h2>

      {#if addForm?.message}
        <div class={addForm.ok ? 'ok' : 'warn'}>{addForm.message}</div>
      {/if}

      <form method="post" action="?/addChapter" use:enhance={onEnhanceAdd}>
        <div>
          <label for="add_tcode">Tcode</label>
          <select id="add_tcode" name="tcode" bind:value={add_tcode}>
            {#each tcodes as t}
              <option value={t.slug}>{t.name} ({t.slug})</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="add_name">Name</label>
          <input id="add_name" name="name" placeholder="e.g., Ch-01 Physical Quantities and Measurement"
                 value={addForm?.values?.name ?? ''} />
          <div class="hint">Slug is auto-generated and immutable.</div>
        </div>

        <div>
          <label for="add_sort">Sort order (optional)</label>
          <input id="add_sort" name="sortOrder" inputmode="numeric" pattern="[0-9]*"
                 value={addForm?.values?.sortOrder ?? ''} />
        </div>

        <button class="btn" type="submit" disabled={!add_tcode}>Add</button>
      </form>
    </section>

    <!-- Rename Chapter (name-only) -->
    <section class="card">
      <h2>Rename Chapter</h2>

      {#if renameForm?.message}
        <div class={renameForm.ok ? 'ok' : 'warn'}>{renameForm.message}</div>
      {/if}

      <form method="post" action="?/renameChapter" use:enhance={onEnhanceRename}>
        <div>
          <label for="rename_tcode">Tcode</label>
          <select id="rename_tcode" name="tcode" bind:value={rename_tcode}>
            {#each tcodes as t}
              <option value={t.slug}>{t.name} ({t.slug})</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="rename_chapter">Chapter</label>
          <select id="rename_chapter" name="chapter" bind:value={rename_chapter}>
            {#each chaptersOf(rename_tcode) as c}
              <option value={c.slug}>{c.name} ({c.slug})</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="rename_name">New name</label>
          <input id="rename_name" name="name" placeholder="New chapter title"
                 value={renameForm?.values?.name ?? ''} />
        </div>

        <button class="btn" type="submit" disabled={!rename_tcode || !rename_chapter}>Rename</button>
      </form>
    </section>

    <!-- Delete Chapter (blocked if exercises exist) -->
    <section class="card">
      <h2>Delete Chapter</h2>

      {#if deleteForm?.message}
        <div class={deleteForm.ok ? 'ok' : 'warn'}>{deleteForm.message}</div>
      {/if}

      <form method="post" action="?/deleteChapter" use:enhance={onEnhanceDelete}>
        <div>
          <label for="delete_tcode">Tcode</label>
          <select id="delete_tcode" name="tcode" bind:value={delete_tcode}>
            {#each tcodes as t}
              <option value={t.slug}>{t.name} ({t.slug})</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="delete_chapter">Chapter</label>
          <select id="delete_chapter" name="chapter" bind:value={delete_chapter}>
            {#each chaptersOf(delete_tcode) as c}
              <option value={c.slug}>
                {c.name} ({c.slug}){c.exerciseCount > 0 ? ' — has exercises' : ''}
              </option>
            {/each}
          </select>
          {#if findChapter(delete_tcode, delete_chapter)?.exerciseCount > 0}
            <div class="warn" style="margin-top:.5rem;">
              This chapter has exercises; delete or move them first.
            </div>
          {/if}
        </div>

        <button class="btn" type="submit" disabled={!delete_tcode || !delete_chapter || !canDelete(delete_tcode, delete_chapter)}>
          Delete
        </button>
      </form>
    </section>
  </div>

  <!-- Context panel: chapters of the currently selected tcode -->
  <section class="panel">
    <h3>Chapters — {tcodes.find(t => t.slug === rename_tcode)?.name ?? rename_tcode}</h3>
    {#if chaptersOf(rename_tcode).length === 0}
      <div class="hint">No chapters yet.</div>
    {:else}
      {#each chaptersOf(rename_tcode) as c}
        <div class="item">
          <div>
            <div>{c.name}</div>
            <div class="meta">{c.slug} · sort {c.sortOrder} · {c.exerciseCount} exercises</div>
          </div>
        </div>
      {/each}
    {/if}
  </section>
</div>
