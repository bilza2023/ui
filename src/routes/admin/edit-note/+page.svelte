<!-- /src/routes/admin/edit-note/+page.svelte -->
<script>
  import '$lib/styles/tokens.css';
  import FormUi from '$lib/formUi/FormUi.svelte';

  export let data; // { slug, question, form:{ values, message? } }

  const q = data?.question || {};
  const slug = data?.slug || data?.form?.values?.slug || q.slug || '';

  const title = q?.name ? `Edit: ${q.name}` : 'Edit Note';

  const STATUS_OPTS = [
    { label: 'Draft',     value: 'draft' },
    { label: 'Ready',     value: 'ready' },
    { label: 'Published', value: 'published' },
    { label: 'Archived',  value: 'archived' }
  ];

  // FormUi config (wired to +page.server.js action "save")
  const editConfig = {
    id: 'edit-note',
    title: 'Edit Question',
    description: slug ? `Slug: ${slug}` : 'Missing ?slug=…',
    action: '?/save',
    layout: 'stack',
    labelPosition: 'top',
    initial: {
      slug,
      name:        data?.form?.values?.name        ?? q.name        ?? '',
      description: data?.form?.values?.description ?? q.description ?? '',
      status:      data?.form?.values?.status      ?? q.status      ?? 'draft',
      thumbnail:   data?.form?.values?.thumbnail   ?? q.thumbnail   ?? '',
      sortOrder:   data?.form?.values?.sortOrder   ?? q.sortOrder   ?? 0,
      timed:       data?.form?.values?.timed       ?? q.timed       ?? false,
      noteHtml:    data?.form?.values?.noteHtml    ?? q.note        ?? ''
    },
    items: [
      { type: 'hidden',   name: 'slug',       value: slug },
      { type: 'text',     name: 'name',       label: 'Name',        placeholder: 'Display name' },
      { type: 'textarea', name: 'description',label: 'Description', rows: 3, placeholder: 'Short summary (optional)' },
      { type: 'select',   name: 'status',     label: 'Status',      options: STATUS_OPTS },
      { type: 'text',     name: 'thumbnail',  label: 'Thumbnail URL', placeholder: '/media/images/taleem.webp' },
      { type: 'number',   name: 'sortOrder',  label: 'Sort order',  min: 0, step: 1 },
      { type: 'checkbox', name: 'timed',      label: 'Timed (has timings/audio)' },
      { type: 'textarea', name: 'noteHtml',   label: 'Note HTML',   rows: 18, placeholder: '<h2>…</h2><p>…</p>' }
    ],
    submit: {
      label: 'Save',
      disabledWhen: (v) => !v?.slug?.trim() || !v?.noteHtml?.trim()
    },
    clearOnSuccess: false,
    showErrorsList: true
  };

  let successMsg = '';

  function handleSuccess() {
    successMsg = 'Saved successfully.';
  }
  function handleFailure() {
    successMsg = '';
  }
</script>

<div class="wrap">
  <header class="pagehead">
    <h1 class="h">{title}</h1>
    {#if data?.form?.message}
      <div role="alert" class="alert error">{data.form.message}</div>
    {/if}
    {#if successMsg}
      <div role="status" class="alert success">{successMsg}</div>
    {/if}
  </header>

  <section class="panel">
    <FormUi config={editConfig} on:success={handleSuccess} on:failure={handleFailure} />
  </section>
</div>

<style>
  .wrap {
    width: 80%;
    max-width: 1100px;
    margin-inline: auto;
    padding: var(--space-6, 24px) var(--space-4, 16px);
  }
  .pagehead { margin-bottom: var(--space-4, 16px); }
  .h {
    font-size: var(--text-2xl, 1.5rem);
    line-height: 1.2;
    margin: 0 0 var(--space-2, 8px) 0;
  }
  .panel {
    background: var(--panel-bg, rgba(255,255,255,0.03));
    border: 1px solid var(--panel-border, rgba(255,255,255,0.08));
    border-radius: var(--radius-2xl, 16px);
    padding: var(--space-6, 24px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  }
  .alert {
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    font-size: var(--text-sm, 0.95rem);
    border: 1px solid transparent;
  }
  .alert.error {
    background: var(--red-900, #2a0f11);
    border-color: var(--red-700, #7a2d33);
    color: var(--red-100, #ffd6d9);
  }
  .alert.success {
    background: var(--green-900, #112a19);
    border-color: var(--green-700, #2d7a4a);
    color: var(--green-100, #d6ffea);
  }
</style>
