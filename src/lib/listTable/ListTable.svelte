<script>
  import { createEventDispatcher } from "svelte";

  // Props
  export let columns = [];                 // [{ key, label, align?, width? }]
  export let rows = [];                    // flat, display-ready values
  export let showIndex = false;
  export let zebra = true;
  export let dense = false;

  // Layout control (used by ListView)
  export let fill = false;                 // if true, fill parent height
  export let maxHeight = "";               // ignored when fill=true

  export let rowKey = "id";                // string or (row, i) => string
  export let emptyText = "No data";

  const dispatch = createEventDispatcher();

  const getRowKey = (row, i) => {
    if (typeof rowKey === "function") return String(rowKey(row, i));
    if (rowKey && row?.[rowKey] != null)  return String(row[rowKey]);
    if (row?.id != null)                  return String(row.id);
    return String(i);
  };

  const alignClass = (col) => {
    const a = (col?.align || "left").toLowerCase();
    return a === "right" ? "a-right" : a === "center" ? "a-center" : "a-left";
  };

  const fmt = (v) => (v === null || v === undefined ? "—" : String(v));

  function handleRowClick(row, index) {
    dispatch("rowclick", { row, index });
  }
</script>

<!-- Fill parent or respect maxHeight; scroll lives here -->
<div
  class="table-wrap"
  style:height={fill ? '100%' : undefined}
  style:max-height={!fill && maxHeight ? maxHeight : undefined}
>
  <table class="list-table" class:zebra={zebra} class:dense={dense} role="table">
    <thead>
      <tr>
        {#if showIndex}<th class="index">#</th>{/if}
        {#each columns as col}
          <th class={alignClass(col)} style={col.width ? `width:${col.width}` : ""} scope="col">
            {col.label}
          </th>
        {/each}
      </tr>
    </thead>

    {#if rows.length === 0}
      <tbody>
        <tr>
          <td class="empty" colspan={(columns?.length || 0) + (showIndex ? 1 : 0)}>{emptyText}</td>
        </tr>
      </tbody>
    {:else}
      <tbody>
        {#each rows as row, i (getRowKey(row, i))}
          <tr
            role="row"
            tabindex="0"
            on:click={() => handleRowClick(row, i)}
            on:keydown={(e) => (e.key === "Enter" || e.key === " ") && handleRowClick(row, i)}
          >
            {#if showIndex}<td class="index">{i + 1}</td>{/if}
            {#each columns as col}
              <td class={alignClass(col)}>{fmt(row?.[col.key])}</td>
            {/each}
          </tr>
        {/each}
      </tbody>
    {/if}
  </table>
</div>

<style>
  /* Wrapper fills its parent and provides the scroll layer */
  .table-wrap {
    position: relative;
    z-index: 1;            /* below the search */
    width: 100%;
    min-height: 0;         /* allow scroll in flex parent */
    height: 100%;          /* when fill=true */
    overflow: auto;

    border: 1px solid var(--border, rgba(127,127,127,.25));
    border-radius: 10px;
    background: var(--panel, transparent);
  }

  table.list-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }

  thead th {
    position: sticky;
    top: 0;
    background: var(--tableHeadBg, rgba(0,0,0,.05));
    /* remove if it causes z-index issues */
    backdrop-filter: blur(4px);
    text-align: left;
    font-weight: 600;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border, rgba(127,127,127,.25));
    z-index: 1;
  }

  tbody td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--rowBorder, rgba(127,127,127,.15));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .index { width: 4ch; text-align: right; opacity: 0.8; }
  .a-left { text-align: left; }
  .a-center { text-align: center; }
  .a-right { text-align: right; }

  .list-table.zebra tbody tr:nth-child(odd) { background: var(--rowAlt, rgba(127,127,127,.06)); }
  .list-table.dense thead th,
  .list-table.dense tbody td { padding-top: 6px; padding-bottom: 6px; }

  tbody tr { cursor: pointer; }
  tbody tr:hover { background: var(--rowHover, rgba(127,127,127,.12)); }

  td.empty { text-align: center; padding: 24px; color: var(--muted, #888); }
</style>
