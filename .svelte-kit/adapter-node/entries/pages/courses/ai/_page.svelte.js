import { c as create_ssr_component, e as each, f as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { N as Nav } from "../../../../chunks/Nav.js";
const css$5 = {
  code: ".banner-container.svelte-lph486{display:flex;flex-direction:column;justify-content:space-between;width:100%;background-color:rgba(61, 46, 30, 0.9);padding:3rem 3rem;gap:8rem}@media(min-width: 768px){.banner-container.svelte-lph486{flex-direction:row}}.banner-image.svelte-lph486{overflow:hidden;border-radius:12px}.banner-img.svelte-lph486{max-height:300px;width:100%;-o-object-fit:contain;object-fit:contain;border-radius:12px;border:none}.banner-text.svelte-lph486{flex:1;color:rgba(248, 237, 224, 0.9);display:flex;flex-direction:column;justify-content:center;gap:1.25rem}.banner-title.svelte-lph486{font-size:2.5rem;font-weight:bold;border-bottom:2px solid #c4a77f;padding-bottom:0.5rem;margin:0}.banner-description.svelte-lph486{font-size:1.75rem;font-weight:600;line-height:1.7}.banner-note.svelte-lph486{font-size:1rem;font-style:italic;opacity:0.9}",
  map: null
};
const AIBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$5);
  return `<div class="banner-container svelte-lph486" data-svelte-h="svelte-158pvpk"> <div class="banner-image svelte-lph486"><img src="/brand/ai.webp" alt="AI Banner" class="banner-img svelte-lph486"></div>  <div class="banner-text svelte-lph486"><h2 class="banner-title svelte-lph486">AI Courses</h2> <p class="banner-description svelte-lph486">AI Education at Taleem.Help — Our AI Track is designed to make artificial intelligence accessible to every Pakistani. From smart tools to real-world projects, we teach how to use AI in daily life, work, and innovation. Whether you&#39;re a student, a professional, or just curious, our guided path helps you learn, apply, and lead in the AI era.</p> <div class="banner-note svelte-lph486">🌍 Part of the <strong>Taleem.Help</strong> national learning initiative.</div></div> </div>`;
});
const css$4 = {
  code: ".card-container.svelte-16at3er{padding:0 2rem;margin-top:2rem}.card-row.svelte-16at3er{display:flex;justify-content:space-between;gap:1.5rem}.track-card.svelte-16at3er{display:flex;align-items:center;justify-content:center;gap:0.75rem;flex:1;background-color:#C4A77F;color:#504234;padding:1.25rem;font-size:1rem;font-weight:bold;border-radius:12px;border:none;cursor:pointer;transition:all 0.2s ease-in-out}.track-card.svelte-16at3er:hover{background-color:#504234;color:#ffffff;transform:scale(1.02)}.track-card.selected.svelte-16at3er{background-color:#504234;color:#ffffff;border:2px solid #C4A77F}.icon.svelte-16at3er{font-size:1.25rem}.title.svelte-16at3er{white-space:nowrap}",
  map: null
};
const AiCards = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selectedIndex = 0 } = $$props;
  const tracks = [
    { icon: "🧠", title: "AI Foundation Track" },
    {
      icon: "🛠️",
      title: "AI System Dev Track"
    },
    {
      icon: "💼",
      title: "AI Business Dev Track"
    }
  ];
  if ($$props.selectedIndex === void 0 && $$bindings.selectedIndex && selectedIndex !== void 0)
    $$bindings.selectedIndex(selectedIndex);
  $$result.css.add(css$4);
  return `<div class="card-container svelte-16at3er"><div class="card-row svelte-16at3er">${each(tracks, (track, i) => {
    return `<button class="${"track-card " + escape(selectedIndex === i ? "selected" : "", true) + " svelte-16at3er"}"><span class="icon svelte-16at3er">${escape(track.icon)}</span> <span class="title svelte-16at3er">${escape(track.title)}</span> </button>`;
  })}</div> </div>`;
});
const css$3 = {
  code: ".dashboard-wrapper.svelte-1n58ztl{padding:1.5rem 2rem}.dashboard.svelte-1n58ztl{display:flex;justify-content:space-between;flex-wrap:wrap;gap:1rem}.tile.svelte-1n58ztl{background-color:color-mix(in srgb, var(--bg-color) 85%, #000);border:1px solid var(--accent-color);color:#1f2937;flex:1 1 calc(25% - 1rem);padding:1.25rem 1rem;border-radius:12px;text-align:center;box-shadow:0 2px 8px rgba(0, 0, 0, 0.15);transition:transform 0.2s ease}.tile.svelte-1n58ztl:hover{transform:translateY(-2px)}.icon-number.svelte-1n58ztl{display:flex;justify-content:center;align-items:center;gap:0.6rem;margin-bottom:0.5rem}.icon.svelte-1n58ztl{font-size:2.2rem;margin:0}.number.svelte-1n58ztl{font-size:2.2rem;font-weight:bold;color:var(--accent-color);margin:0}.label.svelte-1n58ztl{font-size:0.9rem;opacity:0.85}",
  map: null
};
const Dashboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { dashboardItems = [] } = $$props;
  let { bgColor = "#FDF3E7" } = $$props;
  let { accentColor = "#C4A77F" } = $$props;
  let { themeClass = "theme-business" } = $$props;
  if ($$props.dashboardItems === void 0 && $$bindings.dashboardItems && dashboardItems !== void 0)
    $$bindings.dashboardItems(dashboardItems);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.accentColor === void 0 && $$bindings.accentColor && accentColor !== void 0)
    $$bindings.accentColor(accentColor);
  if ($$props.themeClass === void 0 && $$bindings.themeClass && themeClass !== void 0)
    $$bindings.themeClass(themeClass);
  $$result.css.add(css$3);
  return `<div class="${"dashboard-wrapper " + escape(themeClass, true) + " svelte-1n58ztl"}"><div class="dashboard svelte-1n58ztl" style="${"--bg-color: " + escape(bgColor, true) + "; --accent-color: " + escape(accentColor, true)}">${each(dashboardItems, (item) => {
    return `<div class="tile svelte-1n58ztl"><div class="icon-number svelte-1n58ztl"><div class="icon svelte-1n58ztl">${escape(item.icon)}</div> <div class="number svelte-1n58ztl">${escape(item.number)}</div></div> <div class="label svelte-1n58ztl">${escape(item.title)}</div> </div>`;
  })}</div> </div>`;
});
const css$2 = {
  code: ".track-table.svelte-gw570v.svelte-gw570v{margin:2rem auto;padding:0 2rem;width:90%;display:flex;flex-direction:column;gap:1.5rem}.track-row.svelte-gw570v.svelte-gw570v{background:var(--bg-color);color:#1f2937;padding:1.5rem;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.15);border-left:5px solid var(--accent-color);transition:transform 0.2s ease}.track-row.svelte-gw570v.svelte-gw570v:hover{transform:translateY(-2px)}.row-main.svelte-gw570v.svelte-gw570v{display:flex;align-items:flex-start;gap:1rem}.icon.svelte-gw570v.svelte-gw570v{font-size:1.75rem}.title-desc.svelte-gw570v .title.svelte-gw570v{font-weight:600;font-size:1.25rem}.title-desc.svelte-gw570v .desc.svelte-gw570v{font-size:0.9rem;opacity:0.8;margin-top:0.3rem}.row-tags.svelte-gw570v.svelte-gw570v{margin-top:0.75rem}.tag.svelte-gw570v.svelte-gw570v{display:inline-block;background:var(--accent-color);color:white;font-size:0.75rem;padding:0.3rem 0.6rem;border-radius:6px;margin-right:0.5rem}",
  map: null
};
const AITrackTable = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { trackItems = [] } = $$props;
  let { bgColor = "#FDF3E7" } = $$props;
  let { accentColor = "#C4A77F" } = $$props;
  let { themeClass = "theme-gold" } = $$props;
  if ($$props.trackItems === void 0 && $$bindings.trackItems && trackItems !== void 0)
    $$bindings.trackItems(trackItems);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.accentColor === void 0 && $$bindings.accentColor && accentColor !== void 0)
    $$bindings.accentColor(accentColor);
  if ($$props.themeClass === void 0 && $$bindings.themeClass && themeClass !== void 0)
    $$bindings.themeClass(themeClass);
  $$result.css.add(css$2);
  return `<div class="${"track-table " + escape(themeClass, true) + " svelte-gw570v"}" style="${"--bg-color: " + escape(bgColor, true) + "; --accent-color: " + escape(accentColor, true) + ";"}">${each(trackItems, (item) => {
    return `<div class="track-row svelte-gw570v"><div class="row-main svelte-gw570v"><span class="icon svelte-gw570v">${escape(item.type === "Lecture" ? "📘" : "🧪")}</span> <div class="title-desc svelte-gw570v"><div class="title svelte-gw570v">${escape(item.name)}</div> <div class="desc svelte-gw570v">${escape(item.description)}</div> </div></div> <div class="row-tags svelte-gw570v">${each(item.tags, (tag) => {
      return `<span class="tag svelte-gw570v">${escape(tag)}</span>`;
    })}</div> </div>`;
  })} </div>`;
});
const css$1 = {
  code: ".footer.svelte-1w1amng{background-color:#504234;color:#f1e9df;padding:2rem;font-size:0.9rem}.footer-top.svelte-1w1amng{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;border-bottom:1px solid #c4a77f;padding-bottom:1rem;margin-bottom:1rem}.brand.svelte-1w1amng{font-weight:bold;font-size:1.25rem;color:#c4a77f}.nav-links.svelte-1w1amng{display:flex;gap:1rem;flex-wrap:wrap}.footer-link.svelte-1w1amng{color:#f1e9df;text-decoration:none;transition:color 0.2s}.footer-link.svelte-1w1amng:hover{color:#c4a77f}.footer-bottom.svelte-1w1amng{display:flex;justify-content:space-between;flex-wrap:wrap;font-size:0.85rem;opacity:0.9}.credits.svelte-1w1amng{font-style:italic}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const links = ["Home", "AI Track", "IT Track", "Contact"];
  $$result.css.add(css$1);
  return `<footer class="footer svelte-1w1amng"><div class="footer-top svelte-1w1amng"><div class="brand svelte-1w1amng" data-svelte-h="svelte-cspdkz">Taleem.Help</div> <nav class="nav-links svelte-1w1amng">${each(links, (link) => {
    return `<a href="#" class="footer-link svelte-1w1amng">${escape(link)}</a>`;
  })}</nav></div> <div class="footer-bottom svelte-1w1amng" data-svelte-h="svelte-1999gmq"><p>© 2025 Taleem.Help — Education for Every Pakistani</p> <p class="credits svelte-1w1amng">Built with ❤️ in Islamabad</p></div> </footer>`;
});
const css = {
  code: ".description-wrapper.svelte-ker6c9{width:100%;max-width:1800px;margin:2rem auto;padding:1.5rem 2rem;border-radius:10px;border-left:4px solid var(--accent-color);background-color:var(--bg-color);text-align:left;box-sizing:border-box}.description-text.svelte-ker6c9{font-family:system-ui, sans-serif;font-weight:650;font-size:1.25rem;line-height:1.9;letter-spacing:0.15px;color:#2c2c2c;margin:0}",
  map: null
};
const Description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { text = "Track description goes here." } = $$props;
  let { bgColor = "#F3EFE7" } = $$props;
  let { accentColor = "#A2836E" } = $$props;
  let { themeClass = "theme-foundation" } = $$props;
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.bgColor === void 0 && $$bindings.bgColor && bgColor !== void 0)
    $$bindings.bgColor(bgColor);
  if ($$props.accentColor === void 0 && $$bindings.accentColor && accentColor !== void 0)
    $$bindings.accentColor(accentColor);
  if ($$props.themeClass === void 0 && $$bindings.themeClass && themeClass !== void 0)
    $$bindings.themeClass(themeClass);
  $$result.css.add(css);
  return `<div class="${"description-wrapper " + escape(themeClass, true) + " svelte-ker6c9"}" style="${"--bg-color: " + escape(bgColor, true) + "; --accent-color: " + escape(accentColor, true)}"><p class="description-text svelte-ker6c9">${escape(text)}</p> </div>`;
});
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
    { type: "Lecture", name: "What is AI Really?", description: "Clarify the true definition of AI, how it differs from automation, and its role in daily life.", tags: ["Beginner", "Theory"] },
    { type: "Lab", name: "ChatGPT as a Daily Assistant", description: "Practice using ChatGPT to write emails, summarize documents, and translate messages.", tags: ["Beginner", "Tools"] },
    { type: "Lecture", name: "Understanding AI Tools Landscape", description: "Survey key AI tools for writing, design, coding, and automation.", tags: ["Beginner", "Overview"] },
    { type: "Lab", name: "Install and Use 3 Free AI Tools", description: "Walkthrough of setting up and testing tools like Notion AI, Grammarly, and Canva AI.", tags: ["Beginner", "Hands-on"] },
    { type: "Lecture", name: "Prompt Engineering Basics", description: "Explain how prompts work, and why wording changes results.", tags: ["Beginner", "Prompting"] },
    { type: "Lab", name: "Write Prompts for 3 Different Tasks", description: "Generate emails, lessons, and summaries using optimized prompts.", tags: ["Beginner", "Practice"] },
    { type: "Lecture", name: "How AI Thinks: Tokens, Context, and Limits", description: "Introduce language models, token limits, and why AI “forgets”.", tags: ["Beginner", "Theory"] },
    { type: "Lab", name: "Break an AI Using a Long Prompt", description: "Test limits by feeding overly long or tricky prompts to see failure points.", tags: ["Beginner", "Exploration"] },
    { type: "Lecture", name: "Ethical Use of AI in Daily Work", description: "Discuss when and how to disclose AI use, especially in schools or work.", tags: ["Beginner", "Ethics"] },
    { type: "Lab", name: "Create an AI Usage Policy for Yourself", description: "Write a short policy for how you will and won’t use AI in personal work.", tags: ["Beginner", "Reflection"] },
    { type: "Lecture", name: "Using AI to Learn Faster", description: "Explore how AI can break down hard topics, give quizzes, and explain ideas.", tags: ["Beginner", "Learning"] },
    { type: "Lab", name: "Ask AI to Explain 3 Tough Concepts", description: "Pick 3 confusing school or work topics and get AI to explain each.", tags: ["Beginner", "Interactive"] },
    { type: "Lecture", name: "Voice and Image: The Rise of Multimodal AI", description: "Explain how tools now handle voice, image, and text together.", tags: ["Beginner", "Trends"] },
    { type: "Lab", name: "Generate a Slide with AI Images + Text", description: "Use DALL·E or Canva + ChatGPT to create a slide with both.", tags: ["Beginner", "Media"] },
    { type: "Lecture", name: "Limits of AI and Human Judgment", description: "Cover where AI still fails: nuance, bias, emotion, and deep reasoning.", tags: ["Beginner", "Critical Thinking"] },
    { type: "Lab", name: "Find 3 AI Mistakes and Fix Them", description: "Use AI to answer a prompt incorrectly and then correct it manually.", tags: ["Beginner", "Validation"] },
    { type: "Lecture", name: "The Future of Jobs with AI", description: "Explore how AI is reshaping roles, skills, and what to prepare for.", tags: ["Beginner", "Career"] },
    { type: "Lab", name: "AI Career Map for Yourself", description: "Create a simple plan showing how AI can help in your future profession.", tags: ["Beginner", "Planning"] },
    { type: "Lecture", name: "Behind the Scenes of ChatGPT", description: "Explain how ChatGPT was trained, including datasets, reinforcement learning, and updates.", tags: ["Beginner", "Theory"] },
    { type: "Lab", name: "Compare GPT 3.5 and GPT 4 Responses", description: "Ask the same prompt to both models and observe differences in accuracy and tone.", tags: ["Beginner", "Exploration"] },
    { type: "Lecture", name: "Why AI Feels Smart — But Isn’t", description: "Break the illusion: highlight that LLMs don’t “know” — they predict based on data.", tags: ["Beginner", "Critical Thinking"] },
    { type: "Lab", name: "Trick AI with a Logic Puzzle", description: "Give it a riddle or logic problem and see how confidently it fails — then analyze why.", tags: ["Beginner", "Curiosity"] },
    { type: "Lecture", name: "Understanding Hallucinations in AI", description: "Define what it means when AI makes things up, why it happens, and how to reduce it.", tags: ["Beginner", "Theory"] },
    { type: "Lab", name: "Fact-Check an AI Answer", description: "Ask AI a factual question, then verify it using manual research or tools.", tags: ["Beginner", "Practice"] },
    { type: "Lab", name: "Make a Simple AI-Generated Presentation", description: "Create a 5-slide deck using AI to write, design, and organize content.", tags: ["Beginner", "Creative"] },
    { type: "Lab", name: "Create an AI-Powered Daily Planner", description: "Use AI to plan your day with tasks, reminders, and habits tailored to your input.", tags: ["Beginner", "Tools"] }
  ],
  // Track 2 – AI System Dev
  [
    { type: "Lecture", name: "AI as a System Component", description: "Understand where AI fits in a digital product — inputs, process, and outputs.", tags: ["Builder", "Architecture"] },
    { type: "Lab", name: "Break Down a Real System Into Parts", description: "Analyze a working product and label what could be handled by AI.", tags: ["Builder", "Thinking"] },
    { type: "Lecture", name: "What is a Prompt Pipeline?", description: "Explain how prompts can be structured and reused like functions.", tags: ["Builder", "Prompting"] },
    { type: "Lab", name: "Build a Prompt Pipeline for Generating FAQs", description: "Chain prompts to convert a document into a structured FAQ block.", tags: ["Builder", "Automation"] },
    { type: "Lecture", name: "The API Layer: How Frontend Talks to AI", description: "Learn what an API is and how it connects your app with OpenAI.", tags: ["Builder", "Web"] },
    { type: "Lab", name: "Call OpenAI from Node.js Using Fetch", description: "Make a simple script that sends a prompt and displays the answer.", tags: ["Builder", "Hands-on"] },
    { type: "Lecture", name: "Understanding AI Output: JSON, Text, HTML", description: "Know how to request structured formats and parse AI outputs.", tags: ["Builder", "Data"] },
    { type: "Lab", name: "Ask AI to Generate Cards in JSON Format", description: "Use GPT to return data for rendering cards, quizzes, or flashcards.", tags: ["Builder", "Practice"] },
    { type: "Lecture", name: "Building with Guardrails: Schema + Validation", description: "Explore the need for safety — why AI must be constrained by rules.", tags: ["Builder", "Safety"] },
    { type: "Lab", name: "Use Zod to Validate AI Output", description: "Write a schema and check if AI output is clean or broken.", tags: ["Builder", "Validation"] },
    { type: "Lecture", name: "Designing an AI Workflow System", description: "Introduce the 3-block pattern: Input → Logic → Output.", tags: ["Builder", "Design"] },
    { type: "Lab", name: "Map Out Your First AI System", description: "Draw a flowchart (or write in steps) for an AI-based content engine.", tags: ["Builder", "Planning"] },
    { type: "Lecture", name: "Using AI to Auto-Check Work", description: "Show how AI can grade, comment, or validate work using custom rules.", tags: ["Builder", "Feedback"] },
    { type: "Lab", name: "Build an Auto-Checker for Student Answers", description: "Use GPT to compare answers with gold-standard text.", tags: ["Builder", "Education"] },
    { type: "Lecture", name: "AI Doesn’t Store Data — You Must", description: "Clarify that AI has no memory unless you manage state and storage.", tags: ["Builder", "Truth"] },
    { type: "Lab", name: "Save User Prompts in a Local JSON File", description: "Build a basic system where prompts and replies are logged.", tags: ["Builder", "Persistence"] },
    { type: "Lecture", name: "Using GPT in Form-Filling or Editing Tasks", description: "See how AI can pre-fill, rewrite, or enhance forms and text.", tags: ["Builder", "Web"] },
    { type: "Lab", name: "Make a Form Where AI Suggests Input", description: "Build a small HTML form that gets hints or summaries from GPT.", tags: ["Builder", "UI"] }
  ],
  // Track 3 – AI Business Dev (Editable)
  [
    { type: "Lecture", name: "AI as a Business Partner", description: "Understand how AI can think, write, analyze, and automate like a junior team member.", tags: ["Business", "Mindset"] },
    { type: "Lab", name: "Delegate a Repetitive Task to ChatGPT", description: "Pick one task you do often and create a prompt that AI can handle daily.", tags: ["Business", "Delegation"] },
    { type: "Lecture", name: "5 Business Tasks AI Can Handle Today", description: "Discover key areas: customer support, social media, writing, research, analysis.", tags: ["Business", "Strategy"] },
    { type: "Lab", name: "Create a Weekly AI Workflow Plan", description: "Make a 5-day plan where AI does 1 key task per day for your business.", tags: ["Business", "Planning"] },
    { type: "Lecture", name: "Thinking in Systems, Not Tasks", description: "Learn to build workflows where AI + human roles are clear and repeated.", tags: ["Business", "Design"] },
    { type: "Lab", name: "Draw Your Business Workflow and Add AI Roles", description: "Visualize your business process, then insert where AI fits in.", tags: ["Business", "Modeling"] },
    { type: "Lecture", name: "Prompting for Business Outcomes", description: "Write AI instructions that aim for value: customer trust, clarity, speed.", tags: ["Business", "Prompting"] },
    { type: "Lab", name: "Write a Prompt that Generates a Sales Pitch", description: "Use GPT to write a product pitch for one of your services or ideas.", tags: ["Business", "Copywriting"] },
    { type: "Lecture", name: "AI is Not Free: Time, Tokens, and Trust", description: "Understand the limits — AI costs money, may hallucinate, and must be verified.", tags: ["Business", "Risk"] },
    { type: "Lab", name: "Calculate Cost of One AI-Driven Task", description: "Estimate the time/money saved and cost per 1,000 tokens of GPT.", tags: ["Business", "Finance"] },
    { type: "Lecture", name: "Using AI to Improve Customer Experience", description: "AI can write FAQs, chat replies, surveys, and onboarding messages.", tags: ["Business", "Customer"] },
    { type: "Lab", name: "Design a Smart FAQ for Your Website", description: "Generate 10 high-quality FAQs and answers with AI for your real audience.", tags: ["Business", "Support"] },
    { type: "Lecture", name: "Hiring AI Instead of Hiring People?", description: "Learn what AI can’t do: accountability, judgment, and deep expertise.", tags: ["Business", "Hiring"] },
    { type: "Lab", name: "AI vs Human: Compare Results on a Task", description: "Do a task manually and with GPT — evaluate quality, time, and cost.", tags: ["Business", "Evaluation"] },
    { type: "Lecture", name: "AI in Content Marketing", description: "Explore how AI can write posts, titles, outlines, and even edit reels.", tags: ["Business", "Marketing"] },
    { type: "Lab", name: "Create a 3-Post Social Media Plan with AI", description: "Ask GPT to generate ideas and captions for your brand or institute.", tags: ["Business", "Content"] },
    { type: "Lecture", name: "Designing AI-First Business Models", description: "What does it mean to start a business where AI is core, not just a helper?", tags: ["Business", "Startups"] },
    { type: "Lab", name: "Pitch a 1-Person AI-Enabled Business", description: "Create a one-page plan for a micro-startup powered by AI.", tags: ["Business", "Product"] }
  ]
];
const descriptions = [
  // Track 1: AI Foundation (Everyday AI)
  "🧠 This track helps you build confidence using AI in everyday tasks. You'll learn how to think with AI, use tools like ChatGPT, and automate simple routines in writing, learning, and organizing. No coding or tech background required — just curiosity and a desire to get things done smarter.",
  // Track 2: AI System Design & Development
  "🛠️ This track teaches you to think in systems and build smart workflows. You'll combine AI tools with code or no-code logic to create useful mini-apps, APIs, and automation scripts. Designed for aspiring developers and problem solvers who want to build AI-powered systems one block at a time.",
  // Track 3: AI for Business & Strategy
  "💼 This track shows you how to turn AI into value. You'll learn to design services, automate client work, and build digital products using AI as a helper. Ideal for freelancers, teachers, and business owners who want to grow faster without hiring big teams."
];
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedIndex = 0;
  const themes = [
    {
      bgColor: "#F3EFE7",
      accentColor: "#A2836E",
      themeClass: "theme-foundation"
    },
    {
      bgColor: "#F5F0EA",
      accentColor: "#7B93A4",
      themeClass: "theme-system"
    },
    {
      bgColor: "#FDF3E7",
      accentColor: "#C4A77F",
      themeClass: "theme-business"
    }
  ];
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})} ${validate_component(AIBanner, "AIBanner").$$render($$result, {}, {}, {})} ${validate_component(AiCards, "AiCards").$$render(
      $$result,
      { selectedIndex },
      {
        selectedIndex: ($$value) => {
          selectedIndex = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div>${validate_component(Dashboard, "Dashboard").$$render(
      $$result,
      Object.assign({}, themes[selectedIndex], {
        dashboardItems: dashboards[selectedIndex]
      }),
      {},
      {}
    )} ${validate_component(Description, "Description").$$render($$result, Object.assign({}, { text: descriptions[selectedIndex] }, themes[selectedIndex]), {}, {})} ${validate_component(AITrackTable, "AITrackTable").$$render($$result, Object.assign({}, themes[selectedIndex], { trackItems: tableItems[selectedIndex] }), {}, {})}</div> <br><br> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
