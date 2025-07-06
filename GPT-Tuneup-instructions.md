Here is the full writeup of the **DeckBuilder Output Cleanup Task** — summarizing the problem, cause, and how to fix it across your documentation.

---

## 🧹 Cleanup Task: Remove Import and Export Lines from GPT Output

### ✅ **Problem**

Current slide code output includes the following boilerplate by default:

```js
import { DeckBuilder } from "taleem-pivot-deckbuilder";
const deckbuilder = new DeckBuilder();
...
export const deck = deckbuilder.build();
```

You want to **remove** these lines from GPT output, so only the **slide content** is emitted.

---

### 🧠 **Root Cause**

This pattern is learned from the following sources in your training documents:

#### 1. `GPT-instructions.md`

* Section: `📄 Example Output`
* Shows full code block including `import`, `const`, and `export` lines
* This is the **primary source** of learned behavior

#### 2. `README.md`

* Section: `📄 Quickstart Example`
* Repeats same code block including top and bottom boilerplate

#### 3. `api.md`

* Section: `🛠 Creating a Deck`
* Shows same import/build structure

---

### ✅ **Fix Instructions**

To stop GPT from generating these 3 lines:

#### 🛠 Step 1: Edit `GPT-instructions.md`

1. In section: **`📄 Example Output`**
   Replace:

   ```js
   import { DeckBuilder } from "taleem-pivot-deckbuilder";
   const deckbuilder = new DeckBuilder();
   ...
   export const deck = deckbuilder.build();
   ```

   With:

   ```js
   // Only include slide construction code — no import/export needed
   ```

2. Add this to **🔒 Locked Rules**:

   ```
   IX. ❌ Do not include import or export lines in generated code
   ```

---

#### 🛠 Step 2: (Optional) Edit `README.md` and `api.md`

To avoid future confusion or retraining drift, update their code examples similarly:

* Remove `import` and `export` lines
* Keep only internal deckbuilder slide creation logic

---

### ✅ Summary

| File                  | Section               | Action                                         |
| --------------------- | --------------------- | ---------------------------------------------- |
| `GPT-instructions.md` | 📄 Example Output     | Replace full code with slide-only example      |
| `GPT-instructions.md` | 🔒 Locked Rules       | Add Rule IX about not outputting import/export |
| `README.md`           | 📄 Quickstart Example | (Optional) Strip import/export                 |
| `api.md`              | 🛠 Creating a Deck    | (Optional) Trim to core deck content           |

---

Let me know once you've updated the docs — I’ll then regenerate the algebra deck **without the boilerplate lines**.
