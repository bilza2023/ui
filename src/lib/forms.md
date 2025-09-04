
# Creating Forms in Taleem App

## Why this pattern

* **formKit** handles the **server side**: parsing, validating, calling a service, returning consistent `{ ok, message, values }`.
* **FormUi** handles the **client side**: rendering a full form from config, binding tokens-based styles, sticky values, and enhance-friendly messages.
* Together: every form is consistent, declarative, and error-resistant. No hand-written HTML, no boilerplate parsing.

This solves the two biggest pain points:

1. Manual parsing/validation in each action.
2. Inconsistent form markup, CSS, and sticky values.

---

## Process Overview

Every form in the Taleem app is built in **two coordinated halves**:

1. **Server (`+page.server.js`)**

   * Define a `spec` with `R.*` readers.
   * Optionally `prepare()` values (cross-field logic).
   * Call a service (pure function).
   * Return `success()` and `failure()` payloads.

2. **Client (`+page.svelte`)**

   * Define a config object for FormUi (title, action, fields, submit rules).
   * `<FormUi config={...}/>` renders the form, styled by tokens.css.
   * Banners or toasts show messages from `$page.form`.

---

## Must-Do Sequence (Checklist)

I. **Folder/File setup**

* Place files under `src/routes/.../form-name/`.
* Always use `+page.server.js` (never `+server.js` for actions).
* Add `+page.svelte` for the form UI.

II. **Server side (formKit)**

1. Import `R` and `makeAction`.
2. Write a `spec` using readers (`R.str`, `R.num`, `R.$enum`, etc.).
3. (Optional) Add `prepare(v)` to shape values or auto-generate IDs/slugs.
4. Call the correct service in `service(v)`.
5. Define `success(result, v)` and `failure(err, v)` to shape client messages.
6. Export actions:

   ```js
   export const actions = { save: makeAction({ spec, prepare, service, success, failure }) };
   ```

III. **Client side (FormUi)**

1. Import FormUi: `import FormUi from '$lib/formUi/FormUi.svelte';`
2. Write a config:

   * `id`, `title`, `description`
   * `action: "/route-path?/save"` (must match the server action key)
   * `layout: "stack"` or `"grid-2"`
   * `items`: fields (`type`, `name`, `label`, etc.)
   * `submit`: label + `disabledWhen` logic
   * `clearOnSuccess`: boolean or function for clearing fields
3. Render:

   ```svelte
   <FormUi config={formConfig}/>
   ```
4. Optionally add success/error banners driven by `$page.form`.

IV. **Styling**

* No custom CSS in forms — tokens.css provides consistent theming.
* Only adjust page-level wrappers if needed (e.g. `.wrap { max-width: ... }`).

---

## Benefits

* **Consistency**: every form looks and behaves the same.
* **Less code**: pages only contain config + wrapper div.
* **Safety**: validation is centralized; sticky values + error banners come free.
* **Flexibility**: switch layouts (`stack` vs `grid-2`), auto-clear fields, add custom success hooks.

---

Would you like me to also draft a **1-page “Form Drill” example** (like the upload-note form) that shows the minimal working pair of `+page.svelte` + `+page.server.js`, as a canonical copy-paste template?
