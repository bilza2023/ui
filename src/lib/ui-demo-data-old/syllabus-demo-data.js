export const data= {
    tcode: 'fbise9math',
    selected: { chapter: '', exercise: '' },
    synopsis: {
      id: 1, slug: 'fbise9math', name: 'Math Class 9', description: '', image: '',
      chapters: [
        {
          id: 11, tcodeId: 1, slug: 'algebraic-expressions', name: 'Algebraic Expressions', sortOrder: 0,
          exercises: [
            { id: 111, chapterId: 11, slug: 'ex-2-1', name: 'Exercise 2.1', sortOrder: 0 },
            { id: 112, chapterId: 11, slug: 'ex-2-2', name: 'Exercise 2.2', sortOrder: 1 }
          ]
        },
        {
          id: 12, tcodeId: 1, slug: 'linear-equations', name: 'Linear Equations', sortOrder: 1,
          exercises: [
            { id: 121, chapterId: 12, slug: 'ex-3-1', name: 'Exercise 3.1', sortOrder: 0 }
          ]
        }
      ]
    },
    items: [
      { id: 9001, slug: 'algebra-basics-intro', name: 'Algebra Basics — Intro', type: 'note', tcode: 'fbise9math', exercise: 'ex-2-1', status: 'ready', thumbnail: '', editedAt: '2025-09-11T10:00:00Z' },
      { id: 9002, slug: 'like-terms',            name: 'Combining Like Terms',   type: 'deck', tcode: 'fbise9math', exercise: 'ex-2-1', status: 'draft', thumbnail: '' },
      { id: 9003, slug: 'solve-1step',           name: 'Solve 1-Step Equations', type: 'note', tcode: 'fbise9math', exercise: 'ex-3-1', status: 'published', thumbnail: '' }
    ]
  };
  