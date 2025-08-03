
# 📝 Taleem.Help Notes JSON Specification (v1)

## 1  Purpose

All **notes** are plain `.json` files containing polished textbook research.  
They load directly into Svelte’s `Notes.svelte` renderer—**no HTML**, **no Markdown**, **no conversion layer**.

## 2  Top-Level Shape

```jsonc
{
  "filename": "string",               // unique anchor (snake_case, no extension)
  "name": "string",                   // display title
  "description"?: "string",           // optional summary
  "tags"?: ["string"],                // searchable labels
  "status"?: "draft|ready|published", // workflow state
  "createdAt"?: "ISO-8601 timestamp", // when first authored
  "editedAt"?: "ISO-8601 timestamp",  // when last modified
  "blocks": [ /* see Section 3 */ ]
}
````

> Fields may grow in future versions but will **never** be removed to preserve backward compatibility.

## 3  `blocks[]` Array

Each element of `blocks` is one **atomic** unit. Supported block types:

| `type`  | Required Props                           | Renderer Component |
| ------- | ---------------------------------------- | ------------------ |
| `title` | `content: string`                        | `Title.svelte`     |
| `p`     | `content: string`                        | `P.svelte`         |
| `image` | `src: string`<br>`alt: string`           | `Image.svelte`     |
| `table` | `header: string[]`<br>`rows: string[][]` | `Table.svelte`     |
| `code`  | `content: string`<br>`lang?: string`     | `Code.svelte`      |

> *Example: image block uses top‐level `src`/`alt`, not a nested `content` field.*&#x20;
> *Example: table block uses top‐level `header`/`rows`.*&#x20;

### 3.1  Append-Only Vocabulary

* New block `type` values (e.g. `quote`, `math`, `list`) may be **added** over time.
* **Existing** types will **never** be removed or redefined.

## 4  Design Principles

1. **Pure JSON** — no inline styles, CSS classes, or timing metadata.
2. **One-way pipeline** — author in JSON; downstream tools consume but never mutate.
3. **Atomicity** — each paragraph, image, table, or code snippet is its own block.
4. **Filename = Identity** — the `filename` field anchors all related assets (JSON, images, future decks).

## 5  Gold-Standard Sample

```jsonc
{
  "filename": "triangle_medians_note",
  "name": "Medians of a Triangle Are Concurrent",
  "tags": ["geometry","triangle","median"],
  "status": "ready",
  "createdAt": "2025-08-03T12:00:00Z",
  "editedAt": "2025-08-03T12:00:00Z",
  "blocks": [
    { "type": "title",   "content": "Medians of a Triangle Are Concurrent" },
    { "type": "p",       "content": "Every triangle’s medians intersect at the <strong>centroid</strong>." },  
    { "type": "image",   "src": "/images/theorems9old_11.1.4.svg", "alt": "Triangle with medians" },  
    { "type": "p",       "content": "The centroid divides each median in a 2 : 1 ratio (vertex → centroid : centroid → midpoint)." },
    { "type": "code",    "lang": "latex", "content": "AG = 2 \\times GD" },
    { "type": "table",   "header": ["Term","Definition"], "rows": [
        ["Concurrent","Lines intersecting at one point"],
        ["Centroid","Intersection of median lines"]
      ]
    }
  ]
}
```

> This matches exactly the patterns in **`fbise9mathold_theorem_11.1.4.json`** (paragraphs and titles use `content`) .

## 6  Authoring Checklist

* ✅ Unique, snake\_case `filename`.
* ✅ Exactly one `title` block at the top.
* ✅ Paragraphs (`p`) and titles (`title`) carry text under `content`.
* ✅ Images use `src` + `alt` at the block root.
* ✅ Tables use top-level `header` & `rows`.
* ✅ Code blocks include `content` and optional `lang`.
* ✅ No presentation logic in JSON—styles belong in components.

---

*Last updated: 03 Aug 2025.*
Future extensions will appear in **v2**, but **v1** notes remain evergreen.
