

# 📘 TcodeSyllabus Guide

This module defines a structured, navigable syllabus tree for educational content — chapters → exercises → questions — with URL-safe access to individual question files.

---

## 🌱 Overview

- Each syllabus corresponds to a single **book** (e.g., `"fbise9math"`)
- It contains multiple **chapters**
- Each chapter has **exercises**
- Each exercise defines multiple **questions**
- Each **question** maps to a unique slide file based on its ID and `questionType`

---

## 📁 File Path Convention

Each question is stored as:

```

\$lib/slides/{tcodeName}/{tcodeUrl}.js

```

Where `tcodeUrl()` returns a safe, deterministic string like:

```

fbise9math-1-1\_2-3b

````

---

## 🧠 Question ID System

- `questionNo`: base number (e.g. 3)
- `questionPart`: optional sub-identifier (e.g. "b")
- `questionType`: slide format type — see below
- `tcodeUrl()`: derived method that returns a file-safe string

---

## 🎨 Slide Types

Supported types are:

```js
const slideTypes = {
  eq: "eq",           // EQ-style timeline builder
  canvas: "canvas",   // full visual layout
  quiz: "quiz",       // interactive question
  md: "md"            // markdown/HTML
};
````

These are used to determine how a slide should be rendered or edited.

---

## 🧱 Classes

### `TcodeSyllabus`

```js
const syllabus = new TcodeSyllabus("fbise9math");
syllabus.description("Grade 9 Mathematics");
```

#### ➕ `addChapter(id, title?, desc?)`

Creates or returns an existing chapter.

#### 📖 `qsInChapter(chapterId)`

Returns **all questions** in a chapter.

#### 📘 `qsInExercise(chapterId, exerciseId)`

Returns all questions for a specific exercise.

#### 🔍 `q(ch, ex, qNo, qPart?)`

Returns a specific `Question` object, or `undefined`.

---

### `Question` Object

A `Question` instance contains:

```js
{
  tcodeName: "fbise9math",
  chapter: 1,
  exercise: "1.2",
  questionNo: 3,
  questionPart: "b",
  questionType: "eq"
}
```

#### `.tcodeUrl()`

Returns a file-safe string:

```js
"fbise9math-1-1_2-3b"
```

---

## ✅ Example

```js
const chapter1 = syllabus.addChapter(1, "Physical Quantities");
const ex = chapter1.addEx("1.2");

ex.addQ("eq", 3, "b");
ex.addQ("canvas", 4); // no part

const q = syllabus.q(1, "1.2", 3, "b");
console.log(q.tcodeUrl()); // fbise9math-1-1_2-3b
```

---

## ❌ What TcodeSyllabus Does NOT Do

* It does **not** contain slide data
* It does **not** write to a database
* It does **not** validate file presence

Use `.tcodeUrl()` to look up slides from disk or DB:

```js
import slides from `$lib/slides/${q.tcodeName}/${q.tcodeUrl()}.js`;
```

---

## 🔚 Summary

`TcodeSyllabus` is a clean, declarative tree for rendering UIs and resolving file paths — powered by pure data and deterministic lookup rules. Now with `questionType` for flexible slide rendering.

```
```
