# Syllabus Service API Documentation

## Overview

The Syllabus Service provides a comprehensive API for managing the hierarchical structure of educational content organized as Tcodes → Chapters → Exercises. This service handles all CRUD operations and relationships between these entities.

## Table of Contents

- [SyllabusTcode Operations](#syllabustcode-operations)
- [SyllabusChapter Operations](#syllabuschapter-operations)
- [SyllabusExercise Operations](#syllabusexercise-operations)
- [Bulk Operations](#bulk-operations)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

---

## SyllabusTcode Operations

### createTcode(options)

Creates a new tcode (subject/book).

**Parameters:**
- `slug` (string, required) - Unique identifier for the tcode
- `name` (string, required) - Display name of the tcode
- `description` (string, optional) - Description of the tcode
- `image` (string, optional) - Image URL or path

**Returns:** Promise<SyllabusTcode>

**Example:**
```javascript
const tcode = await syllabusService.createTcode({
  slug: 'math-101',
  name: 'Mathematics 101',
  description: 'Basic mathematics course',
  image: '/images/math-101.jpg'
});
```

### getAllTcodes(options)

Retrieves all tcodes with optional nested data.

**Parameters:**
- `includeChapters` (boolean, default: false) - Include chapters and exercises

**Returns:** Promise<SyllabusTcode[]>

**Example:**
```javascript
// Get tcodes only
const tcodes = await syllabusService.getAllTcodes();

// Get tcodes with complete hierarchy
const tcodesWithChapters = await syllabusService.getAllTcodes({
  includeChapters: true
});
```

### getTcodeBySlug(slug, options)

Retrieves a specific tcode by its slug.

**Parameters:**
- `slug` (string, required) - The tcode slug
- `includeChapters` (boolean, default: false) - Include chapters and exercises

**Returns:** Promise<SyllabusTcode>

**Throws:** Error if tcode not found

**Example:**
```javascript
const tcode = await syllabusService.getTcodeBySlug('math-101', {
  includeChapters: true
});
```

### updateTcode(slug, updates)

Updates an existing tcode.

**Parameters:**
- `slug` (string, required) - The tcode slug to update
- `updates` (object, required) - Fields to update

**Returns:** Promise<SyllabusTcode>

**Example:**
```javascript
const updatedTcode = await syllabusService.updateTcode('math-101', {
  name: 'Advanced Mathematics 101',
  description: 'Updated description'
});
```

### deleteTcode(slug)

Deletes a tcode and all associated chapters and exercises.

**Parameters:**
- `slug` (string, required) - The tcode slug to delete

**Returns:** Promise<SyllabusTcode>

**Example:**
```javascript
await syllabusService.deleteTcode('math-101');
```

---

## SyllabusChapter Operations

### createChapter(options)

Creates a new chapter within a tcode.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `slug` (string, required) - Unique chapter identifier within the tcode
- `name` (string, required) - Display name of the chapter
- `sortOrder` (number, default: 0) - Order within the tcode

**Returns:** Promise<SyllabusChapter>

**Example:**
```javascript
const chapter = await syllabusService.createChapter({
  tcodeSlug: 'math-101',
  slug: 'algebra-basics',
  name: 'Algebra Basics',
  sortOrder: 1
});
```

### getChaptersByTcode(tcodeSlug, options)

Retrieves all chapters for a specific tcode.

**Parameters:**
- `tcodeSlug` (string, required) - The tcode slug
- `includeExercises` (boolean, default: false) - Include exercises

**Returns:** Promise<SyllabusChapter[]>

**Example:**
```javascript
const chapters = await syllabusService.getChaptersByTcode('math-101', {
  includeExercises: true
});
```

### getChapterBySlug(tcodeSlug, chapterSlug, options)

Retrieves a specific chapter.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Chapter slug
- `includeExercises` (boolean, default: false) - Include exercises

**Returns:** Promise<SyllabusChapter>

**Example:**
```javascript
const chapter = await syllabusService.getChapterBySlug(
  'math-101',
  'algebra-basics',
  { includeExercises: true }
);
```

### updateChapter(tcodeSlug, chapterSlug, updates)

Updates an existing chapter.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Chapter slug to update
- `updates` (object, required) - Fields to update

**Returns:** Promise<SyllabusChapter>

**Example:**
```javascript
const updatedChapter = await syllabusService.updateChapter(
  'math-101',
  'algebra-basics',
  {
    name: 'Advanced Algebra Basics',
    sortOrder: 2
  }
);
```

### deleteChapter(tcodeSlug, chapterSlug)

Deletes a chapter and all associated exercises.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Chapter slug to delete

**Returns:** Promise<SyllabusChapter>

**Example:**
```javascript
await syllabusService.deleteChapter('math-101', 'algebra-basics');
```

---

## SyllabusExercise Operations

### createExercise(options)

Creates a new exercise within a chapter.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Parent chapter slug
- `slug` (string, required) - Unique exercise identifier within the chapter
- `name` (string, required) - Display name of the exercise
- `sortOrder` (number, default: 0) - Order within the chapter

**Returns:** Promise<SyllabusExercise>

**Example:**
```javascript
const exercise = await syllabusService.createExercise({
  tcodeSlug: 'math-101',
  chapterSlug: 'algebra-basics',
  slug: 'linear-equations',
  name: 'Linear Equations',
  sortOrder: 1
});
```

### getExercisesByChapter(tcodeSlug, chapterSlug)

Retrieves all exercises for a specific chapter.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Parent chapter slug

**Returns:** Promise<SyllabusExercise[]>

**Example:**
```javascript
const exercises = await syllabusService.getExercisesByChapter(
  'math-101',
  'algebra-basics'
);
```

### getExerciseBySlug(tcodeSlug, chapterSlug, exerciseSlug)

Retrieves a specific exercise.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Parent chapter slug
- `exerciseSlug` (string, required) - Exercise slug

**Returns:** Promise<SyllabusExercise>

**Example:**
```javascript
const exercise = await syllabusService.getExerciseBySlug(
  'math-101',
  'algebra-basics',
  'linear-equations'
);
```

### updateExercise(tcodeSlug, chapterSlug, exerciseSlug, updates)

Updates an existing exercise.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Parent chapter slug
- `exerciseSlug` (string, required) - Exercise slug to update
- `updates` (object, required) - Fields to update

**Returns:** Promise<SyllabusExercise>

**Example:**
```javascript
const updatedExercise = await syllabusService.updateExercise(
  'math-101',
  'algebra-basics',
  'linear-equations',
  {
    name: 'Advanced Linear Equations',
    sortOrder: 3
  }
);
```

### deleteExercise(tcodeSlug, chapterSlug, exerciseSlug)

Deletes an exercise.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Parent chapter slug
- `exerciseSlug` (string, required) - Exercise slug to delete

**Returns:** Promise<SyllabusExercise>

**Example:**
```javascript
await syllabusService.deleteExercise(
  'math-101',
  'algebra-basics',
  'linear-equations'
);
```

---

## Bulk Operations

### getCompleteSyllabus()

Retrieves the complete syllabus structure for all tcodes.

**Returns:** Promise<SyllabusTcode[]> (with nested chapters and exercises)

**Example:**
```javascript
const completeSyllabus = await syllabusService.getCompleteSyllabus();
```

### getSyllabusForTcode(tcodeSlug)

Retrieves the complete syllabus structure for a specific tcode.

**Parameters:**
- `tcodeSlug` (string, required) - The tcode slug

**Returns:** Promise<SyllabusTcode> (with nested chapters and exercises)

**Example:**
```javascript
const syllabusStructure = await syllabusService.getSyllabusForTcode('math-101');
```

### reorderChapters(tcodeSlug, chapterOrder)

Reorders chapters within a tcode using a transaction.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterOrder` (array, required) - Array of objects with `id` or `slug` properties

**Returns:** Promise<SyllabusChapter[]>

**Example:**
```javascript
await syllabusService.reorderChapters('math-101', [
  { slug: 'chapter-2' },
  { slug: 'chapter-1' },
  { slug: 'chapter-3' }
]);
```

### reorderExercises(tcodeSlug, chapterSlug, exerciseOrder)

Reorders exercises within a chapter using a transaction.

**Parameters:**
- `tcodeSlug` (string, required) - Parent tcode slug
- `chapterSlug` (string, required) - Parent chapter slug
- `exerciseOrder` (array, required) - Array of objects with `id` or `slug` properties

**Returns:** Promise<SyllabusExercise[]>

**Example:**
```javascript
await syllabusService.reorderExercises('math-101', 'algebra-basics', [
  { slug: 'exercise-3' },
  { slug: 'exercise-1' },
  { slug: 'exercise-2' }
]);
```

---

## Error Handling

The service throws descriptive errors for various scenarios:

- **Validation errors** - Missing required parameters
- **Not found errors** - Entity doesn't exist
- **Duplicate errors** - Unique constraint violations
- **Database errors** - Prisma/database-level errors

**Example error handling:**
```javascript
try {
  const tcode = await syllabusService.getTcodeBySlug('nonexistent');
} catch (error) {
  if (error.message.includes('not found')) {
    console.log('Tcode does not exist');
  } else {
    console.error('Database error:', error);
  }
}
```

---

## Usage Examples

### Building a Complete Syllabus

```javascript
// 1. Create a tcode
const tcode = await syllabusService.createTcode({
  slug: 'physics-101',
  name: 'Physics 101',
  description: 'Introduction to Physics'
});

// 2. Add chapters
const chapter1 = await syllabusService.createChapter({
  tcodeSlug: 'physics-101',
  slug: 'mechanics',
  name: 'Mechanics',
  sortOrder: 1
});

const chapter2 = await syllabusService.createChapter({
  tcodeSlug: 'physics-101',
  slug: 'thermodynamics',
  name: 'Thermodynamics',
  sortOrder: 2
});

// 3. Add exercises
await syllabusService.createExercise({
  tcodeSlug: 'physics-101',
  chapterSlug: 'mechanics',
  slug: 'newtons-laws',
  name: "Newton's Laws",
  sortOrder: 1
});

await syllabusService.createExercise({
  tcodeSlug: 'physics-101',
  chapterSlug: 'mechanics',
  slug: 'motion-equations',
  name: 'Equations of Motion',
  sortOrder: 2
});

// 4. Get complete structure
const fullSyllabus = await syllabusService.getSyllabusForTcode('physics-101');
console.log(JSON.stringify(fullSyllabus, null, 2));
```

### Managing Content Updates

```javascript
// Update multiple entities
await syllabusService.updateTcode('physics-101', {
  description: 'Comprehensive introduction to Physics'
});

await syllabusService.updateChapter('physics-101', 'mechanics', {
  name: 'Classical Mechanics'
});

// Reorder content
await syllabusService.reorderChapters('physics-101', [
  { slug: 'thermodynamics' },
  { slug: 'mechanics' }
]);
```

### Data Retrieval Patterns

```javascript
// Get overview (tcodes only)
const tcodes = await syllabusService.getAllTcodes();

// Get detailed view for specific tcode
const detailedTcode = await syllabusService.getTcodeBySlug('physics-101', {
  includeChapters: true
});

// Get specific chapter with exercises
const chapter = await syllabusService.getChapterBySlug(
  'physics-101',
  'mechanics',
  { includeExercises: true }
);

// Get all exercises in a chapter
const exercises = await syllabusService.getExercisesByChapter(
  'physics-101',
  'mechanics'
);
```

---

## Data Structure

### SyllabusTcode
```typescript
{
  id: number;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  chapters?: SyllabusChapter[];
  createdAt: Date;
  updatedAt: Date;
}
```

### SyllabusChapter
```typescript
{
  id: number;
  tcodeId: number;
  slug: string;
  name: string;
  sortOrder: number;
  tcode?: SyllabusTcode;
  exercises?: SyllabusExercise[];
  createdAt: Date;
  updatedAt: Date;
}
```

### SyllabusExercise
```typescript
{
  id: number;
  chapterId: number;
  slug: string;
  name: string;
  sortOrder: number;
  chapter?: SyllabusChapter;
  createdAt: Date;
  updatedAt: Date;
}
```