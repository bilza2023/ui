import { c as create_ssr_component, e as each, f as escape } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const aiUnits = [
    {
      title: "Understanding AI Assistants",
      explanation: "Learn what AI assistants are, how they work using LLMs, and how they can be built or used for automation.",
      tags: ["beginner", "application"],
      labs: [
        "Build a chatbot using GPT-3.5 API",
        "Connect ChatGPT to Zapier for task automation",
        "Use Voiceflow to design a no-code AI assistant"
      ]
    },
    {
      title: "Basics of Machine Learning",
      explanation: "Understand how machines learn from data through training, evaluation, and prediction.",
      tags: ["beginner", "programming"],
      labs: [
        "Train a basic classification model in Python",
        "Use Teachable Machine to create a simple ML model",
        "Visualize model predictions with a web-based demo"
      ]
    },
    {
      title: "Working with AI Text Tools",
      explanation: "Explore how LLMs generate and manipulate text using prompts, temperature, and system messages.",
      tags: ["application", "creative", "beginner"],
      labs: [
        "Use ChatGPT to generate summaries or creative stories",
        "Build a text rewriter in JS using OpenAI API",
        "Prompt an LLM to simulate a conversation"
      ]
    }
  ];
  return `<h1 class="text-3xl font-bold mb-6" data-svelte-h="svelte-w8k88o">🧠 AI Units</h1> <div class="grid gap-6">${each(aiUnits, (unit) => {
    return `<div class="rounded-2xl p-4 shadow bg-white dark:bg-zinc-900 border dark:border-zinc-700"><h2 class="text-xl font-semibold mb-2">${escape(unit.title)}</h2> <p class="mb-3 text-sm text-zinc-400">${escape(unit.explanation)}</p> <div class="flex flex-wrap gap-2 mb-3">${each(unit.tags, (tag) => {
      return `<span class="text-xs bg-zinc-800 text-white px-2 py-1 rounded">${escape(tag)}</span>`;
    })}</div> <ul class="list-disc ml-5 text-sm">${each(unit.labs, (lab) => {
      return `<li>${escape(lab)}</li>`;
    })}</ul> </div>`;
  })}</div>`;
});
export {
  Page as default
};
