# Tcode Syllabus System — Developer Guide

## 🧩 Overview

The `TcodeSyllabus` system defines a structured educational syllabus programmatically and exports it as a clean JSON object, used by the Taleem.Help frontend.

Each syllabus is composed of chapters, each chapter contains exercises, and each exercise contains questions. The full structure is exportable as a static `.js` file with a JSON object.

---

## 🏗 Class Structure

### 1. TcodeSyllabus

```js
new TcodeSyllabus(tcodeName)
```

* `tcodeName`: unique identifier (e.g. `fbise9physics`)
* Automatically adds internal chapter IDs

**Properties to set manually:**

* `description`
* `image`
* `link`

**Methods:**

* `addChapter(chapterName)` → returns `Chapter`
* `toJSON()` → final exportable JSON

---

### 2. Chapter

Created via `syllabus.addChapter()`

**Fields:**

* `id` (auto-incremented internally)
* `chapterName`: required (e.g. `Physical Quantities and Measurement`)
* `description`: optional
* `image`: optional

**Methods:**

* `addEx(exerciseName)` → returns `Exercise`

---

### 3. Exercise

Created via `chapter.addEx()`

**Fields:**

* `exerciseName`: unique name for the exercise (used in question URL)
* `image`, `color`, `tag`: optional metadata

**Methods:**

* `addQ(type, number, questionName = null, part = '')` → returns self (for chaining)

---

### 4. Question

Created via `exercise.addQ()`

```js
addQ("video", 1, "What is Physics?")
```

**Fields:**

* `tcodeName`
* `chapterId`
* `exercise` (exerciseName)
* `questionNo`
* `questionType`: one of `"md"`, `"video"`, or `"eq"`
* `questionPart`: optional string (e.g. `a`, `b`)
* `questionName`: optional (for readable display)
* `stringName`: internally generated unique string
* `tcodeUrl`: computed unique query param

---

## 🧾 Final JSON Format (Gold Standard)

```js
export const fbise10physics = {
  tcodeName: "fbise10physics",
  description: "Grade 10 Physics",
  image: "/tcodes/fbise10physics.webp",
  link: "/syllabus/fbise10physics",
  chapters: [
    {
      id: 1,
      chapterName: "Physical Quantities and Measurement",
      description: "...",
      image: "/tcodes/box.webp",
      exercises: [
        {
          exerciseName: "introduction_to_physics",
          questions: [
            {
              tcodeName: "fbise10physics",
              chapterId: 1,
              exercise: "introduction_to_physics",
              questionNo: 1,
              questionType: "video",
              questionPart: "",
              questionName: "What is Physics?",
              stringName: "fbise10physics 1 introduction_to_physics 1",
              tcodeUrl: "filename=fbise10physics-chapter-1-exintroduction_to_physics-q1"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## ✅ Best Practices

* Always export final syllabus with `.toJSON()` to ensure clean serializable output
* Set `questionName` for all user-facing questions
* Avoid manually setting chapter IDs
* Use snake\_case for exercise names (`intro_to_biology`, `light_and_optics`, etc.)
* You can skip optional fields like `image`, `description`, and `tag`, but include them if present in real syllabus
