<script>
  export let data;
  $: tcodes    = Array.isArray(data?.tcodes) ? data.tcodes : [];
  $: tcode     = data?.tcode ?? '';
  $: chapters  = Array.isArray(data?.chapters) ? data.chapters : [];
  $: chapter   = data?.chapter ?? '';
  $: exercises = Array.isArray(data?.exercises) ? data.exercises : [];

  let ordered = exercises.map(e => e.slug).join(',');
  $: ordered = exercises.map(e => e.slug).join(',');
</script>

<div class="page admin-synopsis">
  <h1>Exercises</h1>

  <form method="GET" class="row">
    <label>Tcode
      <select name="tcode">
        {#each tcodes as t (t.slug)}
          <option value={t.slug} selected={t.slug===tcode}>{t.slug}</option>
        {/each}
      </select>
    </label>
    <label>Chapter
      <select name="chapter">
        {#each chapters as c (c.slug)}
          <option value={c.slug} selected={c.slug===chapter}>{c.slug}</option>
        {/each}
      </select>
    </label>
    <button class="btn" type="submit">Switch</button>
  </form>

  <section class="cards-row">
    <!-- Add -->
    <div class="card">
      <h3>Add Exercise</h3>
      <form method="POST" action="?/addExercise" class="stack">
        <input type="hidden" name="tcode" value={tcode} />
        <input type="hidden" name="chapterSlug" value={chapter} />
        <label>Name <input name="name" placeholder="Scientific Notation" required /></label>
        <button class="btn">Add</button>
      </form>
    </div>

    <!-- Rename -->
    <div class="card">
      <h3>Rename Exercise</h3>
      <form method="POST" action="?/renameExercise" class="stack">
        <input type="hidden" name="tcode" value={tcode} />
        <label>Exercise
          <select name="exerciseSlug">
            {#each exercises as e (e.slug)}<option value={e.slug}>{e.slug}</option>{/each}
          </select>
        </label>
        <label>New Name <input name="name" placeholder="New name" /></label>
        <label>New Slug <input name="newSlug" placeholder="new-exercise-slug" /></label>
        <input type="hidden" name="chapterSlug" value={chapter} />
        <button class="btn">Rename</button>
      </form>
    </div>

    <!-- Delete -->
    <div class="card">
      <h3>Delete Exercise</h3>
      <form method="POST" action="?/deleteExercise" class="stack">
        <input type="hidden" name="tcode" value={tcode} />
        <label>Exercise
          <select name="exerciseSlug">
            {#each exercises as e (e.slug)}<option value={e.slug}>{e.slug}</option>{/each}
          </select>
        </label>
        <input type="hidden" name="chapterSlug" value={chapter} />
        <button class="btn">Delete</button>
      </form>
    </div>
  </section>

  <div class="card" style="margin-top:18px;">
    <h3>Reorder Exercises</h3>
    <form method="POST" action="?/reorderExercises" class="stack">
      <input type="hidden" name="tcode" value={tcode} />
      <input type="hidden" name="chapterSlug" value={chapter} />
      <label>Order (comma slugs)
        <input name="ordered" bind:value={ordered} />
      </label>
      <button class="btn">Save Order</button>
    </form>
    <p class="muted small">Current: {exercises.map(e => e.slug).join(', ')}</p>
  </div>
</div>
