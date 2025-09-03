<script>
  import FormUi from '$lib/formUi/FormUi.svelte';
 import Nav from "../../../../lib/appComps/Nav.svelte";
  // Provided by +page.server.js
  export let data;

  // Working copies kept in sync by the success handlers
  let tcodes = Array.isArray(data?.tcodes) ? structuredClone(data.tcodes) : [];
  let chaptersByTcode = data?.chaptersByTcode ? structuredClone(data.chaptersByTcode) : {};

  const chaptersOf = (slug) =>
    Array.isArray(chaptersByTcode?.[slug]) ? chaptersByTcode[slug] : [];

  const findChapter = (tcode, chapterSlug) =>
    chaptersOf(tcode).find((c) => c.slug === chapterSlug);

  // ---------------------------
  // Form configs (config-driven)
  // ---------------------------

  // A) Add Chapter
  let addConfig = {
    id: 'addChapter',
    title: 'Add Chapter',
    action: '?/addChapter',
    layout: 'stack',
    labelPosition: 'top',
    initial: {
      tcode: tcodes[0]?.slug ?? '',
      name: '',
      sortOrder: ''
    },
    items: [
      {
        type: 'select',
        name: 'tcode',
        label: 'Tcode',
        required: true,
        options: () => tcodes.map((t) => ({ value: t.slug, label: `${t.name} (${t.slug})` }))
      },
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        required: true,
        placeholder: 'e.g., Ch-01 Physical Quantities and Measurement',
        hint: 'Slug is auto-generated and immutable.'
      },
      {
        type: 'number',
        name: 'sortOrder',
        label: 'Sort order',
        step: 1,
        placeholder: '0'
      }
    ],
    submit: {
      label: 'Add',
      disabledWhen: (v) => !v.tcode || !v.name?.trim()
    },
    clearOnSuccess: true,
    showErrorsList: true
  };

  // B) Rename Chapter (name only)
  let renameConfig = {
    id: 'renameChapter',
    title: 'Rename Chapter',
    action: '?/renameChapter',
    layout: 'stack',
    labelPosition: 'top',
    initial: {
      tcode: tcodes[0]?.slug ?? '',
      chapter: chaptersOf(tcodes[0]?.slug ?? '')[0]?.slug ?? '',
      name: ''
    },
    items: [
      {
        type: 'select',
        name: 'tcode',
        label: 'Tcode',
        required: true,
        options: () => tcodes.map((t) => ({ value: t.slug, label: `${t.name} (${t.slug})` }))
      },
      {
        type: 'select',
        name: 'chapter',
        label: 'Chapter',
        required: true,
        options: (v) =>
          chaptersOf(v.tcode).map((c) => ({ value: c.slug, label: `${c.name} (${c.slug})` }))
      },
      {
        type: 'text',
        name: 'name',
        label: 'New name',
        required: true,
        placeholder: 'New chapter title'
      }
    ],
    submit: {
      label: 'Rename',
      disabledWhen: (v) => !v.tcode || !v.chapter || !v.name?.trim()
    },
    showErrorsList: true
  };

  // C) Delete Chapter (guarded when exercises exist)
  const deleteDisabledWhen = (v) => {
    const c = findChapter(v.tcode, v.chapter);
    return !v.tcode || !v.chapter || (c && Number(c.exerciseCount) > 0);
  };

  let deleteConfig = {
    id: 'deleteChapter',
    title: 'Delete Chapter',
    action: '?/deleteChapter',
    layout: 'stack',
    labelPosition: 'top',
    initial: {
      tcode: tcodes[0]?.slug ?? '',
      chapter: chaptersOf(tcodes[0]?.slug ?? '')[0]?.slug ?? ''
    },
    items: [
      {
        type: 'select',
        name: 'tcode',
        label: 'Tcode',
        required: true,
        options: () => tcodes.map((t) => ({ value: t.slug, label: `${t.name} (${t.slug})` }))
      },
      {
        type: 'select',
        name: 'chapter',
        label: 'Chapter',
        required: true,
        options: (v) =>
          chaptersOf(v.tcode).map((c) => ({
            value: c.slug,
            label: `${c.name} (${c.slug})${c.exerciseCount > 0 ? ' — has exercises' : ''}`,
            disabled: c.exerciseCount > 0
          }))
      },
      { type: 'note', text: 'Chapters with exercises cannot be deleted.' }
    ],
    submit: {
      label: 'Delete',
      disabledWhen: deleteDisabledWhen
    },
    showErrorsList: true
  };

  // ---------------------------
  // Success handlers
  // ---------------------------

  function handleAddSuccess(ev) {
    const { tcodeSlug, chapter } = ev.detail || {};
    if (!tcodeSlug || !chapter) return;

    const list = chaptersOf(tcodeSlug);
    if (!list.find((x) => x.slug === chapter.slug)) {
      chaptersByTcode[tcodeSlug] = [...list, chapter].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
      );
    }

    // Preselect the new item in the other forms
    renameConfig = {
      ...renameConfig,
      initial: { ...renameConfig.initial, tcode: tcodeSlug, chapter: chapter.slug, name: '' }
    };
    deleteConfig = {
      ...deleteConfig,
      initial: { ...deleteConfig.initial, tcode: tcodeSlug, chapter: chapter.slug }
    };
  }

  function handleRenameSuccess(ev) {
    const { tcodeSlug, chapterSlug, name } = ev.detail || {};
    const row = findChapter(tcodeSlug, chapterSlug);
    if (row) row.name = name;
  }

  function handleDeleteSuccess(ev) {
    const { tcodeSlug, chapterSlug } = ev.detail || {};
    if (!tcodeSlug || !chapterSlug) return;

    chaptersByTcode[tcodeSlug] = chaptersOf(tcodeSlug).filter((c) => c.slug !== chapterSlug);

    // Reset selections on the other forms to the first remaining chapter
    const first = chaptersOf(tcodeSlug)[0];
    renameConfig = {
      ...renameConfig,
      initial: { ...renameConfig.initial, tcode: tcodeSlug, chapter: first?.slug ?? '', name: '' }
    };
    deleteConfig = {
      ...deleteConfig,
      initial: { ...deleteConfig.initial, tcode: tcodeSlug, chapter: first?.slug ?? '' }
    };
  }
</script>


<Nav />


<div class="wrap">
  <div class="grid">
    <FormUi config={addConfig}    on:success={handleAddSuccess} />
    <FormUi config={renameConfig} on:success={handleRenameSuccess} />
    <FormUi config={deleteConfig} on:success={handleDeleteSuccess} />
  </div>

  <!-- Context panel: show chapters for the currently selected tcode in the rename form -->
  <section class="panel">
    <h3>
      Chapters — {
        tcodes.find(t => t.slug === (renameConfig.initial.tcode || tcodes[0]?.slug))?.name
        ?? renameConfig.initial.tcode
        ?? '—'
      }
    </h3>

    {#if tcodes.length === 0}
      <div class="meta">No tcodes found. Create a tcode first.</div>
    {:else}
      {#each chaptersOf(renameConfig.initial.tcode || tcodes[0].slug) as c}
        <div class="item">
          <div>{c.name}</div>
          <div class="meta">{c.slug} · sort {c.sortOrder} · {c.exerciseCount} exercises</div>
        </div>
      {/each}
    {/if}
  </section>
</div>


<style>
  .wrap {
    max-width: 980px;
    margin: 2rem auto;
    display: grid;
    gap: 2rem;
  }
  .grid {
    display: grid;
    gap: 1.5rem;
  }
  @media (min-width: 1000px) {
    .grid { grid-template-columns: 1fr 1fr 1fr; }
  }

  .panel {
    background: #0b1220;
    border: 1px solid #172036;
    border-radius: 14px;
    padding: 1rem;
  }
  .panel h3 { margin: 0 0 .5rem 0; color: #cbd5e1; }
  .item {
    display: flex; justify-content: space-between; align-items: center;
    padding: .45rem 0; border-bottom: 1px dashed #1f2937;
    color: #e5e7eb;
  }
  .item:last-child { border-bottom: 0; }
  .meta { font-size: .85rem; color: #94a3b8; }
</style>
