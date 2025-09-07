<script>
  import ListView from "$lib/listTable/ListView.svelte";
  // optional shared styles
  import "$lib/styles/forms.css";

  export let data;

  // From loader
  const columns = data.columns;
  const rows    = data.rows;

  // Search across the most useful text fields
  const searchKeys = ["title", "category", "type", "slug", "status"];

  function onRowclick(e) {
    // e.detail = { row, index }
    // You can route by type/slug later if desired
    console.log("rowclick:", e.detail);
  }
</script>

<h1>Questions</h1>

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
    height: 100vh;          /* ensure the list can fill */
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    padding-right: 10px;
    gap: 12px;
  }
</style>
