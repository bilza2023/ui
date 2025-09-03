
<script>
    export let data;
    const { tcode, chapter, exercises } = data;
  </script>
  
  <div class="wrap">
    <div class="head">
      <h1>
        Exercises — {tcode.name} <span class="dim">/</span> {chapter.name}
        <span class="slug">({tcode.slug} / {chapter.slug})</span>
      </h1>
     
      <a class="btn" href={`/admin/synopsis/tcode/${tcode.slug}/chapter/${chapter.slug}/exercise/add`}>Add Exercise</a>
    </div>
  
    {#if exercises.length === 0}
      <p class="meta">No exercises yet. Add the first one.</p>
    {:else}
      <ul class="list">
        {#each exercises as ex}
          <li class="row">
            <div class="info">
              <strong>{ex.name}</strong>
              <span class="dim">({ex.slug})</span>
              <span class="dim">· sort {ex.sortOrder}</span>
            </div>
            <div class="actions">
              <a href={`/admin/synopsis/tcode/${tcode.slug}/chapter/${chapter.slug}/exercise/${ex.slug}/edit`}>Edit</a>
              <a href={`/admin/synopsis/tcode/${tcode.slug}/chapter/${chapter.slug}/exercise/${ex.slug}/delete`}>Delete</a>
            </div>
          </li>
        {/each}
      </ul>
    {/if}
  
    <div class="nav">
      <a href={`/admin/synopsis/tcode/${tcode.slug}/chapter`}>← Back to chapters</a>
    </div>
  </div>
  
  <style>
    .wrap {
      max-width: 900px;
      margin: 2rem auto;
      display: grid;
      gap: 1.25rem;
    }
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h1 { margin: 0; color: var(--primaryText); font-size: 1.25rem; }
    .slug { color: var(--secondaryText); font-weight: 400; margin-left: .5rem; }
    .dim { color: var(--secondaryText); margin: 0 .35rem; }
  
    .btn {
      display: inline-flex;
      align-items: center;
      gap: .4rem;
      padding: .5rem .8rem;
      border-radius: 10px;
      text-decoration: none;
      background: var(--primaryColor);
      color: var(--backgroundColor);
      font-weight: 700;
    }
    .btn:hover { opacity: .9; }
  
    .meta { color: var(--secondaryText); }
  
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 1rem;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--surfaceColor);
      border: 1px solid var(--borderColor);
      border-radius: 12px;
      padding: .8rem 1rem;
    }
    .info { color: var(--primaryText); }
    .actions { display: flex; gap: 1rem; }
    .actions a {
      color: var(--primaryColor);
      font-weight: 600;
      text-decoration: none;
    }
    .actions a:hover { text-decoration: underline; }
  
    .nav a { color: var(--primaryColor); text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
  </style>
  