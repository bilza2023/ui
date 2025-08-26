<script>
    /** Dumb table: render-only. Consumes `items` and nothing else. */
    export let items = [];
  
    function badge(row) {
      const type = row?.type ?? "?";
      if (type === "note")  return { bg: "#6c430b", fg: "#fff", label: "note"  };
      if (type === "deck")  return { bg: "#0c0535", fg: "#fff", label: "deck"  };
      if (type === "slide") return { bg: "#492d08", fg: "#fff", label: "slide" };
      return { bg: "#2E1C02", fg: "#fff", label: String(type) };
    }
  
    const safeDT = (v) => (v ? new Date(v).toLocaleString() : "—");
  
    function viewHrefFor(row) {
      return row?.type === "note"
        ? `/notes?filename=${encodeURIComponent(row.filename)}`
        : `/player?filename=${encodeURIComponent(row.filename)}`;
    }
  
    function editHrefFor(row) {
      return row?.type === "note"
        ? `/admin/editor_note?filename=${encodeURIComponent(row.filename)}`
        : `/admin/editor_slide?filename=${encodeURIComponent(row.filename)}`;
    }
  </script>
  
  <table class="admin-index-table">
    <thead>
      <tr>
        <th class="type">Type</th>
        <th class="name">Name</th>
        <th class="path">Path</th>
        <th class="edited">Edited</th>
        <th class="created">Created</th>
        <th class="actions">Actions</th>
      </tr>
    </thead>
  
    <tbody>
      {#each items as row}
        {@const b = badge(row)}
        <tr>
          <td class="type">
            <span class="badge" style={`--bg:${b.bg};--fg:${b.fg}`}>{b.label}</span>
          </td>
  
          <td class="name">
            <div class="n2">{row.filename}</div>
            <div class="n1">{row.name ?? row.filename}</div>
          </td>
  
          <td class="path">
            <div class="p1">{row.tcode}</div>
            <div class="p2">
              {#if row.chapter != null}Ch {row.chapter}{/if}
              {#if row.exercise != null} · {row.exercise}{/if}
            </div>
          </td>
  
          <td>{safeDT(row.editedAt)}</td>
          <td>{safeDT(row.createdAt)}</td>
  
          <td class="actions">
            <a class="btn" href={viewHrefFor(row)}>Open</a>
            <a class="btn" href={editHrefFor(row)}>Edit</a>
            <a class="btn" href= {`/admin/question_editor?filename=${row.filename}`}>Content</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
  <style>
    /* keep it minimal; rely on existing theme tokens if present */
    .admin-index-table {
      width: 100%;
      border-collapse: collapse; /* respect global table styling */
    }
  
    .admin-index-table th,
    .admin-index-table td {
      padding: 10px 12px;
      vertical-align: top;
    }
  
    /* clear header separation */
    .admin-index-table thead th {
      text-align: left;
      border-bottom: 1px solid var(--table-head-border, #3a3a3a);
    }
  
    /* ✅ subtle row separation so it doesn't look like one list */
    .admin-index-table tbody tr:not(:first-child) td {
      border-top: 1px solid var(--table-row-border, #2f2f2f);
    }
  
    /* light hover to reinforce row boundaries */
    .admin-index-table tbody tr:hover td {
      background: var(--table-hover, rgba(255, 255, 255, 0.03));
    }
  
    /* small readability touches (optional but safe) */
    .admin-index-table .name .n1 { font-weight: 600; }
    .admin-index-table .name .n2 { opacity: 0.7; font-size: 0.9em; }
    .admin-index-table .path .p2 { opacity: 0.75; font-size: 0.9em; }
  
    .admin-index-table .type .badge {
      display: inline-block;
      background: var(--bg);
      color: var(--fg);
      border-radius: 999px;
      padding: 2px 10px;
      font-size: 0.85rem;
      line-height: 1.4;
    }
  
    .admin-index-table .actions .btn + .btn { margin-left: 6px; }
  </style>
  