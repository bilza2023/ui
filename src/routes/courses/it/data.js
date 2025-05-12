const dashboards = [
    [
      { number: 12, title: "Lectures", icon: "📘" },
      { number: 10, title: "Labs", icon: "🧪" },
      { number: 2, title: "Projects", icon: "📁" },
      { number: 5, title: "Quizzes", icon: "📝" }
    ],
    [
      { number: 14, title: "Lectures", icon: "📘" },
      { number: 9, title: "Labs", icon: "🧪" },
      { number: 2, title: "Projects", icon: "📁" },
      { number: 14, title: "Quizzes", icon: "📝" }
    ],
    [
      { number: 13, title: "Lectures", icon: "📘" },
      { number: 12, title: "Labs", icon: "🧪" },
      { number: 2, title: "Projects", icon: "📁" },
      { number: 10, title: "Quizzes", icon: "📝" }
    ]
  ];
  
  const tableItems = [
    // Track 1 – AI Foundation
    [
      { type: 'Lecture', name: 'What is a Computer?', description: 'Understand the basic components and functions of a computer system.', tags: ['Beginner', 'Theory'] },
      { type: 'Lab', name: 'Turn On, Navigate, and Shut Down', description: 'Hands-on practice with powering on a PC, navigating the desktop, and proper shutdown.', tags: ['Beginner', 'Hands-on'] },
    
      { type: 'Lecture', name: 'Understanding Files and Folders', description: 'Learn how files are organized and managed on a computer.', tags: ['Beginner', 'Practical'] },
      { type: 'Lab', name: 'Create, Move, and Rename Files', description: 'Practice creating, organizing, and renaming files and folders.', tags: ['Beginner', 'Skills'] },
    
      { type: 'Lecture', name: 'The Internet and Browsing Safely', description: 'Explain how the internet works and how to browse safely.', tags: ['Beginner', 'Digital Literacy'] },
      { type: 'Lab', name: 'Search for Info + Download a File', description: 'Use a browser to search, download, and open a file.', tags: ['Beginner', 'Exploration'] },
    
      { type: 'Lecture', name: 'Using Digital Documents', description: 'Overview of common document types: PDFs, Word files, text notes.', tags: ['Beginner', 'Documentation'] },
      { type: 'Lab', name: 'Open, Edit, and Save a Document', description: 'Practice basic document handling and file types.', tags: ['Beginner', 'Tools'] },
    
      { type: 'Lecture', name: 'Keyboard and Mouse Skills', description: 'Develop comfort with typing, clicking, dragging, and shortcuts.', tags: ['Beginner', 'Interaction'] },
      { type: 'Lab', name: 'Complete a Typing and Mouse Challenge', description: 'Practice typing a paragraph and selecting/moving items on screen.', tags: ['Beginner', 'Motor Skills'] }
    ],
    
    // Track 2 – AI System Dev
    [
      { type: 'Lecture', name: 'How File Systems Work', description: 'Understand paths, drives, and how data is structured on a computer.', tags: ['Builder', 'Core Concepts'] },
      { type: 'Lab', name: 'Navigate Folders Using File Explorer', description: 'Practice locating paths, nested folders, and drives.', tags: ['Builder', 'Hands-on'] },
    
      { type: 'Lecture', name: 'Installing Software Safely', description: 'Learn how to download, verify, and install programs safely.', tags: ['Builder', 'Safety'] },
      { type: 'Lab', name: 'Install and Uninstall a Program', description: 'Hands-on task to install and cleanly uninstall software.', tags: ['Builder', 'Practice'] },
    
      { type: 'Lecture', name: 'What is a Local Server?', description: 'Introduce the idea of localhost, ports, and testing environments.', tags: ['Builder', 'Web'] },
      { type: 'Lab', name: 'Run a Local Webpage on Your Computer', description: 'Use simple tools to serve an HTML file locally.', tags: ['Builder', 'Web Tools'] },
    
      { type: 'Lecture', name: 'Command Line Basics', description: 'Explain how CLI works and why it’s useful in system building.', tags: ['Builder', 'Core Tools'] },
      { type: 'Lab', name: 'Use Command Line to Navigate and Create Files', description: 'Try commands like mkdir, cd, and touch to manage files.', tags: ['Builder', 'CLI'] },
    
      { type: 'Lecture', name: 'Zip, Extract, and Organize Downloads', description: 'Learn file compression and managing downloads.', tags: ['Builder', 'Utilities'] },
      { type: 'Lab', name: 'Zip and Extract Folders on Desktop', description: 'Use built-in tools to compress and uncompress files.', tags: ['Builder', 'Hands-on'] }
    ],
    
  
    // Track 3 – AI Business Dev (Editable)
    [
      { type: 'Lecture', name: 'IT Skills for Office Jobs', description: 'Understand what digital tasks are common in modern jobs.', tags: ['Work', 'Career'] },
      { type: 'Lab', name: 'Write and Save a CV in Word Format', description: 'Create a basic CV using templates or a writing tool.', tags: ['Work', 'Docs'] },
    
      { type: 'Lecture', name: 'Using Spreadsheets in Work', description: 'Cover sorting, formatting, and simple formulas in spreadsheets.', tags: ['Work', 'Tools'] },
      { type: 'Lab', name: 'Make a Monthly Budget Sheet', description: 'Create a working spreadsheet with totals and formatting.', tags: ['Work', 'Finance'] },
    
      { type: 'Lecture', name: 'Digital Communication Tools', description: 'Intro to professional messaging: email, chat, and video.', tags: ['Work', 'Etiquette'] },
      { type: 'Lab', name: 'Send a Professional Email', description: 'Compose and send an email with proper formatting.', tags: ['Work', 'Practice'] },
    
      { type: 'Lecture', name: 'Introduction to Freelancing Platforms', description: 'Explore Fiverr, Upwork, and freelance marketplaces.', tags: ['Freelance', 'Earning'] },
      { type: 'Lab', name: 'Create a Freelancer Profile', description: 'Set up a real or demo profile and write your bio.', tags: ['Freelance', 'Setup'] },
    
      { type: 'Lecture', name: 'Making a Portfolio Website', description: 'Understand why portfolios matter and how to start one.', tags: ['Freelance', 'Portfolio'] },
      { type: 'Lab', name: 'Build a Simple Web Page with Bio + Projects', description: 'Use a no-code tool or template to build a personal portfolio.', tags: ['Freelance', 'Project'] }
    ]
      
  ];
  
  
  export { dashboards, tableItems };
  