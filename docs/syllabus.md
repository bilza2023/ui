

# 📚 Syllabus Specification — v1 (Split: Builder + Usage)

---

## **Part 1 — SyllabusBuilder (External Library Spec)**

> **Filename = Identity = Anchor** — every piece of content is uniquely addressed by its `filename`.
> The **SyllabusBuilder** class compiles one textbook-code (**tcode**) into a navigable syllabus tree.

### **1. Purpose**

Provide a programmatic, fluent API for defining a syllabus as:

* **Chapters** → **Exercises** → **Questions**
* Immutable `filename` IDs for all leaf nodes

### **2. Core API**

```ts
import SyllabusBuilder from 'syllabus-builder';

// Create builder for one tcode
const sb = new SyllabusBuilder('fbise9mathold', {
  description: 'Math Class 9 Old Course',
  image: '/bookcovers/math_9thFBSIE.png'
});

// Add chapter → exercise → questions
const ch10 = sb.addChapter('Ch-10', 'Ch-10 Congruent Triangles');
const ex10 = ch10.addExercise('Theorems', 'theorems');

ex10.addQuestion('Congruent Triangles', 'congruent_triangles', '/images/congruent_triangle.webp');
ex10.addNote('Th 10.1.2', 'fbise9mathold_theorem10_1_2', '/images/theorems9old_10.1.2.svg');

// Compile to JSON
const syllabusJSON = sb.build();
```

---

### **3. Data Model**

| Level        | Required keys                                       | Notes                             |
| ------------ | --------------------------------------------------- | --------------------------------- |
| **tcode**    | `tcodeName`, `description`, `image`, `chapters[]`   | One subject/book per JSON file.   |
| **chapter**  | `name`, `filename`, `exercises[]`                   | `filename` can have spaces.       |
| **exercise** | `name`, `filename`, `questions[]`                   | Groups related content.           |
| **question** | `name`, `filename`, `type`, `thumbnail?`, `tags[]?` | Leaf node; `type` decides viewer. |

**Allowed `type` values**:

| `type`    | Viewer route        | Typical extension       |
| --------- | ------------------- | ----------------------- |
| `"slide"` | `/player?filename=` | `deck.js` / `deck.json` |
| `"note"`  | `/notes?filename=`  | `.svelte` (HTML embed)  |
| `"deck"`  | `/player?filename=` | silent deck `.json`     |
| `"exam"`  | `/exam?filename=`   | `.json` (future)        |
| `"link"`  | external redirect   | URL                     |

---

### **4. Class Structure**

```ts
class SyllabusBuilder {
  constructor(code, { description, image }) { ... }
  addChapter(name, filename) : Chapter { ... }
  build() : TcodeJSON { ... }
}

class Chapter {
  addExercise(name, filename) : Exercise { ... }
}

class Exercise {
  addQuestion(name, filename, thumbnail?, tags?) { ... } // type = 'slide'
  addNote(name, filename, thumbnail?, tags = ['note']) { ... }
  addDeck(name, filename, thumbnail?, tags = ['deck']) { ... }
}
```

---

## **Part 2 — Usage in Taleem.Help**

### **1. File Structure**

```
/syllabus/
  fbise9mathold.js      ← defines one tcode using SyllabusBuilder
  syllabus.js           ← imports all tcodes, compiles them
/scripts/
  genSyllabus.js        ← writes per-tcode JSON + subjects.json
/static/data/syllabus/
  fbise9mathold.json
  fbise9physics.json
  subjects.json         ← index (tcodeName, description, image)
```

---

### **2. Generating Output**

1. **Author** a tcode in `/syllabus/<tcode>.js` using `SyllabusBuilder`.
2. Add it to `syllabus.js`:

```js
import defineFbise9mathold from './fbise9mathold.js';
import SyllabusBuilder from '../syllabusBuilder/SyllabusBuilder.js';

function buildTcode(defineFn, code, meta) {
  const sb = new SyllabusBuilder(code, meta);
  defineFn(sb);
  return sb.build();
}

export const syllabus = [
  buildTcode(defineFbise9mathold, 'fbise9mathold', {
    description: 'Math Class 9 Old Course',
    image: '/bookcovers/math_9thFBSIE.png'
  })
];
```

3. **Run**:

```bash
npm run build:syllabus
```

`genSyllabus.js` will:

* Write `/static/data/syllabus/<tcode>.json`
* Write `/static/data/syllabus/subjects.json`
* Optionally write combined `/static/data/syllabus.json` for backward compatibility.

---

### **3. Frontend Consumption**

**services/syllabusService.js**:

```js
export async function getSubjectsIndex() {
  return fetch('/data/syllabus/subjects.json').then(r => r.json());
}

export async function getSyllabusByTcode(tcode) {
  return fetch(`/data/syllabus/${tcode}.json`).then(r => r.json());
}
```

**Example — syllabus page**:

```js
import { getSyllabusByTcode } from '$lib/services/syllabusService.js';
onMount(async () => {
  syllabus = await getSyllabusByTcode('fbise9mathold');
  if (syllabus?.chapters?.length > 0) {
    selectedChapter = syllabus.chapters[0];
  }
});
```

---

### **4. Version Lock**

`syllabus-v1` is **frozen** alongside `deck-v1`.
Breaking changes — e.g., nested exercises or per-question metadata — will only appear in `syllabus-v2`.

---

If you want, I can now **merge this updated spec file into your repo** so it fully replaces the old `syllabus.md`.
Do you want me to prepare it ready-to-drop in?
