
// demoRows — paste in +page.svelte and set: const filteredItems = demoRows;
export const data = [
    {
      id: 'course_fbise9physics',
      type: 'course',
      title: 'Physics Class 9 (FBISE)',
      slug: 'fbise9physics',
      href: '/syllabus?tcode=fbise9physics',
      thumbnail: '/media/images/physics.webp',
      chapterCount: 9,
      exerciseCount: 34,
      questionCount: 210,
      description: 'Official syllabus tree'
    },
    {
      id: 'note_pk-it-2025',
      type: 'note',
      title: 'Pakistan IT Industry Overview — 2025',
      slug: 'pakistan-it-industry-overview-2025',
      href: '/notes?filename=pakistan-it-industry-overview-2025',
      thumbnail: '/media/images/taleem.webp',
      status: 'published',
      tcode: 'blog',
      editedAt: '2025-09-10'
    },
    {
      id: 'deck_fbise9physics_ch1_ex1_q5',
      type: 'deck',
      title: 'Ch 1 · Ex 1 · Q5 — Measurement',
      slug: 'physical-quantities-and-measurement-ex1-q5',
      href: '/player?slug=physical-quantities-and-measurement-ex1-q5',
      thumbnail: '/media/images/measure.webp',
      status: 'ready',
      tcode: 'fbise9physics',
      chEx: 'Ch 1 · Ex 1',
      duration: 420
    }
  ];
  