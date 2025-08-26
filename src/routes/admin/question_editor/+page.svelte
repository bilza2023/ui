<script>
    import Nav from "$lib/appComps/Nav.svelte";
    import AdminNav from "$lib/components/AdminNav.svelte";
    import '$lib/styles/forms.css';
  
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import QuestionEditor from "./QuestionEditor.svelte";
  
    let filename = "";
    let loading = true;
    let error = "";
    let saved = false;
  
    /** @type {any|null} */
    let question = null;
  
    // download links
    $: downloadQuestionHref = question
      ? "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(question, null, 2))
      : "";
    $: downloadDeckHref = question?.type === "deck" && question?.deck
      ? "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(question.deck, null, 2))
      : "";
  
    onMount(async () => {
      filename = $page.url.searchParams.get("filename") ?? "";
      if (!filename) {
        error = "Missing ?filename=… in URL."; loading = false; return;
      }
      await fetchQuestion();
    });
  
    async function fetchQuestion() {
      loading = true; error = ""; saved = false;
      try {
        const res = await fetch(`/admin/question_editor?filename=${encodeURIComponent(filename)}`);
        if (!res.ok) {
          error = `Load failed (${res.status}).`;
          question = null;
        } else {
          const data = await res.json();
          question = data?.question ?? null;
          if (!question) error = "Question not found.";
        }
      } catch (e) {
        error = String(e);
        question = null;
      } finally {
        loading = false;
      }
    }
  
    async function handleSave(e) {
      if (!question) return;
      saved = false; error = "";
      try {
        const res = await fetch(`/admin/question_editor?filename=${encodeURIComponent(question.filename)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e.detail?.payload ?? {})
        });
        if (!res.ok) {
          const msg = await res.text().catch(() => "");
          throw new Error(`Save failed (${res.status}): ${msg || "unknown error"}`);
        }
        const data = await res.json();
        question = data?.question ?? question;
        saved = true;
      } catch (ex) {
        error = String(ex);
      }
    }
  </script>
  
  <Nav />
  <AdminNav />
  
  <div class="wrap">
    <header class="pagehead">
      <h1>Question Editor</h1>
      {#if question}
        <div class="hint"><code>{question.filename}</code> · <em>{question.type}</em></div>
      {/if}
    </header>
  
    {#if loading}
      <div class="note ok">Loading…</div>
    {:else if error}
      <div class="note err">{error}</div>
    {:else if !question}
      <div class="note err">Not found.</div>
    {:else}
      {#if saved}
        <div class="note ok">Saved.</div>
      {/if}
  
      <div style="padding:0 60px">
        <QuestionEditor {question} on:save={handleSave} />

      </div>
  
      <section class="block" style="margin-top:1rem;">
        <div class="form-grid">
          <div class="field">
            <label>Download Question JSON</label>
            <a class="primary" download={`${question.filename}.question.json`} href={downloadQuestionHref}>Download</a>
          </div>
          {#if downloadDeckHref}
            <div class="field">
              <label>Download Deck JSON</label>
              <a class="primary" download={`${question.filename}.deck.json`} href={downloadDeckHref}>Download</a>
            </div>
          {/if}
        </div>
      </section>
    {/if}
  </div>
  