`p-p`

Here is a complete and structured **file instruction set** you can embed into a GPT prompt or developer guide to **create syllabus files** using the `TcodeSyllabus` framework you've built:

---

## 🛠️ Syllabus File Instructions

Each syllabus file should export a full `TcodeSyllabus` instance, structured into chapters, exercises, and questions using the provided API.

### ✅ Base Format

```js
import { TcodeSyllabus, slideTypes } from "../TcodeSyllabus/index.js";

const syllabus = new TcodeSyllabus("UNIQUE_ID");

syllabus.description = "Full name of the syllabus";
syllabus.image = "/path/to/banner.webp";
syllabus.link = "/syllabus/UNIQUE_ID";
```

### 📘 Add Chapters

Each chapter is created using:

```js
const chapter = syllabus.addChapter(
  CHAPTER_NUMBER,
  "Chapter Title",
  "Optional short description"
);
```

Chapters are **auto-deduplicated** by their number.

### 📘 Add Exercises

Within each chapter, you must define exercises with:

```js
const ex = chapter.addEx("CHAPTER.EXERCISE"); // e.g. "2.1"
```

The exercise label should follow the `{chapter}.{exercise}` format to remain consistent with file-safe naming.

### 🧠 Add Questions

Within an exercise, add questions with:

```js
ex.addQ(slideTypes.TYPE, QUESTION_NO, "OPTIONAL_PART");
```

Supported slideTypes include:

* `slideTypes.eq`
* `slideTypes.video`
* `slideTypes.quiz`
* `slideTypes.md`

> 🔁 `questionPart` (e.g. `"b"`) is optional but useful for sub-questions.

### 🧪 Example

```js
const ch1 = syllabus.addChapter(1, "Introduction", "Start here");

const ex1_1 = ch1.addEx("1.1");
ex1_1.addQ(slideTypes.video, 1);        // 1.1, Q1
ex1_1.addQ(slideTypes.eq, 2, "a");      // 1.1, Q2a

const ex1_2 = ch1.addEx("1.2");
ex1_2.addQ(slideTypes.quiz, 3);
```

### 🧾 Export

End the file with:

```js
export default syllabus;
```

---

## 🧱 Slide File Lookup

To resolve the actual slide file for a question:

```js
const q = syllabus.q(1, "1.1", 2, "a");
const filePath = `$lib/slides/${q.tcodeName}/${q.tcodeUrl()}.js`;
```

This produces a deterministic, safe path like:

```
filename=fbise9physics-chapter-1-ex1_1-q2a
```

---

## ⚠️ Notes

* Do **not** add slide data to the syllabus file — these only define metadata and structure.
* Avoid duplicate chapter IDs or exercise keys.
* This system **does not validate** file presence — ensure each generated `.tcodeUrl()` maps to a valid slide on disk.

---

Do you want this converted into a markdown doc or embedded into your GPT trainer prompt?
