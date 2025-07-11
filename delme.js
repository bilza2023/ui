// learning_ai_basics_deck.js

export function defineDeck(deckbuilder) {
    deckbuilder.addDetails({
      name: "learning_ai_basics",
      description: "A short deck introducing basic AI concepts",
      tags: ["ai", "basics", "intro"],
      status: "draft",
      createdAt: "2025-07-10T00:00:00Z",
      editedAt: "2025-07-10T00:00:00Z"
    });
  
    // Slide 1: Title
    deckbuilder.s.titleAndSubtitle(10, [
      { name: "title", content: "Learning AI Basics", showAt: 0 },
      { name: "subtitle", content: "An Introduction to Artificial Intelligence", showAt: 1 }
    ]);
  
    // Slide 2: Visual + Text
    deckbuilder.s.imageWithCaption(20, [
      { name: "image", content: "/images/box.webp", showAt: 0 },
      { name: "caption", content: "AI systems learn from patterns in data", showAt: 1 }
    ]);
  
    // Slide 3: Core Concepts
    deckbuilder.s.bulletList(30, [
      { name: "bullet", content: "What is AI?", showAt: 21 },
      { name: "bullet", content: "Types: Narrow vs General", showAt: 22 },
      { name: "bullet", content: "Learning from data", showAt: 23 }
    ]);
  
    // Slide 4: EQ format example
    deckbuilder.s.eq(50, [
      { type: "heading", content: "Machine Learning", showAt: 30 },
      { type: "spText", content: "A subset of AI that improves from experience" },
      { type: "spImage", content: "/images/box.webp" },
  
      { type: "math", content: "y = f(x)", showAt: 40 },
      { type: "spHeading", content: "Basic Function" },
      { type: "spText", content: "AI models map input to output" }
    ]);
  }
  