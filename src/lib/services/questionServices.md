# Question Service API Documentation

## Overview

The Question Service provides a comprehensive API for managing educational questions and content. It supports different question types (deck, note), filtering, searching, and bulk operations. Questions are organized within the syllabus structure (tcode → chapter → exercise).

## Table of Contents

- [CRUD Operations](#crud-operations)
- [Listing and Filtering](#listing-and-filtering)
- [Statistics and Analytics](#statistics-and-analytics)
- [Bulk Operations](#bulk-operations)
- [Search and Advanced Queries](#search-and-advanced-queries)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

---

## CRUD Operations

### createQuestion(options)

Creates a new question with the specified type and payload.

**Parameters:**
- `slug` (string, required) - Unique identifier for the question
- `tcode` (string, required) - Parent tcode slug
- `chapter` (number, required) - Chapter number
- `exercise` (string, required) - Exercise slug
- `type` (string, required) - Question type: 'deck' or 'note'
- `name` (string, optional) - Display name of the question
- `description` (string, optional) - Question description
- `tags` (JSON, optional) - Tags array for categorization
- `status` (string, default: 'draft') - Status: 'draft', 'ready', 'hidden'
- `thumbnail` (string, optional) - Thumbnail URL
- `sortOrder` (number, optional) - Order within the exercise
- `timed` (boolean, default: false) - Whether question is timed
- `deck` (JSON, required if type='deck') - Deck content payload
- `note` (string, required if type='note') - Note content payload

**Returns:** Promise<Question>

**Example:**
```javascript
// Create a deck question
const deckQuestion = await questionService.createQuestion({
  slug: 'algebra-deck-1',
  tcode: 'math-101',
  chapter: 1,
  exercise: 'linear-equations',
  type: 'deck',
  name: 'Basic Linear Equations Deck',
  description: 'Practice deck for linear equations',
  tags: ['algebra', 'equations'],
  status: 'ready',
  timed: true,
  deck: {
    cards: [
      { front: 'What is x in: 2x + 3 = 7?', back: 'x = 2' },
      { front: 'Solve: 3x - 5 = 10', back: 'x = 5' }
    ],
    settings: { shuffleCards: true, timeLimit: 300 }
  }
});

// Create a note question
const noteQuestion = await questionService.createQuestion({
  slug: 'algebra-note-1',
  tcode: 'math-101',
  chapter: 1,
  exercise: 'linear-equations',
  type: 'note',
  name: 'Linear Equations Theory',
  description: 'Theoretical foundation of linear equations',
  tags: ['theory', 'algebra'],
  status: 'ready',
  note: 'A linear equation is an equation in which the highest power of the variable is 1...'
});
```

### getQuestionBySlug(slug, options)

Retrieves a specific question by its slug.

**Parameters:**
- `slug` (string, required) - Question slug
- `includePayload` (boolean, default: true) - Include deck/note content

**Returns:** Promise<Question>

**Throws:** Error if question not found

**Example:**
```javascript
// Get question with payload
const question = await questionService.getQuestionBySlug('algebra-deck-1');

// Get question metadata only
const questionMeta = await questionService.getQuestionBySlug('algebra-deck-1', {
  includePayload: false
});
```

### updateQuestion(slug, updates)

Updates an existing question.

**Parameters:**
- `slug` (string, required) - Question slug to update
- `updates` (object, required) - Fields to update

**Returns:** Promise<Question>

**Example:**
```javascript
const updatedQuestion = await questionService.updateQuestion('algebra-deck-1', {
  name: 'Advanced Linear Equations Deck',
  status: 'ready',
  tags: ['algebra', 'equations', 'advanced'],
  deck: {
    cards: [
      { front: 'Solve: 2x + 5 = 3x - 1', back: 'x = 6' },
      { front: 'What is x in: 4(x - 3) = 8?', back: 'x = 5' }
    ],
    settings: { shuffleCards: true, timeLimit: 600 }
  }
});
```

### deleteQuestion(slug)

Deletes a question permanently.

**Parameters:**
- `slug` (string, required) - Question slug to delete

**Returns:** Promise<Question>

**Example:**
```javascript
await questionService.deleteQuestion('algebra-deck-1');
```

---

## Listing and Filtering

### listQuestions(options)

Lists questions with various filtering options.

**Parameters:**
- `tcode` (string, optional) - Filter by tcode
- `chapter` (number, optional) - Filter by chapter number
- `exercise` (string, optional) - Filter by exercise slug
- `type` (string, optional) - Filter by question type
- `status` (string, optional) - Filter by status
- `includePayload` (boolean, default: false) - Include content payloads
- `limit` (number, default: 100) - Maximum results to return
- `offset` (number, default: 0) - Number of results to skip
- `orderBy` (array, optional) - Custom ordering

**Returns:** Promise<Question[]>

**Example:**
```javascript
// Get all ready deck questions for a tcode
const deckQuestions = await questionService.listQuestions({
  tcode: 'math-101',
  type: 'deck',
  status: 'ready',
  includePayload: true,
  limit: 50
});

// Get questions with pagination
const paginatedQuestions = await questionService.listQuestions({
  tcode: 'math-101',
  limit: 20,
  offset: 40
});
```

### getQuestionsByTcode(tcode, options)

Convenience method to get all questions for a specific tcode.

**Parameters:**
- `tcode` (string, required) - Tcode slug
- `options` (object, optional) - Same options as listQuestions()

**Returns:** Promise<Question[]>

**Example:**
```javascript
const mathQuestions = await questionService.getQuestionsByTcode('math-101', {
  type: 'deck',
  includePayload: false
});
```

### getQuestionsByChapter(tcode, chapter, options)

Gets all questions for a specific chapter.

**Parameters:**
- `tcode` (string, required) - Tcode slug
- `chapter` (number, required) - Chapter number
- `options` (object, optional) - Additional filtering options

**Returns:** Promise<Question[]>

**Example:**
```javascript
const chapterQuestions = await questionService.getQuestionsByChapter(
  'math-101',
  1,
  { status: 'ready' }
);
```

### getQuestionsByExercise(tcode, chapter, exercise, options)

Gets all questions for a specific exercise.

**Parameters:**
- `tcode` (string, required) - Tcode slug
- `chapter` (number, required) - Chapter number
- `exercise` (string, required) - Exercise slug
- `options` (object, optional) - Additional filtering options

**Returns:** Promise<Question[]>

**Example:**
```javascript
const exerciseQuestions = await questionService.getQuestionsByExercise(
  'math-101',
  1,
  'linear-equations',
  { includePayload: true }
);
```

---

## Statistics and Analytics

### getQuestionCount(filters)

Gets the count of questions matching the specified filters.

**Parameters:**
- `tcode` (string, optional) - Filter by tcode
- `chapter` (number, optional) - Filter by chapter
- `exercise` (string, optional) - Filter by exercise
- `type` (string, optional) - Filter by type
- `status` (string, optional) - Filter by status

**Returns:** Promise<number>

**Example:**
```javascript
// Total questions in a tcode
const totalCount = await questionService.getQuestionCount({
  tcode: 'math-101'
});

// Ready deck questions in an exercise
const readyDeckCount = await questionService.getQuestionCount({
  tcode: 'math-101',
  chapter: 1,
  exercise: 'linear-equations',
  type: 'deck',
  status: 'ready'
});
```

### getQuestionStatsByTcode(tcode)

Gets comprehensive statistics for a tcode.

**Parameters:**
- `tcode` (string, required) - Tcode slug

**Returns:** Promise<QuestionStats>

**Example:**
```javascript
const stats = await questionService.getQuestionStatsByTcode('math-101');
console.log(stats);
// Output:
// {
//   total: 150,
//   byType: { deck: 100, note: 50 },
//   byStatus: { ready: 120, draft: 25, hidden: 5 },
//   byChapter: { 1: 50, 2: 60, 3: 40 }
// }
```

---

## Bulk Operations

### bulkUpdateQuestionStatus(slugs, status)

Updates the status of multiple questions in a single operation.

**Parameters:**
- `slugs` (string[], required) - Array of question slugs to update
- `status` (string, required) - New status to set

**Returns:** Promise<{ count: number }>

**Example:**
```javascript
await questionService.bulkUpdateQuestionStatus(
  ['question-1', 'question-2', 'question-3'],
  'ready'
);
```

### bulkDeleteQuestions(slugs)

Deletes multiple questions in a single operation.

**Parameters:**
- `slugs` (string[], required) - Array of question slugs to delete

**Returns:** Promise<{ count: number }>

**Example:**
```javascript
await questionService.bulkDeleteQuestions([
  'old-question-1',
  'old-question-2',
  'duplicate-question'
]);
```

### reorderQuestions(tcode, chapter, exercise, questionOrder)

Reorders questions within an exercise using a transaction.

**Parameters:**
- `tcode` (string, required) - Parent tcode slug
- `chapter` (number, required) - Parent chapter number
- `exercise` (string, required) - Parent exercise slug
- `questionOrder` (array, required) - Array of objects with `slug` property

**Returns:** Promise<Question[]>

**Example:**
```javascript
await questionService.reorderQuestions(
  'math-101',
  1,
  'linear-equations',
  [
    { slug: 'question-3' },
    { slug: 'question-1' },
    { slug: 'question-2' }
  ]
);
```

---

## Search and Advanced Queries

### searchQuestions(searchTerm, options)

Searches questions by name or description.

**Parameters:**
- `searchTerm` (string, required) - Text to search for
- `tcode` (string, optional) - Limit search to specific tcode
- `type` (string, optional) - Limit search to specific type
- `status` (string, optional) - Limit search to specific status
- `limit` (number, default: 50) - Maximum results
- `includePayload` (boolean, default: false) - Include content payloads

**Returns:** Promise<Question[]>

**Example:**
```javascript
// Search across all questions
const results = await questionService.searchQuestions('linear equation');

// Search within specific tcode
const mathResults = await questionService.searchQuestions('derivative', {
  tcode: 'math-101',
  type: 'deck',
  status: 'ready',
  includePayload: true
});
```

### getQuestionsByTags(tags, options)

Finds questions that have any of the specified tags.

**Parameters:**
- `tags` (string[], required) - Array of tags to search for
- `options` (object, optional) - Additional filtering options

**Returns:** Promise<Question[]>

**Example:**
```javascript
// Find questions with algebra or geometry tags
const taggedQuestions = await questionService.getQuestionsByTags(
  ['algebra', 'geometry'],
  {
    tcode: 'math-101',
    status: 'ready'
  }
);
```

---

## Error Handling

The service throws descriptive errors for various scenarios:

- **Validation errors** - Missing required parameters or invalid data
- **Not found errors** - Question doesn't exist
- **Type validation errors** - Invalid question type or missing payload
- **Duplicate errors** - Slug already exists
- **Database errors** - Prisma/database-level errors

**Example error handling:**
```javascript
try {
  await questionService.createQuestion({
    slug: 'test-question',
    tcode: 'math-101',
    chapter: 1,
    exercise: 'test-exercise',
    type: 'deck'
    // Missing deck payload - will throw error
  });
} catch (error) {
  if (error.message.includes('Deck payload is required')) {
    console.log('Please provide deck content');
  } else if (error.message.includes('already exists')) {
    console.log('Question slug must be unique');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## Usage Examples

### Creating a Complete Question Set

```javascript
// Create multiple related questions for an exercise
const questions = [];

// Create a theory note
questions.push(await questionService.createQuestion({
  slug: 'linear-eq-theory',
  tcode: 'math-101',
  chapter: 1,
  exercise: 'linear-equations',
  type: 'note',
  name: 'Linear Equations - Theory',
  description: 'Basic concepts and definitions',
  tags: ['theory', 'fundamentals'],
  status: 'ready',
  sortOrder: 1,
  note: `
    ## Linear Equations
    
    A linear equation is an algebraic equation in which each term is either:
    - A constant, or
    - The product of a constant and a single variable
    
    ### Standard Form
    ax + b = 0, where a ≠ 0
    
    ### Examples
    - 2x + 3 = 7
    - 5x - 10 = 0
    - x/3 + 4 = 12
  `
}));

// Create practice decks
questions.push(await questionService.createQuestion({
  slug: 'linear-eq-basic-deck',
  tcode: 'math-101',
  chapter: 1,
  exercise: 'linear-equations',
  type: 'deck',
  name: 'Basic Linear Equations',
  description: 'Practice solving simple linear equations',
  tags: ['practice', 'basic'],
  status: 'ready',
  sortOrder: 2,
  timed: true,
  deck: {
    cards: [
      {
        front: 'Solve for x: 2x + 5 = 13',
        back: 'x = 4\n\nSolution:\n2x + 5 = 13\n2x = 13 - 5\n2x = 8\nx = 4'
      },
      {
        front: 'Solve for x: 3x - 7 = 14',
        back: 'x = 7\n\nSolution:\n3x - 7 = 14\n3x = 14 + 7\n3x = 21\nx = 7'
      },
      {
        front: 'What is the value of x if 4x = 20?',
        back: 'x = 5\n\nSolution:\n4x = 20\nx = 20/4\nx = 5'
      }
    ],
    settings: {
      shuffleCards: true,
      timeLimit: 180,
      showHints: true
    }
  }
}));

// Create advanced practice deck
questions.push(await questionService.createQuestion({
  slug: 'linear-eq-advanced-deck',
  tcode: 'math-101',
  chapter: 1,
  exercise: 'linear-equations',
  type: 'deck',
  name: 'Advanced Linear Equations',
  description: 'Practice solving complex linear equations',
  tags: ['practice', 'advanced', 'multi-step'],
  status: 'ready',
  sortOrder: 3,
  timed: true,
  deck: {
    cards: [
      {
        front: 'Solve for x: 2(x + 3) = 4x - 8',
        back: 'x = 7\n\nSolution:\n2(x + 3) = 4x - 8\n2x + 6 = 4x - 8\n6 + 8 = 4x - 2x\n14 = 2x\nx = 7'
      },
      {
        front: 'Solve for x: (3x - 1)/2 = 5',
        back: 'x = 11/3\n\nSolution:\n(3x - 1)/2 = 5\n3x - 1 = 10\n3x = 11\nx = 11/3'
      },
      {
        front: 'Solve for x: 5x - 3(2x - 1) = 7',
        back: 'x = -4\n\nSolution:\n5x - 3(2x - 1) = 7\n5x - 6x + 3 = 7\n-x + 3 = 7\n-x = 4\nx = -4'
      }
    ],
    settings: {
      shuffleCards: true,
      timeLimit: 300,
      showHints: false,
      reviewMode: true
    }
  }
}));

console.log(`Created ${questions.length} questions for linear equations exercise`);
```

### Managing Question Content Lifecycle

```javascript
// Draft → Ready → Published workflow
async function publishQuestionSet(exerciseSlug) {
  // 1. Get all draft questions for the exercise
  const draftQuestions = await questionService.listQuestions({
    tcode: 'math-101',
    chapter: 1,
    exercise: exerciseSlug,
    status: 'draft'
  });

  // 2. Review and update questions
  for (const question of draftQuestions) {
    // Add review tags
    await questionService.updateQuestion(question.slug, {
      tags: [...(question.tags || []), 'reviewed'],
      status: 'ready'
    });
  }

  // 3. Bulk update status
  const questionSlugs = draftQuestions.map(q => q.slug);
  await questionService.bulkUpdateQuestionStatus(questionSlugs, 'ready');

  // 4. Get statistics
  const stats = await questionService.getQuestionStatsByTcode('math-101');
  console.log('Publication stats:', stats);
}
```

### Content Search and Discovery

```javascript
// Advanced content discovery
async function findRelevantContent(searchTerm, filters = {}) {
  // 1. Search by text
  const textResults = await questionService.searchQuestions(searchTerm, {
    ...filters,
    includePayload: false
  });

  // 2. Search by tags (extract potential tags from search term)
  const potentialTags = searchTerm.split(' ').filter(word => word.length > 3);
  const tagResults = await questionService.getQuestionsByTags(potentialTags, filters);

  // 3. Combine and deduplicate results
  const allResults = [...textResults, ...tagResults];
  const uniqueResults = allResults.filter((question, index, array) => 
    array.findIndex(q => q.slug === question.slug) === index
  );

  // 4. Sort by relevance (simple scoring)
  return uniqueResults.sort((a, b) => {
    const aScore = calculateRelevanceScore(a, searchTerm);
    const bScore = calculateRelevanceScore(b, searchTerm);
    return bScore - aScore;
  });
}

function calculateRelevanceScore(question, searchTerm) {
  let score = 0;
  const term = searchTerm.toLowerCase();
  
  if (question.name?.toLowerCase().includes(term)) score += 10;
  if (question.description?.toLowerCase().includes(term)) score += 5;
  if (question.tags?.some(tag => tag.toLowerCase().includes(term))) score += 3;
  
  return score;
}
```

### Question Analytics and Reporting

```javascript
// Generate comprehensive reports
async function generateQuestionReport(tcode) {
  // 1. Get basic statistics
  const stats = await questionService.getQuestionStatsByTcode(tcode);
  
  // 2. Get detailed breakdown by exercise
  const exercises = {}; // This would come from syllabus service
  const detailedStats = {};
  
  for (const [chapter, count] of Object.entries(stats.byChapter)) {
    const chapterQuestions = await questionService.getQuestionsByChapter(
      tcode, 
      parseInt(chapter)
    );
    
    // Group by exercise
    const exerciseGroups = chapterQuestions.reduce((acc, question) => {
      if (!acc[question.exercise]) {
        acc[question.exercise] = [];
      }
      acc[question.exercise].push(question);
      return acc;
    }, {});
    
    detailedStats[chapter] = {
      total: count,
      exercises: Object.keys(exerciseGroups).length,
      byExercise: Object.fromEntries(
        Object.entries(exerciseGroups).map(([exercise, questions]) => [
          exercise,
          {
            count: questions.length,
            byType: questions.reduce((acc, q) => {
              acc[q.type] = (acc[q.type] || 0) + 1;
              return acc;
            }, {}),
            byStatus: questions.reduce((acc, q) => {
              acc[q.status || 'unknown'] = (acc[q.status || 'unknown'] || 0) + 1;
              return acc;
            }, {})
          }
        ])
      )
    };
  }
  
  return {
    tcode,
    summary: stats,
    detailed: detailedStats,
    generatedAt: new Date()
  };
}
```

### Batch Operations for Content Management

```javascript
// Import questions from external source
async function importQuestionsFromJSON(jsonData, tcode, chapter, exercise) {
  const imported = [];
  const errors = [];
  
  for (const questionData of jsonData.questions) {
    try {
      const question = await questionService.createQuestion({
        slug: `${exercise}-imported-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        tcode,
        chapter,
        exercise,
        type: questionData.type,
        name: questionData.name,
        description: questionData.description,
        tags: questionData.tags || [],
        status: 'draft', // Import as draft by default
        deck: questionData.type === 'deck' ? questionData.content : null,
        note: questionData.type === 'note' ? questionData.content : null
      });
      
      imported.push(question);
    } catch (error) {
      errors.push({
        questionData,
        error: error.message
      });
    }
  }
  
  return { imported, errors };
}

// Export questions to JSON
async function exportQuestionsToJSON(tcode, options = {}) {
  const questions = await questionService.getQuestionsByTcode(tcode, {
    includePayload: true,
    ...options
  });
  
  return {
    tcode,
    exportedAt: new Date(),
    count: questions.length,
    questions: questions.map(q => ({
      slug: q.slug,
      chapter: q.chapter,
      exercise: q.exercise,
      type: q.type,
      name: q.name,
      description: q.description,
      tags: q.tags,
      status: q.status,
      content: q.type === 'deck' ? q.deck : q.note,
      metadata: {
        timed: q.timed,
        sortOrder: q.sortOrder,
        createdAt: q.createdAt,
        editedAt: q.editedAt
      }
    }))
  };
}
```

---

## Data Structure

### Question
```typescript
{
  slug: string;              // Primary key
  tcode: string;             // Reference to SyllabusTcode.slug
  chapter: number;           // Chapter number
  exercise: string;          // Reference to SyllabusExercise.slug
  type: 'deck' | 'note';     // Question type
  name?: string;             // Display name
  description?: string;      // Description
  tags?: string[];           // Tags for categorization
  status?: string;           // 'draft' | 'ready' | 'hidden'
  thumbnail?: string;        // Thumbnail URL
  sortOrder?: number;        // Order within exercise
  timed: boolean;            // Whether question is timed
  deck?: DeckContent;        // JSON content for deck type
  note?: string;             // Text content for note type
  createdAt: Date;           // Creation timestamp
  editedAt: Date;            // Last modification timestamp
}
```

### DeckContent Example
```typescript
{
  cards: Array<{
    front: string;
    back: string;
    hint?: string;
    explanation?: string;
  }>;
  settings: {
    shuffleCards?: boolean;
    timeLimit?: number;
    showHints?: boolean;
    reviewMode?: boolean;
    difficulty?: 'easy' | 'medium' | 'hard';
  };
  metadata?: {
    author?: string;
    version?: string;
    lastReviewed?: string;
  };
}
```

### QuestionStats
```typescript
{
  total: number;
  byType: Record<string, number>;     // { deck: 100, note: 50 }
  byStatus: Record<string, number>;   // { ready: 120, draft: 25 }
  byChapter: Record<number, number>;  // { 1: 50, 2: 60 }
}
```

---

## Performance Considerations

### Indexing Strategy
The service leverages Prisma indexes defined in the schema:
- `tcode` - Fast filtering by subject
- `tcode, chapter` - Fast chapter-level queries
- `tcode, chapter, exercise` - Fast exercise-level queries
- `tcode, chapter, exercise, sortOrder` - Optimized ordering

### Payload Management
- Use `includePayload: false` for list operations when content isn't needed
- Implement pagination with `limit` and `offset` for large result sets
- Consider caching frequently accessed questions

### Bulk Operations
- Use bulk methods (`bulkUpdateQuestionStatus`, `bulkDeleteQuestions`) for better performance
- Leverage transactions in reordering operations to ensure data consistency

## Migration and Compatibility

The service is designed to work with the existing legacy API structure while using the new slug-based schema internally. This ensures backward compatibility while providing a modern, efficient interface for new development.