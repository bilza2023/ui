
# Student Module & Interactions — Working Spec (draft)

> **Goal:** one simple channel for all student → app communications.
> **Principle:** *One record type (interaction), one client call, tiny per-category endpoints.*

---

## 1) Concepts

* **anchor\_id** *(required)* — UI channel (the Svelte component/surface).
  e.g. `notes:commentBox`, `player:reactionBar`, `form:forgotPassword`.

* **content\_id** *(optional)* — the subject (your global `filename`).
  **Required** for content-bound interactions (content\* categories). Omit for forms.

* **user\_id** *(server-resolved, always set)* — real user if logged in; otherwise an **anon meta-user** created/remembered via `anon_uid` cookie.

* **category** *(string)* — workflow bucket (what backend will do with this record).
  Examples: `contentComment`, `contentReaction`, `contentQuestion`, `forgotPassword`, `studioMessage`.

* **payload\_json** — the entire interaction body (any enums/fields live here).

---

## 2) Minimal schema (current target)

```prisma
model UserInteraction {
  id           String   @id @default(cuid())
  created_at   DateTime @default(now())
  anchor_id    String
  content_id   String?        // filename when content-bound
  user_id      String?
  user         User? @relation(fields: [user_id], references: [id])
  category     String         // workflow name
  payload_json Json
  @@map("user_interactions")
  @@index([user_id, anchor_id], name: "idx_user_anchor")
  @@index([content_id, created_at], name: "idx_content_time")
}
```

*(No `actor_id`. No `tags`. `category` is a free string.)*

---

## 3) API surface (one endpoint per category)

All endpoints accept **JSON** and return `{ ok, id, created_at }` on success.

Common server steps:

1. Resolve `user_id`: token → real user; else **get or create anon meta-user** (persist `anon_uid`).
2. Validate category-specific fields.
3. Insert one `user_interactions` row.

### Endpoints (initial set)

* `POST /api/interactions/contentComment`
  **Body:** `{ anchorId, contentId, payload: { text } }`
  **Rules:** `anchorId` reqd, `contentId` reqd, `text` non-empty & size-capped.

* `POST /api/interactions/contentReaction`
  **Body:** `{ anchorId, contentId, payload: { reactionType } }`
  **Rules:** `anchorId` reqd, `contentId` reqd, `reactionType ∈ {'like','confused',...}`.

* `POST /api/interactions/contentQuestion`
  **Body:** `{ anchorId, contentId, payload: { text } }`
  **Rules:** same as comment; different workflow.

* `POST /api/interactions/forgotPassword`
  **Body:** `{ anchorId: "form:forgotPassword", payload: { email } }`
  **Rules:** `contentId` **not** required; validate email.

* *(Optional)* `POST /api/interactions/studioMessage`
  **Body:** `{ anchorId, contentId?, payload: { text } }`.

**Errors (typical):**
`400` invalid/missing fields • `401` bad/missing token (if endpoint requires) • `500` server error.
Error shape: `{ ok:false, error, reason }`.

---

## 4) Client contract

### StudentService (single entry)

```ts
interaction({ category, anchorId, contentId?, payload? }): Promise<{ ok:true,id,created_at }>
```

* Sends `POST /api/interactions/${category}` with `{ anchorId, contentId?, payload }`.
* Adds `Authorization: Bearer <token>` if available; otherwise server assigns anon.

### Component usage (examples)

* Comment on content:

```json
{ "anchorId":"notes:commentBox", "contentId":"fbise9math_ch16_t16.1.2", "payload":{ "text":"step 2 unclear" } }
```

* Reaction on content:

```json
{ "anchorId":"player:reactionBar", "contentId":"angles_transversals.deck", "payload":{ "reactionType":"like" } }
```

* Forgot password:

```json
{ "anchorId":"form:forgotPassword", "payload":{ "email":"user@example.com" } }
```

---

## 5) Anonymous meta-user (quick rules)

* If no valid token:

  * Read `anon_uid` cookie → if user exists, reuse.
  * Else create `User` (flag `anon` internally), set `anon_uid` (HttpOnly, SameSite=Lax, 1y).
* Always write `user_id` (auth or anon) on every interaction.

---

## 6) Validation cheatsheet

* All categories: `anchorId` required (string).
* **content\***: `contentId` required (string).
* **contentComment / contentQuestion**: `payload.text` non-empty; cap bytes (e.g., 2048).
* **contentReaction**: `payload.reactionType` in allowed set.
* **forgotPassword**: `payload.email` valid; no `contentId`.

---

## 7) Dev notes / hygiene

* Keep `$lib` **out** of server files; use relative imports.
* Per-category `+server.js` keeps files tiny and validation obvious.
* Keep payloads minimal (only fields required by workflow).
* Future pipelines (emailing, attaching to content, moderation) read from `user_interactions` by `category` and `content_id`.

---

## 8) Roadmap (near-term)

* Add `StudentService.interaction()` (client).
* Implement the 3–5 category endpoints.
* Add anon meta-user helper in server utils.
* Wire `CommentBox` / `LikeButton` to call `interaction()` with the new shapes.
* Ship a short README with these examples.
