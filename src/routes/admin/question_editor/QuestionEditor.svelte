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
    /* ===== form container ===== */
    .form {
      display: grid;
      gap: 14px;
      color: var(--primaryText);
    }
    .form-grid.two {
      display: grid;
      gap: 14px;
    }
    @media (min-width: 900px) {
      .form-grid.two {
        grid-template-columns: 1.1fr 1fr;
        align-items: start;
      }
    }
  
    /* ===== blocks ===== */
    .block {
      padding: 14px;
      border: 1px solid var(--borderColor);
      border-radius: 12px;
      background: var(--surfaceColor);
      box-shadow: 0 1px 0 rgba(0,0,0,.06);
    }
  
    /* ===== fields ===== */
    .field {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 6px;
      margin-bottom: 12px;
    }
  
    /* Labels: lighter, smaller, uppercase-ish for clear hierarchy */
    .field > label {
      font-size: .82rem;
      font-weight: 600;
      color: var(--secondaryText);
      letter-spacing: .02em;
      text-transform: uppercase;
    }
  
    /* Inputs / Textareas / Selects: higher contrast, clear borders */
    .field input[type="text"],
    .field input[type="number"],
    .field input[type="search"],
    .field input[type="url"],
    .field textarea,
    .field select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid var(--borderColor);
      background: var(--backgroundColor);
      color: var(--primaryText);
      line-height: 1.15;
      transition: border-color .15s ease, box-shadow .15s ease, background .15s ease;
    }
  
    .field textarea { resize: vertical; }
  
    .field input[type="text"]::placeholder,
    .field input[type="number"]::placeholder,
    .field textarea::placeholder {
      color: color-mix(in oklab, var(--secondaryText) 70%, transparent);
    }
  
    /* Focus ring with your primary token */
    .field input:focus-visible,
    .field textarea:focus-visible,
    .field select:focus-visible {
      outline: none;
      border-color: var(--primaryColor);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--primaryColor) 25%, transparent);
    }
  
    /* Checkbox row: keep label left, control right-aligned */
    .field input[type="checkbox"] {
      width: 18px; height: 18px;
      accent-color: var(--primaryColor);
      justify-self: start;
    }
  
    /* ===== read-only outputs (identity block) ===== */
    .mono {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      background: var(--backgroundColor);
      border: 1px dashed var(--borderColor);
      border-radius: 10px;
      padding: 8px 10px;
      color: var(--primaryText);
      line-height: 1.25;
      word-break: break-word;
    }
  
    /* Make the “Path” output wrap nicely on small screens */
    .field output.mono {
      white-space: normal;
    }
  
    /* ===== actions ===== */
    .actions {
      display: flex;
      gap: 10px;
      padding-top: 6px;
    }
    .actions button {
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid var(--borderColor);
      background: var(--surfaceColor);
      color: var(--primaryText);
      cursor: pointer;
      transition: border-color .15s ease, transform .02s ease-in-out;
    }
    .actions button:hover { border-color: var(--primaryColor); }
    .actions button:active { transform: translateY(1px); }
  
    .actions .primary {
      background: var(--primaryColor);
      border-color: var(--primaryColor);
      color: #fff;
    }
    .actions .primary:hover {
      filter: brightness(1.05);
    }
  </style>
  