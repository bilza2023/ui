🔥 **Taleem.Help AI Prompt Protocol — v1.0**
**Codename:** *“The Architect’s Lens”*
**Built for:** Bilal Tariq
**Purpose:** To extract maximum depth, precision, and control from GPT or any LLM interaction
*Format: lean, reusable, and focused on system-building*
p-p

---

## 🧭 1. Always Begin with an Intent Lock

**What it’s for:** Frame the mission clearly so GPT doesn’t guess wrong.
**Use this pattern:**

```
🎯 Context:
We are designing [system/module/concept]. I am not here for explanations or premature code.

⚙️ Mode:
[discussion-mode | drill-down-mode | code-mode | critique-mode]

🏁 Deliverables (eventually):
[slides | schema | full-code | checklist | breakdown]

Do not skip. Ask before you proceed.
```

*Example:*

```
🎯 Context: This is a Pixi.js slide engine. It’s about structured component animation — not raw canvas drawing.

⚙️ Mode: drill-down-mode

🏁 Deliverables: Modular animation blueprint with lifecycle hooks.

Only ask questions right now.
```

---

## 🔍 2. Use Precision Tags

Use these *in-line* when prompting, to trigger accurate output formatting:

* `p-p` → Paragraphs. Good for opinions, reasoning.
* `li` → Bullet list. Great for planning steps.
* `json` → For config, schemas, export data.
* `code` → For code block (don’t dump unless confirmed).
* `full-code` → Output complete file.
* `no-code` → Strictly conceptual.

---

## 🧱 3. Workflow Layers

**Always enforce these steps when building a system:**

```
1. DEFINE SCOPE – What is this system for? Where does it begin and end?

2. ENTITIES & FLOW – Who/what are the parts? How do they interact?

3. ABSTRACTION LAYER – What modules, boundaries, or interfaces?

4. RENDER/OUTPUT DESIGN – What does the user actually see or use?

5. EDGE CASES & STATE MGMT – How does it recover, update, scale?

6. EXECUTION – Code, visuals, narrations, config
```

Each stage deserves its own mode (discussion-mode → drill-down → code-mode)

---

## 🛡 4. Sanity Check Command

When AI drifts or over-answers, you use:

> “⛔ Rewind. You skipped steps. Return to `X`.”

Or:

> “Pause. The forge is hot. We’re not ready to build yet.”

This resets scope creep. Use freely.

---

## 🧰 5. Signature Prompts You Can Copy-Paste

**→ Design Without Code (Conceptual):**

```
Let's blueprint a reusable [component/system]. 
• no-code
• show me: parts, states, events, and external triggers.
• format: li
```

**→ Ask Before You Answer:**

```
Don’t assume I want output. First, confirm the objective by paraphrasing it back to me. Then ask 1 key question before moving on.
```

**→ Drill a Specific Concept:**

```
Focus on [e.g. “slide transition logic”]. Don’t talk about visuals, config, or player code yet. Just that one thing. 
• drill-down-mode • p-p
```

**→ Request a Reusable System Flow:**

```
Design this like it will be used by 5 different teams. What are the minimal contracts, extension points, and flow events?
• p-p-2
```

**→ Tactical Fixes (Debug/Refactor):**

```
Here’s what’s broken: [describe]
• Suggest 2 fixes ranked by impact
• Don’t explain syntax. Just logic.
• format: li
```

---

Would you like me to convert this into a downloadable `.md` or printable `.pdf` file so you can pin it to your desk or IDE?
