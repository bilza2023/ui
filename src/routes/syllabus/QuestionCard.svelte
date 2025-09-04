<script>
  export let items = []; // rows from getExerciseContent(): { slug, type, name, description, status, tags, timed, editedAt }

  function hrefFor(q) {
    if (q.type === 'deck') return `/player?slug=${encodeURIComponent(q.slug)}`;
    if (q.type === 'note') return `/notes?slug=${encodeURIComponent(q.slug)}`;
    return '#';
  }

  function metaFor(q) {
    switch (q.type) {
      case 'deck': return { bg: '#0c0535', fg: '#dcd6ff', label: 'Deck' };
      case 'note': return { bg: '#6c430b', fg: '#ffe3c4', label: 'Note' };
      default:     return { bg: '#2E1C02', fg: '#e6ccb0', label: (q.type ?? 'Item') };
    }
  }
</script>

{#if !items || items.length === 0}
  <div class="empty">No items yet for this exercise.</div>
{:else}
  <div class="grid">
    {#each items as q}
      {@const m = metaFor(q)}
      <a class="card" href={hrefFor(q)}>
        <div class="type" style={`--bg:${m.bg}; --fg:${m.fg}`}>{m.label}</div>
        <div class="title">{q.name ?? q.slug}</div>
        {#if q.description}
          <div class="desc">{q.description}</div>
        {/if}
        <div class="meta">
          {#if q.timed}<span class="pill">timed</span>{/if}
          {#if q.status}<span class="pill">{q.status}</span>{/if}
          {#if Array.isArray(q.tags)}
            {#each q.tags.slice(0,5) as t}
              <span class="tag">#{t}</span>
            {/each}
          {/if}
        </div>
        <div class="footer">
          <span class="fn">{q.slug}</span>
          {#if q.editedAt}<span class="date" title="Last edited">{new Date(q.editedAt).toLocaleDateString()}</span>{/if}
        </div>
      </a>
    {/each}
  </div>
{/if}

<style>
  .empty{
    width:100%; text-align:center; color:#3b2606; padding:40px 12px;
  }
  .grid{
    display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap:12px; width:100%;
  }
  .card{
    display:flex; flex-direction:column; gap:8px;
    background:#f3e5c6; color:#1b1205; border-radius:16px; padding:12px; text-decoration:none;
    border:1px solid #e2d4b5; box-shadow: 0 1px 0 rgba(0,0,0,0.04);
  }
  .card:hover{ transform: translateY(-1px); transition: transform .12s ease; }
  .type{
    align-self:flex-start; padding:2px 8px; border-radius:999px; font-size:12px;
    background: var(--bg); color: var(--fg); border:1px solid rgba(255,255,255,0.12);
  }
  .title{ font-weight:700; color:#2b1b05; }
  .desc{ color:#4a3111; font-size: 0.95rem; }
  .meta{ display:flex; flex-wrap:wrap; gap:6px; }
  .pill{ background:#2E1C02; color:#e6ccb0; border-radius:999px; font-size:12px; padding:2px 8px; }
  .tag{ background:#ead6b5; color:#4a3111; border-radius:999px; font-size:12px; padding:2px 8px; }
  .footer{ display:flex; justify-content:space-between; align-items:center; color:#6b4a12; font-size:12px; }
  .fn{ max-width:60%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .date{ opacity:0.8; }
</style>
