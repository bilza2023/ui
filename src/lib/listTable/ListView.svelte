<script>
  import { createEventDispatcher } from "svelte";
  import SearchBar from "./SearchBar.svelte";
  import ListTable from "./ListTable.svelte";

  // Required
  export let columns = [];   // [{ key, label, align?, width? }]
  export let rows = [];      // full dataset (display-ready)

  // Optional
  export let searchKeys = undefined;   // string[]; else auto-detect string keys
  export let placeholder = "Search...";

  // Visuals passthrough
  export let showIndex = false;
  export let zebra = true;
  export let dense = false;

  // Height behavior
  export let fullHeight = true;        // fill viewport by default
  export let maxHeight = "";           // if set, caps height and disables fill

  export let rowKey = "id";
  export let emptyText = "No data";

  const dispatch = createEventDispatcher();

  // Search state
  let query = "";

  // Determine which keys to search
  $: keys = Array.isArray(searchKeys) && searchKeys.length
    ? searchKeys
    : inferKeysFromFirstRow(rows);

  function inferKeysFromFirstRow(arr) {
    const first = arr?.[0] || {};
    return Object.keys(first).filter(k => typeof first[k] === "string");
  }

  // Filtering: case-insensitive contains; AND across tokens; OR across keys
  $: tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  $: rowsFiltered = tokens.length === 0
    ? rows
    : rows.filter((row) =>
        tokens.every((tok) =>
          keys.some((k) => String(row?.[k] ?? "").toLowerCase().includes(tok))
        )
      );

  function onSearchUpdate(e) {
    query = e?.detail?.value ?? "";
    dispatch("statechange", { query });
  }

  function onRowClick(e) { dispatch("rowclick", e.detail); }
</script>

<div class="listview">
  <div class="top">
    <SearchBar value={query} placeholder={placeholder} on:update={onSearchUpdate} />
  </div>

  <div class="table-host">
    <ListTable
      {columns}
      rows={rowsFiltered}
      {showIndex}
      {zebra}
      {dense}
      fill={!!(fullHeight && !maxHeight)}  
      {maxHeight}
      {rowKey}
      {emptyText}
      on:rowclick={onRowClick}
    />
  </div>
</div>

<style>
  /* Flex column: search (auto) + table area (flexes) */
  .listview {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100vh;                  /* full viewport */
  }

  .top {
    flex: 0 0 auto;                 /* search stays natural height */
    position: relative;
    z-index: 3;                     /* above sticky head */
  }

  .table-host {
    flex: 1 1 auto;                 /* fills remaining height */
    min-height: 0;                  /* critical so child can scroll */
    display: flex;
    flex-direction: column;
  }
</style>
