
<script>
  import ListView from "$lib/listTable/ListView.svelte";

  export let data;

  
  console.log("data" , data);
  // List UI
  const s = (n) => (n === 1 ? "" : "s");
  // ---- incoming data from loader ----
  // data.entries    -> array of HomeIndexEntry rows
  // data.category   -> currently selected category (string or "")
  // data.categories -> ["featured","videos","blog","courses"]

  // -------- column schema (ListTable spec v1) --------
  const columns = [
    { id: "thumbnail", label: "", accessor: "thumbnail", kind: "thumbnail", width: "sm" },
    { id: "title",     label: "Title", accessor: "title", primary: true, sortable: true },
    { id: "type",      label: "Type", accessor: "type", kind: "badge", sortable: true, width: "sm" },
    { id: "category",  label: "Category", accessor: "category", kind: "badge", sortable: true, width: "sm" },
    // Note: DB renamed url -> slug; while forms may still post `url`, we show either.
    { id: "slug",      label: "Slug / URL", accessor: (r) => r.slug || r.url || "", hideOn: "mobile" },
    { id: "pinned",    label: "Pinned", accessor: (r) => !!r.pinned, kind: "icon", width: "xs", align: "center" },
    { id: "sortOrder", label: "Sort", accessor: "sortOrder", kind: "number", sortable: true, width: "xs", align: "right" },
    { id: "status",    label: "Status", accessor: "status", kind: "badge", sortable: true, width: "sm" },
    { id: "updatedAt", label: "Updated", accessor: (r) => r.updatedAt || r.createdAt, kind: "date", format: "relative", sortable: true, width: "sm" }
  ];

  // -------- query state (client mode) --------
  let page = 1;
  let pageSize = 20;
  let searchTerm = "";
  let activeTab = data.category || ""; // default matches server param if present

  const tabs = data.categories || [];
  const items = data.entries || [];

  function handleQueryChange(e) {
    const q = e.detail || {};
    page = q.page ?? page;
    pageSize = q.pageSize ?? pageSize;
    searchTerm = q.searchTerm ?? searchTerm;
    activeTab = q.tabs ?? activeTab;
  }

  function matchTab(row) {
    if (!activeTab || activeTab === "All") return true;
    return (row.category || "") === activeTab;
  }

  function matchSearch(row) {
    const t = (searchTerm || "").trim().toLowerCase();
    if (!t) return true;
    const hay = [row.title, row.slug || row.url, row.type, row.category]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(t);
  }

  $: filtered = (items || []).filter(matchTab).filter(matchSearch);
</script>

<!--
  KEEP YOUR EXISTING FORM BLOCK ABOVE THIS COMMENT (unchanged).
  Only the LOWER table is replaced by the block below.
-->
<section class="admin-section">
  <header class="bar">
    <h2>Home Index — Entries</h2>
    <div class="meta">{filtered.length} item{s(filtered.length)}</div>
  </header>

  <ListView
    items={filtered}
    totalCount={filtered.length}
    page={page}
    pageSize={pageSize}
    columns={columns}
    tabs={tabs}
    searchTerm={searchTerm}
    paginator="client"
    thumbBaseUrl="/media/images"
    emptyMessage="No index entries yet."
    on:queryChange={handleQueryChange}
  />
</section>

<style>
  :global(html, body){ margin:0; padding:0; }
  .admin-section{ padding: 12px 16px; }
  .bar{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; }
  h2{ margin:0; font-size:1.1rem; font-weight:600; color: var(--primaryText); }
  .meta{ opacity:0.8; font-size:0.9rem; }

  /* Ensure table area adapts to mobile nicely via ListView's own responsive rules */
</style>
