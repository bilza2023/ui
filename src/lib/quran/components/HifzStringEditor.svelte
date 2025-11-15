<script>
    import { createEventDispatcher } from 'svelte';
  
    export let label = "";       // e.g., "Ayat Icon"
    export let value = "";       // current value from DB
    export let field = "";       // e.g., "ayatIcon"
  
    const dispatch = createEventDispatcher();
    let editing = false;
    let temp = value;
  
    function startEdit() {
      editing = true;
      temp = value;
    }
  
    function cancel() {
      editing = false;
      temp = value;
    }
  
    function save() {
      editing = false;
      dispatch("save", { field, value: temp });
    }
  </script>
  
  <div class="editor">
    <label>{label}</label>
  
    {#if editing}
      <input type="text" bind:value={temp} />
  
      <div class="btns">
        <button on:click={save}>Save</button>
        <button on:click={cancel}>Cancel</button>
      </div>
    {:else}
      <p class="display">{value || "(empty)"}</p>
      <button on:click={startEdit}>Edit</button>
    {/if}
  </div>
  
  <style>
    .editor {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.45rem;
      border: 1px solid var(--borderColor);
      border-radius: 0.4rem;
      margin-bottom: 0.4rem;
    }
    .btns {
      display: flex;
      gap: 0.5rem;
    }
    .display {
      color: var(--secondaryText);
      margin-bottom: 0.3rem;
    }
    button {
      border: 1px solid var(--primaryColor);
      background: transparent;
      padding: 0.35rem 0.7rem;
      border-radius: 0.4rem;
      color: var(--primaryColor);
    }
  </style>
  