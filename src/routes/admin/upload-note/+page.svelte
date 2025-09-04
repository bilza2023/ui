
<script>
  import FormUi from "$lib/formUi/FormUi.svelte"; // your existing FormUi
  export let data;

  // state model
  let state = {
    tcode: data.tcode || "",
    chapter: "",
    exercise: ""
  };

  // options (derived)
  let opts = {
    chapters: data.chapters ?? [],
    exercises: []
  };

  // quick lookup: chapterValue(number) -> slug
  const chapterValueToSlug = new Map(
    (data.chapters ?? []).map(c => [String(c.value), c.slug])
  );

  // FormUi config (kept simple)
  let config = {
    id: "upload-note",
    action: "?/save",
    method: "POST",
    title: "Upload Note",
    initial: { ...state },
    items: [
      { type: "hidden", name: "tcode", value: state.tcode },

      { type: "select", name: "chapter", label: "Chapter",
        options: () => opts.chapters.map(c => ({ value: c.value, label: c.label })),
        disabled: () => !state.tcode
      },

      { type: "select", name: "exercise", label: "Exercise",
        options: () => opts.exercises,
        disabled: () => !state.chapter
      },

      // minimal required fields for action:
      { type: "text", name: "name", label: "Title", placeholder: "Note title" },
      { type: "textarea", name: "noteHtml", label: "Note (HTML)", rows: 8 }
    ],
    submit: { label: "Save" }
  };

  function success(result, v) {
  return {
    ok: true,
    message: `Saved “${v.name}” successfully.`,
    saved: result?.slug,
    values: {
      // keep anchors sticky after save
      tcode: v.tcode,
      chapter: v.chapter,
      exercise: v.exercise,
      status: v.status ?? "",
      // clear authoring fields
      name: "",
      description: "",
      noteHtml: ""
    }
  };
}
  function handleChange({ detail: { name, value } }) {
    if (name === "chapter") {
      // set chapter, reset exercise
      state.chapter = value;
      state.exercise = "";

      const slug = chapterValueToSlug.get(String(value));
      opts.exercises = slug ? (data.exercisesByChapter[slug] || []) : [];

      // reflect into FormUi's initial so it shows cleared exercise instantly
      config.initial = { ...config.initial, chapter: state.chapter, exercise: "" };
      config = { ...config }; // trigger FormUi re-eval (safe nudge)
    }
    else if (name === "exercise") {
      state.exercise = value;
      config.initial = { ...config.initial, exercise: state.exercise };
      // no need to bump config if user changed inside FormUi, but harmless:
      config = { ...config };
    }
  }
</script>

<!-- URL mode note -->
<p style="margin:0 0 .5rem 0; color: var(--secondaryText);">
  Using URL tcode: <code>{data.tcode || '(none)'}</code>. Example: <code>/upload-note?tcode=fbise9mathold</code>
</p>

<div class="py-14">
  <FormUi {config} on:change={handleChange} on:success={success} />

</div>
