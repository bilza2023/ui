# 📝 Taleem.Help Notes JSON Specification (v1)

## 1  Purpose

These **notes files** capture polished research directly from the textbook.  Each note is a self‑contained HTML‑to‑JSON snapshot that can be rendered by the Svelte `NoteRenderer` or later transformed into decks.  No CSS, JavaScript, or timing metadata is stored here—**only pure content**.

## 2  Top‑Level Shape

```jsonc
{
  "filename": "string  // unique anchor (no extension)",
  "name": "string      // display title",
  "description": "string",
  "tags": ["string"],
  "status": "draft | ready | published | archived",
  "createdAt": "ISO‑8601",
  "editedAt": "ISO‑8601",
  "blocks": [ /* see Section 3 */ ]
}
```

*(Fields may grow, but never disappear — existing parsers remain valid.)*

## 3  `blocks[]` Array

Each block is the JSON mirror of a single structural HTML element.  The minimal contract is:

```ts
interface Block {
  type: "title" | "p" | "image" | "math" | "code" | "table"; // current set
  content: string | TableContent;                                  // payload
}
```

| HTML element       | `type` value | `content` format                                      | Renderer component |
| ------------------ | ------------ | ----------------------------------------------------- | ------------------ |
| `<h1>`             | `title`      | `string`                                              | `Title.svelte`     |
| `<p>…</p>`         | `p`          | RAW HTML string (inline anchors, `<em>`, lists, etc.) | `P.svelte`         |
| KaTeX / LaTeX span | `math`       | LaTeX string (rendered by KaTeX)                      | `Math.svelte`      |
| `<img src="…"/>`   | `image`      | Image URL (absolute or `/images/...`)                 | `Image.svelte`     |
| `js …` fence       | `code`       | Full code literal (language fences optional)          | `Code.svelte`      |
| `<table>…</table>` | `table`      | `{ header: string[], rows: string[][] }`              | `Table.svelte`     |

> The live component map hard‑codes these six types.

### 3.1  Tables

```jsonc
{
  "type": "table",
  "content": {
    "header": ["Col 1", "Col 2"],
    "rows": [
      ["A1", "B1"],
      ["A2", "B2"]
    ]
  }
}
```

## 4  Design Principles

* **Append‑only vocabulary** – new `type` values may be added, but existing ones will **never be removed or altered**.
* **Pure content** – no CSS classes, inline styles, or JavaScript hooks are allowed inside `content`.
* **HTML‑inside‑JSON** – for rich text (lists, inline `<strong>`, etc.) simply embed raw HTML in the `content` string of a `p` block; the renderer sanitises / renders it.
* **Images first‑class** – every `<img>` becomes its own `image` block; captions live in adjacent `p` blocks.
* **One‑way pipeline** – PDF → research → SVG/AI images → `.html` → `.json`.  A later tool may up‑convert `.json` into DeckBuilder slides, but that is optional and out‑of‑scope.

## 5  Gold Standard Example

A minimal but complete file that exercises **every current block type**.

```jsonc
{
  "filename": "angles_sum_note",
  "name": "Sum of Angles in a Triangle — Gold Standard Note",
  "description": "Demonstrates all supported block types in one note.",
  "tags": ["demo", "geometry", "triangle"],
  "status": "ready",
  "createdAt": "2025-08-03T10:00:00Z",
  "editedAt": "2025-08-03T10:00:00Z",
  "blocks": [
    { "type": "title",  "content": "Sum of Angles in a Triangle" },

    { "type": "p",     "content": "According to Euclidean geometry, **the three interior angles of any triangle sum to 180°**." },

    { "type": "image", "content": "/images/triangle.svg" },

    { "type": "math",  "content": "\\angle A + \\angle B + \\angle C = 180^\\circ" },

    { "type": "code",  "content": "// Quick proof sketch in JavaScript\nconst sum = (A, B, C) => A + B + C;\nconsole.log(sum(60, 60, 60)); // 180" },

    { "type": "table", "content": {
      "header": ["Symbol", "Meaning"],
      "rows": [
        ["A, B, C", "Interior angles"],
        ["180°", "Straight angle / half‑turn"]
      ]
    } },

    { "type": "p",     "content": "<em>Note — This gold example proves every renderer branch works.</em>" }
  ]
}
```

---

## 6 GPT Authoring Guidelines for **`.html`** Notes

1. **Stay Inside the Approved Tag Set**
   Use only the elements listed in the current spec:
   `h1` (title), `p`, `img`, `code` (inside `<pre>`), inline math (LaTeX delimiters: `\\( ... \\)` or KaTeX-compatible), and `table`.

   * If you believe another structural tag (e.g., `blockquote`, `hr`, `ul/ol`) is essential, **explicitly call it out in a comment** so the team can add the matching Svelte component later.
   * Never insert CSS classes, inline styles, or JavaScript—content only.

2. **One Logical Flow Per File**
   Begin with exactly one `<h1>` title, then flow top-to-bottom in the order the student should read.

   * Keep each concept self-contained; if the topic needs to branch, start a new file.

3. **Image Discipline**

   * Place every visual as its own `<img src=\"/images/...\" alt=\"…\" />` block on a new line.
   * Follow each image with an explanatory `<p>` or `<math>` line so the renderer can tie meaning to visuals.

4. **Math Blocks**
   Inline math: `\\( a^2 + b^2 = c^2 \\)`
   Display math (stand-alone line):

   ```html
   <p>\\[ E = mc^2 \\]</p>
   ```

   Do **not** wrap equations in custom tags; the renderer parses LaTeX directly from `<p>` content.

5. **Tables**
   Use standard HTML `<table>`, `<thead>`, `<tbody>`. Keep cells text-only (no nested lists or images).

6. **Code Samples**
   Wrap code in a fenced block inside `<pre><code class=\"language-xyz\"> … </code></pre>` exactly—no extra markup.

7. **Zero Presentation Logic**
   Remember: this HTML is the **source of truth** for JSON extraction. Anything non-semantic (layout, styling) is out of scope.

8. **Suggesting New Elements**
   When you notice a pattern that warrants a new tag:

   > `<!-- Suggest: add <blockquote> support for textbook quotes -->`
   > The comment makes the need discoverable without breaking the current pipeline.

9. **Validation Checklist Before Finishing**

   * ✅ One `<h1>` present
   * ✅ No forbidden tags or inline styles
   * ✅ Images use absolute or `/images/...` paths
   * ✅ Math compiles in KaTeX playground
   * ✅ Tables have headers if meaningful
   * ✅ File passes an HTML linter (tidy/beautify) without errors

Follow these rules and your `.html` file will convert cleanly to JSON while remaining forward-compatible as the element vocabulary grows.

## 7  Future Extensions

New structural elements (e.g., `blockquote`, `list`, `hr`) will be introduced **by adding new `type` constants** and corresponding Svelte components.  Existing notes remain fully valid because unrecognised fields are ignored by the parser.

---

*Last updated — 03 Aug 2025.*
