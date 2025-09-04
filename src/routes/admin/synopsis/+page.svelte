<script>
  export let data;
  let tcodes = data?.tcodes ?? [];
</script>

<div class="wrap">
<a href="synopsis/tcode/add">Add Tcode</a>


  <h1>Syllabus – Tcodes</h1>

 
  {#if tcodes.length === 0}
    <p>No tcodes found. <a href="/admin/synopsis/tcode/add">Add one</a>.</p>
  {:else}
    <ul class="tcode-list">
      {#each tcodes as t}
        <li class="tcode-item">
          <div class="info">
            <strong>{t.name}</strong> <span class="slug">({t.slug})</span><br/>
            {#if t.description}<span class="desc">{t.description}</span>{/if}
          </div>
          <div class="actions">

            <a href={`/admin/upload-note?tcode=${t.slug}`}>Note</a>
            <a href={`/admin/upload-deck?tcode=${t.slug}`}>Deck</a>
            
            
            
            <a href={`/admin/synopsis/tcode/${t.slug}/chapter`}>Chapters</a>
            
            
            <a href={`/admin/synopsis/tcode/${t.slug}/chapter/add`}>Add Chapter</a>
            <a href={`/admin/synopsis/tcode/${t.slug}/edit`}>Edit</a>
            <a href={`/admin/synopsis/tcode/${t.slug}/delete`}>Delete</a>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .wrap {
    max-width: 800px;
    margin: 2rem auto;
    display: grid;
    gap: 1.5rem;
  }
  h1 { margin: 0; color: var(--primaryText); }

  .tcode-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 1rem;
  }
  .tcode-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--surfaceColor);
    border: 1px solid var(--borderColor);
    border-radius: 12px;
    padding: 1rem;
  }
  .info { color: var(--primaryText); }
  .slug { color: var(--secondaryText); font-size: 0.85rem; }
  .desc { color: var(--secondaryText); font-size: 0.9rem; }
  .actions { display: flex; gap: 1rem; }
  .actions a {
    color: var(--primaryColor);
    font-weight: 600;
    text-decoration: none;
  }
  .actions a:hover { text-decoration: underline; }
</style>
