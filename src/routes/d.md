
{#if activeTop === 'courses'}
  <section class="wrap">
    <h2 class="h">Courses</h2>
    <div class="cards">
      {#each tcodes as row (row.id)}
        <a class="card-link" href={`/syllabus?tcode=${row.slug}`}>
          <UCard
            title={row.name}
            thumbnail={row.image}
          />
        </a>
      {/each}
    </div>
  </section>

{:else if activeTop === 'examples'}
  <section class="wrap">
    <h2 class="h">Examples</h2>
    <div class="cards">
      {#each exampleRows as row (row.id)}
        <UCard
          title={row.title || row.slug}
          href={row.href || undefined}
          thumbnail={row.thumbnail}
          bodyItems={mapToBodyItems(row)}
        />
      {/each}
    </div>
  </section>

{:else} <!-- help -->
  <section class="wrap">
    <h2 class="h">Help</h2>
    <div class="help">
      <p><strong>Stations & MMAs:</strong> A <em>station</em> is a physical location (ABS, PSS, KEF). Each station contains one or more <em>MMAs</em> (Material Management Areas) that hold stock in specific states (e.g., ABS_RAW, PSS_SORTED).</p>
      <p><strong>Lanes:</strong> A lane is a movement path from one MMA to another (e.g., ABS_SCREENED → PSS_SCREENED).</p>
      <p><strong>Core actions:</strong> <em>Dispatch</em> sends material out along a lane; <em>Receive</em> accepts dispatched material; <em>Deposit/Purchase</em> adds stock; <em>Withdraw</em> removes stock.</p>
      <p><strong>How to use:</strong> Pick a tab above. In <em>Courses</em>, choose a course to open its syllabus. In <em>Examples</em>, browse sample questions and decks. In <em>Help</em>, read a short guide to the app’s terms.</p>
    </div>
  </section>
{/if}