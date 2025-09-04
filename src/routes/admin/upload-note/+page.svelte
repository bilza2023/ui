<script>

import { page } from "$app/stores";
  import FormUi from "$lib/formUi/FormUi.svelte";

  const uploadNoteConfig = {
    id: "uploadNote",
    title: "Upload Note",
    description: "Paste HTML (or plain text) and save it as a Question of type `note`.",
    method: "post",
    action: "/admin/upload-note?/save",
    layout: "stack",             // <-- stacked / simple layout
    initial: {
      name: "",
      tcode: "",
      chapter: "",
      exercise: "",
      description: "",
      status: "",
      noteHtml: ""
    },
    items: [
      { type: "text",    name: "name",      label: "Name",        required: true },
      { type: "text",    name: "tcode",     label: "Tcode",       required: true },
      { type: "number",  name: "chapter",   label: "Chapter #",   min: 1, step: 1, required: true },
      { type: "text",    name: "exercise",  label: "Exercise",    required: true },
      { type: "text",    name: "description", label: "Description" },
      {
        type: "select",
        name: "status",
        label: "Status",
        options: () => ([
          { value: "",          label: "(none)" },
          { value: "draft",     label: "draft" },
          { value: "ready",     label: "ready" },
          { value: "published", label: "published" },
          { value: "archived",  label: "archived" }
        ])
      },
      { type: "textarea", name: "noteHtml",  label: "Note HTML *", rows: 16, required: true }
    ],
    submit: {
      label: "Save Note",
      disabledWhen: (v) =>
        !v.name?.trim() ||
        !v.tcode?.trim() ||
        !(Number(v.chapter) >= 1) ||
        !v.exercise?.trim() ||
        !v.noteHtml?.trim()
    },
    clearOnSuccess: () => ({
      name: "",
      description: "",
      status: "",
      noteHtml: ""
    }),
    showErrorsList: true
  };

  function handleSuccess(e) {
    // e.detail is { ok:true, saved, values } from server success()
    // hook toast here if you want
  }
</script>

<svelte:head>
  <title>Upload Note</title>
</svelte:head>

<div class="wrap">
  <!-- Simple, token-based banners driven by $page.form -->
  {#if $page.form}
    {#if $page.form.ok === true}
      <div class="banner success">Saved: <strong>{$page.form.saved}</strong></div>
    {:else if $page.form.ok === false}
      <div class="banner error">{$page.form.message ?? 'Save failed.'}</div>
    {/if}
  {/if}

  <FormUi config={uploadNoteConfig} on:success={handleSuccess} />
</div>

<style>
  /* tokens.css already applied in layout */
  .wrap { max-width: 880px; margin: 2rem auto; padding: 1rem; color: var(--primaryText); }

  .banner {
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    color: var(--primaryText);
  }
  .banner.success { border-color: var(--secondaryColor); color: var(--secondaryColor); }
  .banner.error   { border-color: var(--accentColor);    color: var(--accentColor); }
</style>
