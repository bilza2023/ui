<script>
  export let tcodes = []; // [{ tcodeName, description?, image? }]
  const FALLBACK_IMG = '/images/taleem.webp';
  const hrefFor = (t) => `/syllabus?tcode=${encodeURIComponent(t.tcodeName)}`;

  const META_COLOR = '#2E1C02';
  const META_ICON  = '👨‍🎓';
</script>

{#if !tcodes || tcodes.length === 0}
  <p class="no-questions">No subjects registered yet.</p>
{:else}
  <!-- Background band like HomeIndex -->
  <section class="paper">
    <div class="wrap">
      <div class="tcode-row">
        {#each tcodes as t (t.tcodeName)}
          <a class="card" href={hrefFor(t)} title={`Open ${t.tcodeName} syllabus`}>
            <img class="thumb" src={t.image || FALLBACK_IMG} alt={t.tcodeName} loading="lazy" />
            <div class="title">
              <span style="font-size:1.1rem">{META_ICON}</span>&nbsp;<span>{t.tcodeName}</span>
            </div>
            <!-- {#if t.description}<div class="caption">{t.description}</div>{/if} -->
          </a>
        {/each}
      </div>
    </div>
  </section>
{/if}

<style>
  /* Full-width background band (match HomeIndex light brown) */
  .paper{
    background:#C1B294;               /* rgb(193,178,148) */
    border-top:1px solid #bca984;     /* subtle separators */
    border-bottom:1px solid #bca984;
    padding:24px 0;
  }

  /* Centered inner container like HomeIndex */
  .wrap{
    width:min(1200px, 100%);
    margin:0 auto;
    padding:0 16px;
  }

  /* Pure flex row, no equal-height stretch */
  .tcode-row{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    align-items:flex-start;   /* prevent stretch */
    gap:1rem;
    width:100%;
  }

  .card{
    display:flex;
    flex-direction:column;
    align-self:flex-start;    /* keep natural height */
    height:auto;
    border-radius:0.75rem;
    overflow:hidden;
    border:4px solid #6C430B;
    box-shadow:0 8px 8px rgba(45,44,44,0.8);
    text-decoration:none;
    color:inherit;
    max-width:320px;
    transition:transform .12s ease, box-shadow .12s ease;
    flex: 0 0 300px;  /* ← surgical fix */
    width: 300px;     /* optional but helps avoid layout jitter */
  }
  .card:hover{
    transform:translateY(2px);
    box-shadow:0 10px 10px rgba(21,42,0,0.9);

  }

  .thumb{
    width:100%;
    height:160px;
    object-fit:cover;
    background:#f0f0f0;
    flex-shrink:0;
    border-top-left-radius:0.75rem;
    border-top-right-radius:0.75rem;
  }

  .title{
    color:#d5bd9b;
    background:#6C430B; /* inline override keeps it in sync */
    padding:0.6rem;
    font-size:0.95rem;
    margin-top:0;       /* don't push card taller */
  }

  .caption{
    padding:0.6rem;
    color:#6C430B;
    font-size:0.9rem;
    background:#fffcef;
  }

  .no-questions{ color:#331f04; font-size:1rem; text-align:center; }
</style>
