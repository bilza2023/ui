<script>
    // Single question card — pure renderer
    export let item = {}; // { title?, name?, heading?, question?, slug?, id?, ... }
  
    const norm = (v) => (v == null ? "" : String(v).trim());
    const humanize = (s) =>
      norm(s)
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .replace(/(^\w)|(\s\w)/g, (m) => m.toUpperCase());
  
    // Pick a sensible title from common fields, else slug→human, else id, else "Untitled"
    $: displayTitle = (() => {
      const candidates = [
        "title",
        "name",
        "heading",
        "label",
        "question",
        "text",
        "prompt",
        "deckTitle",
        "noteTitle"
      ];
      for (const k of candidates) {
        const v = norm(item?.[k]);
        if (v) return v;
      }
      const slug = norm(item?.slug);
      if (slug) return humanize(slug);
      const id = item?.id ?? item?._id;
      if (id != null && id !== "") return `#${id}`;
      return "Untitled";
    })();
  </script>
  
  <article class="q-card" title={displayTitle} role="article">
    <header class="q-head">
      <h3 class="q-title">{displayTitle}</h3>
      {#if item.status}
        <span class="q-badge" title="Status">{item.status}</span>
      {/if}
    </header>
  
    <div class="q-meta">
      {#if item.type}<span class="pill">{item.type}</span>{/if}
      {#if item.exercise}<span class="pill">{item.exercise}</span>{/if}
      {#if item.chapter}<span class="pill">{item.chapter}</span>{/if}
      {#if item.editedAt}<span class="muted" title="Last edited">{item.editedAt}</span>{/if}
    </div>
  
    {#if item.description}
      <p class="q-desc">{item.description}</p>
    {/if}
  </article>
  
  <style>
    /* TOKEN-ONLY COLORS */
    .q-card{
      box-sizing: border-box;
      display: block;
      width: var(--q-card-w, 360px);
      max-width: 100%;
      background: var(--surfaceColor);
      color: var(--primaryText);
      border: 1px solid var(--borderColor);
      border-radius: 14px;
      padding: 14px;
      transition: transform .12s ease, box-shadow .15s ease, border-color .15s ease;
    }
    .q-card:hover{
      transform: translateY(-1px);
      border-color: var(--primaryColor);
      box-shadow: 0 4px 16px var(--shadowColor, rgba(0,0,0,.15));
    }
    .q-head{ display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:8px; }
    .q-title{ margin:0; font-size:17px; line-height:1.3; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    .q-badge{ font-size:12px; line-height:1; padding:4px 10px; border-radius:999px; background: var(--accentColor); color: var(--onAccentColor, var(--backgroundColor)); border: 1px solid var(--accentColor); }
    .q-meta{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:6px; }
    .pill{ font-size:12px; line-height:1; padding:2px 8px; border-radius:999px; background: var(--chipBg, var(--surfaceColor)); color: var(--primaryText); border:1px solid var(--borderColor); }
    .muted{ opacity:.7; font-size:12px; }
    .q-desc{ margin:8px 0 0 0; }
    @media (max-width: 640px){ .q-card { width: 100%; } }
  </style>
  