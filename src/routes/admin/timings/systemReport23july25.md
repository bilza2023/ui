# Taleem.Help — System Report (23 July 2025)

## 1  Executive Summary

The 23 July refactor establishes **Question** as the sole atomic content unit, introduces a dual-layer storage model (structured SQL **plus** canonical JSON), and debuts **DeckDoctor** for schema validation. These shifts unify authoring, editing, and playback pipelines while preserving future extensibility.

---

## 2  Schema Pivot: `Question` over `Deck`

* **Before:** *Deck* implied a slideshow but blurred the line between a single problem, its explanation, and supporting assets.
* **After:** *Question* (keyed by `filename`) encapsulates all content—slides, images, narration cues—making intent explicit and simplifying API semantics.

### Key Benefits

I.  Consistent identity anchor.
II. Cleaner service names (`questionService`).
III. Simplifies uploads, versioning, and links.

---

## 3  Dual-Layer Storage Strategy

| Layer                 | Stored In                         | Purpose                                         |
| --------------------- | --------------------------------- | ----------------------------------------------- |
| **Canonical JSON**    | `question.deck` column            | Loss-less snapshot for playback & regeneration. |
| **Relational Tables** | `question`, `slide`, `slide_item` | Granular edits, analytics, fast queries.        |

The JSON blob can fully recreate the relational rows; conversely, the tables can rebuild the blob—guaranteeing resilience.

### Table Details

1. **`question`** – metadata + full deck JSON.
2. **`slide`** – one row per slide (`start`, `end`, `type`).
3. **`slide_item`** – every visual token (`showAt`, text, image, value…).
   Structure (timings, positions) is isolated from meaning (labels, text), enabling safe localisation and retiming.

---

## 4  DeckDoctor v1

A lightweight internal utility that currently:

* Uses **Zod** (`ZodAQuestionV1`) to validate any incoming deck JSON.
* Ensures backwards compatibility before data hits the DB.

Planned roadmap:
I. Auto-repair common schema issues.
II. Provide CLI and CI hooks for content QA.
III. Export human-readable diagnostics.

---

## 5  Module Impact Matrix

| Module                 | Change                                     | Status     |
| ---------------------- | ------------------------------------------ | ---------- |
| **questionServices**   | New upsert & selective JSON update methods | **Done**   |
| **Player pages**       | Now fetch from DB via `questionService`    | **Done**   |
| **Timings page**       | Converted GET/POST to DB endpoints         | **Done**   |
| **DeckBuilder**        | No change (remains authoring tool)         | Unaffected |
| **Editor UI (future)** | Gains row-level edit potential             | Pending    |

---

## 6  Risks & Mitigations

I. **SQLite JSON Query Limits** – heavy analysis may require external processing or migration to PostgreSQL.
II. **DeckDoctor Scope Creep** – keep it validation-only until success criteria are defined.
III. **Migration Scripts** – older decks must pass through DeckDoctor before import.

---

## 7  Next Steps

1. Build minimal Editor UI leveraging `slide` and `slide_item` tables.
2. Expand DeckDoctor with repair commands and CI integration.
3. Evaluate JSON query performance; prototype analytics queries.

---

*Prepared by ChatGPT — 23 July 2025*
