<script>
  export let json = '';
  export let onRender = () => {};
</script>

<div class="json-editor">
  <label>🧾 JSON Editor</label>
  <textarea bind:value={json} placeholder="Paste slide JSON here..."></textarea>
  <button on:click={onRender}>▶️ Render JSON</button>
</div>

<style>
  .json-editor {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-size: 0.9rem;
    color: #ccc;
  }

  textarea {
    width: 100%;
    height: 160px;
    resize: vertical;
    padding: 0.75rem;
    font-family: monospace;
    background: #1e1e1e;
    color: #eee;
    border: 1px solid #444;
    border-radius: 4px;
  }

  button {
    align-self: flex-start;
    background: #ff8800;
    color: #111;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 4px;
  }
</style>
