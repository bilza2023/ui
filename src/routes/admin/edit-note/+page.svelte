<script>
  import { enhance } from '$app/forms';
  export let data;

  let localForm = data?.form ?? null;
  const q = data?.question ?? null;
  const slug = data?.slug ?? null;

  // "sticky" values helper
  const v = (k, d='') => localForm?.values?.[k] ?? d;

  const onEnhance = () => ({ result }) => {
    if (result.type === 'failure') {
      localForm = result.data; // show validation message + keep values
      return;
    }
    if (result.type === 'success') {
      // Optionally toast or navigate; keeping it simple
      localForm = { message: 'Saved.', values: { slug, noteHtml: v('noteHtml', q?.note ?? '') } };
    }
  };
</script>

{#if localForm?.message}
  <div role="alert" class="mb-3 rounded-lg border border-red-600/40 bg-red-900/30 px-3 py-2 text-red-200">
    {localForm.message}
  </div>
{/if}

{#if !slug}
  <div class="wrap">
    <p>Open this page with <code>?slug=&lt;your-slug&gt;</code>.</p>
  </div>
{:else}
  <form method="post" action="?/_action=save" use:enhance={onEnhance} class="form stack">
    <!-- Hidden slug so the server action knows what to update -->
    <input type="hidden" name="slug" id="slug" value={slug} />

    <!-- A11y: label is associated with the textarea via for/id -->
    <div class="field">
      <label for="noteHtml" class="label">Note (HTML)</label>
      <textarea
        id="noteHtml"
        name="noteHtml"
        rows="18"
        class="textarea"
        aria-describedby="noteHelp"
      >{v('noteHtml', q?.note ?? '')}</textarea>
      <div id="noteHelp" class="help">Paste or edit your HTML here.</div>
    </div>

    <button type="submit" class="btn primary">Save</button>
  </form>
{/if}

<style>
  .form.stack { display: grid; gap: 12px; max-width: 960px; }
  .field { display: grid; gap: 6px; }
  .label { font-weight: 600; }
  .textarea { min-height: 320px; width: 100%; }
  .btn.primary { padding: 8px 14px; border-radius: 8px; }
</style>
