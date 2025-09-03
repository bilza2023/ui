<script>
  export let nested = []; // [{ slug, name, chapters:[{ slug, name, exercises:[{ slug, name }] }]}]
</script>

<!-- Keep visual structure; just ensure slug-only references -->
<div class="nested-synopsis">
  {#if !nested || nested.length === 0}
    <p class="muted">No subjects yet. Add a tcode to begin.</p>
  {:else}
    <div class="cards">
      {#each nested as t (t.slug)}
        <article class="card tcode">
          <header class="card-head">
            <h2 class="card-title">{t.name || t.slug}</h2>
            <div class="card-sub">tcode: <code>{t.slug}</code></div>
          </header>

          {#if Array.isArray(t.chapters) && t.chapters.length}
            <div class="chapters">
              {#each t.chapters as ch (ch.slug)}
                <section class="card chapter">
                  <header class="card-head">
                    <h3 class="card-title">{ch.name || ch.slug}</h3>
                    <div class="card-sub">chapter: <code>{ch.slug}</code></div>
                  </header>

                  {#if Array.isArray(ch.exercises) && ch.exercises.length}
                    <ul class="exercises list">
                      {#each ch.exercises as ex (ex.slug)}
                        <li class="exercise row">
                          <div class="label">
                            <span class="name">{ex.name || ex.slug}</span>
                            <span class="sub">exercise: <code>{ex.slug}</code></span>
                          </div>
                          <!-- keep room for future actions without changing layout -->
                          <div class="actions">
                            <!-- buttons/links can be slotted in later (rename/delete/reorder) -->
                          </div>
                        </li>
                      {/each}
                    </ul>
                  {:else}
                    <p class="muted small">No exercises.</p>
                  {/if}
                </section>
              {/each}
            </div>
          {:else}
            <p class="muted">No chapters.</p>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
</div>
