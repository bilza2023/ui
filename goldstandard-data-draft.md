# Gold Standard Data — Draft Specification

This document outlines the blueprint for building and maintaining a **Gold Standard Data Set** for the Taleem.Help ecosystem. This set will serve as the **definitive reference** for all developers, GPTs, validators, and automated tools that interact with or generate educational content.

---

## 🎯 Purpose

Gold Standard Data defines:

* The most accurate and structurally correct examples of each system’s data model
* All surface-level enums and API shapes, across modules
* A centralized spec for validation, testing, and generation logic

This is NOT just documentation. This is **contract-level truth**.

---

## 🧱 Core Components

### 1. ✅ Perfect Slideset Examples (`goldstandard/slides/`)

Each example must:

* Be 100% valid (passes `deckbuilder.validate()` or `eqbuilder.build()`)
* Represent common structural patterns (e.g. SP + math, theme blocks, radio slides)
* Be hand-verified for clarity, timing, structure
* Include metadata or comments to explain the pattern intent

Naming:

```txt
slide-example-title-only.json
slide-example-theme+bullets.json
slide-example-radio-slide.json
slide-example-eqs+sp-title.json
```

### 2. 📜 API Surface: Enums and Minimal Specs (`goldstandard/enums/`)

Every library or subsystem must provide:

* A 1-page TypeScript-like enum and interface dump
* All values actually used in production code
* Optional: `.md` comments to describe intent

Examples:

```ts
// deckbuilder-slide-types.ts
type SlideType = "canvas" | "eqs" | "radio" | "quiz";

// question-types.ts
type QuestionType = "eq" | "mcq" | "truefalse";

// sp-component-types.ts
type SpComponent = "title" | "text" | "math" | "image" | "table";
```

These enums are final unless formally extended.

### 3. 📄 Mini API Snapshots (`goldstandard/apis/`)

One `.md` file per system. Each should include:

* API methods
* Example usage
* Return format
* Rules of use (required vs optional props)
* What to NEVER do (anti-patterns)

Example files:

* `deckbuilder-api.md`
* `eqbuilder-api.md`
* `slideplayer-protocol.md`
* `spbuilder-api.md`
* `syllabus-format.md`

These should act like GPT-facing Swagger specs.

### 4. ⚖️ Gold Standard Validation Rules (`goldstandard/rules/`)

Codified checklist-style rules such as:

* Every `slide` must have `type`, `startTime`, `endTime`
* SP arrays must only include known components
* EqBuilder slides must be time-ordered
* No `undefined` props or dangling references

Each rule can eventually be auto-checked by:

```sh
workshop check gold
```

---

## 🛠️ Implementation Steps

### Step 1: Create folder structure under `workshop/goldstandard/`

```txt
goldstandard/
  slides/
  enums/
  apis/
  rules/
```

### Step 2: Migrate best handcrafted test cases into `slides/`

* Use real educational content
* Annotate with inline comments or metadata where helpful

### Step 3: Extract all relevant enums/types from:

* Canvas DeckBuilder
* EqBuilder
* SlidePlayer
* Question.js
* Syllabus.ts

Dump as `.ts` or `.json` snapshots in `enums/`

### Step 4: Create 1-page API specs for each system

* Reference current docs
* Normalize format
* Keep it human and GPT readable

### Step 5: Define validation rules

* Convert existing `validate.ts` logic into checklist format
* Add human-readable `.md` version
* Hook into `workshop check` CLI

---

## 📌 Notes

* This is not code — this is contract data.
* Nothing in here should break silently.
* This folder is the *authority* — everything else adapts.

Version control it separately if needed.
Every new feature should be reflected here FIRST — then built around.

---

## 🌟 Vision

A system so well-defined that:

* Any GPT can read this folder and produce valid content
* Any new developer knows exactly what’s allowed
* Any CLI or test can validate or lint against these specs
* You never need to “check code” to know what’s true

This is not overhead — this is clarity.

---

**Version:** Draft 1.0
**Location:** `workshop/goldstandard/`

Let this become the bedrock of Taleem.Help’s future. 🧱
