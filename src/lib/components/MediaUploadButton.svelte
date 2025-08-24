<script>
    import { createEventDispatcher } from 'svelte';
  
    // Props
    export let label   = 'Upload';
    export let target  = 'images';                 // 'images' | 'sounds'
    export let accept  = 'image/*';                // e.g. ".mp3,.wav,.ogg,.opus"
    export let multiple = true;
    export let endpoint = '/admin/settings';       // your POST endpoint
  
    const dispatch = createEventDispatcher();
    let inputEl;
    let uploading = false;
  
    function pick() { inputEl.click(); }
  
    async function onPick(e) {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
  
      uploading = true;
      const fd = new FormData();
      fd.set('target', target);
      for (const f of files) fd.append('files', f, f.name);
  
      let ok=false, json=null, error=null;
      try {
        const res = await fetch(endpoint, { method: 'POST', body: fd });
        json = await res.json().catch(() => ({}));
        ok = res.ok;
      } catch (err) {
        error = String(err);
      } finally {
        uploading = false;
        inputEl.value = '';
        dispatch('done', { ok, ...(json||{}), error });
      }
    }
  </script>
  
  <button type="button" class="upload-btn" aria-busy={uploading} disabled={uploading} on:click={pick}>
    {#if uploading}<span class="spinner" aria-hidden="true"></span>{/if}
    <span>{label}</span>
  </button>
  
  <input
    bind:this={inputEl}
    type="file"
    accept={accept}
    {multiple}
    hidden
    on:change={onPick}
  />
  
  <style>
    /* Token-based, local-only styles (no outer classes needed) */
    .upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1rem;
      border-radius: 0.75rem;
      border: 1px solid var(--borderColor);
      background: var(--primaryColor);
      color: #fff; /* best contrast over primary */
      font-weight: 600;
      cursor: pointer;
      transition: transform 120ms ease, filter 120ms ease, box-shadow 120ms ease;
      text-decoration: none;
      user-select: none;
    }
    .upload-btn:hover { transform: translateY(-1px); filter: brightness(1.05); }
    .upload-btn:active { transform: translateY(0); }
    .upload-btn:disabled { opacity: 0.6; cursor: default; transform: none; }
    .upload-btn:focus-visible {
      outline: 2px solid var(--accentColor);
      outline-offset: 2px;
    }
  
    /* subtle dark-theme border lift (tokens already define colors) */
    :global(.theme-dark) .upload-btn {
      border-color: color-mix(in oklab, var(--primaryColor) 30%, var(--borderColor));
    }
  
    /* tiny spinner using currentColor */
    .spinner {
      width: 1em;
      height: 1em;
      border-radius: 50%;
      border: 2px solid currentColor;
      border-right-color: transparent;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
  