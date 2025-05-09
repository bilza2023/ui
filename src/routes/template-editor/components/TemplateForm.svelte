<script>
    export let templates = [];
    export let onSubmit;
    export let close;
  
    let selected = null;
    let inputs = {};
  
    // Load manifest dynamically from selected template
    function loadManifest(templateFn) {
      if (!templateFn || !templateFn.getManifest) return [];
      return templateFn.getManifest();
    }
  
    function submit() {
      if (selected && onSubmit) {
        const slide = selected(inputs);
        onSubmit(slide);
        close();
      }
    }
  </script>
  
  <div class="form-container">
    <h3>📦 Choose Template</h3>
  
    <select bind:value={selected}>
      <option disabled selected value={null}>-- Select Template --</option>
      {#each templates as template}
        <option value={template.fn}>{template.name}</option>
      {/each}
    </select>
  
    {#if selected}
      <div class="fields">
        {#each loadManifest(selected) as field}
          <label>
            {field.label}
            <input type="text" bind:value={inputs[field.name]} placeholder={field.placeholder || ""} />
          </label>
        {/each}
      </div>
  
      <button on:click={submit}>✅ Add Slide</button>
      <button on:click={close}>❌ Cancel</button>
    {/if}
  </div>
  
  <style>
    .form-container {
      background: #222;
      color: white;
      padding: 1rem;
      border: 1px solid #444;
      margin-top: 1rem;
      border-radius: 8px;
    }
  
    select, input {
      padding: 0.5rem;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      width: 100%;
      font-size: 1rem;
      background: #111;
      color: white;
      border: 1px solid #555;
    }
  
    label {
      display: block;
      font-size: 0.9rem;
    }
  
    button {
      margin-right: 0.5rem;
      padding: 0.5rem 1rem;
      background: #ff8800;
      border: none;
      color: #111;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
  