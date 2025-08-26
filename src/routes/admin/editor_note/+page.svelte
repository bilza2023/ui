<script>
    import Nav from "$lib/appComps/Nav.svelte";
    import AdminNav from "$lib/components/AdminNav.svelte";
    import "$lib/styles/forms.css";
  
    import { onMount } from "svelte";
    import { page } from "$app/stores";
  
    let filename = "";
    let loading = true;
    let error = "";
    let saved = false;
  
    /** @type {any|null} */
    let question = null;
    let note = ""; // editable note text
  
    // Download link for note
    $: downloadHref = note
      ? "data:text/html;charset=utf-8," + encodeURIComponent(note)
      : "";
  
    onMount(async () => {
      filename = $page.url.searchParams.get("filename") ?? "";
      if (!filename) {
        error = "Missing ?filename=… in URL.";
        loading = false;
        return;
      }
      await fetchQuestion();
    });
  
    async function fetchQuestion() {
      loading = true; error = ""; saved = false;
      try {
        const res = await fetch(`/admin/editor_note?filename=${encodeURIComponent(filename)}`);
        if (!res.ok) {
          error = `Load failed (${res.status}).`;
          question = null;
          note = "";
        } else {
          const data = await res.json();
          question = data ?? null;
          if (!question) {
            error = "Question not found.";
            note = "";
          } else {
            note = typeof question.note === "string" ? question.note : "";
            if (question.type !== "note") {
              // Show a gentle warning but still allow editing/saving the note field
              error = "Warning: this item’s type is not 'note'.";
            }
          }
        }
      } catch (e) {
        error = String(e);
        question = null;
        note = "";
      } finally {
        loading = false;
      }
    }
  
    async function saveNote() {
      if (!question) return;
      saved = false; error = "";
      try {
        const res = await fetch(`/admin/editor_note?filename=${encodeURIComponent(question.filename)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note })
        });
        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          throw new Error(`Save failed (${res.status}): ${msg || "unknown error"}`);
        }
        saved = true;
      } catch (ex) {
        error = String(ex);
      }
    }
  
    // Quick save with Ctrl/Cmd+S
    function onKeydown(e) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveNote();
      }
    }
  </script>
  
  <svelte:window on:keydown={onKeydown} />
  
  <Nav />
  <AdminNav />
  
  <div class="wrap">
    <header class="pagehead">
      <h1>Note Editor</h1>
      {#if question}
        <div class="hint">
          <code>{question.filename}</code>
          <em>· {question.type}</em>
        </div>
      {/if}
    </header>
  
    {#if loading}
      <div class="note ok">Loading…</div>
    {:else}
      {#if error}
        <div class="note err">{error}</div>
      {/if}
  
      {#if !question}
        <div class="note err">Not found.</div>
      {:else}
        <form class="form" on:submit|preventDefault={saveNote}>
          <div class="field">
            <label for="note">Note Content (HTML or text)</label>
            <textarea id="note" rows="22" bind:value={note} placeholder="Paste or write your note HTML here…"></textarea>
          </div>
  
          <div class="actions">
            <button type="submit" class="primary">Save</button>
            {#if saved}<span class="note ok" style="margin-left:.75rem;">Saved.</span>{/if}
          </div>
        </form>
  
        <section class="block" style="margin-top:1rem;">
          <div class="form-grid">
            <div class="field">
              <label>Download Note</label>
              <a class="primary" download={`${question.filename}.html`} href={downloadHref}>Download</a>
            </div>
          </div>
        </section>
      {/if}
    {/if}
  </div>
  