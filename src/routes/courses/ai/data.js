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
            { type: 'Lecture', name: 'What is AI Really?', description: 'Clarify the true definition of AI, how it differs from automation, and its role in daily life.', tags: ['Beginner', 'Theory'] },
            { type: 'Lab', name: 'ChatGPT as a Daily Assistant', description: 'Practice using ChatGPT to write emails, summarize documents, and translate messages.', tags: ['Beginner', 'Tools'] },
          
            { type: 'Lecture', name: 'Understanding AI Tools Landscape', description: 'Survey key AI tools for writing, design, coding, and automation.', tags: ['Beginner', 'Overview'] },
            { type: 'Lab', name: 'Install and Use 3 Free AI Tools', description: 'Walkthrough of setting up and testing tools like Notion AI, Grammarly, and Canva AI.', tags: ['Beginner', 'Hands-on'] },
          
            { type: 'Lecture', name: 'Prompt Engineering Basics', description: 'Explain how prompts work, and why wording changes results.', tags: ['Beginner', 'Prompting'] },
            { type: 'Lab', name: 'Write Prompts for 3 Different Tasks', description: 'Generate emails, lessons, and summaries using optimized prompts.', tags: ['Beginner', 'Practice'] },
          
            { type: 'Lecture', name: 'How AI Thinks: Tokens, Context, and Limits', description: 'Introduce language models, token limits, and why AI “forgets”.', tags: ['Beginner', 'Theory'] },
            { type: 'Lab', name: 'Break an AI Using a Long Prompt', description: 'Test limits by feeding overly long or tricky prompts to see failure points.', tags: ['Beginner', 'Exploration'] },
          
            { type: 'Lecture', name: 'Ethical Use of AI in Daily Work', description: 'Discuss when and how to disclose AI use, especially in schools or work.', tags: ['Beginner', 'Ethics'] },
            { type: 'Lab', name: 'Create an AI Usage Policy for Yourself', description: 'Write a short policy for how you will and won’t use AI in personal work.', tags: ['Beginner', 'Reflection'] },
          
            { type: 'Lecture', name: 'Using AI to Learn Faster', description: 'Explore how AI can break down hard topics, give quizzes, and explain ideas.', tags: ['Beginner', 'Learning'] },
            { type: 'Lab', name: 'Ask AI to Explain 3 Tough Concepts', description: 'Pick 3 confusing school or work topics and get AI to explain each.', tags: ['Beginner', 'Interactive'] },
          
            { type: 'Lecture', name: 'Voice and Image: The Rise of Multimodal AI', description: 'Explain how tools now handle voice, image, and text together.', tags: ['Beginner', 'Trends'] },
            { type: 'Lab', name: 'Generate a Slide with AI Images + Text', description: 'Use DALL·E or Canva + ChatGPT to create a slide with both.', tags: ['Beginner', 'Media'] },
          
            { type: 'Lecture', name: 'Limits of AI and Human Judgment', description: 'Cover where AI still fails: nuance, bias, emotion, and deep reasoning.', tags: ['Beginner', 'Critical Thinking'] },
            { type: 'Lab', name: 'Find 3 AI Mistakes and Fix Them', description: 'Use AI to answer a prompt incorrectly and then correct it manually.', tags: ['Beginner', 'Validation'] },
          
            { type: 'Lecture', name: 'The Future of Jobs with AI', description: 'Explore how AI is reshaping roles, skills, and what to prepare for.', tags: ['Beginner', 'Career'] },
            { type: 'Lab', name: 'AI Career Map for Yourself', description: 'Create a simple plan showing how AI can help in your future profession.', tags: ['Beginner', 'Planning'] },

            { type: 'Lecture', name: 'Behind the Scenes of ChatGPT', description: 'Explain how ChatGPT was trained, including datasets, reinforcement learning, and updates.', tags: ['Beginner', 'Theory'] },
            { type: 'Lab', name: 'Compare GPT 3.5 and GPT 4 Responses', description: 'Ask the same prompt to both models and observe differences in accuracy and tone.', tags: ['Beginner', 'Exploration'] },
          
            { type: 'Lecture', name: 'Why AI Feels Smart — But Isn’t', description: 'Break the illusion: highlight that LLMs don’t “know” — they predict based on data.', tags: ['Beginner', 'Critical Thinking'] },
            { type: 'Lab', name: 'Trick AI with a Logic Puzzle', description: 'Give it a riddle or logic problem and see how confidently it fails — then analyze why.', tags: ['Beginner', 'Curiosity'] },
          
            { type: 'Lecture', name: 'Understanding Hallucinations in AI', description: 'Define what it means when AI makes things up, why it happens, and how to reduce it.', tags: ['Beginner', 'Theory'] },
            { type: 'Lab', name: 'Fact-Check an AI Answer', description: 'Ask AI a factual question, then verify it using manual research or tools.', tags: ['Beginner', 'Practice'] },
          
            { type: 'Lab', name: 'Make a Simple AI-Generated Presentation', description: 'Create a 5-slide deck using AI to write, design, and organize content.', tags: ['Beginner', 'Creative'] },
            { type: 'Lab', name: 'Create an AI-Powered Daily Planner', description: 'Use AI to plan your day with tasks, reminders, and habits tailored to your input.', tags: ['Beginner', 'Tools'] }
          
    ],
  
    // Track 2 – AI System Dev
    [
        { type: 'Lecture', name: 'AI as a System Component', description: 'Understand where AI fits in a digital product — inputs, process, and outputs.', tags: ['Builder', 'Architecture'] },
        { type: 'Lab', name: 'Break Down a Real System Into Parts', description: 'Analyze a working product and label what could be handled by AI.', tags: ['Builder', 'Thinking'] },
      
        { type: 'Lecture', name: 'What is a Prompt Pipeline?', description: 'Explain how prompts can be structured and reused like functions.', tags: ['Builder', 'Prompting'] },
        { type: 'Lab', name: 'Build a Prompt Pipeline for Generating FAQs', description: 'Chain prompts to convert a document into a structured FAQ block.', tags: ['Builder', 'Automation'] },
      
        { type: 'Lecture', name: 'The API Layer: How Frontend Talks to AI', description: 'Learn what an API is and how it connects your app with OpenAI.', tags: ['Builder', 'Web'] },
        { type: 'Lab', name: 'Call OpenAI from Node.js Using Fetch', description: 'Make a simple script that sends a prompt and displays the answer.', tags: ['Builder', 'Hands-on'] },
      
        { type: 'Lecture', name: 'Understanding AI Output: JSON, Text, HTML', description: 'Know how to request structured formats and parse AI outputs.', tags: ['Builder', 'Data'] },
        { type: 'Lab', name: 'Ask AI to Generate Cards in JSON Format', description: 'Use GPT to return data for rendering cards, quizzes, or flashcards.', tags: ['Builder', 'Practice'] },
      
        { type: 'Lecture', name: 'Building with Guardrails: Schema + Validation', description: 'Explore the need for safety — why AI must be constrained by rules.', tags: ['Builder', 'Safety'] },
        { type: 'Lab', name: 'Use Zod to Validate AI Output', description: 'Write a schema and check if AI output is clean or broken.', tags: ['Builder', 'Validation'] },
      
        { type: 'Lecture', name: 'Designing an AI Workflow System', description: 'Introduce the 3-block pattern: Input → Logic → Output.', tags: ['Builder', 'Design'] },
        { type: 'Lab', name: 'Map Out Your First AI System', description: 'Draw a flowchart (or write in steps) for an AI-based content engine.', tags: ['Builder', 'Planning'] },
      
        { type: 'Lecture', name: 'Using AI to Auto-Check Work', description: 'Show how AI can grade, comment, or validate work using custom rules.', tags: ['Builder', 'Feedback'] },
        { type: 'Lab', name: 'Build an Auto-Checker for Student Answers', description: 'Use GPT to compare answers with gold-standard text.', tags: ['Builder', 'Education'] },
      
        { type: 'Lecture', name: 'AI Doesn’t Store Data — You Must', description: 'Clarify that AI has no memory unless you manage state and storage.', tags: ['Builder', 'Truth'] },
        { type: 'Lab', name: 'Save User Prompts in a Local JSON File', description: 'Build a basic system where prompts and replies are logged.', tags: ['Builder', 'Persistence'] },
      
        { type: 'Lecture', name: 'Using GPT in Form-Filling or Editing Tasks', description: 'See how AI can pre-fill, rewrite, or enhance forms and text.', tags: ['Builder', 'Web'] },
        { type: 'Lab', name: 'Make a Form Where AI Suggests Input', description: 'Build a small HTML form that gets hints or summaries from GPT.', tags: ['Builder', 'UI'] }
      ],
      
  
    // Track 3 – AI Business Dev (Editable)
    [
        { type: 'Lecture', name: 'AI as a Business Partner', description: 'Understand how AI can think, write, analyze, and automate like a junior team member.', tags: ['Business', 'Mindset'] },
        { type: 'Lab', name: 'Delegate a Repetitive Task to ChatGPT', description: 'Pick one task you do often and create a prompt that AI can handle daily.', tags: ['Business', 'Delegation'] },
      
        { type: 'Lecture', name: '5 Business Tasks AI Can Handle Today', description: 'Discover key areas: customer support, social media, writing, research, analysis.', tags: ['Business', 'Strategy'] },
        { type: 'Lab', name: 'Create a Weekly AI Workflow Plan', description: 'Make a 5-day plan where AI does 1 key task per day for your business.', tags: ['Business', 'Planning'] },
      
        { type: 'Lecture', name: 'Thinking in Systems, Not Tasks', description: 'Learn to build workflows where AI + human roles are clear and repeated.', tags: ['Business', 'Design'] },
        { type: 'Lab', name: 'Draw Your Business Workflow and Add AI Roles', description: 'Visualize your business process, then insert where AI fits in.', tags: ['Business', 'Modeling'] },
      
        { type: 'Lecture', name: 'Prompting for Business Outcomes', description: 'Write AI instructions that aim for value: customer trust, clarity, speed.', tags: ['Business', 'Prompting'] },
        { type: 'Lab', name: 'Write a Prompt that Generates a Sales Pitch', description: 'Use GPT to write a product pitch for one of your services or ideas.', tags: ['Business', 'Copywriting'] },
      
        { type: 'Lecture', name: 'AI is Not Free: Time, Tokens, and Trust', description: 'Understand the limits — AI costs money, may hallucinate, and must be verified.', tags: ['Business', 'Risk'] },
        { type: 'Lab', name: 'Calculate Cost of One AI-Driven Task', description: 'Estimate the time/money saved and cost per 1,000 tokens of GPT.', tags: ['Business', 'Finance'] },
      
        { type: 'Lecture', name: 'Using AI to Improve Customer Experience', description: 'AI can write FAQs, chat replies, surveys, and onboarding messages.', tags: ['Business', 'Customer'] },
        { type: 'Lab', name: 'Design a Smart FAQ for Your Website', description: 'Generate 10 high-quality FAQs and answers with AI for your real audience.', tags: ['Business', 'Support'] },
      
        { type: 'Lecture', name: 'Hiring AI Instead of Hiring People?', description: 'Learn what AI can’t do: accountability, judgment, and deep expertise.', tags: ['Business', 'Hiring'] },
        { type: 'Lab', name: 'AI vs Human: Compare Results on a Task', description: 'Do a task manually and with GPT — evaluate quality, time, and cost.', tags: ['Business', 'Evaluation'] },
      
        { type: 'Lecture', name: 'AI in Content Marketing', description: 'Explore how AI can write posts, titles, outlines, and even edit reels.', tags: ['Business', 'Marketing'] },
        { type: 'Lab', name: 'Create a 3-Post Social Media Plan with AI', description: 'Ask GPT to generate ideas and captions for your brand or institute.', tags: ['Business', 'Content'] },
      
        { type: 'Lecture', name: 'Designing AI-First Business Models', description: 'What does it mean to start a business where AI is core, not just a helper?', tags: ['Business', 'Startups'] },
        { type: 'Lab', name: 'Pitch a 1-Person AI-Enabled Business', description: 'Create a one-page plan for a micro-startup powered by AI.', tags: ['Business', 'Product'] }
      ]
      
  ];
  
  
  export { dashboards, tableItems };
  