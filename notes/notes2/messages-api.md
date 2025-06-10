# Messages API — Gold Standard Reference

This document defines the schema, access rules, and expected behavior for the `/messages` API, used to collect and review structured message data from users, admins, or system events. Messages form a critical part of AbdulNet’s feedback pipeline.

---

## 🎯 Purpose

* Enable students (or any user) to **write** structured feedback, confusion points, or issues
* Allow admins to **read** all messages with filtering and structure
* Preserve clarity and enforce protocol via strict enums and validation

---

## 🛣️ API Routes

### `POST /messages`

**Use:** Called by students or users (can be anonymous or JWT-authenticated)

**Expected body:**

```json
{
  "senderType": "student",              // required, enum
  "content": "I didn’t understand this concept.",
  "tags": "confusion,eqplayer",         // optional, comma-separated
  "props": {
    "origin": "eqplayer",
    "tcodeRef": "fbise9physics:1.1:3"
  },
  "userId": "usr_xyz",                  // optional, auto-populated from JWT if absent
  "sessionId": "sess_abc"                // optional, for anonymous tracking
}
```

**Success Response:**

```json
{ "ok": true, "messageId": "msg_1234" }
```

---

### `GET /messages`

**Use:** Admin-only route for reviewing message data

**Query parameters:**

* `tag=confusion`
* `origin=canvas`
* `limit=50`
* `sort=desc`

**Success Response:**

```json
[
  {
    "senderType": "student",
    "content": "Equation was confusing.",
    "tags": "confusion,eqplayer",
    "props": { "origin": "eqplayer", "tcodeRef": "fbise9:1.2:4" },
    "userId": "usr_abc",
    "sessionId": "sess_123",
    "createdAt": "2025-06-08T12:34:56Z"
  }
]
```

---

## 🔠 Enums and Protocols

### `senderType` (required)

```ts
"student" | "admin" | "system"
```

### `tags` (comma-separated string, enforced list)

```ts
"confusion" | "feedback" | "quiz" | "ui-bug" | "request" | "narration-issue" | "slide-error"
```

### `props.origin` (optional, string)

```ts
"eqplayer" | "canvas" | "syllabus" | "quiz" | "editor"
```

### `props.tcodeRef` (optional)

String reference to the affected object in `tcode` form, e.g.:

```ts
"fbise9physics:1.1:Q3"
```

### Optional fields:

* `userId` → added by system if JWT is present
* `sessionId` → added if available on frontend
* `createdAt` → always generated server-side

---

## 🧪 Validation Rules

* `senderType` must be present and match enum
* `content` must be non-empty
* `tags`, if present, must be comma-separated valid values
* `props`, if present, must be an object
* `userId` and `sessionId` are optional but tracked if provided
* Only admins may call `GET /messages`

---

## 🚫 Anti-Patterns

* ❌ Don’t send unknown tags
* ❌ Don’t guess `tcodeRef` — it must be known from UI context
* ❌ Don’t skip `senderType`
* ❌ Don’t access GET endpoint without admin privileges

---

## 🌐 Integration Notes

* Frontend can call `POST /messages` directly on confusion, quiz fail, or feedback
* Admin UI will consume `GET /messages` with filters
* AbdulNet will process the messages regularly via `workshop sync`

---

**Version:** 1.0
**Location:** `workshop/goldstandard/apis/messages-api.md`

This is a stable interface and should be honored across all subsystems. If this schema changes, all generating systems must update accordingly.
