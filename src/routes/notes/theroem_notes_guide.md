# 📘 Theorem Notes Authoring Guide

This document defines the official pattern for writing theorem content pages using `<main class="notes">`. These notes are used inside the Taleem.Help platform to teach core geometric theorems visually and textually.

---

## ✅ Objective

Create **fully self-contained Svelte pages** using polished HTML structure under:

```html
<main class="notes">
  ... all content here ...
</main>
```

This div is rendered inside a static Svelte route. No Markdown. No conversion. Clean inline HTML only.

---

## ✅ Fixed Page Structure (do not touch)

The following sections **must not be altered or removed**. GPT must only fill the main content:

```html
<svelte:head>
  <link rel="stylesheet" href="/data/css/notes.css">
</svelte:head>

<script>
  import Nav from "$lib/appComps/Nav.svelte";
</script>

<Nav/>
```

---

## ✅ GPT-Generated Region

Only this section is produced by GPT:

```html
<main class="notes">
  ... full page content ...
</main>
```

---

## ✅ Required Sections Inside <main>

These section headings have worked well in gold-standard pages and should be reused unless a strong reason exists to omit:

### 1. `<h1>` Title

Format:

```html
<h1>Theorem 11.1.5 – Parallel-Line Intercept Theorem</h1>
```

### 2. First Image

Place immediately after the `<h1>`. Use the core diagram of the theorem.

```html
<img src="/images/theorems9old_11.1.5.svg" alt="..." style="max-width:50%;" />
```

### 3. Book Statement

Verbatim wording from the textbook (or a polished paraphrase). Use `<h2>Book Statement</h2>` followed by a `<p>`.

### 4. Key Vocabulary

Use an unordered list of definitions with strong tags. Example:

```html
<ul>
  <li><strong>Parallel Lines:</strong> ...</li>
  <li><strong>Transversal:</strong> ...</li>
</ul>
```

### 5. Summary Paragraph (optional)

Explain the intuition of the theorem in 2–3 lines.

### 6. What We Will Prove

```html
<h2>What We Will Prove</h2>
<ol>
  <li>All medians intersect at one point.</li>
  <li>That point divides each median in a 2:1 ratio.</li>
</ol>
```

### 7. Proof Road-Map (Top-Level Steps)

Use a table with columns: Step, Core Idea, Tool Used

```html
<table>
  <thead>
    <tr><th>Step</th><th>Core Idea</th><th>Tool / Theorem Used</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Draw triangle with medians</td><td>Midpoint theorem</td></tr>
  </tbody>
</table>
```

### 8. (Second image)

Re-insert the same diagram image before `Detailed Proof` to help user recall.

### 9. Detailed Proof

Use `<h2>` and multiple `<h3>` sections. GPT is encouraged to be **verboose** and break steps into sub-steps or `<ul>` bullet points.

Every sub-proof step can include illustrations like:

```html
<pre><code class="language-latex">AG = 2 \times GD</code></pre>
```

GPT may suggest new SVG variants to improve clarity.

### 10. Final Footer

```html
<hr>
<small>Generated 2025-08-04.</small>
```

Update date automatically.

---

## ✅ Image Usage Rules

* Use **theorem image twice** — once at top and once before proof.
* Image filenames must follow: `/images/theorems9old_11.1.5.svg`
* You may request extra versions (e.g., highlighted steps) to enhance clarity.

---

## ✅ Examples to Follow

These two pages are locked as gold-standard:

* `theorems9old_11.1.4.svg` + associated `+page.svelte`
* `theorems9old_11.1.5.svg` + associated `+page.svelte`

Use them as templates for future pages.

---

## ❌ Do Not

* Do not return a full Svelte file
* Do not change layout, CSS, or Nav
* Do not omit required sections without strong reason

---

## ✅ Goal

Produce 200+ clean, image-backed, fully walkable theorem explanations for visual learning. Let the proof unfold step by step with images and deep explanation.

---

End of guide.
