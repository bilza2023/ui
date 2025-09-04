<script>
  import FormUi from "$lib/formUi/FormUi.svelte";
  export let data;

  let state = {
    tcode: data.tcode || "",
    chapter: "",
    exercise: ""
  };

  let opts = {
    chapters: data.chapters ?? [],
    exercises: []
  };

  const chapterValueToSlug = new Map((data.chapters ?? []).map((c) => [String(c.value), c.slug]));

  let config = {
    id: "upload-deck",
    action: "?/save",
    method: "POST",
    title: "Upload Deck (paste JSON)",
    initial: { ...state },
    items: [
      { type: "hidden", name: "tcode", value: state.tcode },

      {
        type: "select",
        name: "chapter",
        label: "Chapter",
        options: () => opts.chapters.map((c) => ({ value: c.value, label: c.label })),
        disabled: () => !state.tcode
      },

      {
        type: "select",
        name: "exercise",
        label: "Exercise",
        options: () => opts.exercises, // label=name, value=slug
        disabled: () => !state.chapter
      },

      { type: "text", name: "name", label: "Title", placeholder: "Deck title" },
      { type: "textarea", name: "description", label: "Description", rows: 4 },
      { type: "textarea", name: "deckJson", label: "Deck JSON", rows: 12, placeholder: "{ \"deck\": [...] }" }
    ],
    submit: { label: "Save" }
  };

  function handleChange({ detail: { name, value } }) {
    if (name === "chapter") {
      state.chapter = value;
      state.exercise = "";

      const slug = chapterValueToSlug.get(String(value));
      opts.exercises = slug ? (data.exercisesByChapter[slug] || []) : [];

      config.initial = { ...config.initial, chapter: state.chapter, exercise: "" };
      config = { ...config };
    } else if (name === "exercise") {
      state.exercise = value;
      config.initial = { ...config.initial, exercise: state.exercise };
      config = { ...config };
    }
  }
</script>

<p style="margin:0 0 .5rem 0; color: var(--secondaryText);">
  Using URL tcode: <code>{data.tcode || '(none)'}</code>. Example: <code>/upload-deck?tcode=fbise9mathold</code>
</p>

<FormUi {config} on:change={handleChange} />
