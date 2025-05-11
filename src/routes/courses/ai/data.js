const dashboards = [
    [
      { number: 27, title: "Lectures", icon: "📘" },
      { number: 55, title: "Labs", icon: "🧪" },
      { number: 2, title: "Projects", icon: "📁" },
      { number: 5, title: "Quizzes", icon: "📝" }
    ],
    [
      { number: 19, title: "Lectures", icon: "📘" },
      { number: 42, title: "Labs", icon: "🧪" },
      { number: 3, title: "Projects", icon: "📁" },
      { number: 4, title: "Quizzes", icon: "📝" }
    ],
    [
      { number: 12, title: "Lectures", icon: "📘" },
      { number: 25, title: "Labs", icon: "🧪" },
      { number: 1, title: "Projects", icon: "📁" },
      { number: 6, title: "Quizzes", icon: "📝" }
    ]
  ];
  
  const tableItems = [
    // Track 1 – AI Foundation
    [
      { type: 'Lab', name: 'Foundation Topic 1', description: 'Introductory concept 1 covering AI basics and tools.', tags: ['Beginner', 'Theory'] },
      { type: 'Lecture', name: 'Foundation Topic 2', description: 'Introductory concept 2 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 3', description: 'Introductory concept 3 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 4', description: 'Introductory concept 4 covering AI basics and tools.', tags: ['Beginner', 'Theory'] },
      { type: 'Lab', name: 'Foundation Topic 5', description: 'Introductory concept 5 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 6', description: 'Introductory concept 6 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 7', description: 'Introductory concept 7 covering AI basics and tools.', tags: ['Beginner', 'Theory'] },
      { type: 'Lecture', name: 'Foundation Topic 8', description: 'Introductory concept 8 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lab', name: 'Foundation Topic 9', description: 'Introductory concept 9 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 10', description: 'Introductory concept 10 covering AI basics and tools.', tags: ['Beginner', 'Theory'] },
      { type: 'Lecture', name: 'Foundation Topic 11', description: 'Introductory concept 11 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 12', description: 'Introductory concept 12 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lab', name: 'Foundation Topic 13', description: 'Introductory concept 13 covering AI basics and tools.', tags: ['Beginner', 'Theory'] },
      { type: 'Lecture', name: 'Foundation Topic 14', description: 'Introductory concept 14 covering AI basics and tools.', tags: ['Beginner', 'Tools'] },
      { type: 'Lecture', name: 'Foundation Topic 15', description: 'Introductory concept 15 covering AI basics and tools.', tags: ['Beginner', 'Tools'] }
    ],
  
    // Track 2 – AI System Dev
    [
      { type: 'Lecture', name: 'System Module 1', description: 'Understanding system layers and architecture.', tags: ['System', 'Intermediate'] },
      { type: 'Lab', name: 'Dev Setup Lab', description: 'Set up local environment for AI workflows.', tags: ['Hands-on', 'Setup'] },
      { type: 'Lecture', name: 'APIs in AI', description: 'How AI tools interact with APIs.', tags: ['System', 'Architecture'] },
      { type: 'Lab', name: 'Build a REST API', description: 'Hands-on API design for an AI model.', tags: ['API', 'Lab'] },
      { type: 'Project', name: 'Mini Chatbot App', description: 'Create a simple AI chatbot using local tools.', tags: ['Project', 'Practical'] },
      { type: 'Lecture', name: 'Data Flow in AI Systems', description: 'Data pipelines and pre/post-processing.', tags: ['System', 'Theory'] },
      { type: 'Lab', name: 'Prompt Engineering Lab', description: 'Test prompt variations in automation.', tags: ['Hands-on', 'Prompting'] },
      { type: 'Lecture', name: 'Role of Backends', description: 'Where does AI fit in backend systems?', tags: ['System', 'Backend'] },
      { type: 'Lab', name: 'Integration with Frontend', description: 'Display AI results in a UI.', tags: ['Frontend', 'Practical'] },
      { type: 'Project', name: 'End-to-End App', description: 'Build complete AI-powered demo app.', tags: ['Project', 'Full Stack'] },
      { type: 'Lecture', name: 'Workflow Automation', description: 'How to turn steps into repeatable flows.', tags: ['Automation', 'Strategy'] },
      { type: 'Lab', name: 'Webhook Testing', description: 'Use external data triggers for AI.', tags: ['Hands-on', 'System'] },
      { type: 'Lecture', name: 'Security in AI Apps', description: 'Basic access control and tokens.', tags: ['Security', 'System'] },
      { type: 'Lab', name: 'Token Use Lab', description: 'Practice working with JWTs in AI requests.', tags: ['Practical', 'Security'] },
      { type: 'Lecture', name: 'Error Handling in AI', description: 'Designing fallbacks and error messages.', tags: ['Resilience', 'System'] }
    ],
  
    // Track 3 – AI Business Dev (Editable)
    [
      { type: 'Lecture', name: 'Business Topic 1', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 2', description: '...', tags: ['...'] },
      { type: 'Lab', name: 'Business Topic 3', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 4', description: '...', tags: ['...'] },
      { type: 'Lab', name: 'Business Topic 5', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 6', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 7', description: '...', tags: ['...'] },
      { type: 'Quiz', name: 'Business Topic 8', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 9', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 10', description: '...', tags: ['...'] },
      { type: 'Lab', name: 'Business Topic 11', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 12', description: '...', tags: ['...'] },
      { type: 'Project', name: 'Business Topic 13', description: '...', tags: ['...'] },
      { type: 'Lab', name: 'Business Topic 14', description: '...', tags: ['...'] },
      { type: 'Lecture', name: 'Business Topic 15', description: '...', tags: ['...'] }
    ]
  ];
  
  
  export { dashboards, tableItems };
  