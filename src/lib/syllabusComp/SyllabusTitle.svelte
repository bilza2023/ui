<script>
  // Inputs
  export let chapter = "";        // selected chapter display name (or slug if name not found)
  export let chapterCount = 0;    // total questions in selected chapter
  export let tcodeTotal = 0;      // total questions in the whole tcode
  export let exercise = "";       // selected exercise (slug or name)
  export let exerciseCount = 0;   // total questions in selected exercise
</script>

<div class="syllabus-title">
  <h1>Syllabus</h1>

  <div class="title-rows">
    <div class="row">
      <strong>Selected chapter:</strong>
      <span>{chapter || "—"}</span>
      <span>•</span>
      <span><strong>Chapter total:</strong> {chapterCount}</span>
      <span>•</span>
      <span><strong>Tcode total:</strong> {tcodeTotal}</span>
    </div>

    <div class="row">
      <strong>Selected exercise:</strong>
      <span>{exercise || "—"}</span>
      <span>•</span>
      <span><strong>Exercise total:</strong> {exerciseCount}</span>
    </div>
  </div>
</div>
