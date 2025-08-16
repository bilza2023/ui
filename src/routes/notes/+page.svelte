<script>
    import { goto } from '$app/navigation';
    export let data;
  
    $: title    = data?.meta?.title ?? 'Notes';
    $: desc     = data?.meta?.description ?? '';
    $: html     = data?.html ?? '';
    $: filename = data?.meta?.filename;
  
    function backToSyllabus() {
      const qs = new URLSearchParams({
        tcode: data?.meta?.tcode ?? ''
      });
      goto(`/syllabus?${qs.toString()}`);
    }
  </script>
  
  <svelte:head>
    <title>{title}</title>
  </svelte:head>
  
  <div class="wrap">
    <header class="top">
      <div class="left">
        <button class="btn" on:click={backToSyllabus}>← Back</button>
        <div class="titles">
          <h1>{title}</h1>
          {#if desc}<p class="desc">{desc}</p>{/if}
        </div>
      </div>
      <div class="right">
        <span class="pill">{filename}</span>
      </div>
    </header>
  
    <article class="note" class:empty={!html}>
      {#if !html}
        <div class="empty">This note is empty.</div>
      {:else}
        <!-- You control the HTML at upload time, so {@html} is acceptable here -->
        <div class="content">{@html html}</div>
      {/if}
    </article>
  </div>
  
  <style>
    :global(body){ background:#1b1205; }
    .wrap{ padding:12px; }
    .top{
      display:flex; align-items:center; justify-content:space-between;
      padding:10px 12px; background:#2E1C02; border:1px solid #3b2606; border-radius:12px;
    }
    .left{ display:flex; align-items:center; gap:12px; }
    .btn{
      padding:6px 10px; border:1px solid #6b4a12; background:#3b2606; color:#e6ccb0; border-radius:8px; cursor:pointer;
    }
    .titles h1{ margin:0; color:#f4e2c7; font-size:1.15rem; }
    .desc{ margin:2px 0 0; color:#d5bd9b; }
    .right .pill{
      background:#2E1C02; color:#e6ccb0; border-radius:999px; font-size:12px; padding:4px 10px; border:1px solid #6b4a12;
    }
  
    .note{
      margin-top:12px; background:#C1B294; border-radius:12px; padding:20px; min-height:60vh;
      color:#1b1205; border:1px solid #e2d4b5;
    }
    .note.empty{ display:flex; align-items:center; justify-content:center; color:#3b2606; }
    .content :global(img){ max-width:100%; height:auto; }
    .content :global(code), .content :global(pre){ background:#f0e5cc; }
    .content :global(a){ color:#0b4dbd; }
  </style>
  