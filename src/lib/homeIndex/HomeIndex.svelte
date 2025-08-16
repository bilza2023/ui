<script>
  import { onMount } from "svelte";
  import { listTcodes } from "$lib/services/synopsisServeces.js";

  const FALLBACK_IMG = "/images/taleem.webp";

  let tcodes = [];
  let q = ""; // local search (client-only)

  onMount(() => {
    // listTcodes is client-safe and synchronous
    tcodes = listTcodes(); // [{ tcodeName, description, image }]
  });

  function hrefDecks(t) {
    return `/subject?tcode=${encodeURIComponent(t.tcodeName)}&type=deck`;
  }

  $: filtered = (tcodes ?? []).filter((t) => {
    if (!q) return true;
    const s = (t.tcodeName + " " + (t.description || "")).toLowerCase();
    return s.includes(q.toLowerCase());
  });
</script>

<div class="wrap">
  <header class="bar">
    <h2>Videos</h2>
    <input
      class="search"
      type="search"
      placeholder="Search subjects…"
      bind:value={q}
    />
  </header>

  {#if filtered.length === 0}
    <div class="empty">No subjects match your search.</div>
  {:else}
    <div class="grid">
      {#each filtered as t}
        <a class="card" href={hrefDecks(t)} title={`Browse videos in ${t.tcodeName}`}>
          <div class="thumb">
            <img src={t.image || FALLBACK_IMG} alt={t.tcodeName} loading="lazy" />
            <div class="badge">Decks</div>
          </div>
          <div class="body">
            <div class="title">{t.tcodeName}</div>
            {#if t.description}<div class="desc">{t.description}</div>{/if}
          </div>
          <div class="cta">Open →</div>
        </a>
      {/each}
    </div>
  {/if}
</div>

<style>
  .wrap { display:flex; flex-direction:column; gap:12px; }
  .bar {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 12px; background:#2E1C02; border:1px solid #3b2606; border-radius:12px;
    color:#f4e2c7;
  }
  .bar h2 { margin:0; }
  .search {
    min-width:240px; padding:6px 10px; border:1px solid #6b4a12; border-radius:8px;
    background:#3b2606; color:#e6ccb0;
  }

  .empty { padding:36px 12px; text-align:center; color:#d5bd9b; }

  .grid {
    display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap:12px;
  }
  .card {
    display:flex; flex-direction:column; gap:10px; text-decoration:none;
    background:#C1B294; border:1px solid #e2d4b5; border-radius:16px; padding:12px; color:#1b1205;
    box-shadow: 0 1px 0 rgba(0,0,0,0.04);
  }
  .card:hover { transform: translateY(-1px); transition: transform .12s ease; }

  .thumb {
    position:relative;
    height:150px; background:#eedfbe; border-radius:12px; overflow:hidden;
    border:1px solid #e8d9b9; display:flex; align-items:center; justify-content:center;
  }
  .thumb img { width:100%; height:100%; object-fit:cover; }
  .badge {
    position:absolute; top:8px; left:8px;
    background:#0c0535; color:#dcd6ff; border:1px solid rgba(255,255,255,0.12);
    border-radius:999px; font-size:12px; padding:2px 8px;
  }
  .title { font-weight:700; color:#2b1b05; }
  .desc { color:#4a3111; }
  .cta {
    margin-top:auto; align-self:flex-start; background:#2E1C02; color:#e6ccb0;
    border:1px solid #6b4a12; border-radius:999px; font-size:12px; padding:4px 10px;
  }
</style>
