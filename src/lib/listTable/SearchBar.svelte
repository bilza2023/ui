<script>
  import { createEventDispatcher } from "svelte";

  export let value = "";                 // initial value only
  export let placeholder = "Search...";

  const dispatch = createEventDispatcher();

  // Uncontrolled: the child owns q; parent does NOT sync back into it.
  let q = value;

  function emit() {
    dispatch("update", { value: q.trim() });
  }

  function clear() {
    q = "";
    dispatch("update", { value: "" });
  }
</script>

<div class="searchbar">
  <input
    type="search"
    bind:value={q}
    placeholder={placeholder}
    aria-label="Search"
    on:input={emit}
  />
  {#if q}
    <button type="button" class="clear" on:click={clear} aria-label="Clear search">×</button>
  {/if}
</div>

<style>
  .searchbar {
    position: relative;
    z-index: 4;              /* above table/sticky head */
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  input[type="search"] {
    flex: 1;
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid var(--border, rgba(127,127,127,.25));
    border-radius: 10px;
    background: var(--inputBg, transparent);
    color: inherit;
    outline: none;
  }
  input[type="search"]:focus {
    border-color: var(--focus, #6aa0ff);
    box-shadow: 0 0 0 3px color-mix(in oklab, var(--focus, #6aa0ff) 25%, transparent);
  }
  .clear {
    border: 1px solid var(--border, rgba(127,127,127,.25));
    background: var(--buttonBg, rgba(127,127,127,.1));
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
