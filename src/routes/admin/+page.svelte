<script>
  import ListView from "$lib/listTable/ListView.svelte";
  import "$lib/styles/forms.css";

  export let data;

  const columns = data.columns;
  const rows    = data.rows;

  // Include “actions” in search if you like, but usually not needed
  const searchKeys = ["title", "category", "type", "slug", "status"];

  function onRowclick(e) {
    console.log("rowclick:", e.detail);
  }
</script>

<div class="page">
  <ListView
    {columns}
    {rows}
    {searchKeys}
    showIndex={true}
    zebra={true}
    dense={false}
    fullHeight={true}
    rowKey="id"
    emptyText="No entries found"
    on:rowclick={onRowclick}
  />
</div>

<style>
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 12px;
    gap: 12px;
  }

  /* Make links in the table look like standard links */
  :global(.list-table td a) {
    color: var(--linkColor, #2b6cb0);
    text-decoration: underline;
  }
</style>
