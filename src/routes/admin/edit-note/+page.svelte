<script>
  import { enhance } from "$app/forms";
  export let data;

  // local form state for sticky values (exact formKit pattern)
  let localForm = null;
  const v = (k, d = "") => (localForm?.values?.[k] ?? d);

  const onEnhance = () => ({ result }) => {
    if (result.type === "failure") {
      localForm = result.data;         // { ok:false, message, values }
      return;
    }
    if (result.type === "success") {
      localForm = result.data;         // { ok:true, values: ... }
    }
  };
</script>

<section class="topbar">
  <div class="title">Edit Note</div>
  <p class="hint">This form mirrors <b>upload-note</b> field names/shape. We only update Name, Description, and Note.</p>
</section>

 {#if localForm?.message}
   <div role="alert" class="alert {localForm?.ok ? 'ok' : 'err'}">{localForm.message}</div>
 {/if}

 <form method="post" action="?/save" use:enhance={onEnhance} class="space-y">
<!-- <form method="post" action="?/_action=save" use:enhance={onEnhance} class="space-y"> -->
  <!-- hidden slug to target the record -->
  <input type="hidden" name="slug" value={data.slug} />

  <!-- Keep the SAME field names as upload-note -->
  <div class="row">
    <label>Name</label>
    <input name="name" type="text" required
      value={v("name", data.initial.name)} placeholder="Enter a clear title" />
  </div>

  <!-- We submit anchors as HIDDEN inputs so the server spec stays identical.
       They are not editable here, but they POST with the request. -->
  <input type="hidden" name="tcode" value={v("tcode", data.initial.tcode)} />
  <input type="hidden" name="chapter" value={v("chapter", data.initial.chapter)} />
  <input type="hidden" name="exercise" value={v("exercise", data.initial.exercise)} />
  <input type="hidden" name="status" value={v("status", data.initial.status)} />

  <div class="row">
    <label>Description</label>
    <textarea name="description" rows="3"
      placeholder="Optional short summary">{v("description", data.initial.description)}</textarea>
  </div>

  <!-- CRITICAL: same name as upload-note -->
  <div class="row">
    <label>Note (HTML)</label>
    <textarea name="noteHtml" rows="18" required placeholder="<p>...</p>">{v("noteHtml", data.initial.noteHtml)}</textarea>
  </div>

  <button type="submit" class="btn">Save changes</button>
</form>

<style>
  .topbar { padding: 12px 20px; border-bottom: 1px solid var(--softBorder, rgba(255,255,255,0.08)); }
  .title { font-size: 1.25rem; font-weight: 700; margin-bottom: 6px; }
  .hint { opacity: 0.8; font-size: 0.9rem; }
  .space-y { display: grid; gap: 14px; padding: 20px 200px; }
  .row { display: grid; gap: 6px; }
  .row label { font-weight: 600; font-size: 0.95rem; }
  .row input[type="text"], .row textarea {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px; padding: 10px 12px; color: inherit; width: 100%;
  }
  .btn {
    border-radius: 10px; padding: 10px 16px; font-weight: 700;
    background: #22d3ee; color: #0b1020;
  }
  .alert { margin: 12px 200px 0; border: 1px solid rgba(244,63,94,0.4); background: rgba(225,29,72,0.2); padding: 10px 12px; border-radius: 10px; }
  @media (max-width: 900px) {
    .space-y { padding: 16px; }
    .alert { margin: 12px 16px 0; }
  }
  .alert { margin: 12px 200px 0; border: 1px solid transparent; padding: 10px 12px; border-radius: 10px; }
.alert.ok  { border-color: rgba(16,185,129,.4); background: rgba(16,185,129,.18); }  /* green */
.alert.err { border-color: rgba(244,63,94,.4);  background: rgba(225,29,72,.18); }   /* red */

@media (max-width: 900px) {
  .alert { margin: 12px 16px 0; }
}

</style>
