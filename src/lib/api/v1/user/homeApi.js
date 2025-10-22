
export function demoData() {
  const pageNav = [
    { id: 'courses',  label: 'Courses',  icon: '🗺️' },
    { id: 'examples', label: 'Examples', icon: '📊' },
    { id: 'help',     label: 'Help',     icon: '❓' }
  ];

  const questions = [
    { id: 101, category: 'courses',  title: 'Intro to Algebra',  thumbnail: '/media/images/box.webp', href: '/syllabus?tcode=intro-algebra' },
    { id: 102, category: 'courses',  title: 'Angles & Triangles', thumbnail: '/media/images/class.webp', href: '/syllabus?tcode=geometry-angles' },
    { id: 103, category: 'courses',  title: 'Calculus: Limits',   thumbnail: '/media/images/theorems9old_10.1.1.svg', href: '/syllabus?tcode=calculus-basics' },

    { id: 201, category: 'examples', title: 'Solve: 3x + 5 = 20', thumbnail: '/media/images/exp.jpeg', href: '/examples/linear-equation' },
    { id: 202, category: 'examples', title: 'Area of a Circle',   thumbnail: '/media/images/box.webp', href: '/examples/circle-area' },
    { id: 203, category: 'examples', title: 'Probability: Two Dice', thumbnail: '/media/images/theorems9old_10.1.2.svg', href: '/examples/probability-dice' },

    { id: 301, category: 'help', title: 'Getting Started', thumbnail: '/media/images/exp.jpeg', href: '/help/getting-started' },
    { id: 302, category: 'help', title: 'Create a Deck',   thumbnail: '/media/images/class.webp', href: '/help/create-deck' },
    { id: 303, category: 'help', title: 'FAQ & Troubleshooting', thumbnail: '/media/images/theorems9old_10.1.3.svg', href: '/help/faq' }
  ];

  return { pageNav, questions };
}
