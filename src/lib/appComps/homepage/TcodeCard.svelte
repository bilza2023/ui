<script>
  export let tcodes = []; // [{ tcodeName, description, image }]
  const FALLBACK_IMG = '/images/taleem.webp';

  const hrefFor = (t) => `/syllabus?tcode=${encodeURIComponent(t.tcodeName)}`;
</script>

{#if !tcodes || tcodes.length === 0}
  <div class="empty">No subjects registered yet.</div>
{:else}
  <section class="grid">
    {#each tcodes as t}
      <a class="card" href={hrefFor(t)} title={`Open ${t.tcodeName} syllabus`}>
        <div class="thumb">
          <img src={t.image || FALLBACK_IMG} alt={t.tcodeName} loading="lazy" />
        </div>
        <div class="body">
          <h2 class="title">{t.tcodeName}</h2>
          {#if t.description}<p class="desc">{t.description}</p>{/if}
        </div>
      </a>
    {/each}
  </section>
{/if}

<style>
  .empty{ padding:36px 12px; text-align:center; color:#d5bd9b; }

  .grid{
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap:12px;

    /* keep cards compact; no full-height stretching */
    align-items:start;
    align-content:start;
    grid-auto-rows:max-content;
  }

  .card{
    display:flex; flex-direction:column; gap:10px; text-decoration:none;
    background:#C1B294; border:1px solid #e2d4b5; border-radius:16px; padding:12px; color:#1b1205;
    box-shadow: 0 1px 0 rgba(0,0,0,0.04);
    height:auto; align-self:start;

    /* subtle affordances */
    transition: transform .12s ease, box-shadow .12s ease, border-color .12s ease;
  }
  .card:hover{ transform: translateY(-1px); }
  .card:focus-visible{
    outline:none;
    box-shadow: 0 0 0 3px rgba(234,179,8,0.45);
    border-color:#eab308;
  }

  .thumb{
    height:150px; background:#eedfbe; border-radius:12px; display:flex; align-items:center; justify-content:center;
    overflow:hidden; border:1px solid #e8d9b9;
  }
  .thumb img{ width:100%; height:100%; object-fit:cover; }

  .title{ margin:0; color:#2b1b05; font-weight:700; }
  .desc{ margin:4px 0 0; color:#4a3111; }
</style>
