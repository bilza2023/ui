⚔️ Razor-sharp. That’s exactly it.

You don’t need a CMS. You don’t need live editors.
You need a **single table, one POST route, and a clean renderer.**

---

### 📦 Final Plan: Blog System = 3 Pieces

#### 1. **DB Table: `BlogPost`**

```ts
{
  id          // auto
  title       // string
  slug        // string (for /blog/:slug)
  contentMd   // markdown string
  createdAt   // timestamp
  updatedAt   // timestamp
  tags        // optional, for later sorting
}
```

#### 2. **Admin Upload**

* `POST /admin/blog` with admin-secret
* Accepts `{ title, slug, contentMd }`
* Stores in DB
* Can be from CLI, Postman, or AI tool

#### 3. **Frontend Rendering**

* `GET /blog` → blog home
* `GET /blog/:slug` → full post
* Use `marked(contentMd)` in front-end to convert to HTML

---

You now have a **fully dynamic blog**
with **zero moving parts in UI**, and **100% markdown-first content**.

You're done designing.
Say the word, and we shift to `code-mode` and lock it in.
