<script>
  // Data from +page.server.js
  export let data;
  const entries = Array.isArray(data?.entries) ? data.entries : [];

  // Optional: client-side formatters (kept tiny)
  const fmtBool = (v) => (v ? "Yes" : "No");
  const fmtSort = (n) => (Number.isFinite(n) ? String(n) : "—");
  const fmtUpdated = (iso) => {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      // Friendly local date + time
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };
</script>

<!-- Page chrome kept minimal on purpose -->
<section class="wrap">
  <header class="bar">
    <h1>Home Index — Entries</h1>
    {#if data?.category}
      <span class="chip">Category: {data.category}</span>
    {/if}
  </header>

  <div class="tableWrap">
    <table class="list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Category</th>
          <th>Slug / URL</th>
          <th>Pinned</th>
          <th>Sort</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>

      {#if entries.length === 0}
        <tbody>
          <tr>
            <td class="empty" colspan="8">No data</td>
          </tr>
        </tbody>
      {:else}
        <tbody>
          {#each entries as row (row.id)}
            <tr>
              <td class="title">{row.title || "—"}</td>
              <td class="badge">{row.type || "—"}</td>
              <td>{row.category || "—"}</td>
              <td class="mono">{row.slug || "—"}</td>
              <td>{fmtBool(row.pinned)}</td>
              <td class="mono">{fmtSort(row.sortOrder)}</td>
              <td class="badge">{row.status || "—"}</td>
              
    <td class="actions">
      <!-- replace your current delete form with this -->
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={row.id} />
        <button class="danger" aria-label={`Delete ${row.title}`}>Delete</button>
      </form>

      </td>

            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
</section>

<style>
  /* Uses your token palette if present */
  :root {
    --bg: var(--backgroundColor, #0b0b0b);
    --fg: var(--primaryText, #eaeaea);
    --muted: #9aa0a6;
    --chip: #303134;
    --line: #2a2a2a;
    --thead: #161616;
  }

  .wrap {
    padding: 16px;
    color: var(--fg);
    background: var(--bg);
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .bar h1 {
    font-size: 1.1rem;
    margin: 0;
    font-weight: 600;
  }
  .chip {
    background: var(--chip);
    color: var(--fg);
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 0.85rem;
  }

  .tableWrap {
    border: 1px solid var(--line);
    border-radius: 8px;
    overflow: auto;
    background: #0f0f0f;
  }

  table.list {
    width: 100%;
    border-collapse: collapse;
    min-width: 760px; /* keep columns readable */
  }
  thead {
    background: var(--thead);
  }
  th, td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--line);
    text-align: left;
    vertical-align: middle;
    font-size: 0.95rem;
  }
  th {
    color: var(--muted);
    font-weight: 600;
    white-space: nowrap;
  }
  td.title {
    font-weight: 600;
  }
  td.mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.9rem;
  }
  td.badge {
    text-transform: capitalize;
  }
  td.empty {
    text-align: center;
    color: var(--muted);
    padding: 24px 12px;
  }

  /* Mobile: allow horizontal scroll; reduce padding */
  @media (max-width: 640px) {
    th, td { padding: 8px 10px; }
    .bar h1 { font-size: 1rem; }
  }

  td.actions { text-align: center; }
button.danger {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #5c1b1b;
  background: #2a0f0f;
  color: #f5d4d4;
  cursor: pointer;
}
button.danger:hover { background: #3b1515; }

</style>
