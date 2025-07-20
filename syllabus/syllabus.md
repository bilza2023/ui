
# 📘 Syllabus System (Deck Navigation)

This folder defines and generates the full syllabus tree for Taleem.Help. The generated JSON is used by the Svelte UI to power the syllabus browser and deck navigation.

---

## ✅ Files Overview

```

/syllabus/
├── syllabusBuilder/         # Core builder class (SyllabusBuilder.js)
├── syllabus/                # All syllabus definitions
│   ├── fbise9physics.js     # Physics syllabus (Grade 9)
│   └── fbise9mathold.js     # Math syllabus (Old)
├── syllabus.js              # Assembles all tcode modules into `syllabus` object
└── genSyllabus.js           # Generates final JSON file in /static/data/

````

---

## ✅ How to Regenerate the Syllabus

Run this command from the project root:

```bash
node syllabus/genSyllabus.js
````

It will create the file:

```
/static/data/syllabus.json
```

> This is the file used by the Svelte frontend to render chapters, exercises, and questions.

---

## ✅ Output Format (Nested JSON)

Each syllabus tree contains:

* `tcodeName` (e.g. `fbise9physics`)
* `chapters[]`

  * `exercises[]`

    * `questions[]` (optional)

Each `filename` inside `questions[]` should match the identifier of a deck (i.e. `.json` file under `/static/decks/` or similar).

---

## ✅ Add a New Syllabus

To add another subject:

1. Create a file in `/syllabus/syllabus/`
   Example: `fbise10chemistry.js`

2. Use the builder API:

   ```js
   export default function defineChemistry(builder) {
     const chem = builder.addTcode("fbise10chemistry", {
       description: "Chemistry Class 10",
       image: "/bookcovers/chem_10.png"
     });

     const ch1 = chem.addChapter("Introduction", "ch1_intro");
     const ex1 = ch1.addExercise("Getting Started", "ex1_start");
     ex1.addQuestion("What is Chemistry?", "chem_intro_q1");
   }
   ```

3. Import and call it in `syllabus.js`:

   ```js
   import defineChemistry from './fbise10chemistry.js';
   defineChemistry(builder);
   ```

4. Run the generator again.

---

## 🔒 Design Principles

* Pure JSON output
* No runtime logic in Svelte
* Questions linked by `filename` only
* Easy to extend or modify per subject

---

## 🧠 Important Note

This system is purely declarative.
No external database or API is needed — syllabus.json is all the UI needs.
