<script>
    import '$lib/styles/forms.css';
    import { createEventDispatcher, onMount } from "svelte";
  
    export let question = null;
    const dispatch = createEventDispatcher();
  
    // read-only
    let filename = "", type = "", tcode = "", chapter = null, exercise = "";
    let createdAt = "", editedAt = "";
  
    // editable
    let name = "", description = "", tagsCsv = "", status = "draft";
    let thumbnail = "", sortOrder = "", timed = false;
  
    onMount(() => {
      if (!question) return;
      filename  = question.filename ?? "";
      type      = question.type ?? "";
      tcode     = question.tcode ?? "";
      chapter   = question.chapter ?? null;
      exercise  = question.exercise ?? "";
      createdAt = question.createdAt ?? "";
      editedAt  = question.editedAt ?? "";
  
      name        = question.name ?? "";
      description = question.description ?? "";
      thumbnail   = question.thumbnail ?? "";
      status      = question.status ?? "draft";
      timed       = Boolean(question.timed);
  
      if (Array.isArray(question.tags)) tagsCsv = question.tags.join(", ");
      else if (typeof question.tags === "string") tagsCsv = question.tags;
      else tagsCsv = "";
  
      sortOrder = typeof question.sortOrder === "number" ? String(question.sortOrder) : "";
    });
  
    function preparePayload() {
      const payload = {
        name: name?.trim() || null,
        description: description?.trim() || null,
        thumbnail: thumbnail?.trim() || null,
        status: status || "draft",
        timed: Boolean(timed),
        sortOrder: String(sortOrder).trim() === "" ? null : Number.parseInt(String(sortOrder), 10),
        tags: (() => {
          const arr = (tagsCsv ?? "")
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);
          return arr.length ? arr : null;
        })()
      };
      if (payload.sortOrder !== null && Number.isNaN(payload.sortOrder)) payload.sortOrder = null;
      return payload;
    }
  
    function onSave() {
      dispatch("save", { payload: preparePayload() });
    }
  
    function onReset() {
      const q = question; if (!q) return;
      name        = q.name ?? "";
      description = q.description ?? "";
      thumbnail   = q.thumbnail ?? "";
      status      = q.status ?? "draft";
      timed       = Boolean(q.timed);
      sortOrder   = typeof q.sortOrder === "number" ? String(q.sortOrder) : "";
      if (Array.isArray(q.tags)) tagsCsv = q.tags.join(", ");
      else if (typeof q.tags === "string") tagsCsv = q.tags; else tagsCsv = "";
    }
  
    function onKeydown(e) {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault(); onSave();
      }
    }
  </script>
  
  <svelte:window on:keydown={onKeydown} />
  
  {#if !question}
    <div class="note err">No question loaded…</div>
  {:else}
    <form class="form" on:submit|preventDefault={onSave}>
      <div class="form-grid two">
        <!-- Readonly identity -->
        <section class="block">
          <div class="field">
            <label>Filename</label>
            <output class="mono">{filename}</output>
          </div>
          <div class="field">
            <label>Type</label>
            <output class="mono">{type}</output>
          </div>
          <div class="field">
            <label>Path</label>
            <output class="mono">{tcode} · Ch {chapter} · {exercise}</output>
          </div>
          <div class="field">
            <label>Created</label>
            <output class="mono">{createdAt || "—"}</output>
          </div>
          <div class="field">
            <label>Edited</label>
            <output class="mono">{editedAt || "—"}</output>
          </div>
        </section>
  
        <!-- Editable metadata -->
        <section class="block">
          <div class="field">
            <label for="name">Name</label>
            <input id="name" type="text" bind:value={name} placeholder="Human-friendly title…" />
          </div>
  
          <div class="field">
            <label for="desc">Description</label>
            <textarea id="desc" rows="4" bind:value={description} placeholder="Short description…"></textarea>
          </div>
  
          <div class="field">
            <label for="tags">Tags (CSV)</label>
            <input id="tags" type="text" bind:value={tagsCsv} placeholder="algebra, class-9, geometry" />
          </div>
  
          <div class="field">
            <label for="status">Status</label>
            <select id="status" bind:value={status}>
              <option value="draft">draft</option>
              <option value="ready">ready</option>
              <option value="hidden">hidden</option>
            </select>
          </div>
  
          <div class="field">
            <label for="thumb">Thumbnail</label>
            <input id="thumb" type="text" bind:value={thumbnail} placeholder="/images/xyz.webp" />
          </div>
  
          <div class="field">
            <label for="sort">Sort Order</label>
            <input id="sort" type="number" inputmode="numeric" bind:value={sortOrder} placeholder="e.g., 10" />
          </div>
  
          <div class="field">
            <label for="timed">Timed</label>
            <input id="timed" type="checkbox" bind:checked={timed} />
          </div>
        </section>
      </div>
  
      <div class="actions">
        <button type="button" on:click={onReset}>Reset</button>
        <button type="submit" class="primary">Save</button>
      </div>
    </form>
  {/if}
  
  <style>
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .block { padding: 1rem; border: 1px solid var(--borderColor, #333); border-radius: 12px; background: var(--surfaceColor, rgba(255,255,255,0.02)); }
  </style>
  